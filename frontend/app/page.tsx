"use client";

import { useState, useRef } from "react";
import Vapi from "@vapi-ai/web";
import VoiceWave from "../components/VoiceWave";
import ThinkingTrace from "../components/ThinkingTrace";

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "YOUR_VAPI_PUBLIC_KEY_HERE";
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "YOUR_ASSISTANT_ID_HERE";

export default function IntelligenceDashboard() {
  const [isCalling, setIsCalling] = useState(false);
  const [volume, setVolume] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);
  const vapi = useRef<any>(null);

  const addLog = (text: string, type: "system" | "analysis" | "success" = "system") => {
    const newLog = {
      id: Math.random().toString(36),
      text: text.toUpperCase(),
      time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type
    };
    setLogs(prev => [...prev.slice(-19), newLog]); // Keep last 20 logs
  };

  const startDemo = async () => {
    try {
      setIsCalling(true);
      addLog("Initializing Velasight Neural Link...", "system");

      // 1. MIC PRE-FLIGHT (Security check)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        addLog("ERROR: Microphone access requires HTTPS or Localhost.", "system");
        alert("Security Block: Please check your URL bar. You must use http://localhost:3000");
        setIsCalling(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());

      // 2. WAKE UP VAPI
      addLog("Booting Logic Engine...", "system");
      vapi.current = new Vapi(VAPI_PUBLIC_KEY);

      vapi.current.on('volume-level', (level: number) => setVolume(level));

      vapi.current.on('message', (message: any) => {
        // ONLY log the final user sentence to prevent spam
        if (message.type === 'transcript' && message.role === 'user' && message.transcriptType === 'final') {
          addLog(`USER: ${message.transcript}`, "system");
        }

        // CATCH THE AI'S "THINKING" AND TOOL CALLS
        if (message.type === 'function-call') {
          addLog(`[EXECUTING TOOL]: ${message.functionCall.name.replace(/_/g, ' ')}...`, "success");
          addLog(`[QUERY PARAMETERS]: Analyzing data...`, "system");
        }

        if (message.type === 'tool-calls') {
          message.toolCalls.forEach((tool: any) => {
            addLog(`[TRIGGERING DATABASE]: ${tool.function.name.replace(/_/g, ' ')}...`, "success");
          });
        }

        if (message.type === 'transcript' && message.role === 'assistant' && message.transcriptType === 'final') {
          // Expanded the dictionary to catch more phonetic misspellings
          const correctedText = message.transcript.replace(/Vellicide|Velicide|Vellicite|Villicide|Vellosite|Velosite/gi, "Velasight");
          addLog(`ANALYZING: ${correctedText}`, "analysis");
        }
      });

      // 3. START ENGINE
      await vapi.current.start(VAPI_ASSISTANT_ID);

      addLog("Handshake Verified. System Online and Listening.", "success");

    } catch (error) {
      console.error("🚨 Startup Error:", error);
      addLog("Critical Failure: Audio Engine Blocked.", "system");
      setIsCalling(false);
    }
  };

  const stopDemo = async () => {
    vapi.current?.stop();
    setIsCalling(false);
    setVolume(0);
    addLog("Session Terminated.", "system");
  };

  return (
    // Changed background to Light Peach (#FFF0E5), keeping text slate-800 for contrast
    <div className="flex flex-col items-center min-h-screen bg-[#FFF0E5] text-slate-800 p-8 font-sans selection:bg-cyan-500/30">
      <h1 className="text-4xl font-light mt-8 mb-2 text-cyan-800 tracking-[0.4em] uppercase">VELASIGHT</h1>
      <p className="text-cyan-700 tracking-[0.2em] text-xs uppercase mb-12 animate-pulse">Property Intelligence Graph</p>

      <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-8">

        <div className="w-full h-48 bg-white/60 border border-orange-200 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden backdrop-blur-sm">
          {!isCalling && <div className="absolute text-orange-800 tracking-widest text-sm uppercase">Engine Offline</div>}
          <VoiceWave volume={volume} isCalling={isCalling} />
        </div>

        <ThinkingTrace logs={logs} />
      </div>

      <div className="mt-12">
        <button onClick={isCalling ? stopDemo : startDemo} className={`px-16 py-4 border tracking-widest uppercase text-sm transition-all duration-300 font-medium shadow-md ${isCalling ? 'border-red-400 text-red-600 bg-red-50 hover:bg-red-100' : 'border-orange-400 text-orange-700 bg-orange-50 hover:bg-orange-100'}`}>
          {isCalling ? 'Terminate Session' : 'Initialize Intelligence'}
        </button>
      </div>
    </div>
  );
}
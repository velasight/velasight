"use client";

import React, { useEffect, useRef } from "react";

export default function ThinkingTrace({ logs }: { logs: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full h-64 bg-white/40 border border-cyan-500/20 rounded-xl p-6 font-mono text-xs overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">
      <div className="text-cyan-600 mb-4 border-b border-cyan-500/30 pb-2 flex justify-between uppercase tracking-[0.2em]">
        <span>System Intelligence Log</span>
        <span className="animate-pulse text-green-500">● Live Feed</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 scrollbar-hide pr-4">
        {logs.length === 0 && <span className="text-slate-400 italic">Awaiting telemetry...</span>}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 leading-relaxed tracking-wide">
            <span className="text-slate-400 whitespace-nowrap">[{log.time}]</span>
            <span className={
              log.type === "success" ? "text-green-500" : 
              log.type === "analysis" ? "text-cyan-600" : "text-slate-500"
            }>
              {log.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
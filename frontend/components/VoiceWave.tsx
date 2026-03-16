"use client";

import React, { useEffect, useRef } from "react";

export default function VoiceWave({ volume, isCalling }: { volume: number, isCalling: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!isCalling) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      
      // Removed "screen" blending so colors pop on light backgrounds
      ctx.globalCompositeOperation = "source-over"; 

      // The Original Antigravity Palette (Cyan, Orange, Peach/Pink)
      const layers = [
        { color: "rgba(6, 182, 212, 0.7)", speed: 0.02, frequency: 0.015, amplitude: 1.0 },  // Cyan
        { color: "rgba(249, 115, 22, 0.7)", speed: 0.03, frequency: 0.02, amplitude: 0.8 },  // Orange
        { color: "rgba(251, 146, 60, 0.6)", speed: 0.04, frequency: 0.025, amplitude: 0.6 }  // Peach/Pink
      ];

      const targetAmplitude = volume > 0.05 ? volume * 2.5 : 0.1;

      layers.forEach((layer, index) => {
        ctx.beginPath();
        ctx.moveTo(0, centerY);

        for (let x = 0; x <= width; x += 5) {
          const t = Date.now() * layer.speed;
          const edgePinch = Math.sin((x / width) * Math.PI); 
          const waveHeight = (height * 0.4) * layer.amplitude * targetAmplitude * edgePinch;
          const y = centerY + Math.sin(x * layer.frequency + t + (index * Math.PI / 3)) * waveHeight;
          
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        ctx.fillStyle = layer.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [volume, isCalling]);

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={192} 
      className="w-full h-full opacity-90 transition-opacity duration-500"
    />
  );
}
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function FestivalArtwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 600;
    };
    window.addEventListener("resize", handleResize);

    let angleX = 0.35;
    let angleY = 0;
    let targetAngleX = 0.35;
    let targetAngleY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetAngleY = x * 0.45;
      targetAngleX = 0.35 + y * 0.35;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 3D Orbital Rings Configuration
    const rings = [
      { radius: 170, points: 64, speed: 0.007, color: "rgba(255, 94, 0, ", width: 1.8, tilt: 0 },
      { radius: 130, points: 48, speed: -0.011, color: "rgba(255, 184, 0, ", width: 1.5, tilt: 0.65 },
      { radius: 90, points: 36, speed: 0.015, color: "rgba(255, 245, 230, ", width: 2.2, tilt: -0.85 },
      { radius: 210, points: 80, speed: -0.004, color: "rgba(255, 75, 0, ", width: 1, tilt: 1.2 },
    ];

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;
      t += 1;

      const cx = width / 2;
      const cy = height / 2;
      const scale = (Math.min(width, height) / 540);

      // Draw subtle radiant festival heat core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140 * scale);
      coreGrad.addColorStop(0, "rgba(255, 94, 0, 0.22)");
      coreGrad.addColorStop(0.4, "rgba(255, 170, 0, 0.08)");
      coreGrad.addColorStop(1, "rgba(255, 94, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 140 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Project and draw 3D rings
      rings.forEach((ring, rIdx) => {
        const currentRot = t * ring.speed;
        const totalPoints = ring.points;
        const points3D: { x: number; y: number; z: number }[] = [];

        for (let i = 0; i <= totalPoints; i++) {
          const theta = (i / totalPoints) * Math.PI * 2 + currentRot;
          
          // Initial ring coordinates
          let x0 = ring.radius * Math.cos(theta);
          let y0 = ring.radius * Math.sin(theta) * Math.cos(ring.tilt);
          let z0 = ring.radius * Math.sin(theta) * Math.sin(ring.tilt);

          // Apply interactive pitch (angleX)
          const cosX = Math.cos(angleX);
          const sinX = Math.sin(angleX);
          const y1 = y0 * cosX - z0 * sinX;
          const z1 = y0 * sinX + z0 * cosX;

          // Apply interactive yaw (angleY)
          const cosY = Math.cos(angleY);
          const sinY = Math.sin(angleY);
          const x2 = x0 * cosY + z1 * sinY;
          const z2 = -x0 * sinY + z1 * cosY;

          // Perspective projection
          const fov = 420;
          const p = fov / (fov + z2);
          points3D.push({
            x: cx + x2 * p * scale,
            y: cy + y1 * p * scale,
            z: z2,
          });
        }

        // Draw ring segments with depth fading
        for (let i = 0; i < points3D.length - 1; i++) {
          const p1 = points3D[i];
          const p2 = points3D[i + 1];
          const avgZ = (p1.z + p2.z) / 2;
          const depthAlpha = Math.max(0.12, Math.min(0.95, (avgZ + ring.radius) / (ring.radius * 2)));

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `${ring.color}${depthAlpha})`;
          ctx.lineWidth = ring.width * scale * (avgZ > 0 ? 1.25 : 0.85);
          ctx.stroke();

          // Render intermittent energy nodules / festival strobe beads
          if (i % 8 === 0) {
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, (avgZ > 0 ? 3.5 : 2) * scale, 0, Math.PI * 2);
            ctx.fillStyle = avgZ > 0 ? "#FFFFFF" : "rgba(255, 184, 0, 0.7)";
            ctx.fill();
          }
        }
      });

      // Central pulsating stellar nucleus
      const pulse = Math.sin(t * 0.05) * 4;
      const nucleusGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, (14 + pulse) * scale);
      nucleusGrad.addColorStop(0, "#FFFFFF");
      nucleusGrad.addColorStop(0.3, "#FFD080");
      nucleusGrad.addColorStop(0.8, "#FF5500");
      nucleusGrad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(cx, cy, (18 + pulse) * scale, 0, Math.PI * 2);
      ctx.fillStyle = nucleusGrad;
      ctx.fill();

      // Crosshair laser lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(cx - 240 * scale, cy);
      ctx.lineTo(cx + 240 * scale, cy);
      ctx.moveTo(cx, cy - 240 * scale);
      ctx.lineTo(cx, cy + 240 * scale);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[560px] flex items-center justify-center select-none pointer-events-none">
      {/* Background kinetic canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* Modern festival typographic stamp / HUD overlays */}
      <div className="absolute -top-2 right-4 sm:right-8 flex flex-col items-end text-right font-mono text-[10px] tracking-widest text-neutral-400">
        <span className="text-[#FF7A1A] font-bold">CORE // KINETIC MONOLITH</span>
        <span className="text-white/40">FREQ: 144.8 MHz • SPHERE_01</span>
      </div>

      <div className="absolute -bottom-2 left-4 sm:left-8 flex flex-col text-left font-mono text-[10px] tracking-widest text-neutral-400">
        <span className="text-white/80 font-semibold">ASTRA ARENA MATRIX</span>
        <span className="text-[#FFB800]/80">ROTATIONAL GYRO ACTIVE</span>
      </div>

      {/* Architectural corner crosshairs */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#FF5500]/40" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#FF5500]/40" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#FF5500]/40" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#FF5500]/40" />
    </div>
  );
}

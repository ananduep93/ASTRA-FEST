"use client";

import { useEffect, useRef } from "react";

export function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Optimized particle count for guaranteed 60fps on low-end devices
    const PARTICLE_COUNT = Math.min(45, Math.floor(width / 30));
    const particles: {
      x: number;
      y: number;
      angle: number;
      dist: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];

    const centerX = () => width / 2;
    const centerY = () => height / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isAccent = Math.random() > 0.75;
      particles.push({
        x: 0,
        y: 0,
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * Math.min(width, height) * 0.45 + 50,
        speed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 1.8 + 0.8,
        color: isAccent ? "#FF3D00" : "#F5F2EB",
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let t = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Light damping on mouse tracking
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const cx = centerX() + (mouseX - centerX()) * 0.08;
      const cy = centerY() + (mouseY - centerY()) * 0.08;

      t += 0.015;

      // Draw subtle orbital rings around central typography
      const ringRadius = Math.min(width, height) * 0.28;
      
      // Ring 1 (accent vermillion)
      ctx.beginPath();
      ctx.ellipse(cx, cy, ringRadius, ringRadius * 0.45, t * 0.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 61, 0, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Ring 2 (warm white)
      ctx.beginPath();
      ctx.ellipse(cx, cy, ringRadius * 1.35, ringRadius * 0.55, -t * 0.15 + 0.8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(245, 242, 235, 0.06)";
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // Particles rotation
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;

        p.x = cx + Math.cos(p.angle) * p.dist;
        p.y = cy + Math.sin(p.angle) * (p.dist * 0.55);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color === "#FF3D00" 
          ? `rgba(255, 61, 0, ${p.alpha})`
          : `rgba(245, 242, 235, ${p.alpha})`;
        ctx.fill();

        // Connect very close neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 6000) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = "rgba(245, 242, 235, 0.04)";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}

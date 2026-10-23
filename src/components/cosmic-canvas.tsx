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

    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || width < 768;

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Slower, smoother particle count
    const PARTICLE_COUNT = isMobile
      ? Math.min(22, Math.floor(width / 35))
      : Math.min(40, Math.floor(width / 28));

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
      const rand = Math.random();
      const color = rand > 0.6 ? "#FF5500" : rand > 0.35 ? "#FFA040" : rand > 0.15 ? "#FF7722" : "#FFF9F2";
      particles.push({
        x: 0,
        y: 0,
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * Math.min(width, height) * 0.45 + 50,
        // Slower leisurely speed for velvety smooth feel
        speed: (Math.random() * 0.0012 + 0.0004) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 1.5 + 0.6,
        color,
        alpha: Math.random() * 0.4 + 0.15,
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
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let t = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Very smooth, gentle damping for silky feeling
      const lerp = isMobile ? 0.02 : 0.03;
      mouseX += (targetMouseX - mouseX) * lerp;
      mouseY += (targetMouseY - mouseY) * lerp;

      const offsetFactor = isMobile ? 0.04 : 0.06;
      const cx = centerX() + (mouseX - centerX()) * offsetFactor;
      const cy = centerY() + (mouseY - centerY()) * offsetFactor;

      t += 0.006; // Slower time evolution

      // Orbital rings: Cyan and Violet
      const ringRadius = Math.min(width, height) * 0.28;

      ctx.beginPath();
      ctx.ellipse(cx, cy, ringRadius, ringRadius * 0.42, t * 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 85, 0, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, ringRadius * 1.45, ringRadius * 0.5, -t * 0.07 + 0.8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 160, 64, 0.08)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;

        p.x = cx + Math.cos(p.angle) * p.dist;
        p.y = cy + Math.sin(p.angle) * (p.dist * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color === "#FF5500"
            ? `rgba(255, 85, 0, ${p.alpha})`
            : p.color === "#FFA040"
            ? `rgba(255, 160, 64, ${p.alpha})`
            : p.color === "#FF7722"
            ? `rgba(255, 119, 34, ${p.alpha})`
            : `rgba(255, 249, 242, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles gently on desktop
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 5500) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = "rgba(255, 85, 0, 0.04)";
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65"
    />
  );
}

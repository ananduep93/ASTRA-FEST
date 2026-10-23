"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Astra3DArtworkProps {
  className?: string;
  size?: number;
}

export function Astra3DArtwork({ className = "", size = 220 }: Astra3DArtworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Check user accessibility preference for reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setReducedMotion(true);
    }

    // Low power / battery saver guard
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
      setIsLowPower(true);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion || isLowPower) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    const width = (canvas.width = size);
    const height = (canvas.height = size);

    // 3D 8-Pointed Star Polyhedron Vertices
    const rOuter = size * 0.38;
    const rInner = size * 0.16;

    const vertices: { x: number; y: number; z: number }[] = [
      { x: 0, y: -rOuter, z: 0 },
      { x: 0, y: rOuter, z: 0 },
      { x: -rOuter, y: 0, z: 0 },
      { x: rOuter, y: 0, z: 0 },
      { x: 0, y: 0, z: -rOuter },
      { x: 0, y: 0, z: rOuter },
      // Corner nodes
      { x: rInner, y: -rInner, z: rInner },
      { x: -rInner, y: -rInner, z: rInner },
      { x: rInner, y: rInner, z: rInner },
      { x: -rInner, y: rInner, z: rInner },
      { x: rInner, y: -rInner, z: -rInner },
      { x: -rInner, y: -rInner, z: -rInner },
      { x: rInner, y: rInner, z: -rInner },
      { x: -rInner, y: rInner, z: -rInner },
    ];

    const edges: [number, number][] = [
      [0, 6], [0, 7], [0, 10], [0, 11],
      [1, 8], [1, 9], [1, 12], [1, 13],
      [2, 7], [2, 9], [2, 11], [2, 13],
      [3, 6], [3, 8], [3, 10], [3, 12],
      [4, 10], [4, 11], [4, 12], [4, 13],
      [5, 6], [5, 7], [5, 8], [5, 9],
      [6, 7], [7, 9], [9, 8], [8, 6],
      [10, 11], [11, 13], [13, 12], [12, 10],
      [6, 10], [7, 11], [8, 12], [9, 13],
    ];

    let rotX = 0.4;
    let rotY = 0.6;
    let targetRotX = 0.4;
    let targetRotY = 0.6;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetRotY = (clientX - cx) * 0.006;
      targetRotX = -(clientY - cy) * 0.006;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    // Intersection Observer: Pause animation when off-screen to save battery
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    let t = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      t += 0.015;
      rotX += (targetRotX - rotX) * 0.06 + 0.005;
      rotY += (targetRotY - rotY) * 0.06 + 0.014;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const projected = vertices.map((v) => {
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        const fov = size * 1.2;
        const distance = fov / (fov + z2 + size * 0.5);
        return {
          x: width / 2 + x1 * distance,
          y: height / 2 + y2 * distance,
          z: z2,
        };
      });

      // Ambient outer ring
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, size * 0.32 + Math.sin(t * 2) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 77, 0, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Edges
      for (const [i1, i2] of edges) {
        const p1 = projected[i1];
        const p2 = projected[i2];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.18, Math.min(0.85, (avgZ + rOuter) / (rOuter * 2)));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 77, 0, ${alpha * 0.8})`;
        ctx.lineWidth = avgZ > 0 ? 1.5 : 0.8;
        ctx.stroke();
      }

      // Vertices
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.z > 0 ? 2.6 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.z > 15 ? "#F5F0E8" : "#FF4D00";
        ctx.shadowColor = "#FF4D00";
        ctx.shadowBlur = p.z > 0 ? 8 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion, isLowPower, size]);

  // Static Fallback for reduced motion or low-power devices
  if (reducedMotion || isLowPower) {
    return (
      <div
        ref={containerRef}
        style={{ width: size, height: size }}
        className={`relative flex items-center justify-center p-3 select-none ${className}`}
      >
        <Image
          src="/logo.png"
          alt="ASTRA Emblem"
          width={size * 0.75}
          height={size * 0.75}
          priority
          className="object-contain filter drop-shadow-[0_0_20px_rgba(255,77,0,0.6)]"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_25px_rgba(255,77,0,0.5)]"
      />
    </div>
  );
}

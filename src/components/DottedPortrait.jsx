import React, { useEffect, useRef, useState } from 'react';
import { cosmicAudio } from '../utils/CosmicAudio';

/**
 * Interactive Dotted / Particle Portrait Canvas
 * Inspired by dotted halftone creative developer portraits,
 * tailored with cyber-physical telemetry coordinates and mouse physics.
 */
export default function DottedPortrait() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const [coords, setCoords] = useState('11.9416° N, 79.8083° E');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId;
    let width = 360;
    let height = 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = Math.max(260, Math.floor(rect.width));
      height = Math.max(320, Math.floor(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Build deterministic dot-matrix portrait & circuit halo
    const dots = [];
    const spacing = 10;
    const cx = width / 2;
    const cy = height * 0.44;

    for (let y = 24; y < height - 24; y += spacing) {
      for (let x = 24; x < width - 24; x += spacing) {
        const dx = (x - cx) / (width * 0.28);
        const dy = (y - cy) / (height * 0.26);
        const headDist = Math.sqrt(dx * dx + dy * dy);

        // Shoulders silhouette
        const sdx = (x - cx) / (width * 0.44);
        const sdy = (y - height * 0.88) / (height * 0.34);
        const shoulderDist = Math.sqrt(sdx * sdx + sdy * sdy);

        // Outer orbital ring
        const rdx = (x - cx) / (width * 0.42);
        const rdy = (y - height * 0.48) / (height * 0.4);
        const ringDist = Math.sqrt(rdx * rdx + rdy * rdy);

        let weight = 0;
        let isAccent = false;

        if (headDist < 0.88) {
          // Sculpted shading inside head silhouette
          const shade = 1 - headDist * 0.65;
          const wave = Math.sin(x * 0.08) * Math.cos(y * 0.08) * 0.15;
          weight = Math.max(0.15, shade + wave);
          if (dx > 0.15 && dy < -0.1 && headDist > 0.45) {
            isAccent = true;
          }
        } else if (shoulderDist < 0.95 && y > height * 0.62) {
          weight = Math.max(0.15, 0.78 - shoulderDist * 0.5);
          if (Math.abs(sdx) < 0.14 && y > height * 0.72) {
            isAccent = true;
          }
        } else if (Math.abs(ringDist - 0.96) < 0.045) {
          weight = 0.55;
          isAccent = (Math.floor(x + y) % 5 === 0);
        }

        if (weight > 0.18) {
          dots.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            radius: 1.1 + weight * 1.9,
            alpha: Math.min(0.95, 0.25 + weight * 0.75),
            isAccent,
            phase: (x * 0.03 + y * 0.04) % (Math.PI * 2),
          });
        }
      }
    }

    let t = 0;
    const render = () => {
      t += 0.025;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        if (!prefersReducedMotion) {
          const idleX = Math.sin(t + d.phase) * 0.6;
          const idleY = Math.cos(t * 0.8 + d.phase) * 0.6;
          let targetX = d.ox + idleX;
          let targetY = d.oy + idleY;

          if (active) {
            const dx = d.x - mx;
            const dy = d.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxR = 78;
            if (dist < maxR && dist > 0.1) {
              const force = (1 - dist / maxR) * 18;
              targetX += (dx / dist) * force;
              targetY += (dy / dist) * force;
            }
          }

          d.vx = (d.vx + (targetX - d.x) * 0.14) * 0.78;
          d.vy = (d.vy + (targetY - d.y) * 0.14) * 0.78;
          d.x += d.vx;
          d.y += d.vy;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        if (d.isAccent) {
          ctx.fillStyle = `rgba(255, 157, 66, ${d.alpha})`;
        } else {
          ctx.fillStyle = `rgba(233, 231, 225, ${d.alpha * 0.88})`;
        }
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y, active: true };
    const nx = (11.9416 + (x / rect.width - 0.5) * 0.02).toFixed(4);
    const ny = (79.8083 + (y / rect.height - 0.5) * 0.02).toFixed(4);
    setCoords(`${nx}° N, ${ny}° E`);
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    setCoords('11.9416° N, 79.8083° E');
  };

  return (
    <div
      className="relative w-full h-[360px] sm:h-[420px] rounded-3xl bg-[#0b0b0e] border border-white/10 overflow-hidden group select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => cosmicAudio.playTick()}
    >
      {/* Subtle Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      <canvas ref={canvasRef} className="relative z-10 w-full h-full cursor-crosshair" />

      {/* Top HUD Tag */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none font-mono text-[10px] uppercase tracking-widest text-[#e9e7e1]/60">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff9d42] animate-pulse" />
          DOT-MATRIX // SARRVESH M
        </span>
        <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          {coords}
        </span>
      </div>

      {/* Bottom Interactive Hint */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none font-mono text-[10px] text-[#e9e7e1]/45">
        <span>HOVER TO DISTURB FIELD</span>
        <span className="text-[#ff9d42]/80">SILICON + WEBGL</span>
      </div>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear realistic digital loading increment
      const increment = Math.floor(Math.random() * 8) + 2;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Animate preloader out with GSAP curtain sweep
          const tl = gsap.timeline({
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });

          tl.to('.preloader-content', {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: 'power2.in'
          })
          .to('.preloader-curtain-top', {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut'
          }, '-=0.2')
          .to('.preloader-curtain-bottom', {
            yPercent: 100,
            duration: 0.9,
            ease: 'power4.inOut'
          }, '<');
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center">
      {/* Top curtain */}
      <div className="preloader-curtain-top absolute top-0 left-0 w-full h-1/2 bg-[#121111] border-b border-[#FE3303]/30" />
      {/* Bottom curtain */}
      <div className="preloader-curtain-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#121111] border-t border-[#FE3303]/30" />

      {/* Center content */}
      <div className="preloader-content relative z-10 w-full max-w-xl px-6 flex flex-col items-center text-center">
        {/* Monogram Badge */}
        <div className="w-16 h-16 mb-8 rounded-2xl bg-gradient-to-tr from-[#FE3303] via-[#FF7B00] to-[#C344B5] p-[1px] flex items-center justify-center shadow-[0_0_40px_rgba(254,51,3,0.3)] animate-pulse">
          <div className="w-full h-full bg-[#121111] rounded-2xl flex items-center justify-center">
            <span className="font-['Cabinet_Grotesk'] text-2xl font-black text-[#F5E7DF] tracking-tighter">
              SM
            </span>
          </div>
        </div>

        {/* Name & Title */}
        <h2 className="font-['Cabinet_Grotesk'] text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#F5E7DF] mb-2">
          SARRVESH M
        </h2>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#F5E7DF]/60 mb-8">
          HARDWARE ARCHITECTURE // EMBEDDED // CREATIVE TECH
        </p>

        {/* Counter */}
        <div className="font-['Cabinet_Grotesk'] text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF7B00] via-[#FE3303] to-[#C344B5] my-4 tabular-nums">
          {progress.toString().padStart(2, '0')}%
        </div>

        {/* Progress Track */}
        <div className="w-full h-1 bg-[#1E1D1D] rounded-full overflow-hidden mt-4 relative">
          <div
            className="h-full bg-gradient-to-r from-[#FF7B00] via-[#FE3303] to-[#C344B5] transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Telemetry info */}
        <div className="w-full mt-6 flex justify-between items-center font-mono text-[11px] text-[#F5E7DF]/40">
          <span>PUDUCHERRY, IN [11.94°N, 79.80°E]</span>
          <span className="animate-pulse text-[#FF7B00]">SYSTEM_READY: OK</span>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { chapters, personalInfo } from '../data/storyData';
import { cosmicAudio } from '../utils/CosmicAudio';
import { ArrowUpRight } from 'lucide-react';

export default function SiteMenu({ isOpen, onClose, onSelectChapter, activeChapterId }) {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="site-menu"
      className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-300 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header inside Menu */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <span className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1]/60">
          STORY INDEX // 9 CHAPTERS
        </span>
        <button
          onClick={() => {
            cosmicAudio.playTick();
            onClose();
          }}
          className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1] hover:text-[#ff9d42] transition-colors"
        >
          [ ESC / CLOSE ]
        </button>
      </div>

      {/* Main Grid: Left Chapters, Right Metadata */}
      <div className="my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Chapters List */}
        <div className="lg:col-span-7">
          <ol className="space-y-4">
            {chapters.map((ch) => {
              const isActive = activeChapterId === ch.id;
              return (
                <li key={ch.id}>
                  <button
                    onClick={() => {
                      cosmicAudio.playTick();
                      onSelectChapter(ch.id);
                      onClose();
                    }}
                    onMouseEnter={() => cosmicAudio.playHover()}
                    className="group flex items-baseline gap-4 w-full text-left focus:outline-none"
                  >
                    <span className="font-mono text-xs tracking-wider text-[#e9e7e1]/40 group-hover:text-[#ff9d42] transition-colors">
                      {ch.number}
                    </span>
                    <span
                      className={`font-['Timeless_Sans_Grotesk',sans-serif] text-2xl sm:text-3xl md:text-4xl font-light tracking-tight transition-all duration-300 ${
                        isActive
                          ? 'text-white font-medium pl-3 border-l-2 border-[#ff9d42]'
                          : 'text-[#e9e7e1]/70 group-hover:text-[#e9e7e1] group-hover:translate-x-2'
                      }`}
                    >
                      {ch.title}
                    </span>
                    <span className="hidden sm:inline font-mono text-[11px] text-[#e9e7e1]/30 group-hover:text-[#e9e7e1]/60 uppercase tracking-widest ml-auto">
                      {ch.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right Column: Context & Transmission Links */}
        <div className="lg:col-span-5 space-y-8 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42] block mb-2">
              DISCIPLINE & CREED
            </span>
            <p className="text-sm sm:text-base font-light text-[#e9e7e1]/80 leading-relaxed">
              "I design it and I build it. Nothing gets lost in handoff."
            </p>
            <p className="text-xs font-mono text-[#e9e7e1]/50 mt-2">
              Hardware Design • Embedded C • Industrial PLC • Three.js WebGL
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs text-[#e9e7e1]/70">
            <div>
              <span className="text-[#e9e7e1]/40 block text-[10px] uppercase">DIRECT FREQUENCY</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-[#e9e7e1] hover:text-[#ff9d42] transition-colors text-sm"
              >
                {personalInfo.email}
              </a>
            </div>

            <div>
              <span className="text-[#e9e7e1]/40 block text-[10px] uppercase">COORDINATES & TIME</span>
              <span>PUDUCHERRY, IN [11.94°N, 79.80°E]</span>
              <div className="text-[#ff9d42] tabular-nums mt-0.5">{istTime} IST</div>
            </div>

            <div>
              <span className="text-[#e9e7e1]/40 block text-[10px] uppercase">AVAILABILITY</span>
              <span className="text-green-400">● {personalInfo.available}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 font-mono text-xs">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#e9e7e1]/70 hover:text-white transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
            <a
              href={personalInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#e9e7e1]/70 hover:text-white transition-colors"
            >
              <span>WhatsApp</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer inside Menu */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#e9e7e1]/40">
        <span>SARRVESH M — PORTFOLIO STORY</span>
        <span>INSPIRED BY JEHADUDDIN.VERCEL.APP</span>
      </div>
    </div>
  );
}


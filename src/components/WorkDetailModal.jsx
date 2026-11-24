import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { cosmicAudio } from '../utils/CosmicAudio';

export default function WorkDetailModal({ work, onClose }) {
  useEffect(() => {
    cosmicAudio.playTick();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!work) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#000000]/95 backdrop-blur-2xl flex justify-center p-4 sm:p-8 md:p-14 animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#0a0a0c] border border-white/15 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden my-auto text-[#e9e7e1]">
        {/* Top Header */}
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/10 bg-[#0e0f13]">
          <div className="flex items-center gap-3 font-mono text-xs text-[#e9e7e1]/60">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff9d42]">
              {work.badge}
            </span>
            <span>{work.year}</span>
          </div>

          <button
            onClick={() => {
              cosmicAudio.playTick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#e9e7e1] transition-colors"
            aria-label="Close Case Study"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 md:p-12 space-y-10 max-h-[75vh] overflow-y-auto">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42] block mb-2">
              {work.tag}
            </span>
            <h2 className="font-['Timeless_Sans_Grotesk',sans-serif] text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
              {work.name}
            </h2>
            <p className="font-['Timeless_Sans_Grotesk',sans-serif] text-lg sm:text-xl text-[#e9e7e1]/80 leading-relaxed font-light">
              {work.line}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-[#000000] border border-white/10">
            {work.stats.map((st, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xl sm:text-2xl font-light text-[#ff9d42] tabular-nums font-mono">
                  {st.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-[#e9e7e1]/50 uppercase mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Blueprint */}
          <div className="p-6 rounded-2xl bg-[#0e0f13] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#ff9d42] uppercase tracking-widest">
              <Layers size={14} />
              <span>SYSTEM ARCHITECTURE & PIPELINE</span>
            </div>
            <div className="font-mono text-xs sm:text-sm text-[#e9e7e1]/90 bg-[#000000] p-4 rounded-xl border border-white/5 leading-relaxed whitespace-pre-wrap">
              {work.architecture}
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1]/50">
              ENGINEERING OVERVIEW
            </h3>
            <p className="text-sm sm:text-base font-light text-[#e9e7e1]/80 leading-relaxed">
              {work.overview}
            </p>
          </div>

          {/* Technical Blueprint Ingredients */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1]/50">
              DEPLOYED SPECIFICATIONS
            </h3>
            <div className="font-mono text-xs sm:text-sm text-[#e9e7e1]/70 bg-[#0e0f13] p-4 rounded-xl border border-white/5">
              {work.made}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={work.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => cosmicAudio.playTick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-medium uppercase tracking-wider hover:bg-[#ff9d42] transition-colors"
              >
                <GithubIcon size={14} />
                <span>Repository</span>
              </a>

              {work.liveUrl !== "#" && (
                <a
                  href={work.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cosmicAudio.playTick()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  <span>Launch Live</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="font-mono text-xs text-[#e9e7e1]/50 hover:text-white uppercase tracking-wider"
            >
              [ ESC TO CLOSE ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


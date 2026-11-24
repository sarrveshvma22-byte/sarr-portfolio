import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cosmicAudio } from '../utils/CosmicAudio';

export default function CosmicPillNav({
  isMenuOpen,
  onToggleMenu,
  isSoundActive,
  onToggleSound,
  onJumpToWork,
  activeChapterTitle = "Ground"
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
      {/* Brand Monogram Pill */}
      <div className="pointer-events-auto">
        <a
          href="#ground"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            cosmicAudio.playTick();
          }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0e0f13]/70 border border-white/10 backdrop-blur-md text-xs font-mono tracking-widest text-[#e9e7e1] hover:border-white/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff9d42] animate-pulse" />
          <span className="font-medium">SARRVESH M</span>
        </a>
      </div>

      {/* Center Chapter Coordinate (Desktop) */}
      <div className="hidden md:flex pointer-events-auto items-center gap-2 px-4 py-2 rounded-full bg-[#0e0f13]/50 border border-white/5 backdrop-blur-md text-[11px] font-mono uppercase tracking-widest text-[#e9e7e1]/60">
        <span>STORY //</span>
        <span className="text-[#e9e7e1] font-semibold">{activeChapterTitle}</span>
      </div>

      {/* Right Controls Pill */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Work Jump Button */}
        <button
          onClick={() => {
            cosmicAudio.playTick();
            if (onJumpToWork) onJumpToWork();
          }}
          className="hidden sm:inline-flex px-3.5 py-2 rounded-full bg-[#0e0f13]/70 border border-white/10 backdrop-blur-md text-xs font-mono tracking-wider text-[#e9e7e1]/80 hover:text-white hover:border-white/30 transition-all"
        >
          Work
        </button>

        {/* Audio Toggle Pill */}
        <button
          onClick={() => {
            onToggleSound();
          }}
          className={`p-2.5 rounded-full border transition-all flex items-center justify-center backdrop-blur-md ${
            isSoundActive
              ? 'bg-[#ff9d42]/15 border-[#ff9d42]/60 text-[#ff9d42]'
              : 'bg-[#0e0f13]/70 border-white/10 text-[#e9e7e1]/60 hover:text-white hover:border-white/30'
          }`}
          title={isSoundActive ? 'Mute celestial audio' : 'Enable ambient celestial soundscape'}
        >
          {isSoundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>

        {/* Menu Toggle Pill */}
        <button
          onClick={() => {
            cosmicAudio.playTick();
            onToggleMenu();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0e0f13]/70 border border-white/10 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-[#e9e7e1] hover:border-white/30 transition-all"
          aria-label="Toggle Navigation Menu"
        >
          <span>{isMenuOpen ? 'CLOSE' : 'INDEX'}</span>
          <div className="flex flex-col justify-center gap-1 w-3.5 h-3">
            <span
              className={`w-full h-[1.5px] bg-[#e9e7e1] transition-transform duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-[2.5px]' : ''
              }`}
            />
            <span
              className={`w-full h-[1.5px] bg-[#e9e7e1] transition-transform duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''
              }`}
            />
          </div>
        </button>
      </div>
    </header>
  );
}


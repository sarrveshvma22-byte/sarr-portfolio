import React from 'react';
import { chapters } from '../data/storyData';
import { cosmicAudio } from '../utils/CosmicAudio';

export default function CosmicOrbitRail({ activeChapterId, onSelectChapter }) {
  return (
    <nav
      className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3 select-none pointer-events-auto"
      aria-label="Story Orbit Navigation"
    >
      {chapters.map((ch) => {
        const isActive = activeChapterId === ch.id;
        return (
          <button
            key={ch.id}
            onClick={() => {
              cosmicAudio.playTick();
              onSelectChapter(ch.id);
            }}
            onMouseEnter={() => cosmicAudio.playHover()}
            className="group relative flex items-center justify-center p-1.5 focus:outline-none"
            aria-label={`Jump to chapter ${ch.number}: ${ch.title}`}
          >
            {/* Tooltip label on hover */}
            <span className="pointer-events-none absolute right-full mr-3.5 px-2.5 py-1 rounded bg-[#0e0f13]/90 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-lg">
              {ch.number} // {ch.title}
            </span>

            {/* Orbit dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2 h-2 bg-[#ff9d42] shadow-[0_0_8px_#ff9d42]'
                  : 'w-1 h-1 bg-white/20 group-hover:bg-white/60 group-hover:scale-150'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}


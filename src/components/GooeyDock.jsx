import React from 'react';
import { Sparkles, LayoutGrid, Volume2, VolumeX } from 'lucide-react';
import { cosmicAudio } from '../utils/CosmicAudio';

/**
 * Floating SVG Gooey Dock (#dock-goo)
 * Provides instant navigation in Site mode + seamless ?v=site <-> ?v=3d mode switching.
 */
export default function GooeyDock({
  viewMode,
  onChangeViewMode,
  isSoundActive,
  onToggleSound,
  onScrollTo,
}) {
  const navItems = [
    { id: 'overview', label: 'Top' },
    { id: 'process', label: 'Process' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Hidden SVG Gooey Filter Definition */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="dock-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
        <div
          className="flex items-center gap-1.5 px-2.5 py-2 rounded-full bg-[#0e0f13]/85 border border-white/15 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
          style={{ filter: 'url(#dock-goo)' }}
        >
          {/* Section Quick-Jumps (only in Site mode) */}
          {viewMode === 'site' && (
            <div className="hidden sm:flex items-center gap-1 pr-1.5 border-r border-white/10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    cosmicAudio.playTick();
                    onScrollTo(item.id);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-mono text-[#e9e7e1]/75 hover:text-white hover:bg-white/10 transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Dual Mode Switcher: ?v=site vs ?v=3d */}
          <div className="flex items-center bg-black/60 rounded-full p-0.5 border border-white/10">
            <button
              onClick={() => {
                cosmicAudio.playTick();
                onChangeViewMode('site');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all ${
                viewMode === 'site'
                  ? 'bg-[#e9e7e1] text-black font-semibold'
                  : 'text-[#e9e7e1]/65 hover:text-white'
              }`}
              title="Clean Editorial Portfolio (?v=site)"
            >
              <LayoutGrid size={12} />
              <span>Site</span>
            </button>
            <button
              onClick={() => {
                cosmicAudio.playTick();
                onChangeViewMode('3d');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all ${
                viewMode === '3d'
                  ? 'bg-[#ff9d42] text-black font-semibold'
                  : 'text-[#e9e7e1]/65 hover:text-white'
              }`}
              title="Immersive 3D WebGL Story (?v=3d)"
            >
              <Sparkles size={12} />
              <span>3D Story</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-full border transition-all ${
              isSoundActive
                ? 'bg-[#ff9d42]/20 border-[#ff9d42]/50 text-[#ff9d42]'
                : 'bg-white/5 border-white/10 text-[#e9e7e1]/65 hover:text-white'
            }`}
            aria-label={isSoundActive ? 'Mute audio' : 'Enable audio'}
            title={isSoundActive ? 'Mute ambient audio' : 'Enable ambient audio'}
          >
            {isSoundActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>
      </div>
    </>
  );
}


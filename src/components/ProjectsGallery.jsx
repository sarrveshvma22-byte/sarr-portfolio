import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Terminal, Activity, Eye } from 'lucide-react';
import { selectedProjects } from '../data/portfolioData';
import { sound } from '../utils/AudioEngine';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsGallery({ onSelectProject }) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const galleryRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.project-panel');
      if (panels.length === 0) return;

      // Pin and create horizontal scroll scrub
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: galleryRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${galleryRef.current.offsetWidth * 2.5}`,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (panels.length - 1));
            setCurrentProjectIndex(index);
          },
        },
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    sound.playClick();
    setCurrentProjectIndex((prev) => Math.min(prev + 1, selectedProjects.length - 1));
  };

  const handlePrev = () => {
    sound.playClick();
    setCurrentProjectIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section
      id="projects"
      ref={galleryRef}
      className="relative min-h-screen w-full bg-[#121111] overflow-hidden flex flex-col justify-between py-12 px-6 md:px-12 border-t border-[#F5E7DF]/10"
    >
      {/* Top Gallery Header Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/10 mb-2">
            <Sparkles size={13} className="text-[#FE3303]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F5E7DF]/80">
              03 // SELECTED WORKS
            </span>
          </div>
          <h2 className="font-['Cabinet_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5E7DF]">
            FEATURED PROJECTS
          </h2>
        </div>

        {/* Counter & Navigation Controls */}
        <div className="flex items-center gap-4">
          <div className="font-mono text-sm tracking-widest text-[#F5E7DF]/60">
            <span className="text-[#FE3303] font-bold">0{currentProjectIndex + 1}</span> / 0{selectedProjects.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentProjectIndex === 0}
              onMouseEnter={() => sound.playHover()}
              className="p-3 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/20 text-[#F5E7DF] disabled:opacity-30 disabled:pointer-events-none hover:border-[#FF7B00] transition-colors"
              aria-label="Previous project"
              data-cursor="PREV"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentProjectIndex === selectedProjects.length - 1}
              onMouseEnter={() => sound.playHover()}
              className="p-3 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/20 text-[#F5E7DF] disabled:opacity-30 disabled:pointer-events-none hover:border-[#FF7B00] transition-colors"
              aria-label="Next project"
              data-cursor="NEXT"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Slides Container */}
      <div
        ref={scrollContainerRef}
        className="relative w-full flex-1 flex items-center transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentProjectIndex * 100}%)`,
        }}
      >
        {selectedProjects.map((project, idx) => (
          <div
            key={project.id}
            className="project-panel w-full flex-shrink-0 flex items-center justify-center p-2 sm:p-4"
          >
            <div className="max-w-6xl w-full rounded-3xl bg-[#1E1D1D]/90 border border-[#F5E7DF]/15 backdrop-blur-xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.6)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 transition-all duration-500 hover:border-[#FE3303]/40">
              {/* Left Column: Project Info */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${project.accent}20`,
                      color: project.accent,
                      border: `1px solid ${project.accent}40`,
                    }}
                  >
                    {project.badge}
                  </span>
                  <span className="font-mono text-xs text-[#F5E7DF]/50">{project.year}</span>
                </div>

                <div>
                  <h3 className="font-['Cabinet_Grotesk'] text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F5E7DF]">
                    {project.title}
                  </h3>
                  <p className="font-['Satoshi'] text-lg sm:text-xl font-light text-[#FF7B00] mt-1">
                    {project.subtitle}
                  </p>
                </div>

                <p className="font-['Satoshi'] text-sm sm:text-base text-[#F5E7DF]/80 leading-relaxed">
                  {project.summary}
                </p>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-xl bg-[#121111] border border-[#F5E7DF]/10">
                      <div
                        className="font-['Cabinet_Grotesk'] text-lg sm:text-xl font-bold tabular-nums"
                        style={{ color: project.accent }}
                      >
                        {m.value}
                      </div>
                      <div className="font-mono text-[10px] text-[#F5E7DF]/60 uppercase mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-full bg-[#121111] border border-[#F5E7DF]/10 font-mono text-[11px] text-[#F5E7DF]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Inspect Button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectProject(project);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FE3303] to-[#FF7B00] text-[#121111] font-['Cabinet_Grotesk'] text-xs font-extrabold uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_30px_rgba(254,51,3,0.35)] flex items-center gap-2 transform hover:-translate-y-0.5"
                    data-cursor="INSPECT"
                  >
                    <Eye size={16} />
                    <span>Explore Case Study</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Preview Canvas / Cyber Schematic */}
              <div
                onClick={() => {
                  sound.playClick();
                  onSelectProject(project);
                }}
                className="lg:col-span-5 aspect-square sm:aspect-video lg:aspect-square rounded-2xl bg-[#121111] border border-[#F5E7DF]/10 p-6 flex flex-col justify-between relative group cursor-pointer overflow-hidden"
                data-cursor="OPEN"
              >
                {/* Decorative circuit grid backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(#F5E7DF_1px,transparent_1px)] [background-size:16px_16px] opacity-10 group-hover:opacity-20 transition-opacity" />

                {/* Header of preview */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#FF7B00] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF7B00] animate-ping" />
                    LIVE TELEMETRY
                  </span>
                  <span className="font-mono text-xs text-[#F5E7DF]/40">SCHEMATIC v2.4</span>
                </div>

                {/* Center visual: Cyber Geometric Nodes */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                  <div
                    className="w-28 h-28 rounded-full border-2 border-dashed p-3 flex items-center justify-center animate-[spin_20s_linear_infinite] group-hover:border-[#FE3303] transition-colors"
                    style={{ borderColor: `${project.accent}80` }}
                  >
                    <div
                      className="w-20 h-20 rounded-2xl p-1 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${project.accent}, #1E1D1D)`,
                      }}
                    >
                      <div className="w-full h-full bg-[#121111] rounded-2xl flex items-center justify-center">
                        <Terminal size={32} style={{ color: project.accent }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 font-mono text-xs text-[#F5E7DF]/80">
                    CLICK TO EXPAND SPECIFICATIONS
                  </div>
                </div>

                {/* Footer of preview */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-[#F5E7DF]/50 border-t border-[#F5E7DF]/10 pt-3">
                  <span>ID: {project.id}</span>
                  <span className="text-[#FE3303] group-hover:translate-x-1 transition-transform">
                    VIEW DETAILS →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Hint */}
      <div className="max-w-7xl mx-auto w-full pt-4 flex items-center justify-between font-mono text-xs text-[#F5E7DF]/40 border-t border-[#F5E7DF]/5">
        <span>HORIZONTAL EXHIBITION // PINNED SCROLL TRIGGER</span>
        <span>DRAG OR USE ARROW BUTTONS TO SWITCH</span>
      </div>
    </section>
  );
}


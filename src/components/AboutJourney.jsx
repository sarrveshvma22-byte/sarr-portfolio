import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, CheckCircle2, Cpu, Factory, Orbit } from 'lucide-react';
import { journeyStages } from '../data/portfolioData';
import { sound } from '../utils/AudioEngine';

gsap.registerPlugin(ScrollTrigger);

export default function AboutJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create pinned scrolltrigger for sequential story unmasking
      const totalStages = journeyStages.length;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalStages * 900}`,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * totalStages),
            totalStages - 1
          );
          setActiveStage(index);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stageIcons = [Cpu, Factory, Orbit];
  const stage = journeyStages[activeStage];
  const CurrentIcon = stageIcons[activeStage];

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#121111] text-[#F5E7DF] flex flex-col justify-center px-6 md:px-12 py-20 overflow-hidden border-t border-[#F5E7DF]/10"
    >
      {/* Background kinetic watermark numeral */}
      <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none font-['Cabinet_Grotesk'] text-[32vw] md:text-[28vw] font-black leading-none text-[#F5E7DF]/[0.03] transition-all duration-700">
        {stage.step}
      </div>

      {/* Atmospheric dynamic gradient aura keyed to stage accent */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 -top-20 -left-20 opacity-30"
        style={{
          background: `radial-gradient(circle, ${stage.accent} 0%, transparent 70%)`,
        }}
      />

      <div ref={containerRef} className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/10 mb-3">
              <Sparkles size={13} className="text-[#FF7B00]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#F5E7DF]/80">
                01 // THE JOURNEY & EVOLUTION
              </span>
            </div>
            <h2 className="font-['Cabinet_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5E7DF]">
              MY ODYSSEY
            </h2>
          </div>

          {/* Interactive Stage Selectors / Stepper Tabs */}
          <div className="flex items-center gap-2 bg-[#1E1D1D]/80 p-1.5 rounded-2xl border border-[#F5E7DF]/10 backdrop-blur-md">
            {journeyStages.map((stg, idx) => {
              const isActive = idx === activeStage;
              return (
                <button
                  key={stg.step}
                  onClick={() => {
                    sound.playClick();
                    setActiveStage(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 focus:outline-none ${
                    isActive
                      ? 'bg-[#FE3303] text-[#121111] font-bold shadow-[0_0_20px_rgba(254,51,3,0.4)]'
                      : 'text-[#F5E7DF]/60 hover:text-[#F5E7DF] hover:bg-[#252424]'
                  }`}
                  data-cursor="STAGE"
                >
                  <span>{stg.step}</span>
                  <span className="hidden sm:inline">{stg.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Stage Card */}
        <div className="relative rounded-3xl bg-[#1E1D1D]/80 border border-[#F5E7DF]/15 backdrop-blur-xl p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden">
          {/* Accent top border strip */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-700"
            style={{ backgroundColor: stage.accent }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${stage.accent}20`,
                    color: stage.accent,
                    border: `1px solid ${stage.accent}40`,
                  }}
                >
                  {stage.tag}
                </span>
                <span className="font-mono text-xs text-[#F5E7DF]/50">{stage.period}</span>
              </div>

              <h3 className="font-['Cabinet_Grotesk'] text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F5E7DF]">
                {stage.title}
              </h3>

              <p className="font-['Satoshi'] text-lg sm:text-xl font-medium text-[#FF7B00]">
                {stage.subtitle}
              </p>

              <p className="font-['Satoshi'] text-base sm:text-lg text-[#F5E7DF]/80 leading-relaxed">
                {stage.description}
              </p>

              {/* Bullet points */}
              <div className="space-y-3 pt-2">
                {stage.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-1 flex-shrink-0"
                      style={{ color: stage.accent }}
                    />
                    <span className="font-['Satoshi'] text-sm sm:text-base text-[#F5E7DF]/90">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual / Metrics Showcase Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Feature Box with Icon & Interactive Glow */}
              <div className="relative p-8 rounded-2xl bg-[#121111]/80 border border-[#F5E7DF]/10 flex flex-col items-center text-center group">
                <div
                  className="w-20 h-20 rounded-2xl p-0.5 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${stage.accent}, #F5E7DF)`,
                  }}
                >
                  <div className="w-full h-full bg-[#121111] rounded-2xl flex items-center justify-center">
                    <CurrentIcon size={36} style={{ color: stage.accent }} />
                  </div>
                </div>

                <div className="font-['Cabinet_Grotesk'] text-xl font-bold uppercase text-[#F5E7DF] mb-1">
                  STAGE MILESTONE
                </div>
                <div className="font-mono text-xs text-[#F5E7DF]/60 uppercase tracking-widest">
                  {stage.tag}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                {stage.stats.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl bg-[#121111]/70 border border-[#F5E7DF]/10 text-center"
                  >
                    <div
                      className="font-['Cabinet_Grotesk'] text-xl sm:text-2xl font-black tabular-nums"
                      style={{ color: stage.accent }}
                    >
                      {st.value}
                    </div>
                    <div className="font-mono text-[10px] sm:text-xs text-[#F5E7DF]/60 mt-1 uppercase">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import DottedPortrait from './DottedPortrait';
import EngineeringProcess from './EngineeringProcess';
import { personalInfo, works, services } from '../data/storyData';
import { journeyStages } from '../data/portfolioData';
import { cosmicAudio } from '../utils/CosmicAudio';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function SiteView({ onSelectWork, onEnter3D, onScrollTo }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    cosmicAudio.playTick();
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="relative z-10 min-h-screen bg-[#0a0a0a] text-[#e9e7e1] pb-28">
      {/* Top Editorial Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              cosmicAudio.playTick();
              onScrollTo('overview');
            }}
            className="inline-flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase text-white"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff9d42] animate-pulse" />
            <span>{personalInfo.name}</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-[#e9e7e1]/65">
            <button
              onClick={() => {
                cosmicAudio.playTick();
                onScrollTo('process');
              }}
              className="hover:text-white transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => {
                cosmicAudio.playTick();
                onScrollTo('work');
              }}
              className="hover:text-white transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => {
                cosmicAudio.playTick();
                onScrollTo('capabilities');
              }}
              className="hover:text-white transition-colors"
            >
              Capabilities
            </button>
            <button
              onClick={() => {
                cosmicAudio.playTick();
                onScrollTo('contact');
              }}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </nav>

          <button
            onClick={() => {
              cosmicAudio.playTick();
              onEnter3D();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff9d42]/15 border border-[#ff9d42]/45 text-[#ff9d42] font-mono text-[11px] uppercase tracking-wider hover:bg-[#ff9d42] hover:text-black transition-all"
          >
            <Sparkles size={12} />
            <span>3D Story</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* 01 // HERO SECTION */}
        <section id="overview" className="pt-14 sm:pt-24 pb-20 sm:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] uppercase tracking-widest text-[#e9e7e1]/75">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{personalInfo.currentRole}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.08]">
              Embedded silicon, industrial automation &amp;{' '}
              <span className="text-[#ff9d42]">3D web systems.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#e9e7e1]/75 font-light leading-relaxed max-w-xl">
              I&apos;m <strong className="font-normal text-white">{personalInfo.name}</strong>, an Electronics &amp; Instrumentation engineer in {personalInfo.location}. I design custom PCBs, write deterministic Embedded C firmware, and build real-time WebGL digital twins.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  cosmicAudio.playTick();
                  onScrollTo('work');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e9e7e1] text-black font-mono text-xs font-medium uppercase tracking-wider hover:bg-[#ff9d42] transition-colors"
              >
                <span>Explore Selected Work</span>
                <ArrowUpRight size={15} />
              </button>

              <button
                onClick={() => {
                  cosmicAudio.playTick();
                  onEnter3D();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-[#e9e7e1] font-mono text-xs uppercase tracking-wider hover:border-[#ff9d42]/60 hover:text-white transition-all"
              >
                <Sparkles size={14} className="text-[#ff9d42]" />
                <span>Experience 3D Story</span>
              </button>
            </div>

            {/* Quick Telemetry Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <div className="font-mono text-xl sm:text-2xl text-white font-light">8.26</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#e9e7e1]/45 mt-1">
                  B.Tech CGPA (PTU)
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl text-[#ff9d42] font-light">&lt; 2.0s</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#e9e7e1]/45 mt-1">
                  IoT Telemetry
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl text-white font-light">60 FPS</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#e9e7e1]/45 mt-1">
                  WebGL / Three.js
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <DottedPortrait />
          </div>
        </section>

        {/* 02 // 6-STAGE ENGINEERING PROCESS */}
        <EngineeringProcess />

        {/* 03 // SELECTED WORK */}
        <section id="work" className="py-24 sm:py-32 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42] block mb-3">
                03 // SELECTED SYSTEMS
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
                Built under real-world constraints.
              </h2>
            </div>
            <p className="text-sm text-[#e9e7e1]/60 max-w-md font-light">
              Click any system below to inspect its hardware architecture, latency metrics, and engineering blueprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {works.map((work, idx) => (
              <article
                key={work.id}
                onClick={() => {
                  cosmicAudio.playTick();
                  onSelectWork(work);
                }}
                className="group cursor-pointer p-7 sm:p-8 rounded-3xl bg-[#0e0f13]/90 border border-white/10 hover:border-[#ff9d42]/50 transition-all duration-300 flex flex-col justify-between gap-6 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#e9e7e1]/50">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#ff9d42]">
                      0{idx + 1} // {work.badge}
                    </span>
                    <span>{work.year}</span>
                  </div>

                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-[#e9e7e1]/50 mb-1.5">
                      {work.tag}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-[#ff9d42] transition-colors">
                      {work.name}
                    </h3>
                  </div>

                  <p className="text-sm text-[#e9e7e1]/75 font-light leading-relaxed">
                    {work.line}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-3">
                    {work.stats.slice(0, 2).map((st, i) => (
                      <div key={i} className="p-3 rounded-xl bg-black/50 border border-white/5">
                        <div className="font-mono text-sm text-[#ff9d42]">{st.value}</div>
                        <div className="font-mono text-[10px] uppercase text-[#e9e7e1]/45 mt-0.5">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between font-mono text-xs text-[#e9e7e1]/70 group-hover:text-white">
                    <span className="truncate pr-4">{work.made}</span>
                    <span className="inline-flex items-center gap-1 shrink-0 text-[#ff9d42]">
                      Blueprint <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 04 // CAPABILITIES & JOURNEY */}
        <section id="capabilities" className="py-24 sm:py-32 border-t border-white/10 space-y-20">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42] block mb-3">
              04 // CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-12">
              {services.lead}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.items.map((srv, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-[#0e0f13]/80 border border-white/10 space-y-3"
                >
                  <div className="font-mono text-xs text-[#ff9d42]">0{idx + 1}</div>
                  <h3 className="text-xl font-light text-white">{srv.what}</h3>
                  <p className="text-sm text-[#e9e7e1]/70 font-light leading-relaxed">
                    {srv.how}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {journeyStages.map((stage) => (
              <div
                key={stage.step}
                className="p-6 rounded-3xl bg-black/50 border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-[#e9e7e1]/50">
                  <span className="text-[#ff9d42]">STEP {stage.step}</span>
                  <span>{stage.period}</span>
                </div>
                <h4 className="text-lg font-light text-white">{stage.title}</h4>
                <p className="text-xs text-[#e9e7e1]/65 font-light leading-relaxed">
                  {stage.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 // CONTACT & FOOTER */}
        <section id="contact" className="py-24 sm:py-28 border-t border-white/10">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0e0f13] border border-white/10 flex flex-col lg:flex-row justify-between gap-10">
            <div className="space-y-4 max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42] block">
                05 // GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
                Let&apos;s build something physical &amp; unforgettable.
              </h2>
              <p className="text-sm text-[#e9e7e1]/70 font-light">
                {personalInfo.available} · {personalInfo.replies}
              </p>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#e9e7e1]/55 pt-2">
                <MapPin size={14} className="text-[#ff9d42]" />
                <span>
                  {personalInfo.location} ({personalInfo.coordinates})
                </span>
              </div>
            </div>

            <div className="space-y-3 min-w-[280px]">
              {/* Copy Email */}
              <button
                onClick={() => handleCopy(personalInfo.email, 'email')}
                className="w-full p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-[#ff9d42]/50 flex items-center justify-between gap-4 transition-all text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={16} className="text-[#ff9d42] shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-white truncate">
                    {personalInfo.email}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#e9e7e1]/60 shrink-0 inline-flex items-center gap-1">
                  {copiedField === 'email' ? (
                    <>
                      <Check size={13} className="text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy
                    </>
                  )}
                </span>
              </button>

              {/* Copy Phone */}
              <button
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                className="w-full p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-[#ff9d42]/50 flex items-center justify-between gap-4 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#ff9d42] shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-white">
                    {personalInfo.phone}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#e9e7e1]/60 shrink-0 inline-flex items-center gap-1">
                  {copiedField === 'phone' ? (
                    <>
                      <Check size={13} className="text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy
                    </>
                  )}
                </span>
              </button>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cosmicAudio.playTick()}
                  className="flex-1 py-3 px-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center gap-2 font-mono text-xs text-white transition-all"
                >
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cosmicAudio.playTick()}
                  className="flex-1 py-3 px-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center gap-2 font-mono text-xs text-white transition-all"
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#e9e7e1]/45">
            <span>© {new Date().getFullYear()} {personalInfo.name} · Engineered in Puducherry</span>
            <span>Dual Mode: ?v=site &amp; ?v=3d</span>
          </footer>
        </section>
      </main>
    </div>
  );
}


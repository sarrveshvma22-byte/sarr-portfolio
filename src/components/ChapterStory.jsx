import React, { useState } from 'react';
import { chapters, works, services, personalInfo } from '../data/storyData';
import { cosmicAudio } from '../utils/CosmicAudio';
import { ArrowUpRight, Send, Check, Terminal, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ChapterStory({ onSelectWork }) {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    cosmicAudio.playTick();
    setFormSent(true);
    cosmicAudio.playChime();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ffffff', '#ff9d42', '#7a3eff'],
    });

    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 6000);
  };

  return (
    <div className="relative z-10 w-full text-[#e9e7e1] select-text">
      {/* ---------------- CHAPTER 01: GROUND ---------------- */}
      <section
        id="ground"
        className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-32 max-w-5xl mx-auto"
      >
        <div className="chapter">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1]/50">
            01 / DREAM
          </span>
        </div>

        <div className="space-y-6 mt-6">
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            A long time ago, my curiosity was physical.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#e9e7e1]/80 leading-relaxed">
            I wanted to understand how invisible electrons bring machines to life.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#e9e7e1]/60 leading-relaxed">
            At Puducherry Technological University, it began with bare copper, op-amps, and breadboards.
          </p>
        </div>

        <div className="mt-16 flex items-center gap-3 font-mono text-xs text-[#e9e7e1]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff9d42]" />
          <span>SCROLL TO PROCEED INTO THE DRIFT</span>
        </div>
      </section>

      {/* ---------------- CHAPTER 02: ADRIFT ---------------- */}
      <section
        id="adrift"
        className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-32 max-w-5xl mx-auto"
      >
        <div className="chapter">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1]/50">
            02 / DIG
          </span>
        </div>

        <div className="space-y-6 mt-6">
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            In textbooks, signals are ideal square waves.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#e9e7e1]/80 leading-relaxed">
            In reality, wires have inductance, sensors drift with temperature, and noise is everywhere.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#e9e7e1]/60 leading-relaxed">
            I learned to embrace the imperfections of the physical plane.
          </p>
        </div>
      </section>

      {/* ---------------- CHAPTER 03: THE PUSH ---------------- */}
      <section
        id="push"
        className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-32 max-w-5xl mx-auto"
      >
        <div className="chapter">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1]/50">
            03 / DECODE
          </span>
        </div>

        <div className="space-y-6 mt-6">
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Stepping onto active industrial factory floors.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#e9e7e1]/80 leading-relaxed">
            At Emox Manufacturing and GT Electronic, I wired 24V control panels, calibrated 4-20mA pressure transmitters, and tested PLC relays.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#e9e7e1]/60 leading-relaxed">
            Engineering ceased to be an academic exercise. It was about zero failure tolerances.
          </p>
        </div>
      </section>

      {/* ---------------- CHAPTER 04: THE BLACK HOLE ---------------- */}
      <section
        id="hole"
        className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-32 max-w-5xl mx-auto"
      >
        <div className="chapter">
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42]">
            04 / DIRECT // THE CONVERGENCE
          </span>
        </div>

        <div className="space-y-6 mt-6">
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            The deeper I go, the more the boundaries dissolve.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#e9e7e1]/80 leading-relaxed">
            Silicon registers shape communication packets. Radio waves feed database queries.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#e9e7e1]/60 leading-relaxed">
            And raw telemetry transforms into cinematic 3D digital realities.
          </p>
        </div>

        {/* Orbiting Disciplines Cluster */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#e9e7e1]/40 block mb-4">
            ORBITING DISCIPLINES IN RESONANCE
          </span>
          <div className="flex flex-wrap gap-3">
            {[
              'Hardware Design.',
              'Embedded C.',
              'PLC Automation.',
              'IoT Mesh & MQTT.',
              'Three.js & WebGL.',
              'VLSI & Circuits.',
              'Digital Twins.',
            ].map((disc, idx) => (
              <span
                key={idx}
                onMouseEnter={() => cosmicAudio.playHover()}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 font-mono text-xs tracking-wider text-[#e9e7e1]/80 hover:text-white hover:border-[#ff9d42] transition-colors cursor-default"
              >
                {disc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CHAPTER 05: SLINGSHOT ---------------- */}
      <section
        id="sling"
        className="min-h-[70vh] w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-24 max-w-5xl mx-auto"
      >
        <div className="chapter">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1]/50">
            05 / PROPEL // SLINGSHOT
          </span>
        </div>

        <div className="mt-6">
          <p className="font-['Timeless_Sans_Grotesk',sans-serif] text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
            Accelerating through gravitational pull.
          </p>
          <p className="font-mono text-xs text-[#e9e7e1]/50 mt-4 uppercase tracking-widest">
            WARP ACCELERATION // SPEED, STABILITY, AND ELEGANCE
          </p>
        </div>
      </section>

      {/* ---------------- CHAPTER 06: PIECES OF A WORLD (WORKS) ---------------- */}
      <section
        id="pieces"
        className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-32 max-w-6xl mx-auto"
      >
        <div className="chapter mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42]">
            06 / DRAFT // PIECES OF A WORLD
          </span>
        </div>

        <div className="mb-14">
          <h2 className="font-['Timeless_Sans_Grotesk',sans-serif] text-4xl sm:text-6xl font-light tracking-tight text-white mb-4">
            Works & Systems Built.
          </h2>
          <p className="font-['Timeless_Sans_Grotesk',sans-serif] text-xl sm:text-2xl font-light text-[#e9e7e1]/70 max-w-3xl">
            I don't collect technologies just to list them on a resume. I build systems that solve real human and industrial problems.
          </p>
        </div>

        {/* Curated Works Showcase */}
        <div className="space-y-12">
          {works.map((work) => (
            <div
              key={work.id}
              onClick={() => onSelectWork(work)}
              onMouseEnter={() => cosmicAudio.playHover()}
              className="p-8 sm:p-12 rounded-3xl bg-[#0e0f13]/80 border border-white/10 hover:border-[#ff9d42]/60 transition-all duration-300 cursor-pointer group shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42]">
                  {work.tag}
                </span>
                <span className="font-mono text-xs text-[#e9e7e1]/40">
                  {work.year} // {work.badge}
                </span>
              </div>

              <h3 className="font-['Timeless_Sans_Grotesk',sans-serif] text-3xl sm:text-4xl font-light text-white group-hover:text-[#ff9d42] transition-colors mb-2">
                {work.name}
              </h3>

              <p className="font-['Timeless_Sans_Grotesk',sans-serif] text-base sm:text-lg text-[#e9e7e1]/80 leading-relaxed font-light mb-6">
                {work.line}
              </p>

              <div className="font-mono text-xs text-[#e9e7e1]/60 bg-[#000000]/60 p-4 rounded-xl border border-white/5 mb-6">
                {work.made}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-xs">
                <span className="text-[#e9e7e1]/40">VIEW TECHNICAL CASE STUDY</span>
                <span className="text-[#ff9d42] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>INSPECT BLUEPRINT</span>
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CHAPTER 07: THE DARK ---------------- */}
      <section
        id="dark"
        className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-32 max-w-5xl mx-auto"
      >
        <div className="chapter">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1]/50">
            07 / REFLECT // THE DARK
          </span>
        </div>

        <div className="space-y-6 mt-6">
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            You don't need all the answers before you begin soldering.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#e9e7e1]/80 leading-relaxed">
            You just need the discipline to test one trace at a time, measure with the oscilloscope, and keep building.
          </p>
        </div>
      </section>

      {/* ---------------- CHAPTER 08: THE SURFACE ---------------- */}
      <section
        id="surface"
        className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-32 max-w-5xl mx-auto"
      >
        <div className="chapter">
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42]">
            08 / DROP // THE SURFACE
          </span>
        </div>

        <div className="space-y-6 mt-6">
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            Purpose isn't stumbled upon. It is engineered with daily dedication.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#e9e7e1]/80 leading-relaxed">
            At Schopiq Automation, I push hardware R&D, multi-layer PCBs, and embedded systems to their limits.
          </p>
          <p className="line font-['Timeless_Sans_Grotesk',sans-serif] text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#e9e7e1]/60 leading-relaxed">
            Touching still water at dawn.
          </p>
        </div>
      </section>

      {/* ---------------- CHAPTER 09: HOME ---------------- */}
      <section
        id="home"
        className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 py-32 max-w-6xl mx-auto border-t border-white/10"
      >
        <div className="chapter mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42]">
            09 / ARRIVE // HOME
          </span>
        </div>

        <div className="mb-16">
          <h2 className="font-['Timeless_Sans_Grotesk',sans-serif] text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-4">
            This is Sarrvesh M.
          </h2>
          <p className="font-['Timeless_Sans_Grotesk',sans-serif] text-xl sm:text-2xl font-light text-[#e9e7e1]/80 max-w-2xl">
            I design the hardware and I write the code. Nothing gets lost in handoff.
          </p>
        </div>

        {/* Services / Capabilities Grid */}
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-[#e9e7e1]/40 block mb-6">
            CAPABILITIES & DOMAINS
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.items.map((svc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0e0f13]/60 border border-white/10 space-y-2"
              >
                <h4 className="font-mono text-sm uppercase tracking-wider text-white">
                  {svc.what}
                </h4>
                <p className="font-['Timeless_Sans_Grotesk',sans-serif] text-sm text-[#e9e7e1]/70 leading-relaxed font-light">
                  {svc.how}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transmission Terminal / Contact Form */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e0f13]/80 border border-white/15 max-w-3xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42] flex items-center gap-2">
              <Terminal size={14} />
              <span>DIRECT ENCRYPTED TRANSMISSION</span>
            </span>
            <span className="font-mono text-[10px] text-[#e9e7e1]/40">
              PUDUCHERRY [11.94°N, 79.80°E]
            </span>
          </div>

          {formSent ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/10 text-[#ff9d42] flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <h4 className="font-['Timeless_Sans_Grotesk',sans-serif] text-2xl font-light text-white">
                Transmission Received
              </h4>
              <p className="font-mono text-xs text-[#e9e7e1]/60">
                Sarrvesh will review your message and reply promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] uppercase text-[#e9e7e1]/50 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-white/20 font-mono text-xs focus:outline-none focus:border-[#ff9d42] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase text-[#e9e7e1]/50 block mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@computing.org"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-white/20 font-mono text-xs focus:outline-none focus:border-[#ff9d42] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase text-[#e9e7e1]/50 block mb-1">
                  Message / Transmission
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Sarrvesh, we would love to discuss a hardware R&D role or creative technology project..."
                  className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white placeholder-white/20 font-mono text-xs focus:outline-none focus:border-[#ff9d42] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white text-black font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#ff9d42] transition-colors flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>Transmit Message</span>
              </button>
            </form>
          )}

          <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#e9e7e1]/60">
            <div>
              <span>DIRECT EMAIL: </span>
              <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-[#ff9d42]">
                {personalInfo.email}
              </a>
            </div>
            <div>
              <span>PHONE: </span>
              <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-[#ff9d42]">
                {personalInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#e9e7e1]/40">
          <div>© 2026 SARRVESH M • PUDUCHERRY, INDIA</div>
          <div>SCROLL STORY • INSPIRED BY JEHADUDDIN.VERCEL.APP</div>
          <button
            onClick={() => {
              cosmicAudio.playTick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white transition-colors"
          >
            [ BACK TO START ↑ ]
          </button>
        </div>
      </section>
    </div>
  );
}


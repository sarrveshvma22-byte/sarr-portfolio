import React from 'react';
import { Briefcase, GraduationCap, CheckCircle2, Calendar, MapPin, Award } from 'lucide-react';
import { experienceTimeline, educationHistory } from '../data/portfolioData';
import { sound } from '../utils/AudioEngine';

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="relative min-h-screen w-full bg-[#121111] py-24 px-6 md:px-12 border-t border-[#F5E7DF]/10 text-[#F5E7DF]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/10 mb-3">
              <Briefcase size={13} className="text-[#FF7B00]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#F5E7DF]/80">
                05 // INDUSTRY TRAJECTORY & ACADEMICS
              </span>
            </div>
            <h2 className="font-['Cabinet_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5E7DF]">
              EXPERIENCE & ROOTS
            </h2>
          </div>

          <p className="max-w-md font-['Satoshi'] text-sm sm:text-base text-[#F5E7DF]/70">
            From rigorous academic foundations at Puducherry Technological University to high-stakes industrial factory lines and hardware R&D.
          </p>
        </div>

        {/* Dual Column Grid: Left Industrial Experience, Right Academic Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Professional & Internship Experience */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-['Cabinet_Grotesk'] text-2xl font-bold uppercase tracking-wide text-[#F5E7DF] flex items-center gap-3">
              <Briefcase size={20} className="text-[#FE3303]" />
              <span>Industrial & Engineering Experience</span>
            </h3>

            <div className="space-y-6">
              {experienceTimeline.map((item, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => sound.playHover()}
                  className="relative p-6 sm:p-8 rounded-2xl bg-[#1E1D1D]/70 border border-[#F5E7DF]/10 hover:border-[#FF7B00]/40 transition-all duration-300 group"
                  data-cursor="EXP"
                >
                  {/* Accent left indicator */}
                  <div
                    className="absolute top-6 bottom-6 left-0 w-1 rounded-r-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase"
                      style={{
                        backgroundColor: `${item.color}20`,
                        color: item.color,
                        border: `1px solid ${item.color}40`,
                      }}
                    >
                      {item.type}
                    </span>
                    <span className="font-mono text-xs text-[#F5E7DF]/50 flex items-center gap-1">
                      <Calendar size={12} />
                      {item.period}
                    </span>
                  </div>

                  <h4 className="font-['Cabinet_Grotesk'] text-xl sm:text-2xl font-black text-[#F5E7DF] group-hover:text-[#FF7B00] transition-colors">
                    {item.role}
                  </h4>

                  <div className="font-mono text-xs text-[#F5E7DF]/80 flex items-center gap-2 mt-1 mb-4">
                    <span className="font-bold text-[#F5E7DF]">{item.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#F5E7DF]/60">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                  </div>

                  <p className="font-['Satoshi'] text-sm sm:text-base text-[#F5E7DF]/80 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#F5E7DF]/10">
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5E7DF]/70">
                        <CheckCircle2 size={15} className="mt-0.5 text-[#FF7B00] flex-shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Academic History & Honors */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="font-['Cabinet_Grotesk'] text-2xl font-bold uppercase tracking-wide text-[#F5E7DF] flex items-center gap-3">
              <GraduationCap size={20} className="text-[#C344B5]" />
              <span>Academic Credentials</span>
            </h3>

            <div className="space-y-6">
              {educationHistory.map((edu, eIdx) => (
                <div
                  key={eIdx}
                  onMouseEnter={() => sound.playHover()}
                  className="p-6 rounded-2xl bg-[#1E1D1D]/70 border border-[#F5E7DF]/10 hover:border-[#C344B5]/40 transition-all group"
                  data-cursor="EDU"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[#C344B5] font-bold">
                      {edu.period}
                    </span>
                    <span className="font-['Cabinet_Grotesk'] text-sm font-black px-2.5 py-0.5 rounded-full bg-[#121111] border border-[#F5E7DF]/10 text-[#FF7B00]">
                      {edu.grade}
                    </span>
                  </div>

                  <h4 className="font-['Cabinet_Grotesk'] text-lg font-bold text-[#F5E7DF] group-hover:text-[#C344B5] transition-colors">
                    {edu.degree}
                  </h4>

                  <div className="font-mono text-xs text-[#F5E7DF]/70 mt-1 mb-3">
                    {edu.institution} • {edu.location}
                  </div>

                  <div className="flex items-start gap-2 text-xs font-['Satoshi'] text-[#F5E7DF]/60 bg-[#121111]/80 p-3 rounded-xl border border-[#F5E7DF]/5">
                    <Award size={14} className="mt-0.5 text-[#FF7B00] flex-shrink-0" />
                    <span>{edu.highlight}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Fact / Philosophy Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E1D1D] to-[#121111] border border-[#FE3303]/20 relative overflow-hidden">
              <div className="font-mono text-xs text-[#FE3303] uppercase tracking-widest font-bold mb-2">
                ENGINEERING PHILOSOPHY
              </div>
              <p className="font-['Satoshi'] text-sm text-[#F5E7DF]/90 italic leading-relaxed">
                "Hardware without elegant software is lifeless iron; software without grounded hardware is an ungrounded dream. True breakthroughs happen where real physical electrons meet dynamic digital creativity."
              </p>
              <div className="font-mono text-[10px] text-[#F5E7DF]/40 mt-3 text-right">
                — SARRVESH M
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


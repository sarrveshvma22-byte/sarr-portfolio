import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, ArrowRight, Activity, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { sound } from '../utils/AudioEngine';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    sound.playClick();

    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#121111]/90 backdrop-blur-2xl flex justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-300">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#1E1D1D] border border-[#F5E7DF]/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden my-auto text-[#F5E7DF]">
        {/* Top Accent Strip */}
        <div
          className="h-2 w-full"
          style={{
            background: `linear-gradient(90deg, ${project.accent}, #FF7B00, #C344B5)`,
          }}
        />

        {/* Modal Header Bar */}
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-[#F5E7DF]/10 bg-[#171616]">
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

          <button
            onClick={handleClose}
            onMouseEnter={() => sound.playHover()}
            className="p-2.5 rounded-full bg-[#121111] border border-[#F5E7DF]/20 hover:border-[#FE3303] hover:text-[#FE3303] transition-colors focus:outline-none"
            aria-label="Close Project Modal"
            data-cursor="CLOSE"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 md:p-14 space-y-12 max-h-[80vh] overflow-y-auto">
          {/* Main Title & Category */}
          <div>
            <div className="font-mono text-xs text-[#FF7B00] tracking-widest uppercase mb-2">
              PROJECT {project.number} // {project.category}
            </div>
            <h2 className="font-['Cabinet_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5E7DF] mb-4">
              {project.title}
            </h2>
            <p className="font-['Satoshi'] text-xl sm:text-2xl font-light text-[#F5E7DF]/80">
              {project.subtitle}
            </p>
          </div>

          {/* Key Engineering Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#121111] border border-[#F5E7DF]/10">
            {project.metrics.map((metric, mIdx) => (
              <div key={mIdx} className="text-center">
                <div
                  className="font-['Cabinet_Grotesk'] text-2xl sm:text-3xl font-black tabular-nums"
                  style={{ color: project.accent }}
                >
                  {metric.value}
                </div>
                <div className="font-mono text-xs text-[#F5E7DF]/60 mt-1 uppercase">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Hardware / Software Architecture Diagram */}
          <div className="p-6 rounded-2xl bg-[#121111]/80 border border-[#F5E7DF]/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF7B00]">
              <Layers size={14} />
              <span>SYSTEM ARCHITECTURE & DATA PIPELINE</span>
            </div>
            <div className="font-mono text-xs sm:text-sm text-[#F5E7DF]/90 bg-[#1E1D1D] p-4 rounded-xl border border-[#F5E7DF]/10 leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {project.architecture}
            </div>
          </div>

          {/* Project Overview */}
          <div className="space-y-4">
            <h3 className="font-['Cabinet_Grotesk'] text-2xl font-bold uppercase tracking-wide text-[#F5E7DF] flex items-center gap-2">
              <span className="w-2 h-6 bg-[#FE3303] rounded-full inline-block" />
              Project Overview & Problem Statement
            </h3>
            <p className="font-['Satoshi'] text-base sm:text-lg text-[#F5E7DF]/80 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="font-['Cabinet_Grotesk'] text-2xl font-bold uppercase tracking-wide text-[#F5E7DF] flex items-center gap-2">
              <span className="w-2 h-6 bg-[#FF7B00] rounded-full inline-block" />
              Core Capabilities & Key Features
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {project.keyFeatures.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#121111]/60 border border-[#F5E7DF]/5"
                >
                  <CheckCircle2 size={18} className="mt-0.5 text-[#FF7B00] flex-shrink-0" />
                  <span className="font-['Satoshi'] text-sm sm:text-base text-[#F5E7DF]/90">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Implementation & Process */}
          <div className="space-y-4">
            <h3 className="font-['Cabinet_Grotesk'] text-2xl font-bold uppercase tracking-wide text-[#F5E7DF] flex items-center gap-2">
              <span className="w-2 h-6 bg-[#C344B5] rounded-full inline-block" />
              Development Process & Engineering Highlights
            </h3>
            <div className="space-y-2">
              {project.technicalHighlights.map((hl, hIdx) => (
                <div
                  key={hIdx}
                  className="font-mono text-xs sm:text-sm text-[#F5E7DF]/80 p-3 rounded-lg bg-[#121111]/40 border-l-2 border-[#C344B5]"
                >
                  {hl}
                </div>
              ))}
            </div>
          </div>

          {/* Results & Achievements */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121111] via-[#1E1D1D] to-[#121111] border border-[#FE3303]/30 space-y-2">
            <div className="font-mono text-xs text-[#FE3303] uppercase tracking-widest font-bold">
              QUANTIFIABLE RESULTS & OUTCOMES
            </div>
            <p className="font-['Satoshi'] text-base sm:text-lg text-[#F5E7DF]/90 leading-relaxed">
              {project.results}
            </p>
          </div>

          {/* Technologies Stack Chips */}
          <div>
            <div className="font-mono text-xs text-[#F5E7DF]/50 uppercase tracking-widest mb-3">
              TECHNOLOGIES DEPLOYED
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3.5 py-1.5 rounded-full bg-[#121111] border border-[#F5E7DF]/15 font-mono text-xs text-[#F5E7DF]/90 hover:border-[#FF7B00] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-[#F5E7DF]/10 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121111] border border-[#F5E7DF]/20 text-[#F5E7DF] font-['Cabinet_Grotesk'] text-xs font-bold uppercase tracking-wider hover:border-[#FF7B00] hover:text-[#FF7B00] transition-colors"
                data-cursor="CODE"
              >
                <GithubIcon size={16} />
                <span>Source Repository</span>
              </a>

              <button
                onClick={() => {
                  sound.playSuccess();
                  alert(`Live telemetry / simulation view for ${project.title} active!`);
                }}
                onMouseEnter={() => sound.playHover()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF7B00] to-[#FE3303] text-[#121111] font-['Cabinet_Grotesk'] text-xs font-extrabold uppercase tracking-wider hover:opacity-90 transition-opacity"
                data-cursor="TELEMETRY"
              >
                <Activity size={16} />
                <span>Simulate Telemetry</span>
                <ExternalLink size={14} />
              </button>
            </div>

            <button
              onClick={handleClose}
              className="text-xs font-mono text-[#F5E7DF]/60 hover:text-[#F5E7DF] uppercase tracking-wider"
            >
              [ ESC to Close ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

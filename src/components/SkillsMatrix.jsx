import React, { useState, useRef } from 'react';
import {
  Cpu,
  Layers,
  ClipboardList,
  Binary,
  Sliders,
  Hammer,
  Code2,
  Wifi,
  Network,
  Timer,
  Bug,
  Workflow,
  Gauge,
  Boxes,
  Cog,
  Activity,
  MonitorPlay,
  Radio,
  GitFork,
  Database,
  Radar,
  Globe,
  Server,
  Box,
  Sparkles,
  Terminal,
  ScanLine,
  Volume2,
  Flame,
  AudioWaveform,
  SearchCheck,
  Crosshair,
  GitBranch,
  PenTool,
  Wrench,
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { sound } from '../utils/AudioEngine';

// Icon mapping dictionary
const iconMap = {
  Cpu,
  Layers,
  ClipboardList,
  Binary,
  Sliders,
  Hammer,
  Code2,
  Wifi,
  Network,
  Timer,
  Bug,
  Workflow,
  Gauge,
  Boxes,
  Cog,
  Activity,
  MonitorPlay,
  Radio,
  GitFork,
  Database,
  Radar,
  Globe,
  Server,
  Box,
  Sparkles,
  Terminal,
  ScanLine,
  Volume2,
  Flame,
  AudioWaveform,
  SearchCheck,
  Crosshair,
  GitBranch,
  PenTool,
  Wrench,
  Microchip: Cpu,
};

// Interactive 3D Tilt Card with spotlight gradient
function SkillCard({ skill, categoryColor }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const IconComponent = iconMap[skill.icon] || Cpu;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(`perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => sound.playHover()}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className="relative rounded-2xl bg-[#1E1D1D]/90 border border-[#F5E7DF]/10 p-6 transition-transform duration-200 ease-out hover:border-[#FF7B00]/50 hover:shadow-[0_15px_35px_rgba(255,123,0,0.15)] flex flex-col justify-between group overflow-hidden"
      data-cursor="SKILL"
    >
      {/* Dynamic Cursor Spotlight Radial Mask */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(280px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255, 123, 0, 0.22), transparent 80%)`,
        }}
      />

      <div>
        {/* Top Header: Icon & Level */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#121111] border border-[#F5E7DF]/10 flex items-center justify-center text-[#FF7B00] group-hover:text-[#FE3303] group-hover:scale-110 group-hover:border-[#FE3303]/40 transition-all duration-300">
            <IconComponent size={22} />
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#121111] text-[#F5E7DF]/70 border border-[#F5E7DF]/10 tabular-nums">
            {skill.level}%
          </span>
        </div>

        {/* Skill Name */}
        <h4 className="font-['Cabinet_Grotesk'] text-lg font-bold text-[#F5E7DF] group-hover:text-[#FF7B00] transition-colors mb-2">
          {skill.name}
        </h4>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121111]/80 text-[#F5E7DF]/60 border border-[#F5E7DF]/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full mt-2">
        <div className="w-full h-1 bg-[#121111] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF7B00] via-[#FE3303] to-[#C344B5] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${skill.level}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Capabilities" },
    ...skillCategories.map((c) => ({ id: c.id, name: c.name })),
  ];

  const currentCategoryObj = skillCategories.find((c) => c.id === selectedCategory);

  const displayedSkills =
    selectedCategory === "all"
      ? skillCategories.flatMap((c) => c.skills)
      : currentCategoryObj?.skills || [];

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-[#121111] py-24 px-6 md:px-12 border-t border-[#F5E7DF]/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/10 mb-3">
              <Cpu size={13} className="text-[#FE3303]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#F5E7DF]/80">
                02 // TECHNICAL ARSENAL
              </span>
            </div>
            <h2 className="font-['Cabinet_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F5E7DF]">
              SKILLS & TOOLKIT
            </h2>
          </div>

          <p className="max-w-md font-['Satoshi'] text-sm sm:text-base text-[#F5E7DF]/70">
            A comprehensive matrix spanning embedded hardware, industrial automation, IoT pipelines, and high-performance WebGL digital experiences.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? 'bg-[#FF7B00] text-[#121111] font-bold shadow-[0_0_20px_rgba(255,123,0,0.35)]'
                    : 'bg-[#1E1D1D] text-[#F5E7DF]/70 hover:text-[#F5E7DF] border border-[#F5E7DF]/10 hover:border-[#F5E7DF]/30'
                }`}
                data-cursor="FILTER"
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Category Description Banner (if single category selected) */}
        {currentCategoryObj && selectedCategory !== "all" && (
          <div className="mb-8 p-6 rounded-2xl bg-[#1E1D1D]/50 border border-[#F5E7DF]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase text-[#FF7B00] tracking-widest block mb-1">
                {currentCategoryObj.badge}
              </span>
              <p className="font-['Satoshi'] text-sm sm:text-base text-[#F5E7DF]/90">
                {currentCategoryObj.description}
              </p>
            </div>
            <div className="font-mono text-xs text-[#F5E7DF]/50 whitespace-nowrap">
              {currentCategoryObj.skills.length} SPECIALIZED CAPABILITIES
            </div>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSkills.map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}


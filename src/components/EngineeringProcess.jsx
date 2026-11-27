import React, { useState } from 'react';
import { Compass, PenTool, Cpu, Code2, Activity, Rocket } from 'lucide-react';
import { cosmicAudio } from '../utils/CosmicAudio';

const processSteps = [
  {
    id: 'discover',
    num: '01',
    title: 'Discover',
    icon: Compass,
    headline: 'Map the physical constraints before writing a single line.',
    summary:
      'Audit operating voltages, sensor noise floors, latency budgets, and real-world operator workflows on the factory floor or in the browser.',
    deliverables: ['System Requirements', 'Signal Budget', 'Telemetry Spec'],
  },
  {
    id: 'design',
    num: '02',
    title: 'Design',
    icon: PenTool,
    headline: 'Schematic clarity meets spatial interface craft.',
    summary:
      'Draft circuit schematics, optoisolated protection stages, and clean dark-mode digital twin wireframes with zero visual clutter.',
    deliverables: ['Circuit Schematics', 'BOM Selection', 'UI / UX Blueprint'],
  },
  {
    id: 'architect',
    num: '03',
    title: 'Architect',
    icon: Cpu,
    headline: 'Bridge bare-metal silicon with deterministic pipelines.',
    summary:
      'Route multi-layer PCBs, structure FreeRTOS task queues, and design MQTT / WebSocket data flows that survive noisy industrial environments.',
    deliverables: ['Multi-layer PCB', 'RTOS Architecture', 'MQTT / SQL Schema'],
  },
  {
    id: 'build',
    num: '04',
    title: 'Build',
    icon: Code2,
    headline: 'Precision Embedded C firmware & fluid 60 FPS frontends.',
    summary:
      'Write register-level drivers, PLC ladder interlocks, and Three.js / React interfaces where hardware and software move as one system.',
    deliverables: ['Embedded C / C++', 'PLC Ladder Logic', 'React & Three.js'],
  },
  {
    id: 'validate',
    num: '05',
    title: 'Validate',
    icon: Activity,
    headline: 'Oscilloscope verified. Sub-2s latency guaranteed.',
    summary:
      'Stress-test thermal stability, measure signal integrity, and benchmark frontend Lighthouse performance under real constraints.',
    deliverables: ['Bench Testing', 'Latency Profiling', 'Zero-Failure QA'],
  },
  {
    id: 'deploy',
    num: '06',
    title: 'Deploy',
    icon: Rocket,
    headline: 'Commissioned in the field and live on the web.',
    summary:
      'Ship production hardware to industrial panels and deploy real-time digital twins with continuous telemetry and long-term support.',
    deliverables: ['Field Commissioning', 'Live HMI / Web', 'Telemetry Support'],
  },
];

export default function EngineeringProcess() {
  const [activeId, setActiveId] = useState('discover');
  const activeStep = processSteps.find((s) => s.id === activeId) || processSteps[0];
  const ActiveIcon = activeStep.icon;

  return (
    <section id="process" className="py-24 sm:py-32 border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff9d42] block mb-3">
            02 // ENGINEERING WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            From raw voltage to production reality.
          </h2>
        </div>
        <p className="text-sm text-[#e9e7e1]/60 max-w-md font-light leading-relaxed">
          A six-stage cyber-physical methodology combining industrial hardware rigor with modern creative engineering.
        </p>
      </div>

      {/* 6-Stage Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
        {processSteps.map((step) => {
          const Icon = step.icon;
          const isActive = step.id === activeId;
          return (
            <button
              key={step.id}
              onClick={() => {
                cosmicAudio.playTick();
                setActiveId(step.id);
              }}
              className={`group text-left p-4 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? 'bg-[#ff9d42]/12 border-[#ff9d42]/60 text-white shadow-[0_0_25px_rgba(255,157,66,0.12)]'
                  : 'bg-[#0e0f13]/80 border-white/10 text-[#e9e7e1]/65 hover:border-white/25 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`font-mono text-[11px] ${
                    isActive ? 'text-[#ff9d42]' : 'text-[#e9e7e1]/40'
                  }`}
                >
                  {step.num}
                </span>
                <Icon
                  size={15}
                  className={isActive ? 'text-[#ff9d42]' : 'text-[#e9e7e1]/45 group-hover:text-white'}
                />
              </div>
              <div className="font-medium text-sm tracking-tight">{step.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0e0f13]/90 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ff9d42]">
            <ActiveIcon size={14} />
            <span>
              STAGE {activeStep.num} // {activeStep.title}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-light text-white leading-snug">
            {activeStep.headline}
          </h3>
          <p className="text-sm sm:text-base text-[#e9e7e1]/75 font-light leading-relaxed max-w-2xl">
            {activeStep.summary}
          </p>
        </div>

        <div className="lg:col-span-4 space-y-2.5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#e9e7e1]/45 mb-2">
            KEY DELIVERABLES
          </div>
          {activeStep.deliverables.map((item) => (
            <div
              key={item}
              className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-[#e9e7e1]/85 flex items-center justify-between"
            >
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff9d42]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


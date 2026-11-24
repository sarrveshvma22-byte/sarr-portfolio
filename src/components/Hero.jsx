import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Sparkles, Terminal, Cpu, ArrowUpRight } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { sound } from '../utils/AudioEngine';
import { scrollToSection } from '../utils/smoothScroll';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal animations for hero elements
      gsap.fromTo(
        '.hero-tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-char',
        { opacity: 0, y: 80, rotateX: 45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.04,
          delay: 0.8,
          ease: 'power4.out',
        }
      );

      gsap.fromTo(
        '.hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, delay: 1.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-pills',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 1.4, ease: 'back.out(1.5)' }
      );

      gsap.fromTo(
        '.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 1.0, delay: 1.6 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headlineLetters = "SARRVESH M".split("");

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden bg-[#121111]"
    >
      {/* Three.js Interactive WebGL Background */}
      <HeroCanvas />

      {/* Subtle radial ambient spotlight glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FE3303]/15 via-[#FF7B00]/10 to-[#C344B5]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Tagline / Category */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <div className="hero-tag inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1E1D1D]/80 border border-[#FE3303]/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#FE3303] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#F5E7DF]">
            [ HARDWARE ARCHITECT & CREATIVE TECHNOLOGIST ]
          </span>
        </div>
      </div>

      {/* Main Massive Editorial Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8">
        <div className="overflow-hidden pb-2">
          <h1
            ref={headlineRef}
            className="font-['Cabinet_Grotesk'] text-[15vw] sm:text-[14vw] md:text-[12.5vw] font-black tracking-tighter uppercase leading-[0.85] select-none text-[#F5E7DF] flex flex-wrap"
          >
            {headlineLetters.map((char, index) => (
              <span
                key={index}
                className="hero-char inline-block transition-transform duration-300 hover:scale-105 hover:text-[#FF7B00]"
                data-cursor="HELLO"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Editorial Subheadline & Manifest */}
        <div className="hero-sub mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <p className="font-['Satoshi'] text-xl sm:text-2xl md:text-3xl font-light text-[#F5E7DF]/90 leading-snug">
              Bridging{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF7B00] to-[#FE3303]">
                embedded silicon
              </span>
              , industrial automation, and{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FE3303] to-[#C344B5]">
                immersive 3D digital experiences
              </span>
              .
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col md:items-end gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="hero-pills px-3 py-1.5 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/10 font-mono text-xs text-[#F5E7DF]/80">
                SCHOPIQ AUTOMATION
              </span>
              <span className="hero-pills px-3 py-1.5 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/10 font-mono text-xs text-[#F5E7DF]/80">
                PTU • 8.26 CGPA
              </span>
              <span className="hero-pills px-3 py-1.5 rounded-full bg-[#FE3303]/10 border border-[#FE3303]/30 font-mono text-xs text-[#FE3303]">
                IoT & WEBGL
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  scrollToSection('#projects');
                }}
                onMouseEnter={() => sound.playHover()}
                className="group px-6 py-3 rounded-full bg-[#F5E7DF] text-[#121111] font-['Cabinet_Grotesk'] text-sm font-extrabold uppercase tracking-wider hover:bg-[#FF7B00] transition-colors flex items-center gap-2"
                data-cursor="EXPLORE"
              >
                <span>View Works</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  scrollToSection('#playground');
                }}
                onMouseEnter={() => sound.playHover()}
                className="group px-6 py-3 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/20 text-[#F5E7DF] font-['Cabinet_Grotesk'] text-sm font-extrabold uppercase tracking-wider hover:border-[#FE3303] hover:text-[#FE3303] transition-colors flex items-center gap-2"
                data-cursor="PLAY"
              >
                <Sparkles size={15} />
                <span>3D Lab</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar & Scroll Indicator */}
      <div className="hero-scroll-indicator relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-6 border-t border-[#F5E7DF]/10">
        <div className="flex items-center gap-3 font-mono text-xs text-[#F5E7DF]/50">
          <Terminal size={14} className="text-[#FF7B00]" />
          <span>INITIALIZED // THREE.JS KERNEL v0.187</span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            scrollToSection('#journey');
          }}
          onMouseEnter={() => sound.playHover()}
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#F5E7DF]/60 hover:text-[#FF7B00] transition-colors"
          data-cursor="SCROLL"
        >
          <span>Scroll to Discover</span>
          <div className="w-7 h-7 rounded-full border border-[#F5E7DF]/20 flex items-center justify-center group-hover:border-[#FF7B00] transition-colors">
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}


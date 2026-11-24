import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Menu, X } from 'lucide-react';
import { sound } from '../utils/AudioEngine';
import { scrollToSection } from '../utils/smoothScroll';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Clock (Puducherry, India)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Indian Standard Time is UTC+5:30
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for glassy navbar backdrop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    sound.playClick();
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const active = sound.toggleMute();
    setIsAudioActive(active);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#121111]/80 backdrop-blur-xl border-b border-[#F5E7DF]/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Monogram & Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('#hero')}
              onMouseEnter={() => sound.playHover()}
              className="group flex items-center gap-3 text-left focus:outline-none"
              data-cursor="TOP"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1E1D1D] border border-[#F5E7DF]/20 flex items-center justify-center font-['Cabinet_Grotesk'] font-extrabold text-[#F5E7DF] group-hover:border-[#FF7B00] group-hover:text-[#FF7B00] transition-colors">
                SM
              </div>
              <div className="hidden sm:block">
                <span className="block font-['Cabinet_Grotesk'] text-sm font-bold tracking-wider text-[#F5E7DF]">
                  SARRVESH M
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#F5E7DF]/60">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7B00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7B00]"></span>
                  </span>
                  SCHOPIQ AUTOMATION // R&D
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 px-6 py-2 rounded-full bg-[#1E1D1D]/70 border border-[#F5E7DF]/10 backdrop-blur-md">
            {[
              { label: '01. Journey', href: '#journey' },
              { label: '02. Arsenal', href: '#skills' },
              { label: '03. Projects', href: '#projects' },
              { label: '04. Playground', href: '#playground' },
              { label: '05. Trajectory', href: '#experience' },
            ].map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => sound.playHover()}
                className="text-xs font-mono uppercase tracking-wider text-[#F5E7DF]/70 hover:text-[#FF7B00] transition-colors relative py-1 focus:outline-none"
                data-cursor="VIEW"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls: Clock, Sound, CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live IST Puducherry Clock */}
            <div className="hidden md:flex flex-col text-right font-mono text-[11px] leading-tight text-[#F5E7DF]/60">
              <span className="text-[#FF7B00] font-bold">PUDUCHERRY, IN</span>
              <span className="tabular-nums">{currentTime || '11:27:00 AM'} IST</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => sound.playHover()}
              className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center focus:outline-none ${
                isAudioActive
                  ? 'border-[#FF7B00] bg-[#FF7B00]/15 text-[#FF7B00]'
                  : 'border-[#F5E7DF]/20 text-[#F5E7DF]/60 hover:text-[#F5E7DF] hover:border-[#F5E7DF]/40'
              }`}
              title={isAudioActive ? 'Sound FX active (Click to mute)' : 'Click to enable Sound FX & Audio Drone'}
              data-cursor={isAudioActive ? 'MUTE' : 'AUDIO'}
            >
              {isAudioActive ? (
                <div className="flex items-center gap-1">
                  <Volume2 size={16} />
                  <span className="w-1.5 h-3 bg-[#FF7B00] animate-pulse rounded-full" />
                </div>
              ) : (
                <VolumeX size={16} />
              )}
            </button>

            {/* Contact Button */}
            <button
              onClick={() => handleNavClick('#contact')}
              onMouseEnter={() => sound.playHover()}
              className="relative group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF7B00] to-[#FE3303] text-[#121111] font-['Cabinet_Grotesk'] text-xs font-extrabold uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_20px_rgba(255,123,0,0.3)] hover:shadow-[0_0_30px_rgba(254,51,3,0.5)] transform hover:-translate-y-0.5 focus:outline-none"
              data-cursor="TALK"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2.5 rounded-xl bg-[#1E1D1D] border border-[#F5E7DF]/20 text-[#F5E7DF] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 lg:hidden bg-[#121111]/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center px-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-6">
          <p className="font-mono text-xs text-[#FF7B00] tracking-widest uppercase mb-4">
            NAVIGATION INDEX
          </p>
          {[
            { label: '01 // JOURNEY', href: '#journey' },
            { label: '02 // SKILL ARSENAL', href: '#skills' },
            { label: '03 // SELECTED PROJECTS', href: '#projects' },
            { label: '04 // 3D PLAYGROUND', href: '#playground' },
            { label: '05 // CAREER TRAJECTORY', href: '#experience' },
            { label: '06 // CONTACT & TELEMETRY', href: '#contact' },
          ].map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left font-['Cabinet_Grotesk'] text-3xl font-extrabold uppercase tracking-tight text-[#F5E7DF] hover:text-[#FE3303] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-8 border-t border-[#F5E7DF]/10 flex flex-col gap-2 font-mono text-xs text-[#F5E7DF]/60">
            <span>PUDUCHERRY, INDIA [11.94°N, 79.80°E]</span>
            <span className="text-[#FF7B00]">CURRENT TIME: {currentTime} IST</span>
            <span>EMAIL: {personalInfo.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}


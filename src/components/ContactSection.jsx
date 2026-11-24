import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  ArrowUp,
  Sparkles,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/AudioEngine';
import { scrollToSection } from '../utils/smoothScroll';

export default function ContactSection() {
  const [copiedType, setCopiedType] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = (text, type) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    sound.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sound.playSuccess();

      // Fire celebratory confetti in palette colors
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FF7B00', '#FE3303', '#C344B5', '#F5E7DF'],
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-[#121111] text-[#F5E7DF] pt-24 pb-12 px-6 md:px-12 flex flex-col justify-between border-t border-[#F5E7DF]/10 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#FE3303]/15 via-[#FF7B00]/10 to-[#C344B5]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1D1D] border border-[#F5E7DF]/10 mb-4">
            <Sparkles size={13} className="text-[#FE3303]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F5E7DF]/80">
              06 // INITIATE TRANSMISSION
            </span>
          </div>

          {/* Oversized Animated Headline */}
          <h2 className="font-['Cabinet_Grotesk'] text-5xl sm:text-7xl md:text-8xl lg:text-[8.5vw] font-black uppercase tracking-tight text-[#F5E7DF] leading-[0.9] select-none">
            LET'S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7B00] via-[#FE3303] to-[#C344B5]">
              EXTRAORDINARY
            </span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-['Satoshi'] text-lg sm:text-xl text-[#F5E7DF]/80 leading-relaxed">
              Whether you are looking for an Embedded Systems Engineer, Hardware R&D Trainee, or Creative Technologist for cutting-edge projects — my inbox and frequency are open.
            </p>

            {/* Contact Cards */}
            <div className="space-y-3">
              {/* Email Card */}
              <div
                onMouseEnter={() => sound.playHover()}
                className="p-5 rounded-2xl bg-[#1E1D1D]/80 border border-[#F5E7DF]/10 hover:border-[#FF7B00] transition-colors flex items-center justify-between group"
                data-cursor="EMAIL"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#121111] border border-[#F5E7DF]/10 flex items-center justify-center text-[#FF7B00]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#F5E7DF]/50 block">
                      DIRECT EMAIL
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-['Cabinet_Grotesk'] text-base sm:text-lg font-bold text-[#F5E7DF] group-hover:text-[#FF7B00] transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  className="p-2.5 rounded-lg bg-[#121111] text-[#F5E7DF]/70 hover:text-[#FF7B00] transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedType === 'email' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Card */}
              <div
                onMouseEnter={() => sound.playHover()}
                className="p-5 rounded-2xl bg-[#1E1D1D]/80 border border-[#F5E7DF]/10 hover:border-[#FE3303] transition-colors flex items-center justify-between group"
                data-cursor="CALL"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#121111] border border-[#F5E7DF]/10 flex items-center justify-center text-[#FE3303]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#F5E7DF]/50 block">
                      PHONE CONTACT
                    </span>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="font-['Cabinet_Grotesk'] text-base sm:text-lg font-bold text-[#F5E7DF] group-hover:text-[#FE3303] transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  className="p-2.5 rounded-lg bg-[#121111] text-[#F5E7DF]/70 hover:text-[#FE3303] transition-colors"
                  title="Copy phone number to clipboard"
                >
                  {copiedType === 'phone' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>

              {/* LinkedIn Card */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="p-5 rounded-2xl bg-[#1E1D1D]/80 border border-[#F5E7DF]/10 hover:border-[#C344B5] transition-colors flex items-center justify-between group block"
                data-cursor="LINKEDIN"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#121111] border border-[#F5E7DF]/10 flex items-center justify-center text-[#C344B5]">
                    <LinkedinIcon size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#F5E7DF]/50 block">
                      PROFESSIONAL NETWORK
                    </span>
                    <span className="font-['Cabinet_Grotesk'] text-base sm:text-lg font-bold text-[#F5E7DF] group-hover:text-[#C344B5] transition-colors">
                      linkedin.com/in/sarrvesh-m
                    </span>
                  </div>
                </div>

                <ExternalLink size={18} className="text-[#F5E7DF]/50 group-hover:text-[#C344B5] transition-colors" />
              </a>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-[#1E1D1D]/80 border border-[#F5E7DF]/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#121111] border border-[#F5E7DF]/10 flex items-center justify-center text-[#F5E7DF]/70">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#F5E7DF]/50 block">
                    LOCATION BASE
                  </span>
                  <span className="font-['Cabinet_Grotesk'] text-base sm:text-lg font-bold text-[#F5E7DF]">
                    Puducherry, India
                  </span>
                  <span className="font-mono text-xs text-[#FF7B00] block mt-0.5">
                    [ 11.9416° N, 79.8083° E ]
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Transmission Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#1E1D1D]/90 border border-[#F5E7DF]/15 backdrop-blur-xl shadow-2xl relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5E7DF]/10">
                <span className="font-mono text-xs uppercase text-[#FF7B00] tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} />
                  <span>TRANSMISSION TERMINAL</span>
                </span>
                <span className="font-mono text-[11px] text-[#F5E7DF]/40">ENCRYPTED // DIRECT</span>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#FF7B00]/20 border border-[#FF7B00] text-[#FF7B00] mx-auto flex items-center justify-center">
                    <Check size={32} />
                  </div>
                  <h3 className="font-['Cabinet_Grotesk'] text-2xl font-black uppercase text-[#F5E7DF]">
                    TRANSMISSION DISPATCHED
                  </h3>
                  <p className="font-['Satoshi'] text-sm text-[#F5E7DF]/70 max-w-sm mx-auto">
                    Thank you! Your message has been logged. Sarrvesh will review your telemetry and respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-xs uppercase text-[#F5E7DF]/60">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-4 py-3 rounded-xl bg-[#121111] border border-[#F5E7DF]/15 text-[#F5E7DF] placeholder-[#F5E7DF]/30 focus:outline-none focus:border-[#FF7B00] transition-colors font-['Satoshi'] text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-xs uppercase text-[#F5E7DF]/60">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@computing.org"
                        className="w-full px-4 py-3 rounded-xl bg-[#121111] border border-[#F5E7DF]/15 text-[#F5E7DF] placeholder-[#F5E7DF]/30 focus:outline-none focus:border-[#FF7B00] transition-colors font-['Satoshi'] text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-xs uppercase text-[#F5E7DF]/60">Subject / Objective</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Hardware R&D Role / Embedded Project Collaboration"
                      className="w-full px-4 py-3 rounded-xl bg-[#121111] border border-[#F5E7DF]/15 text-[#F5E7DF] placeholder-[#F5E7DF]/30 focus:outline-none focus:border-[#FF7B00] transition-colors font-['Satoshi'] text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-xs uppercase text-[#F5E7DF]/60">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Sarrvesh, we'd love to discuss an opportunity or project..."
                      className="w-full px-4 py-3 rounded-xl bg-[#121111] border border-[#F5E7DF]/15 text-[#F5E7DF] placeholder-[#F5E7DF]/30 focus:outline-none focus:border-[#FF7B00] transition-colors font-['Satoshi'] text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF7B00] via-[#FE3303] to-[#C344B5] text-[#121111] font-['Cabinet_Grotesk'] text-sm font-black uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_30px_rgba(255,123,0,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                    data-cursor="TRANSMIT"
                  >
                    {isSubmitting ? (
                      <span>DISPATCHING TELEMETRY...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>SEND TRANSMISSION</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <div className="pt-8 border-t border-[#F5E7DF]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#F5E7DF]/50">
          <div className="flex items-center gap-2">
            <span>© 2026 SARRVESH M</span>
            <span>•</span>
            <span className="text-[#FF7B00]">PUDUCHERRY, INDIA</span>
          </div>

          <div className="text-center sm:text-right">
            CRAFTED WITH THREE.JS, GLSL & GSAP
          </div>

          <button
            onClick={() => {
              sound.playClick();
              scrollToSection('#hero');
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 text-[#F5E7DF]/70 hover:text-[#FE3303] transition-colors focus:outline-none"
            data-cursor="TOP"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

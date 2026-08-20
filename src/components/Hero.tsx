import React, { useState, useRef, useCallback } from 'react';
import {
  ArrowUpRight,
  Download,
  Check
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

// Custom SVG Icons
const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.79v-7.6H6.46M7.86 6.5a1.63 1.63 0 0 0-1.64 1.63 1.63 1.63 0 1 0 3.27 0A1.63 1.63 0 0 0 7.86 6.5Z"/>
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.16 8.16 0 0 1-1.25-4.46c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.45-.04 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/>
  </svg>
);

interface HeroProps {
  onOpenHireMe: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenHireMe, onOpenResume }) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const copyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMouse({ x: -999, y: -999 });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between pt-4 pb-6 sm:py-8 overflow-hidden select-none"
    >
      {/* ── BACKGROUND PORTRAIT LAYER ─────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden z-0">
        
        {/* Ambient Glow Aura */}
        <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-violet-500/15 rounded-full blur-[100px]" />

        {/* ── BASE Portrait: Dark Grayscale (dim so spotlight pops) ── */}
        <img
          src="/profile.jpg"
          alt="Mohammed Saifuddin"
          className="absolute w-full max-w-2xl sm:max-w-3xl md:max-w-4xl h-full object-cover object-center sm:object-top grayscale brightness-50 contrast-125 opacity-80"
          style={{ transition: 'opacity 0.3s ease' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop';
          }}
        />

        {/* ── DARK OVERLAY to deepen the base even further ── */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

        {/* ── SPOTLIGHT REVEAL: Vivid full-color portrait clipped to cursor ── */}
        <img
          src="/profile.jpg"
          alt="Mohammed Saifuddin Spotlight"
          style={{
            clipPath: isHovering
              ? `circle(160px at ${mouse.x}px ${mouse.y}px)`
              : `circle(0px at ${mouse.x}px ${mouse.y}px)`,
            transition: 'clip-path 0.12s ease-out',
            filter: 'brightness(1.25) contrast(1.1) saturate(1.4)',
          }}
          className="absolute w-full max-w-2xl sm:max-w-3xl md:max-w-4xl h-full object-cover object-center sm:object-top"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop';
          }}
        />

        {/* ── SPOTLIGHT GLOW RING: strong cyan+violet multi-layer aura ── */}
        {isHovering && (
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 320,
              height: 320,
              left: mouse.x - 160,
              top: mouse.y - 160,
              border: '2px solid rgba(6,182,212,0.9)',
              boxShadow: [
                '0 0 0 1px rgba(139,92,246,0.5)',
                '0 0 25px 8px rgba(6,182,212,0.6)',
                '0 0 60px 20px rgba(6,182,212,0.25)',
                '0 0 100px 40px rgba(139,92,246,0.15)',
                'inset 0 0 40px 10px rgba(6,182,212,0.12)',
              ].join(', '),
              transition: 'left 0.05s linear, top 0.05s linear',
            }}
          />
        )}

        {/* Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-[#f8fafc]/90 dark:from-[#030712] dark:via-transparent dark:to-[#030712]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-transparent to-[#f8fafc] dark:from-[#030712] dark:via-transparent dark:to-[#030712]" />
      </div>

      {/* ── Main Foreground Content ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between relative z-10">

        {/* ── Center Editorial Canvas ── */}
        <div className="relative my-auto py-8 sm:py-16 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[540px]">

          {/* ── Giant Editorial Name Typography ── */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden w-full">
            <div className="flex items-center justify-center gap-3 sm:gap-8 whitespace-nowrap text-center">
              <span className="text-stroke-outline font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[145px] xl:text-[175px] leading-none uppercase drop-shadow-sm">
                SAIF
              </span>
              <span className="font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[145px] xl:text-[175px] leading-none uppercase text-slate-900/90 dark:text-white/90 drop-shadow-md">
                UDDIN
              </span>
            </div>
          </div>

          {/* ── Left Column Info ── */}
          <div className="w-full lg:w-auto lg:absolute lg:left-0 lg:bottom-4 z-20 mt-6 lg:mt-0 text-left space-y-3 max-w-xs">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              Senior Full-Stack <br />Developer & Architect
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Designing and engineering full-stack digital systems that are scalable, resilient, and conversion focused.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenHireMe}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group pointer-events-auto"
              >
                <span>Let's collaborate</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ── Right Column Social Pills ── */}
          <div className="w-full lg:w-auto lg:absolute lg:right-0 lg:bottom-4 z-20 mt-4 lg:mt-0 flex flex-wrap lg:flex-col items-start lg:items-end gap-2.5 pointer-events-auto">
            
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-2xl glass-panel hover:border-blue-500/50 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 text-xs font-bold flex items-center gap-2 shadow-sm transition-all duration-200 hover:scale-105 group cursor-pointer"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-2xl glass-panel hover:border-violet-500/50 text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-purple-400 text-xs font-bold flex items-center gap-2 shadow-sm transition-all duration-200 hover:scale-105 group cursor-pointer"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={`https://wa.me/${personalInfo.rawPhone}?text=Hello%20Saifuddin,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-2xl glass-panel hover:border-emerald-500/50 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-sm transition-all duration-200 hover:scale-105 group cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenResume}
              className="px-4 py-2 rounded-2xl glass-panel hover:border-cyan-500/50 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs font-bold flex items-center gap-2 shadow-sm transition-all duration-200 hover:scale-105 group cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-500" />
              <span>Get Resume</span>
            </button>

          </div>

        </div>

        {/* ── Bottom Tech Ticker Bar ── */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Core Stack: React.js • Next.js • Node.js • Express • Java Spring Boot • MySQL • MongoDB</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={copyPhone}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-bold"
            >
              <span>{copiedPhone ? 'Copied Phone!' : personalInfo.phone}</span>
              {copiedPhone && <Check className="w-3 h-3 text-emerald-500" />}
            </button>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">98% Core Web Vitals</span>
          </div>
        </div>

      </div>
    </section>
  );
};

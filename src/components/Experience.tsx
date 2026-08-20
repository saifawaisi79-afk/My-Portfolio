import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle,
  Building2,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { experiences } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const activeExp = experiences[activeExpIndex];

  return (
    <section
      id="experience"
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 sm:py-10 overflow-hidden"
    >
      {/* ── Background Giant Watermark (Subtle backdrop, zero collisions) ── */}
      <div className="absolute inset-x-0 top-6 sm:top-10 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden w-full opacity-10 dark:opacity-15">
        <div className="flex items-center justify-center gap-4 sm:gap-8 whitespace-nowrap text-center">
          <span className="text-stroke-outline font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase">
            CAREER
          </span>
          <span className="font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase text-slate-900 dark:text-white">
            TRACK
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between relative z-10 space-y-8">

        {/* ── Section Label ── */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            [02 / Work Experience & Positions]
          </span>
        </div>

        {/* ── Balanced 3-Column Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Left Column (Col Span 4) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Engineering Positions & <br className="hidden sm:inline" />
              <span className="text-gradient">Career History</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Proven enterprise engineering with ZFS Info Tech and client solutions. Architecting scalable REST APIs, microservices, and CRM workflows.
            </p>
            <div className="pt-2">
              <a
                href="/resume.pdf"
                download="Saifuddin_Resume.pdf"
                className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-xl inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>Download Resume</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Center Column: Active Role Showcase Card (Col Span 5) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.1] shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold">
                  {activeExp.period}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveExpIndex(p => (p - 1 + experiences.length) % experiences.length)}
                    className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 px-1">
                    0{activeExpIndex + 1}/0{experiences.length}
                  </span>
                  <button
                    onClick={() => setActiveExpIndex(p => (p + 1) % experiences.length)}
                    className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeExp.role}
                </h3>
                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-cyan-400 mt-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{activeExp.company}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-mono">{activeExp.location}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-left">
                {activeExp.responsibilities.slice(0, 3).map((resp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/80 dark:border-white/[0.08]">
                {activeExp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience Role Selector Pills (Col Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            {experiences.map((exp, idx) => (
              <button
                key={exp.company}
                onClick={() => setActiveExpIndex(idx)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between shadow-sm transition-all cursor-pointer ${
                  activeExpIndex === idx
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 scale-105'
                    : 'glass-panel text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <div className="text-left truncate pr-2">
                  <p className="truncate font-bold">{exp.company}</p>
                  <p className="text-[10px] opacity-70 font-mono">{exp.period}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 shrink-0 opacity-70" />
              </button>
            ))}

            {/* Academic badge */}
            <div className="px-4 py-3 rounded-2xl glass-panel text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-violet-500 shrink-0" />
              <div>
                <p className="font-bold">BE Computer Science</p>
                <p className="text-[10px] text-slate-400 font-mono">Bangalore, India</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Ticker Bar ── */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Senior Full-Stack Engineer • Open for Strategic Projects</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-700 dark:text-slate-300 font-bold">Enterprise HRMS & Microservices</span>
            <span>•</span>
            <span className="text-blue-600 dark:text-cyan-400 font-bold">Bangalore, India</span>
          </div>
        </div>

      </div>
    </section>
  );
};

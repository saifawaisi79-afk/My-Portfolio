import React, { useState } from 'react';
import { 
  Star, 
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { personalInfo, testimonials } from '../data/portfolioData';

export const StatsBar: React.FC<{ fullPage?: boolean }> = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section
      id="overview"
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 sm:py-10 overflow-hidden"
    >
      {/* ── Background Giant Watermark (Clean subtle backdrop, never collides) ── */}
      <div className="absolute inset-x-0 top-6 sm:top-10 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden w-full opacity-10 dark:opacity-15">
        <div className="flex items-center justify-center gap-4 sm:gap-8 whitespace-nowrap text-center">
          <span className="text-stroke-outline font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase">
            PROVEN
          </span>
          <span className="font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase text-slate-900 dark:text-white">
            IMPACT
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between relative z-10 space-y-8">

        {/* ── Section Label ── */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            [01 / Overview & Metrics]
          </span>
        </div>

        {/* ── Balanced 3-Column Content Grid (Zero Overlaps) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Left Column (Col Span 4) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Measurable Results & <br className="hidden sm:inline" />
              <span className="text-gradient">Client Endorsements</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              High-velocity full-stack engineering with 100% on-time milestone delivery, zero-downtime microservices, and 98% Core Web Vitals.
            </p>
            <div className="pt-2">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-xl inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>View Case Studies</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Center Column: Testimonial Card (Col Span 5) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.1] shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 ml-2">5.0 / 5.0 Rating</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveTestimonial(p => (p - 1 + testimonials.length) % testimonials.length)}
                    className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 px-1">
                    0{activeTestimonial + 1}/0{testimonials.length}
                  </span>
                  <button
                    onClick={() => setActiveTestimonial(p => (p + 1) % testimonials.length)}
                    className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <blockquote className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed italic">
                "{testimonials[activeTestimonial]?.content}"
              </blockquote>

              <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    {testimonials[activeTestimonial]?.clientName}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {testimonials[activeTestimonial]?.role} • <strong className="text-blue-600 dark:text-cyan-400">{testimonials[activeTestimonial]?.company}</strong>
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 text-[10px] font-mono font-bold">
                  {testimonials[activeTestimonial]?.projectType}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked KPI Pills (Col Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            {personalInfo.stats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-3 rounded-2xl glass-panel text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-between shadow-sm"
              >
                <span className="text-slate-500 font-normal">{stat.label}</span>
                <span className="text-slate-900 dark:text-white font-black">{stat.value}{stat.suffix}</span>
              </div>
            ))}
          </div>

        </div>

        {/* ── Bottom Ticker Bar ── */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Verified Partners: CEGS Enterprise • Aster MediCare • Aura Living • ZFS Info Tech</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-700 dark:text-slate-300 font-bold">100% Code Quality</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Zero-Downtime Releases</span>
          </div>
        </div>

      </div>
    </section>
  );
};

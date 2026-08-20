import React, { useState } from 'react';
import {
  Check,
  Copy,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981']
      });
    } catch { /* safe fallback */ }

    if (contactMethod === 'whatsapp') {
      const waText = encodeURIComponent(
        `Hello Saifuddin! My name is ${name || 'A Client'}.\nEmail: ${email || 'N/A'}\nMessage: ${message || 'I would like to discuss a project with you.'}`
      );
      window.open(`https://wa.me/${personalInfo.rawPhone}?text=${waText}`, '_blank');
    } else {
      const mailSubject = encodeURIComponent(`Project Inquiry from ${name || 'Portfolio Visitor'}`);
      const mailBody = encodeURIComponent(`Hi Saifuddin,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:${personalInfo.email}?subject=${mailSubject}&body=${mailBody}`;
    }
    setIsSent(true);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 sm:py-10 overflow-hidden"
    >
      {/* ── Background Giant Watermark (Subtle backdrop, zero collisions) ── */}
      <div className="absolute inset-x-0 top-6 sm:top-10 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden w-full opacity-10 dark:opacity-15">
        <div className="flex items-center justify-center gap-4 sm:gap-8 whitespace-nowrap text-center">
          <span className="text-stroke-outline font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase">
            LET'S
          </span>
          <span className="font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase text-slate-900 dark:text-white">
            TALK
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between relative z-10 space-y-8">

        {/* ── Section Label ── */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-mono font-bold uppercase tracking-wider">
            [06 / Contact & Inquiries]
          </span>
        </div>

        {/* ── Balanced 3-Column Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Left Column (Col Span 4) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Start a Conversation & <br className="hidden sm:inline" />
              <span className="text-gradient">Hire Full-Stack Lead</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Available for full-time senior engineering positions, enterprise SaaS contracts, and architectural consulting.
            </p>
            <div className="pt-2">
              <button
                onClick={copyEmail}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-xl inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Email Copied' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Center Column: Direct Reachout Form Card (Col Span 5) */}
          <div className="lg:col-span-5">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.1] shadow-2xl space-y-3.5">
              
              {/* Method Switcher */}
              <div className="flex gap-2 pb-1">
                <button
                  type="button"
                  onClick={() => setContactMethod('whatsapp')}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    contactMethod === 'whatsapp'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                      : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  WhatsApp Direct
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    contactMethod === 'email'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                      : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Email Message
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400"
                />
              </div>

              <textarea
                rows={3}
                required
                placeholder="Tell me about your project, timeline, or engineering role..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400 resize-none"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs shadow-xl flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
              >
                <span>{contactMethod === 'whatsapp' ? 'Dispatch to WhatsApp' : 'Dispatch via Email'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {isSent && (
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold text-center">
                  Redirecting your message now... 🚀
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Contact Links Pills (Col Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-4 py-3 rounded-2xl glass-panel text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-between shadow-sm hover:border-slate-400 transition-colors"
            >
              <div className="text-left truncate pr-2">
                <p className="font-bold">Email Direct</p>
                <p className="text-[10px] opacity-70 font-mono truncate">{personalInfo.email}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 opacity-70" />
            </a>

            <a
              href={`https://wa.me/${personalInfo.rawPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl glass-panel text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-between shadow-sm hover:border-slate-400 transition-colors"
            >
              <div className="text-left truncate pr-2">
                <p className="font-bold">WhatsApp Direct</p>
                <p className="text-[10px] opacity-70 font-mono">{personalInfo.phone}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 opacity-70" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl glass-panel text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-between shadow-sm hover:border-slate-400 transition-colors"
            >
              <div className="text-left truncate pr-2">
                <p className="font-bold">LinkedIn Profile</p>
                <p className="text-[10px] opacity-70 font-mono">{personalInfo.linkedinHandle}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 opacity-70" />
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl glass-panel text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-between shadow-sm hover:border-slate-400 transition-colors"
            >
              <div className="text-left truncate pr-2">
                <p className="font-bold">GitHub Code</p>
                <p className="text-[10px] opacity-70 font-mono">{personalInfo.githubHandle}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 opacity-70" />
            </a>

          </div>

        </div>

        {/* ── Bottom Ticker Bar ── */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active in Bangalore, India (UTC +5:30) • Typical Reply &lt; 2 Hours</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-700 dark:text-slate-300 font-bold">Open for Full-Stack Roles</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">saifawaisi79@gmail.com</span>
          </div>
        </div>

      </div>
    </section>
  );
};

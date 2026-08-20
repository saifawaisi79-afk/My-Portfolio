import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { personalInfo } from '../data/portfolioData';

interface AutoLeadModalProps {
  delayMs?: number;
}

export const AutoLeadModal: React.FC<AutoLeadModalProps> = ({ delayMs = 5000 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [projectType, setProjectType] = useState('Enterprise SaaS');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMethod, setSubmitMethod] = useState<'whatsapp' | 'email'>('whatsapp');

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('saif_has_seen_lead_modal');
    if (hasSeen === 'true') return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981']
        });
      } catch { /* safe fallback */ }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('saif_has_seen_lead_modal', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#10b981', '#06b6d4', '#3b82f6']
      });
    } catch { /* fallback */ }

    if (submitMethod === 'whatsapp') {
      const waText = encodeURIComponent(
        `Hello Saifuddin! Project Inquiry:\n- Name: ${name || 'Client'}\n- Contact: ${contact || 'N/A'}\n- Type: ${projectType}\n- Scope: ${message || 'Looking to discuss a new project.'}`
      );
      window.open(`https://wa.me/${personalInfo.rawPhone}?text=${waText}`, '_blank');
    } else {
      const subject = encodeURIComponent(`Project Inquiry: ${projectType} - ${name || 'Client'}`);
      const body = encodeURIComponent(
        `Hi Saifuddin,\n\nI would like to discuss a project:\n- Name: ${name}\n- Contact: ${contact}\n- Project Type: ${projectType}\n- Scope: ${message}\n\nBest regards,\n${name || 'Client'}`
      );
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 select-none animate-fade-in">
      
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Compact Modal Container (Mobile Optimized) */}
      <div className="relative z-10 w-full max-w-md rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/[0.12] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-scale-in">
        
        {/* Header Bar */}
        <div className="px-4 sm:px-5 py-3 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/90 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
              🟢 Available for New Projects
            </span>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-slate-200/70 dark:bg-white/[0.08] hover:bg-slate-300 dark:hover:bg-white/[0.15] flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-left">
          
          <div className="space-y-0.5">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Start a Project with <span className="text-gradient">Saifuddin</span> 🚀
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-normal">
              Direct response within &lt; 2 hours with project scope & estimates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            
            {/* Input Row: Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400"
              />

              <input
                type="text"
                required
                placeholder="Email or WhatsApp"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400"
              />
            </div>

            {/* Compact Project Scope Selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Project Category</label>
              <div className="flex flex-wrap gap-1">
                {[
                  'Enterprise SaaS',
                  'CRM & Portal',
                  'E-Commerce',
                  'Web App',
                  'Full-Time Hire'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      projectType === type
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Short Requirements Note */}
            <div className="space-y-1">
              <input
                type="text"
                required
                placeholder="Short requirements, timeline, or tech stack..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400"
              />
            </div>

            {/* Quick Dispatch Buttons */}
            <div className="pt-1 flex gap-2">
              <button
                type="submit"
                onClick={() => setSubmitMethod('whatsapp')}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="submit"
                onClick={() => setSubmitMethod('email')}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <span>Email</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {isSubmitted && (
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center animate-fade-in">
                Redirecting your message now... 🚀
              </div>
            )}
          </form>

          {/* Footer note */}
          <div className="pt-2 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-500" />
              <span>Reply time: &lt; 2 Hours</span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Maybe later
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

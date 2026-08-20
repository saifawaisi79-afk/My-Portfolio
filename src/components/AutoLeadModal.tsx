import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
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
  const [budget, setBudget] = useState('$1,500 - $3,500');
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
          particleCount: 40,
          spread: 60,
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
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b']
      });
    } catch { /* fallback */ }

    if (submitMethod === 'whatsapp') {
      const waText = encodeURIComponent(
        `Hello Saifuddin! I visited your portfolio and would like to discuss a project:
- Name: ${name || 'Potential Client'}
- Contact: ${contact || 'N/A'}
- Project Type: ${projectType}
- Estimated Budget: ${budget}
- Details: ${message || 'Looking forward to your availability for a quick kickoff.'}`
      );
      window.open(`https://wa.me/${personalInfo.rawPhone}?text=${waText}`, '_blank');
    } else {
      const subject = encodeURIComponent(`Project Inquiry: ${projectType} - ${name || 'Client'}`);
      const body = encodeURIComponent(
        `Hi Saifuddin,\n\nI would like to hire you for a project:\n- Name: ${name}\n- Contact: ${contact}\n- Project Type: ${projectType}\n- Budget: ${budget}\n\nProject Notes:\n${message || 'Please let me know your earliest availability.'}\n\nBest regards,\n${name || 'Client'}`
      );
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 select-none animate-fade-in">
      
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/[0.12] shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/80 dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
              Available for New Projects
            </span>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-200/60 dark:bg-white/[0.08] hover:bg-slate-300 dark:hover:bg-white/[0.15] flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-5">
          
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-[11px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Project Inquiry</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Let's Build Your <span className="text-gradient">Next Product</span> 🚀
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
              Tell me about your requirements, and I'll get back to you with architectural guidance and a sprint timeline within 2 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            
            {/* Input Row: Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Email / WhatsApp</label>
                <input
                  type="text"
                  required
                  placeholder="jane@company.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>

            {/* Project Scope Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Project Type</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Enterprise SaaS',
                  'CRM & Portal',
                  'E-Commerce',
                  'Web App & SEO',
                  'Hire Full-Time'
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      projectType === type
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                        : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Estimated Budget</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '< $1,000',
                  '$1,000 - $3,000',
                  '$3,000 - $5,000+',
                  'Flexible / Discussion'
                ].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      budget === b
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                        : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>


            {/* Message Details */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold text-slate-400 uppercase">Brief Requirements</label>
              <textarea
                rows={2}
                required
                placeholder="Give a short overview of your project, tech stack, or deadline..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-400 resize-none"
              />
            </div>

            {/* Dispatch Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="submit"
                onClick={() => setSubmitMethod('whatsapp')}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Send via WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="submit"
                onClick={() => setSubmitMethod('email')}
                className="flex-1 py-3 rounded-2xl bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <span>Send via Email</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {isSubmitted && (
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center animate-fade-in">
                Redirecting your message now... 🚀
              </div>
            )}
          </form>

          {/* Footer note */}
          <div className="pt-2 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Typical reply: &lt; 2 Hours</span>
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

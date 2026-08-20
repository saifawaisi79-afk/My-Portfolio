import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export const FreelancerPortal: React.FC = () => {
  const [projectType, setProjectType] = useState<'saas' | 'crm' | 'ecommerce' | 'seo' | 'custom'>('saas');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'auth_rbac',
    'admin_panel',
  ]);
  const [timeline] = useState<'standard' | 'express' | 'flexible'>('standard');

  const projectBasePricing: Record<string, { name: string; baseUSD: number; baseINR: number; baseDays: string }> = {
    saas: { name: 'Full-Stack SaaS MVP', baseUSD: 750, baseINR: 60000, baseDays: '14-21 Days' },
    crm: { name: 'Custom CRM / HRMS Portal', baseUSD: 950, baseINR: 75000, baseDays: '20-30 Days' },
    ecommerce: { name: 'E-Commerce Storefront', baseUSD: 600, baseINR: 48000, baseDays: '12-18 Days' },
    seo: { name: 'Performance & SEO Revamp', baseUSD: 350, baseINR: 28000, baseDays: '5-10 Days' },
    custom: { name: 'Bespoke Full-Stack Solution', baseUSD: 800, baseINR: 65000, baseDays: 'Custom' },
  };

  const addOnOptions = [
    { id: 'auth_rbac', label: 'Multi-Role Auth & RBAC Security', usd: 120, inr: 9500 },
    { id: 'payment_gateway', label: 'Payment Gateway (Stripe/Razorpay)', usd: 140, inr: 11000 },
    { id: 'admin_panel', label: 'Admin Analytics Dashboard', usd: 150, inr: 12000 },
    { id: 'pdf_generator', label: 'Automated PDF Engine', usd: 100, inr: 8000 },
    { id: 'seo_tuning', label: 'Core Web Vitals 98%+', usd: 110, inr: 8500 },
    { id: 'cloud_deploy', label: 'SSL & CI/CD Pipeline', usd: 80, inr: 6500 },
  ];

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const calculatedQuote = useMemo(() => {
    const base = projectBasePricing[projectType];
    const addonUSD = selectedAddons.reduce((sum, id) => {
      const addon = addOnOptions.find((a) => a.id === id);
      return sum + (addon ? addon.usd : 0);
    }, 0);

    const addonINR = selectedAddons.reduce((sum, id) => {
      const addon = addOnOptions.find((a) => a.id === id);
      return sum + (addon ? addon.inr : 0);
    }, 0);

    const totalUSD = base.baseUSD + addonUSD;
    const totalINR = base.baseINR + addonINR;

    return { base, totalUSD, totalINR };
  }, [projectType, selectedAddons, timeline]);

  const handleSendWhatsAppQuote = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#06b6d4', '#3b82f6']
      });
    } catch { /* fallback */ }

    const addonNames = selectedAddons
      .map((id) => addOnOptions.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const textMessage = `Hello Saifuddin! I used your portfolio project calculator:
- Project Type: ${calculatedQuote.base.name}
- Addons: ${addonNames || 'Core features'}
- Estimated Budget: $${calculatedQuote.totalUSD} / ₹${calculatedQuote.totalINR.toLocaleString()}`;

    const encoded = encodeURIComponent(textMessage);
    window.open(`https://wa.me/${personalInfo.rawPhone}?text=${encoded}`, '_blank');
  };

  return (
    <section
      id="freelance"
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 sm:py-10 overflow-hidden"
    >
      {/* ── Background Giant Watermark (Subtle backdrop, zero collisions) ── */}
      <div className="absolute inset-x-0 top-6 sm:top-10 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden w-full opacity-10 dark:opacity-15">
        <div className="flex items-center justify-center gap-4 sm:gap-8 whitespace-nowrap text-center">
          <span className="text-stroke-outline font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase">
            PROJECT
          </span>
          <span className="font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase text-slate-900 dark:text-white">
            SCOPE
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between relative z-10 space-y-8">

        {/* ── Section Label ── */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            [05 / Freelance Scope & Pricing]
          </span>
        </div>

        {/* ── Balanced 3-Column Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Left Column (Col Span 4) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Interactive Scope & <br className="hidden sm:inline" />
              <span className="text-gradient">Sprint Calculator</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Select your required architecture and addons to generate real-time transparent scope estimates and turnaround times.
            </p>
            <div className="pt-2">
              <button
                onClick={handleSendWhatsAppQuote}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-xl inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>Book Sprint</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Center Column: Interactive Scope Calculator Card (Col Span 5) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.1] shadow-2xl space-y-4">
              
              {/* Type Switcher Pills */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {(['saas', 'crm', 'ecommerce', 'seo'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      projectType === type
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                        : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {projectBasePricing[type].name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Addons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {addOnOptions.slice(0, 4).map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm'
                          : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="truncate pr-1">{addon.label.split('&')[0]}</span>
                      <span className="font-mono text-[10px] opacity-80">+${addon.usd}</span>
                    </button>
                  );
                })}
              </div>

              {/* Price Calculation & WhatsApp Trigger */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Estimated Scope</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    ${calculatedQuote.totalUSD} <span className="text-xs font-mono text-slate-400">/ ₹{calculatedQuote.totalINR.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleSendWhatsAppQuote}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs shadow-xl flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Pricing Tier Selector Pills (Col Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            {Object.entries(projectBasePricing).slice(0, 4).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setProjectType(key as any)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between shadow-sm transition-all cursor-pointer ${
                  projectType === key
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 scale-105'
                    : 'glass-panel text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <div className="text-left truncate pr-2">
                  <p className="truncate font-bold">{item.name}</p>
                  <p className="text-[10px] opacity-70 font-mono">{item.baseDays}</p>
                </div>
                <span className="font-mono text-xs font-black">${item.baseUSD}</span>
              </button>
            ))}
          </div>

        </div>

        {/* ── Bottom Ticker Bar ── */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Turnaround: 14-21 Business Days • Milestone Escrow Delivery</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-700 dark:text-slate-300 font-bold">Zero Hidden Fees</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Satisfaction SLA</span>
          </div>
        </div>

      </div>
    </section>
  );
};

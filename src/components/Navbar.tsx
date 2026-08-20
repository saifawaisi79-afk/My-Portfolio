import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  FileText,
  Sun,
  Moon
} from 'lucide-react';

interface Page {
  id: string;
  label: string;
  sectionId: string;
}

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenHireMe: () => void;
  onOpenResume: () => void;
  scrollProgress?: number;
  activePage?: number;
  onGoToPage?: (index: number) => void;
  pages?: Page[];
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenHireMe,
  onOpenResume,
  activePage = 0,
  onGoToPage,
  pages = [],
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  // Navigation items styled like Dymas Alfin editorial template
  const navItems = [
    { label: 'Work', badge: '[15+]', targetIndex: pages.findIndex(p => p.id === 'projects') },
    { label: 'Service', badge: '[6]', targetIndex: pages.findIndex(p => p.id === 'skills') },
    { label: 'Experience', badge: '[2y+]', targetIndex: pages.findIndex(p => p.id === 'experience') },
    { label: 'Overview', badge: undefined, targetIndex: pages.findIndex(p => p.id === 'overview') },
    { label: 'Contact', badge: undefined, targetIndex: pages.findIndex(p => p.id === 'contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'py-3 bg-[#030712]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl shadow-black/40'
            : 'py-3 bg-white/85 backdrop-blur-2xl border-b border-slate-200/80 shadow-md shadow-slate-200/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ── Left: "Available for New Project" Pill (Image 2 exact style) ── */}
          <button
            onClick={() => onGoToPage?.(0)}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/[0.1] shadow-sm backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              Available for New Project
            </span>
          </button>

          {/* ── Center: Editorial Nav Links (Work [15+], Service [6], Experience [2y+], Contact) ── */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const idx = item.targetIndex >= 0 ? item.targetIndex : 0;
              const isActive = activePage === idx;

              return (
                <button
                  key={item.label}
                  onClick={() => onGoToPage?.(idx)}
                  className={`text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 hover:opacity-100 ${
                    isActive
                      ? isDark
                        ? 'text-white'
                        : 'text-slate-950 font-black'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-normal">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── Right: Theme Toggle + Resume + "Let's Talk ↗" Pill Button ── */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                isDark
                  ? 'bg-white/[0.05] border-white/[0.08] text-amber-400 hover:bg-amber-500/10'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-600 shadow-sm'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume button */}
            <button
              onClick={onOpenResume}
              className={`px-3.5 py-2 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all duration-200 border cursor-pointer ${
                isDark
                  ? 'text-slate-300 hover:text-white bg-white/[0.05] border-white/[0.08]'
                  : 'text-slate-700 hover:text-slate-900 bg-white border-slate-200 shadow-sm'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-cyan-500" />
              <span>Resume</span>
            </button>

            {/* "Let's Talk ↗" Black Pill Button (Exact match from reference image) */}
            <button
              onClick={onOpenHireMe}
              className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs shadow-lg flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isDark ? 'bg-white/[0.06] border-white/[0.08] text-amber-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isDark ? 'bg-white/[0.06] border-white/[0.08] text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className={`sm:hidden mt-2 mx-4 rounded-2xl p-4 border backdrop-blur-2xl animate-scale-in space-y-3 ${
          isDark ? 'bg-[#080d1a]/95 border-white/[0.08] shadow-2xl' : 'bg-white/95 border-slate-200 shadow-xl'
        }`}>
          <div className="space-y-1">
            {navItems.map((item) => {
              const idx = item.targetIndex >= 0 ? item.targetIndex : 0;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onGoToPage?.(idx);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold rounded-xl flex items-center justify-between text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                >
                  <span>{item.label}</span>
                  {item.badge && <span className="text-[10px] text-slate-400">{item.badge}</span>}
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-slate-200 dark:border-white/[0.06] flex gap-2">
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200"
            >
              Resume
            </button>
            <button
              onClick={() => {
                onOpenHireMe();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900"
            >
              Let's Talk ↗
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

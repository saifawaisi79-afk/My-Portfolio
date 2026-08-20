import React from 'react';
import { 
  ArrowUp, 
  Heart, 
  Mail, 
  Phone,
  Code2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

// Custom SVG Icons for LinkedIn & GitHub
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

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/90 dark:bg-[#05070a] border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-500/20">
                MS
              </div>
              <div>
                <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  Mohammed Saifuddin
                </span>
                <p className="text-xs text-blue-600 dark:text-cyan-400 font-mono">
                  Senior Full Stack Developer
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Designing, building, and deploying scalable web architectures, enterprise HRMS/CRMs, e-commerce, and high-conversion software solutions.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-cyan-300 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-300 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Call Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-slate-300 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#experience" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">
                  Experience & Timeline
                </a>
              </li>
              <li>
                <a href="#skills" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">
                  Skills & Tech Matrix
                </a>
              </li>
              <li>
                <a href="#projects" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#freelance" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">
                  Freelance & Cost Calculator
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">
                  Contact & Hire Me
                </a>
              </li>
            </ul>
          </div>

          {/* Live System Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-slate-300 uppercase tracking-wider">
              Status & Engagement
            </h4>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Open for Q3/Q4 Projects</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Accepting new freelance contracts, MVP sprints, and technical advisory roles.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Location: Bangalore (IST)</span>
                <span>Available Worldwide</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Mohammed Saifuddin. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>& TypeScript.</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400">
              <Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>React 18 + Tailwind CSS + Lucide Icons</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px]">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

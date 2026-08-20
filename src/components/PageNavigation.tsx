import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PAGES } from '../Layout';

interface PageNavigationProps {
  currentPath: string;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const currentIndex = PAGES.findIndex((p) => p.path === currentPath);

  const prevPage = currentIndex > 0 ? PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1] : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 dark:border-white/[0.08] pt-8">
        {prevPage ? (
          <button
            onClick={() => navigate(prevPage.path)}
            className="group flex items-center gap-3 px-5 py-3 rounded-2xl glass-panel hover:border-blue-500/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02] w-full sm:w-auto"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
                Previous Page
              </div>
              <div className="text-sm font-bold">{prevPage.label}</div>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextPage && (
          <button
            onClick={() => navigate(nextPage.path)}
            className="group flex items-center justify-between sm:justify-start gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold transition-all duration-300 cursor-pointer shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-95 w-full sm:w-auto ml-auto"
          >
            <div className="text-right sm:text-left">
              <div className="text-[10px] uppercase font-mono tracking-wider text-white/80">
                Next Page
              </div>
              <div className="text-sm font-black">{nextPage.label}</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

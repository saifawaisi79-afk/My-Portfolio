import React, { useState } from 'react';

interface Page {
  id: string;
  label: string;
  sectionId: string;
}

interface PageIndicatorProps {
  pages: Page[];
  activePage: number;
  onGoToPage: (index: number) => void;
  theme: 'dark' | 'light';
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({
  pages,
  activePage,
  onGoToPage,
  theme,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isDark = theme === 'dark';

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-2.5">
      {pages.map((page, index) => {
        const isActive = activePage === index;
        const isHovered = hoveredIndex === index;

        return (
          <button
            key={page.id}
            onClick={() => onGoToPage(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative flex items-center gap-2 group cursor-pointer"
            aria-label={`Go to ${page.label}`}
            title={page.label}
          >
            {/* Label (appears on hover) */}
            <span
              className={`text-[11px] font-mono font-bold tracking-wider transition-all duration-300 whitespace-nowrap ${
                isHovered || isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2 pointer-events-none'
              } ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              {String(index + 1).padStart(2, '0')} {page.label}
            </span>

            {/* Dot */}
            <div
              className={`relative flex items-center justify-center transition-all duration-300 ${
                isActive ? 'w-5 h-5' : 'w-3 h-3'
              }`}
            >
              {/* Outer ring for active */}
              {isActive && (
                <div className={`absolute inset-0 rounded-full border-2 animate-pulse-scale ${
                  isDark ? 'border-cyan-400/40' : 'border-blue-500/40'
                }`} />
              )}

              {/* Core dot */}
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? `w-3 h-3 ${isDark ? 'bg-cyan-400' : 'bg-blue-600'} shadow-lg ${isDark ? 'shadow-cyan-400/50' : 'shadow-blue-500/30'}`
                    : isHovered
                      ? `w-2.5 h-2.5 ${isDark ? 'bg-slate-400' : 'bg-slate-500'}`
                      : `w-1.5 h-1.5 ${isDark ? 'bg-slate-600' : 'bg-slate-400'}`
                }`}
              />
            </div>
          </button>
        );
      })}

      {/* Vertical line connecting dots */}
      <div
        className={`absolute right-[9px] top-0 bottom-0 w-px -z-10 ${
          isDark ? 'bg-white/[0.06]' : 'bg-slate-200'
        }`}
      />
    </div>
  );
};

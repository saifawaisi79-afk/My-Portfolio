import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { PageIndicator } from './components/PageIndicator';
import { ResumeModal } from './components/ResumeModal';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { FloatingBackground } from './components/FloatingBackground';

export const PAGES = [
  { id: 'home',       label: 'Home',       path: '/' },
  { id: 'overview',   label: 'Overview',   path: '/overview' },
  { id: 'experience', label: 'Experience', path: '/experience' },
  { id: 'skills',     label: 'Skills',     path: '/skills' },
  { id: 'projects',   label: 'Projects',   path: '/projects' },
  { id: 'freelance',  label: 'Freelance',  path: '/freelance' },
  { id: 'contact',    label: 'Contact',    path: '/contact' },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  // Theme sync
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Cursor spotlight (dark only)
  useEffect(() => {
    if (theme !== 'dark') return;
    const handleMouse = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [theme]);

  // Keyboard navigation between pages
  useEffect(() => {
    const currentIndex = PAGES.findIndex(p => p.path === location.pathname);
    const handleKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const next = PAGES[currentIndex + 1];
        if (next) goToPage(next.path);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prev = PAGES[currentIndex - 1];
        if (prev) goToPage(prev.path);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const mainEl = document.querySelector('.page-main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  const goToPage = (path: string) => {
    if (path === location.pathname) return;
    navigate(path);
  };


  const activePage = PAGES.findIndex(p => p.path === location.pathname);
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative h-screen overflow-hidden ${
        isDark
          ? 'bg-[#050811] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
          : 'bg-[#f0f4ff] text-slate-900 selection:bg-blue-500/20 selection:text-blue-700'
      }`}
    >
      {/* Cursor Spotlight */}
      {isDark && <div ref={cursorRef} className="cursor-spotlight" aria-hidden="true" />}

      {/* Interactive Floating Particles, Constellations & Code Tokens Background */}
      <FloatingBackground theme={theme} />

      {/* Fixed Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme(p => p === 'dark' ? 'light' : 'dark')}
        onOpenHireMe={() => goToPage('/freelance')}
        onOpenResume={() => setIsResumeOpen(true)}
        activePage={activePage < 0 ? 0 : activePage}
        onGoToPage={(i) => goToPage(PAGES[i].path)}
        pages={PAGES.map(p => ({ id: p.id, label: p.label, sectionId: p.id }))}
      />

      {/* Page Indicator Dots */}
      <PageIndicator
        pages={PAGES.map(p => ({ id: p.id, label: p.label, sectionId: p.id }))}
        activePage={activePage < 0 ? 0 : activePage}
        onGoToPage={(i) => goToPage(PAGES[i].path)}
        theme={theme}
      />

      {/* Page content with Framer Motion AnimatePresence */}
      <main
        className="page-main"
        style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', paddingTop: '64px' }}
      >
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} context={{ theme, goToPage, onOpenResume: () => setIsResumeOpen(true) }} />
        </AnimatePresence>
      </main>

      {/* Page counter bottom-left */}
      <div
        className={`fixed bottom-6 left-8 z-50 font-mono text-xs font-bold hidden md:flex items-center gap-3 pointer-events-none ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}
      >
        <span className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {String((activePage < 0 ? 0 : activePage) + 1).padStart(2, '0')}
        </span>
        <div className={`w-8 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
        <span>{String(PAGES.length).padStart(2, '0')}</span>
      </div>

      {/* Floating Action Stack & WhatsApp Auto 5-Sec Popup */}
      <FloatingContactWidget />

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

export default Layout;

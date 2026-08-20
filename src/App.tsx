import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { FreelancerPortal } from './components/FreelancerPortal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PageIndicator } from './components/PageIndicator';
import { ResumeModal } from './components/ResumeModal';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { FloatingBackground } from './components/FloatingBackground';
import { AutoLeadModal } from './components/AutoLeadModal';


export const SECTIONS = [
  { id: 'home',       label: 'Home',       sectionId: 'home' },
  { id: 'overview',   label: 'Overview',   sectionId: 'overview' },
  { id: 'experience', label: 'Experience', sectionId: 'experience' },
  { id: 'skills',     label: 'Skills',     sectionId: 'skills' },
  { id: 'projects',   label: 'Projects',   sectionId: 'projects' },
  { id: 'freelance',  label: 'Freelance',  sectionId: 'freelance' },
  { id: 'contact',    label: 'Contact',    sectionId: 'contact' },
];

export function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  // Theme synchronization
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

  // Scroll Progress and Scroll Spy for active section
  useEffect(() => {
    const handleScroll = () => {
      // Progress calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Scroll Spy detection
      const scrollPosition = window.scrollY + 250;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].sectionId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSectionIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (index: number) => {
    const section = SECTIONS[index];
    if (!section) return;
    const el = document.getElementById(section.sectionId);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
      setActiveSectionIndex(index);
    }
  };

  const scrollToId = (id: string) => {
    const idx = SECTIONS.findIndex(s => s.id === id || s.sectionId === id);
    if (idx !== -1) {
      scrollToSection(idx);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative min-h-screen ${
        isDark
          ? 'bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
          : 'bg-[#f8fafc] text-slate-900 selection:bg-blue-500/20 selection:text-blue-700'
      }`}
    >
      {/* Top Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Cursor Spotlight */}
      {isDark && <div ref={cursorRef} className="cursor-spotlight" aria-hidden="true" />}

      {/* Floating Particle Cosmos & Code Tokens Background */}
      <FloatingBackground theme={theme} />

      {/* Fixed Header Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme(p => (p === 'dark' ? 'light' : 'dark'))}
        onOpenHireMe={() => scrollToId('freelance')}
        onOpenResume={() => setIsResumeOpen(true)}
        activePage={activeSectionIndex}
        onGoToPage={(i) => scrollToSection(i)}
        pages={SECTIONS}
      />

      {/* Right Fixed Page Indicator Dots */}
      <PageIndicator
        pages={SECTIONS}
        activePage={activeSectionIndex}
        onGoToPage={(i) => scrollToSection(i)}
        theme={theme}
      />

      {/* ── All Continuous Sections in One Layout ───────────────────── */}
      <main className="relative z-10 space-y-12 sm:space-y-20 pt-20">
        
        {/* Section 1: Hero */}
        <section id="home" className="scroll-mt-24">
          <Hero
            onOpenHireMe={() => scrollToId('freelance')}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </section>

        {/* Section 2: Bento Metrics & Testimonials */}
        <section id="overview" className="scroll-mt-24">
          <StatsBar fullPage={true} />
        </section>


        {/* Section 3: Experience Timeline */}
        <section id="experience" className="scroll-mt-24">
          <Experience />
        </section>

        {/* Section 4: Technical Skills Matrix */}
        <section id="skills" className="scroll-mt-24">
          <Skills />
        </section>

        {/* Section 5: Projects & Case Studies */}
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>

        {/* Section 6: Freelance Portal & Scope Calculator */}
        <section id="freelance" className="scroll-mt-24">
          <FreelancerPortal />
        </section>

        {/* Section 7: Contact Form */}
        <section id="contact" className="scroll-mt-24">
          <ContactSection />
        </section>

        {/* Footer */}
        <Footer />
      </main>

      {/* 5-Second Auto Project Inquiry Lead Capture Modal */}
      <AutoLeadModal delayMs={5000} />

      {/* Floating Action Stack */}
      <FloatingContactWidget />

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}


export default App;

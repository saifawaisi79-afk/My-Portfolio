import React, { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  Layers
} from 'lucide-react';

import { projects } from '../data/portfolioData';

import type { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Enterprise SaaS', 'CRM & Portals', 'E-Commerce', 'Web Apps & SEO'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-24 overflow-hidden"
    >
      {/* ── Background Giant Watermark ── */}
      <div className="absolute inset-x-0 top-10 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden w-full opacity-10 dark:opacity-15">
        <div className="flex items-center justify-center gap-4 sm:gap-8 whitespace-nowrap text-center">
          <span className="text-stroke-outline font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase">
            FEATURED
          </span>
          <span className="font-black tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[140px] uppercase text-slate-900 dark:text-white">
            WORKS
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-12">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-white/[0.08]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span>[04 / Selected Projects]</span>
              <span>•</span>
              <span>15+ Production Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              FEATURED CASE STUDIES
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105'
                      : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Full Grid of All Projects (Zero Overlap) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="p-7 sm:p-9 rounded-3xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xl hover:shadow-2xl hover:border-slate-400 dark:hover:border-white/[0.2] transition-all duration-300 flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-4">
                
                {/* Header: Category & Number */}
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/[0.06]">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    [0{index + 1}]
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mt-2">
                    {project.description}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="space-y-2 pt-1">
                  {project.highlights.slice(0, 2).map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/[0.04]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between">
                <button
                  onClick={() => setSelectedModalProject(project)}
                  className="text-xs font-bold font-mono text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-cyan-500" />
                  <span>Architecture & Specs</span>
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-extrabold shadow-md flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Architecture Detail Modal */}
      {selectedModalProject && (
        <ProjectModal
          project={selectedModalProject}
          onClose={() => setSelectedModalProject(null)}
        />
      )}
    </section>
  );
};

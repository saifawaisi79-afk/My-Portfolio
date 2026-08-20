import React, { useEffect } from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  Phone, 
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2
} from 'lucide-react';
import { personalInfo, experiences, projects, skillCategories } from '../data/portfolioData';

// Custom SVG Icons for LinkedIn & GitHub
const LinkedInIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.79v-7.6H6.46M7.86 6.5a1.63 1.63 0 0 0-1.64 1.63 1.63 1.63 0 1 0 3.27 0A1.63 1.63 0 0 0 7.86 6.5Z"/>
  </svg>
);

const GitHubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Official Resume — Mohammed Saifuddin
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable & Interactive Resume Paper Container */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900 space-y-6 print:p-0 print:m-0 font-sans select-text">
          
          {/* Header Section */}
          <div className="text-center space-y-2 border-b border-slate-200 pb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {personalInfo.name}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-700 font-medium">
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:text-blue-600">
                <Phone className="w-3 h-3 text-slate-500" />
                <span>{personalInfo.phone}</span>
              </a>
              <span>|</span>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-blue-600">
                <Mail className="w-3 h-3 text-slate-500" />
                <span>{personalInfo.email}</span>
              </a>
              <span>|</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                <LinkedInIcon className="w-3 h-3 text-slate-500" />
                <span>linkedin.com/in/md-saif-uddin-/</span>
              </a>
              <span>|</span>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                <GitHubIcon className="w-3 h-3 text-slate-500" />
                <span>github.com/saifawaisi79-afkadd</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-700" />
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {personalInfo.bio}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-700" />
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{personalInfo.education.institution}</span>
                <p className="text-slate-700 italic">{personalInfo.education.degree}</p>
              </div>
              <span className="text-slate-600 font-medium">{personalInfo.education.period}</span>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-700" />
              Experience
            </h2>

            {experiences.map((exp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{exp.role}</span>
                    <p className="text-slate-800 font-semibold">{exp.company}, {exp.location}</p>
                  </div>
                  <span className="text-slate-600 font-medium font-mono">{exp.period}</span>
                </div>

                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700 leading-relaxed">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-blue-700" />
              Projects
            </h2>

            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1 text-xs">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{proj.title}</span>
                    {proj.liveUrl && (
                      <a 
                        href={proj.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline flex items-center gap-0.5 font-mono text-[11px]"
                      >
                        ({proj.liveUrl}) <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="text-slate-800 font-medium">
                  <span className="font-semibold text-slate-900">Technologies:</span> {proj.technologies.join(', ')}
                </div>

                <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-700 leading-relaxed">
                  {proj.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-700" />
              Technical Skills
            </h2>

            <div className="space-y-1 text-xs text-slate-800">
              {skillCategories.map((cat) => (
                <div key={cat.title}>
                  <span className="font-bold text-slate-900">{cat.title}:</span>{' '}
                  <span className="text-slate-700">{cat.skills.map(s => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3.5 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Mohammed Saifuddin • Resume 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};

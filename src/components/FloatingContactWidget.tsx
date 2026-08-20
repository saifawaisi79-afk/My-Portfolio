import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  X, 
  Send, 
  Smile, 
  Zap,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

// Custom SVG Icons
const WhatsAppLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.16 8.16 0 0 1-1.25-4.46c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.45-.04 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/>
  </svg>
);

const LinkedInLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.79v-7.6H6.46M7.86 6.5a1.63 1.63 0 0 0-1.64 1.63 1.63 1.63 0 1 0 3.27 0A1.63 1.63 0 0 0 7.86 6.5Z"/>
  </svg>
);

export const FloatingContactWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email'>('whatsapp');
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [currentTime, setCurrentTime] = useState('Just now');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Automatically trigger popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        setIsChatOpen(true);
        setIsExpanded(false); // keep stacked buttons hidden so there is ZERO overlap
        setHasAutoOpened(true);
        try {
          confetti({
            particleCount: 45,
            spread: 55,
            origin: { x: 0.9, y: 0.82 },
            colors: ['#25D366', '#00A884', '#60a5fa', '#8b5cf6', '#f59e0b']
          });
        } catch { /* safe fallback */ }
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  // Update timestamp
  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { x: 0.88, y: 0.75 },
        colors: ['#25D366', '#06b6d4', '#3b82f6', '#ec4899']
      });
    } catch { /* safe fallback */ }

    if (activeTab === 'whatsapp') {
      const textToSend = chatMessage.trim() || `Hello Saifuddin! My name is ${senderName || 'A Client'}. I visited your portfolio and would like to discuss a project.`;
      const encoded = encodeURIComponent(textToSend);
      window.open(`https://wa.me/${personalInfo.rawPhone}?text=${encoded}`, '_blank');
    } else {
      const subject = encodeURIComponent(`Project Inquiry from ${senderName || 'Portfolio Visitor'}`);
      const body = encodeURIComponent(`Hi Saifuddin,\n\nName: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${chatMessage || 'I would like to discuss a project with you.'}`);
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    }

    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
    setChatMessage('');
  };

  const handleQuickPrompt = (prompt: string) => {
    setChatMessage(prompt);
  };

  const handleToggleMain = () => {
    if (isChatOpen) {
      // Close the chat popup
      setIsChatOpen(false);
      setIsExpanded(false);
    } else {
      // Toggle circular action stack
      setIsExpanded(!isExpanded);
    }
  };

  const handleOpenWhatsAppChat = () => {
    setIsChatOpen(true);
    setIsExpanded(false); // ensure action buttons hide when chat opens
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto select-none">
      
      {/* ── WhatsApp / Quick Inquiry Chat Popup Modal ─────────────── */}
      {isChatOpen && (
        <div className="w-[330px] sm:w-[380px] rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/40 dark:border-emerald-500/30 bg-white/95 dark:bg-[#0b1120]/95 backdrop-blur-2xl animate-scale-in mb-2 transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00A884] via-[#059669] to-[#047857] text-white p-4 flex items-center justify-between shadow-lg relative overflow-hidden">
            {/* Ambient shine */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-md">
                  <WhatsAppLogo className="w-6 h-6 fill-white text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#00A884] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm flex items-center gap-1.5 leading-tight tracking-tight">
                  Let's chat on WhatsApp
                </h4>
                <p className="text-[11px] text-emerald-100/90 font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                  Mohammed Saifuddin • Active Now
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer text-white"
                title="Minimize chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-100 dark:bg-white/[0.04] p-1 border-b border-slate-200/80 dark:border-white/[0.06] text-xs font-bold">
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <WhatsAppLogo className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'email'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Email</span>
            </button>
          </div>

          {/* Body with Chat Bubble */}
          <div className="p-4 space-y-3 bg-[#f8fafc]/90 dark:bg-[#070b14]/95 min-h-[160px] flex flex-col justify-end">
            
            {/* Response Time Badge */}
            <div className="self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
              <Clock className="w-3 h-3" />
              <span>Typical reply time: within 1-2 hours</span>
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            </div>

            {/* Greeting Balloon */}
            <div className="self-start max-w-[95%] bg-white dark:bg-[#1a2336] p-3.5 rounded-2xl rounded-tl-sm shadow-md border border-slate-200/80 dark:border-white/[0.08] space-y-1 animate-fade-up">
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                Welcome to Saifuddin's Portfolio! How can I help you build or scale your product today? 🚀
              </p>
              <span className="text-[10px] text-slate-400 dark:text-slate-400 font-mono block text-right">
                {currentTime}
              </span>
            </div>

            {/* Quick response chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => handleQuickPrompt("Hi Saifuddin! I'd like to hire you for a Full-Stack Web App.")}
                className="text-[11px] font-semibold bg-white dark:bg-white/[0.06] hover:bg-emerald-50 dark:hover:bg-emerald-500/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
              >
                💼 Full-Stack Web App
              </button>
              <button
                onClick={() => handleQuickPrompt("Hello, are you open to Enterprise CRM / HRMS consultation?")}
                className="text-[11px] font-semibold bg-white dark:bg-white/[0.06] hover:bg-emerald-50 dark:hover:bg-emerald-500/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
              >
                ⚡ Enterprise CRM / SaaS
              </button>
              <button
                onClick={() => handleQuickPrompt("Hi, let's schedule a quick 15-min discovery call!")}
                className="text-[11px] font-semibold bg-white dark:bg-white/[0.06] hover:bg-emerald-50 dark:hover:bg-emerald-500/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
              >
                📞 Discovery Call
              </button>
            </div>
          </div>

          {/* Form & Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#0d1322] border-t border-slate-200 dark:border-white/[0.08] space-y-2">
            
            {activeTab === 'email' && (
              <div className="grid grid-cols-2 gap-2 animate-fade-up">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickPrompt("👋 Hi Saifuddin, let's connect regarding a new project!")}
                className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1.5 rounded-full transition-colors cursor-pointer"
                title="Add wave greeting"
              >
                <Smile className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder={activeTab === 'whatsapp' ? "Write your message..." : "Message details..."}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
              />

              <button
                type="submit"
                className={`w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer shrink-0 ${
                  activeTab === 'whatsapp'
                    ? 'bg-gradient-to-r from-[#00A884] to-[#059669] hover:from-[#008f70] hover:to-[#047857] shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-blue-500/30'
                }`}
                title={activeTab === 'whatsapp' ? "Send to WhatsApp" : "Send Email"}
              >
                <Send className="w-4 h-4 translate-x-0.5" />
              </button>
            </div>

            {isSent && (
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 animate-scale-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Redirecting to {activeTab === 'whatsapp' ? 'WhatsApp' : 'Email'}...</span>
              </div>
            )}
          </form>

          {/* Footer Direct Contact Shortcuts */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#080d1a] border-t border-slate-200/60 dark:border-white/[0.04] flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
            >
              <LinkedInLogo className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="flex items-center gap-1.5 hover:text-pink-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-pink-500" />
              <span>Email</span>
            </a>
            <a 
              href={`tel:${personalInfo.phone}`} 
              className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>Call</span>
            </a>
          </div>
        </div>
      )}

      {/* ── Stacked Floating Action Buttons (Hidden when Chat Popup is open to prevent any overlap) ── */}
      {!isChatOpen && isExpanded && (
        <div className="flex flex-col items-end gap-3 mb-1 animate-fade-up">
          
          {/* Phone Call (Black Circle) */}
          <div className="flex items-center gap-2.5 group">
            <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none -translate-x-1 group-hover:translate-x-0">
              Call {personalInfo.phone}
            </span>
            <a
              href={`tel:${personalInfo.phone}`}
              className="w-12 h-12 rounded-full bg-[#1c1d22] hover:bg-black text-white flex items-center justify-center shadow-xl shadow-black/30 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20 group cursor-pointer"
              title={`Call Saifuddin (${personalInfo.phone})`}
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </div>

          {/* WhatsApp (Green Circle) */}
          <div className="flex items-center gap-2.5 group">
            <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none -translate-x-1 group-hover:translate-x-0">
              WhatsApp Live Chat
            </span>
            <button
              onClick={handleOpenWhatsAppChat}
              className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl shadow-emerald-500/35 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30 group cursor-pointer"
              title="Open WhatsApp Chat"
            >
              <WhatsAppLogo className="w-6 h-6 fill-white text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Email (Pink/Red Circle) */}
          <div className="flex items-center gap-2.5 group">
            <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-[#FF3366] text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none -translate-x-1 group-hover:translate-x-0">
              Send Direct Email
            </span>
            <a
              href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20from%20Portfolio`}
              className="w-12 h-12 rounded-full bg-[#FF3366] hover:bg-[#e62254] text-white flex items-center justify-center shadow-xl shadow-rose-500/35 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30 group cursor-pointer"
              title={`Email Saifuddin (${personalInfo.email})`}
            >
              <Mail className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* LinkedIn Profile */}
          <div className="flex items-center gap-2.5 group">
            <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-[#0077B5] text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none -translate-x-1 group-hover:translate-x-0">
              LinkedIn Profile
            </span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#0077B5] hover:bg-[#006097] text-white flex items-center justify-center shadow-xl shadow-blue-500/35 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30 group cursor-pointer"
              title="View LinkedIn Profile"
            >
              <LinkedInLogo className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      )}

      {/* ── Main Trigger Toggle Button (Purple Squircle with Gold Border) ── */}
      <button
        onClick={handleToggleMain}
        className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7c3aed] to-[#8b5cf6] hover:from-[#6d28d9] hover:to-[#7c3aed] text-white flex items-center justify-center shadow-2xl shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-[#f59e0b] group ring-2 ring-purple-500/20"
        aria-label="Toggle Contact Dock"
        title={isChatOpen ? "Close chat" : isExpanded ? "Close actions" : "Reach Out to Saifuddin"}
      >
        {isChatOpen || isExpanded ? (
          <X className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            {/* Notification ping */}
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white dark:border-black text-[9px] font-bold text-white items-center justify-center">1</span>
            </span>
          </>
        )}
      </button>

    </div>
  );
};

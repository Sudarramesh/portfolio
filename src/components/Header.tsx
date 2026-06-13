import React from 'react';
import { Menu, User, Bell, Briefcase, Mail, Cpu, FolderGit2, FileText, Sparkles } from 'lucide-react';
import { Language } from '../data/translations';

interface HeaderProps {
  onToggleMenu: () => void;
  onNavigate: (tab: 'about' | 'resume' | 'projects' | 'ai-twin' | 'contact') => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleMenu, 
  onNavigate, 
  activeTab,
}) => {
  return (
    <>
      {/* Top Professional Ticker Banner */}
      <div className="fixed top-0 w-full z-50 bg-[#0a192f] text-white text-[11px] h-9 overflow-hidden border-b border-white/5 flex items-center font-mono">
        <div className="relative flex items-center w-full overflow-hidden">
          <div className="absolute left-0 z-10 bg-amber-500 text-[#0a192f] px-3 py-1 text-[10px] uppercase font-black tracking-widest h-full flex items-center shadow-md">
            LATEST UPDATES
          </div>
          <div className="animate-ticker flex whitespace-nowrap pl-32">
            <span className="mx-10 flex items-center gap-1.5 text-slate-350">
              <Sparkles size={11} className="text-amber-400 animate-pulse shrink-0" />
              Sudar Ramesh's portfolios are live! Check out my integrated full-stack Welfare Finder project.
            </span>
            <span className="mx-10 flex items-center gap-1.5 text-slate-350">
              <Cpu size={11} className="text-amber-400 shrink-0" />
              Interactive Chat initialized — You can now talk directly with my AI Digital Twin leveraging Gemini 3.5.
            </span>
            <span className="mx-10 flex items-center gap-1.5 text-slate-350">
              <Briefcase size={11} className="text-amber-400 shrink-0" />
              Graduating Class of 2026 — Open for internship extensions, AI Engineering, and Data Analysis roles.
            </span>
            <span className="mx-10 flex items-center gap-1.5 text-slate-350">
              <Mail size={11} className="text-amber-400 shrink-0" />
              Connect instantly via email: <span className="text-amber-400 font-bold">sudarramesh541@gmail.com</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Professional Top Bar */}
      <header className="fixed top-9 w-full z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 h-16 shadow-lg text-white">
        <div className="flex justify-between items-center px-4 md:px-8 h-full w-full max-w-7xl mx-auto">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMenu}
              className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer md:hidden"
              title="Menu"
              id="header-menu-btn"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col cursor-pointer text-left" onClick={() => onNavigate('about')}>
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-[18px] font-black text-white tracking-wider uppercase leading-none">
                  SUDAR<span className="text-amber-400">RAMESH</span>
                </span>
                <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30 font-bold font-mono">
                  AI & DATA
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase leading-tight mt-0.5">
                PORTFOLIO WEBSITE
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('about')}
              className={`text-[13px] font-bold tracking-wide uppercase transition-colors cursor-pointer flex items-center gap-1.5 py-1 ${
                activeTab === 'about' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <User size={14} />
              About
            </button>
            <button
              onClick={() => onNavigate('resume')}
              className={`text-[13px] font-bold tracking-wide uppercase transition-colors cursor-pointer flex items-center gap-1.5 py-1 ${
                activeTab === 'resume' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText size={14} />
              Resume
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className={`text-[13px] font-bold tracking-wide uppercase transition-colors cursor-pointer flex items-center gap-1.5 py-1 ${
                activeTab === 'projects' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderGit2 size={14} />
              Featured Projects
            </button>
            <button
              onClick={() => onNavigate('ai-twin')}
              className={`text-[13px] font-bold tracking-wide uppercase transition-colors cursor-pointer flex items-center gap-1.5 py-1 ${
                activeTab === 'ai-twin' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu size={14} className="text-indigo-400" />
              Chat AI Twin
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`text-[13px] font-bold tracking-wide uppercase transition-colors cursor-pointer flex items-center gap-1.5 py-1 ${
                activeTab === 'contact' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail size={14} />
              Contact
            </button>
          </nav>

          {/* User Controls / Quick Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('ai-twin')}
              className="relative hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white rounded-full py-1.5 px-4 text-xs font-black tracking-wide uppercase shadow-lg shadow-indigo-900/30 border border-indigo-400/20 cursor-pointer transition-all active:scale-95"
            >
              <Sparkles size={12} className="animate-pulse" />
              <span>Talk to AI Twin</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-1.5 rounded-xl text-xs font-black tracking-wide uppercase bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all cursor-pointer text-slate-300"
            >
              Hire Me
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

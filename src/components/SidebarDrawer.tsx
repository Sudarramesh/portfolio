import React from 'react';
import { X, User, FileText, FolderGit2, Cpu, Mail, PhoneCall, ShieldCheck } from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: 'about' | 'resume' | 'projects' | 'ai-twin' | 'contact') => void;
  activeTab: string;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  activeTab,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'resume', label: 'Resume & Skills', icon: FileText },
    { id: 'projects', label: 'Featured Projects', icon: FolderGit2 },
    { id: 'ai-twin', label: 'Chat with AI Twin', icon: Cpu },
    { id: 'contact', label: 'Get in Touch', icon: Mail },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Slide drawer container */}
      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-80 bg-slate-900 text-white shadow-2xl flex flex-col h-full transform transition ease-in-out duration-300 border-r border-slate-800">
          {/* Header */}
          <div className="px-5 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-white tracking-tight leading-none text-lg">
                SUDAR RAMESH
              </span>
              <span className="text-[10px] text-amber-500 uppercase font-bold tracking-widest mt-1">
                AI & Data Engineer
              </span>
            </div>
            <button
              id="sidebar-drawer-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links Section */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-2 text-left">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
              Navigation
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as any);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-slate-950' : 'text-amber-500'} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}

            <div className="pt-6 border-t border-slate-800 mt-6 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
                Available Positions
              </div>
              
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-1 text-xs text-slate-300">
                <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                  Full-Time Hiring
                </span>
                <p className="text-slate-400 leading-relaxed mt-1">
                  Ready to deploy immediately for AI/ML development, dashboard analysis, or backend engineering positions.
                </p>
              </div>

              <div className="p-3.5 bg-amber-500/5 rounded-xl border border-amber-500/10 flex flex-col gap-1 text-xs text-slate-300">
                <span className="font-semibold text-amber-500 flex items-center gap-1.5">
                  <PhoneCall size={14} />
                  Direct Contact
                </span>
                <span className="font-mono text-sm font-bold text-amber-400 tracking-wide mt-1">
                  +91-7604882003
                </span>
                <span className="text-xs text-slate-500">
                  Tirunelveli, India
                </span>
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="p-5 border-t border-slate-800 bg-slate-950 text-center">
            <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
              🇮🇳 AI Portfolio System v1.5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

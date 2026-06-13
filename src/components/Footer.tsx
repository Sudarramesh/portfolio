import React from 'react';
import { Landmark, ArrowRight, ShieldCheck, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

interface FooterProps {
  displaySource?: 'portfolio' | 'welfare';
}

export const Footer: React.FC<FooterProps> = ({ displaySource = 'portfolio' }) => {
  if (displaySource === 'portfolio') {
    return (
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-12 border-t border-slate-800 text-left font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Column 1 Logo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-lg font-black text-white tracking-wider uppercase">
                SUDAR<span className="text-amber-400">RAMESH</span>
              </span>
              <span className="text-[9px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30 font-bold font-mono">
                AI / DATA
              </span>
            </div>
            <p className="text-xs text-slate-405 leading-relaxed max-w-sm">
              Highly motivated AI Engineer and Data Analyst. Specialized in constructing neural networks, pattern matching systems, and custom PowerBI business intelligence dashboards.
            </p>
          </div>

          {/* Column 2 Navigation Links */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-amber-500 uppercase font-bold tracking-widest text-[10px]">Matrix Directories</h4>
            <div className="grid grid-cols-1 gap-2">
              <span className="text-slate-400">Class of 2026</span>
              <span className="text-slate-405">B.Tech - AI & Data Science</span>
              <span className="text-slate-400">Tirunelveli, India</span>
            </div>
          </div>

          {/* Column 3 External Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-amber-500 uppercase font-black font-mono tracking-widest text-[10px]">Electronic Coordinates</h4>
            <div className="space-y-1.5 text-xs">
              <p className="flex items-center gap-2">
                <Mail size={12} className="text-amber-400" />
                <span className="font-mono text-[11px]">suderramesh541@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={12} className="text-amber-400" />
                <span className="font-mono text-[11px]">+91 7604992903</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={12} className="text-amber-400" />
                <span className="text-[11px] text-slate-400">Dalapathi Samuthiram, Tirunelveli, 627101</span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 pt-6 border-t border-slate-800 text-center font-mono text-[10px] text-slate-500">
          <span>© {new Date().getFullYear()} Sudar Ramesh. Constructed via Full-Stack React & Grounded Gemini. All rights reserved.</span>
        </div>
      </footer>
    );
  }

  return (
    <>
      {/* Tricolor Strip representing National Flag */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-green-600"></div>

      <footer className="bg-slate-900 text-white pt-12 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center text-xs text-slate-450 space-y-4">
          <p className="font-bold text-white uppercase tracking-wider">SarkariYojana Welfare Portal Project Demonstration</p>
          <p className="max-w-md mx-auto leading-relaxed text-[11px]">
            This is an interactive full-stack mock government service platform engineered to demonstrate database schema integrations and search-grounded LLM dynamic parsing.
          </p>
        </div>
      </footer>
    </>
  );
};

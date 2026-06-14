import React, { useState, useEffect, useRef } from 'react';
import { 
  Sprout, 
  HeartPulse, 
  GraduationCap, 
  Home as HomeIcon, 
  Heart, 
  Search, 
  CheckCircle, 
  BookmarkCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  PhoneCall, 
  FileCheck2, 
  Calculator, 
  User, 
  Award, 
  CreditCard, 
  Clock, 
  TrendingUp, 
  MapPin, 
  Activity,
  CheckCircle2,
  Cpu,
  Mail,
  FileText,
  FolderGit2,
  Github,
  Linkedin,
  Instagram,
  Briefcase,
  Trophy,
  Send,
  Download,
  Terminal,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { Header } from './components/Header';
import { SidebarDrawer } from './components/SidebarDrawer';
import { SchemeCard } from './components/SchemeCard';
import { SchemeDetailsModal } from './components/SchemeDetailsModal';
import { ApplyModal } from './components/ApplyModal';
import { EligibilityChecker } from './components/EligibilityChecker';
import { StatusTracker } from './components/StatusTracker';
import { Footer } from './components/Footer';
import { SCHEMES } from './data/schemes';
import { Language, TRANSLATIONS } from './data/translations';
import { Scheme, Application } from './types';

export default function App() {
  // Navigation Screens Tabs of the main Portfolio
  const [activeTab, setActiveTab] = useState<'about' | 'resume' | 'projects' | 'ai-twin' | 'contact'>('about');
  
  // Side Menu Drawer Toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sarkari Yojana Portal Sub-State (embedded active project)
  const [selectedDetailsScheme, setSelectedDetailsScheme] = useState<Scheme | null>(null);
  const [selectedApplyScheme, setSelectedApplyScheme] = useState<Scheme | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [applications, setApplications] = useState<Application[]>([]);
  const [trackedReferenceCode, setTrackedReferenceCode] = useState<string>('');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const t = TRANSLATIONS[currentLanguage];

  // Dynamic Schemes List loaded from localStorage / baseline
  const [allSchemes, setAllSchemes] = useState<Scheme[]>(() => {
    const saved = localStorage.getItem('sarkari_schemes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const combined = [...SCHEMES];
        parsed.forEach((item: Scheme) => {
          if (!combined.some(c => c.id === item.id)) {
            combined.push(item);
          }
        });
        return combined;
      } catch (e) {
        return SCHEMES;
      }
    }
    return SCHEMES;
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  // Sychronization call via the Search Grounded Gemini API server endpoint
  const handleSyncRecentSchemes = async () => {
    setIsSyncing(true);
    setSyncMessage('');
    try {
      const response = await fetch('/api/ai/sync-schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server returned an error');
      }
      const data = await response.json();
      if (data.schemes && Array.isArray(data.schemes) && data.schemes.length > 0) {
        const newSchemes: Scheme[] = data.schemes.filter(
          (newS: Scheme) => !allSchemes.some((oldS) => oldS.id === newS.id)
        );

        if (newSchemes.length > 0) {
          const updated = [...allSchemes];
          newSchemes.forEach((s: Scheme) => updated.push(s));
          setAllSchemes(updated);
          localStorage.setItem('sarkari_schemes', JSON.stringify(updated));
          setSyncMessage(`Success! Synced ${newSchemes.length} new government schemes.`);
        } else {
          setSyncMessage('Already fully up to date with historical registries!');
        }
      } else {
        throw new Error('No new schemes found from AI research grounding.');
      }
    } catch (err: any) {
      console.error(err);
      setSyncMessage(`Sync error: ${err.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleResetSync = () => {
    setAllSchemes(SCHEMES);
    localStorage.removeItem('sarkari_schemes');
    setSyncMessage('Reverted to standard catalog.');
  };

  // Saved client-side applications persistence
  useEffect(() => {
    const savedApps = localStorage.getItem('sarkari_applications');
    if (savedApps) {
      try {
        setApplications(JSON.parse(savedApps));
      } catch (err) {
        console.error('Failed to parse saved applications details', err);
      }
    }
  }, []);

  const handleAddApplication = (newApp: Application) => {
    const updatedApps = [newApp, ...applications];
    setApplications(updatedApps);
    localStorage.setItem('sarkari_applications', JSON.stringify(updatedApps));
    setTrackedReferenceCode(newApp.referenceNumber);
    // Instant focus onto tracking widget
    const element = document.getElementById('tracking-widget');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Projects navigation sub-demo state
  const [selectedProject, setSelectedProject] = useState<'yojana' | 'driverassist' | 'powerbi' | 'chatbot-quiz' | null>('yojana');
  const powerBIProjects = [
  {
    title: "HR Analytics Dashboard",
    image: "/projects/hr-dashboard.png",
    description: "Employee attrition and workforce analytics."
  },
  {
    title: "Sales Analytics Dashboard",
    image: "/projects/sales-dashboard.png",
    description: "Sales KPIs and revenue insights."
  },
  {
    title: "Customer Dashboard",
    image: "/projects/customer-dashboard.png",
    description: "Customer segmentation and behavior analysis."
  },
  {
    title: "E-Commerce Dashboard",
    image: "/projects/ecommerce-dashboard.png",
    description: "Online sales and product performance."
  }
];
  // PowerBI Dashboard Interactive State
  const [powerBiFilter, setPowerBiFilter] = useState<'all' | 'retail' | 'corporate'>('all');
  const [powerBiView, setPowerBiView] = useState<'revenue' | 'volume'>('revenue');

  // AI Twin Chat Interactive State
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { 
      role: 'model', 
      content: "Hello! I am Sudar Ramesh's Digital AI Twin, powered by Gemini 3.5. I am initialized with all of Sudar's professional experience, achievements, and technical expertise. Feel free to ask me anything about his project execution, data analytic skills, education background at Rohini College, or coordinate accomplishments!" 
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendChatMessage = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || chatInput;
    if (!promptToSend.trim() || chatLoading) return;

    const userMessage = { role: 'user' as const, content: promptToSend };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/ai/chat-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reach Gemini server endpoint');
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'model', content: data.message }]);
    } catch (err: any) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: 'model', content: `Error: I had trouble reaching my primary core. Details: ${err.message}. Please verify the Gemini API key is configured.` }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Contact Form Simulated State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [savedMessagesList, setSavedMessagesList] = useState<{ name: string; email: string; msg: string; date: string }[]>(() => {
    const saved = localStorage.getItem('sudar_portfolio_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSendContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    const newMessage = {
      name: contactName,
      email: contactEmail,
      msg: contactMessage,
      date: new Date().toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newMessage, ...savedMessagesList];
    setSavedMessagesList(updated);
    localStorage.setItem('sudar_portfolio_messages', JSON.stringify(updated));

    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');

    // Trigger instant chat double notice of contact
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: `Thank you for sending your message! I've securely persisted your inquiry on my local storage buffer. I will reach out to you at ${newMessage.email} as soon as possible. Feel free to continue chatting with me here!`
        }
      ]);
    }, 1000);
  };

  // Helper smooth switch scroll
  const handleNavigate = (tab: 'about' | 'resume' | 'projects' | 'ai-twin' | 'contact') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter schemes
  const filteredSchemes = allSchemes.filter((scheme) => {
    const matchesCategory = activeCategory === 'All' || scheme.category.toLowerCase() === activeCategory.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      scheme.name.toLowerCase().includes(query) || 
      scheme.description.toLowerCase().includes(query) || 
      scheme.category.toLowerCase().includes(query) ||
      scheme.tags.some(tag => tag.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased selection:bg-amber-500 selection:text-slate-905">
      {/* Absolute top navbar and tickers */}
      <Header 
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        onNavigate={handleNavigate} 
        activeTab={activeTab} 
      />

      {/* Hamburger sidebar menu */}
      <SidebarDrawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={handleNavigate} 
        activeTab={activeTab} 
      />

      {/* Main Portfolio Container */}
      <main className="flex-1 pt-24 pb-16">
        
        {/* ================= ABOUT / HERO SECTION ================= */}
        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Profile Bio */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Sparkles size={14} className="animate-spin text-amber-500" />
                  <span className="text-[10px] uppercase font-black tracking-widest font-mono">Open for Roles & Projects</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
                  SUDAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 underline decoration-amber-500/20">RAMESH</span>
                </h1>
                
                <h2 className="text-lg md:text-xl font-mono text-indigo-400 font-bold tracking-wide">
                  AI Engineer | Software Developer & Data Scientist
                </h2>
                
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl">
                  Hello! I am a passionate, high-performance tech researcher specializing in 
                  <strong className="text-slate-200"> Artificial Intelligence, Deep Learning models, and relational Business Intelligence platforms</strong>. 
                  Currently completing my B.Tech in AI and Data Science from Rohini College of Engineering, I design intelligent full-stack applications and  I build AI, machine learning, and data analytics solutions that solve real-world problems.
                </p>

                {/* Grid stats cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 font-mono">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                    <div className="text-2xl font-black text-amber-400">500+</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">GitHub Commits</div>
                  </div>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                    <div className="text-2xl font-black text-indigo-400">5+</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Internships</div>
                  </div>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                    <div className="text-2xl font-black text-amber-400">50+</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Real-World Projects</div>
                  </div>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                    <div className="text-2xl font-black text-indigo-400">10+</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Certifications</div>
                  </div>
                </div>

                {/* Primary layout buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => handleNavigate('projects')}
                    className="px-6 py-3 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 shrink-0 cursor-pointer shadow-lg shadow-amber-550/10 flex items-center gap-2 transition-all active:scale-95"
                  >
                    <FolderGit2 size={14} />
                    <span>View Projects</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('ai-twin')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shrink-0 cursor-pointer shadow-md flex items-center gap-2 transition-all active:scale-95"
                  >
                    <Cpu size={14} className="animate-pulse" />
                    <span>Converse with AI Twin</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('contact')}
                    className="px-6 py-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl shrink-0 cursor-pointer flex items-center gap-2"
                  >
                    <Mail size={14} />
                    <span>Get in Touch</span>
                  </button>
                </div>
              </div>

              {/* Right Column Custom Vector Art Showcase Card */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="absolute w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl -top-10 -left-10 pointer-events-none"></div>
                <div className="absolute w-64 h-64 rounded-full bg-amber-500/5 blur-3xl -bottom-10 -right-10 pointer-events-none"></div>
                
                {/* Simulated Modern Developer Frame */}
                <div className="relative w-full max-w-[360px] bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-amber-400 to-orange-500"></div>
                  
                  {/* Top Bar Details */}
                  <div className="flex justify-between items-center mb-6 font-mono text-[9px] text-slate-500">
                    <span className="flex items-center gap-1.5"><Terminal size={10} /> developer-card.ts</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">ONLINE</span>
                  </div>

                  {/* Profile illustration avatar card styling */}
                  <div className="space-y-6 text-center">
                    <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 p-1 shadow-xl flex items-center justify-center">
                     <div className="w-full h-full bg-slate-950 rounded-full overflow-hidden">
                    <img src="/images/profile.png" alt="Sudar Ramesh" className="w-full h-full object-cover" />
                    </div>
                      <span className="absolute bottom-1 right-2 w-4.5 h-4.5 bg-green-500 border-2 border-slate-900 rounded-full animate-bounce"></span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white">Sudar Ramesh</h3>
                      <p className="text-xs text-slate-400 font-mono tracking-wider">Tirunelveli, Tamil Nadu, India</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 text-left space-y-2 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Language Fluency:</span>
                        <span className="font-bold text-slate-250">Tamil, English, Hindi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Interests:</span>
                        <span className="font-bold text-slate-250">Farming, Cricket, Kabaddi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Coordinate Focus:</span>
                        <span className="font-bold text-amber-400">Data Analytics & DL</span>
                      </div>
                    </div>

                    {/* Social coordinates */}
                    <div className="flex justify-center gap-4 pt-2">
                      <a href="https://github.com/Sudarramesh" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-955 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-colors">
                        <Github size={16} />
                      </a>
                      <a href="https://linkedin.com/in/Sudar Ramesh" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-955 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-colors">
                        <Linkedin size={16} />
                      </a>
                      <a href="https://naukri.com/Sudar Ramesh" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-950 hover:bg-slate-800 rounded-xl text-slate-450 hover:text-white border border-slate-800 font-mono text-[10px] font-bold px-3 transition-colors flex items-center">
                        Naukri
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Structured Skills Section */}
            <div className="border-t border-slate-900 pt-16 space-y-8 text-left">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <Cpu className="text-amber-400" size={22} />
                  Technical Competency Matrix
                </h3>
                <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                  These represent areas where I write software, construct workflows, and configure systems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Machine Learning & AI Modeling',
                    desc: 'Deep Learning models, Neural Networks, Supervised/Unsupervised categorization, predictive math, Python tooling.',
                    level: 'Advanced',
                    color: 'text-indigo-400',
                    icon: Cpu,
                    iconBg: 'bg-indigo-950 text-indigo-300'
                  },
                  {
                    title: 'Data Science & Metrics Dashboards',
                    desc: 'Relational data cleaning, formulation schemas, structured Power BI sales interfaces, and KPI pattern insights.',
                    level: 'Expert',
                    color: 'text-amber-400',
                    icon: TrendingUp,
                    iconBg: 'bg-amber-950 text-amber-300'
                  },
                  {
                    title: 'Full-Stack Software Architecture',
                    desc: 'Responsive single-page web environments, custom Node.js (Express) servers, REST APIs, and Gemini LLM backend proxies.',
                    level: 'Intermediate/Advanced',
                    color: 'text-indigo-400',
                    icon: Terminal,
                    iconBg: 'bg-slate-950 text-slate-300'
                  }
                ].map((sk, idx) => {
                  const Icon = sk.icon;
                  return (
                    <div key={idx} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors space-y-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-3xl ${sk.iconBg}`}>
                        <Icon size={22} />
                      </div>
                      <h4 className="text-sm font-extrabold text-white">{sk.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{sk.desc}</p>
                      <div className="flex justify-between items-center text-[10px] font-mono pt-4 border-t border-slate-800">
                        <span className="text-slate-500 uppercase tracking-widest">Skill tier:</span>
                        <span className={`font-bold uppercase ${sk.color}`}>{sk.level}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= RESUME TIMELINE SECTION ================= */}
        {activeTab === 'resume' && (
          <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-12 py-8 text-left">
            <div className="space-y-2 border-b border-slate-850 pb-4">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <FileText className="text-amber-400" size={24} />
                Professional Credentials & Milestones
              </h2>
              <p className="text-xs text-slate-400">
                Explore an active walkthrough of my education, roles, symposiums, and leadership.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-sans">
              
              {/* Left Column: Education & Internships */}
              <div className="space-y-8">
                <h3 className="text-lg font-extrabold text-slate-350 tracking-wide uppercase border-b border-indigo-500/20 pb-2">
                  💼 Professional Experience & Education
                </h3>

                <div className="relative border-l border-slate-800 pl-6 space-y-8 ml-2">
                  
                  {/* Item 1 */}
                  <div className="relative space-y-2">
                    <span className="absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full bg-indigo-500 border-4 border-slate-950 flex items-center justify-center"></span>
                    <div className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">Jun 2025 - Jun 2025</div>
                    <h4 className="text-sm font-black text-white">Data Analytics Intern</h4>
                    <div className="text-[11px] text-slate-400 font-medium font-mono">Entudio Pvt. Ltd., Tirunelveli</div>
                    <ul className="list-disc list-outside pl-4 text-xs text-slate-450 space-y-1.5">
                      <li>Cleaned, organized, and formulated complex relational business datasets.</li>
                      <li>Engineered interactive sales and performance metrics dashboards in Power BI.</li>
                      <li>Used structured data visualization to transform raw data coordinates into clear strategic updates for senior business leaders.</li>
                    </ul>
                  </div>

                  {/* Item 2 */}
                  <div className="relative space-y-2">
                    <span className="absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full bg-indigo-500 border-4 border-slate-950 flex items-center justify-center"></span>
                    <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider">2025</div>
                    <h4 className="text-sm font-black text-white">AI & Full Stack Masterclass Intern</h4>
                    <div className="text-[11px] text-slate-400 font-medium font-mono">Novitech Pvt. Limited, Coimbatore</div>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Conducted research exploring Artificial Intelligence, Machine Learning patterns, Deep Learning nets, and full-stack system architecture using Node/React structures.
                    </p>
                  </div>

                  {/* Item 3 Education */}
                  <div className="relative space-y-2">
                    <span className="absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full bg-amber-500 border-4 border-slate-950 flex items-center justify-center"></span>
                    <div className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">Class of 2022 - 2026</div>
                    <h4 className="text-sm font-black text-white">B.Tech - Artificial Intelligence & Data Science</h4>
                    <div className="text-[11px] text-slate-400 font-medium font-mono">Rohini College of Engineering and Technology, Kanyakumari</div>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Specialized in deep neural systems, database schemas, network security, and advanced predictive analysis. Formulated code structures for optimal processing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Achievements & Extra-Curriculars */}
              <div className="space-y-8">
                <h3 className="text-lg font-extrabold text-slate-350 tracking-wide uppercase border-b border-amber-500/20 pb-2">
                  🏆 Achievements & Extracurriculars
                </h3>

                <div className="relative border-l border-slate-800 pl-6 space-y-8 ml-2">
                  
                  {/* Item 1 */}
                  <div className="relative space-y-2">
                    <span className="absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full bg-amber-500 border-4 border-slate-950 flex items-center justify-center"></span>
                    <div className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">Symposium 2025</div>
                    <h4 className="text-sm font-black text-white">3rd Place - Paper Presentation Winner</h4>
                    <div className="text-[11px] text-slate-500 font-medium font-mono">Sivanthi Adhithanar College of Engineering, Tiruchendur</div>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Awarded 3rd place with a Rs. 1,000 cash prize for an outstanding technical presentation displaying specialized predictive architectures.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="relative space-y-2">
                    <span className="absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full bg-indigo-500 border-4 border-slate-950 flex items-center justify-center"></span>
                    <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider">Sports Milestones</div>
                    <h4 className="text-sm font-black text-white">Triple Athletic & Kabaddi Star</h4>
                    <div className="text-[11px] text-slate-500 font-medium font-mono">Represented Native Sports Association</div>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Won 1st Place for 3 consecutive years in 1500m running races and remains a passionate league competitor on his native Kabaddi sports team.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="relative space-y-2">
                    <span className="absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full bg-indigo-500 border-4 border-slate-950 flex items-center justify-center"></span>
                    <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider">Oct 2025</div>
                    <h4 className="text-sm font-black text-white">Event Coordinator - AIDS Symposium</h4>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Coordinated the Technical Events segment, hosting chatbot development workshops and trivia contests to promote collaboration and coding enthusiasm among classmates.
                    </p>
                  </div>

                  {/* Item 4 */}
                  <div className="relative space-y-2">
                    <span className="absolute -left-[30px] top-1.5 w-4.5 h-4.5 rounded-full bg-amber-500 border-4 border-slate-950 flex items-center justify-center"></span>
                    <div className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">Feb 2020 - Apr 2021</div>
                    <h4 className="text-sm font-black text-white">VKV Association Volunteer</h4>
                    <p className="text-xs text-slate-450 leading-relaxed">
                      Maintained school-campus quiet compliance and actively guided peer students to construct self-confidence and conversational spoken English fluency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PROJECT SHOWCASE SECTION ================= */}
        {activeTab === 'projects' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 py-8 text-left">
            <div className="border-b border-slate-850 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                  <FolderGit2 className="text-amber-400" size={24} />
                  Practical Software Engineering Artifacts
                </h2>
                <p className="text-xs text-slate-400">
                  Click on any project to load and experience its live interactive sandbox environment!
                </p>
              </div>

              {/* Sub navbar picker */}
              <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1 text-xs">
                <button
                  onClick={() => setSelectedProject('yojana')}
                  className={`px-4 py-2 rounded-lg font-extrabold transition-all cursor-pointer ${
                    selectedProject === 'yojana' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                > Gov Welfare Portal
                </button>
                <button
                  onClick={() => setSelectedProject('driverassist')}
                  className={`px-4 py-2 rounded-lg font-extrabold transition-all cursor-pointer ${
                    selectedProject === 'driverassist' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  DriverAssist-it
                </button>
                <button
                  onClick={() => setSelectedProject('powerbi')}
                  className={`px-4 py-2 rounded-lg font-extrabold transition-all cursor-pointer ${
                    selectedProject === 'powerbi' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PowerBI Metrics
                </button> 
                <button
                  onClick={() => setSelectedProject('chatbot-quiz')}
                  className={`px-4 py-2 rounded-lg font-extrabold transition-all cursor-pointer ${
                    selectedProject === 'chatbot-quiz' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Symposium Puzzle
                </button>
              </div>
            </div>

            {/* ============ RENDER PROJECT 1: GOVERNMENT WELFARE PORTAL (LIVE EMBEDDED DEMO!) ============ */}
            {selectedProject === 'yojana' && (
              <div className="space-y-12 animate-fadeIn bg-slate-950">
                {/* Embedded Welfare Banner */}
                <div className="bg-gradient-to-r from-indigo-900/30 to-amber-900/10 border border-slate-800 p-8 rounded-3xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sprout size={160} className="text-amber-500" />
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono uppercase font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Live Master Demonstration
                  </div>

                  <h3 className="text-2xl font-black text-white">SarkariYojana - Welfare Scheme Finder</h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    This is a production-grade full-stack portal built with React, Tailwind CSS, Express, and 
                    the Gemini 3.5 API. Using official database mapping joined with <strong>Google Search Grounding</strong>, 
                    it enables citizens to discover modern plans launched in India during 2024-2026.
                  </p>

                  <div className="flex gap-3 text-[10px] font-mono text-slate-400">
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">React 19 & Vite</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Express / Node.js</span>
                    <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Gemini 3.5 Grounded LLM</span>
                  </div>
                </div>

                {/* SEARCH AND CATEGORIES WIDGET */}
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    {/* Search bar inside demo */}
                    <div className="relative font-sans flex-1 max-w-xl">
                      <span className="absolute left-4 top-3 text-slate-500">
                        <Search size={16} />
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search schemes (e.g. 'Surya', 'Lakhpati', 'PM-JAY')..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-xs font-medium text-slate-200 focus:outline-hidden focus:border-amber-500"
                      />
                    </div>

                    {/* Category Tabs inside demo */}
                    <div className="flex gap-2 overflow-x-auto pb-1 max-w-full text-[11px] font-bold">
                      {['All', 'Agriculture', 'Health', 'Education', 'Housing', 'Women'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-4 py-2 shrink-0 rounded-xl transition-all border cursor-pointer ${
                            activeCategory === cat 
                              ? 'bg-amber-500 border-amber-500 text-slate-950 font-black' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AI Live Sync Option widget inside demo */}
                  <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-4 relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-5 pointer-events-none select-none">
                      <Sparkles size={110} className="text-amber-500" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-[10px] uppercase font-mono font-bold tracking-widest">
                          <Sparkles size={10} className="animate-pulse" />
                          AI Sync Grounding Module
                        </div>
                        <h4 className="text-sm font-extrabold text-white">Fetch Newly Released Plans From Central Portals</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          Triggers my backend `/api/ai/sync-schemes` endpoint. Gemini uses Google Search to query real ministry folders for 2024-2026 releases, parse details, and inject them into our list!
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-2 items-center">
                        <button
                          onClick={handleSyncRecentSchemes}
                          disabled={isSyncing}
                          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                        >
                          {isSyncing ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                              <span>Searching Portals...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles size={13} />
                              <span>Execute Sync</span>
                            </>
                          )}
                        </button>
                        {allSchemes.length > SCHEMES.length && (
                          <button
                            onClick={handleResetSync}
                            className="px-3 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-rose-400 text-xs font-bold"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                    {syncMessage && (
                      <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl text-[11px]">
                        <span className={`font-semibold ${syncMessage.toLowerCase().includes('error') ? 'text-rose-400' : 'text-emerald-450'}`}>
                          💬 STATUS: {syncMessage}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Schemes grid inside demo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {filteredSchemes.map((scheme) => (
                      <SchemeCard
                        key={scheme.id}
                        scheme={scheme}
                        onOpenDetails={setSelectedDetailsScheme}
                        onOpenApply={setSelectedApplyScheme}
                        currentLanguage="en"
                      />
                    ))}
                  </div>

                  {filteredSchemes.length === 0 && (
                    <div className="text-center p-12 bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
                      No matching योजनाओं found in this demo dataset. Clear key terms or filters to return catalogs.
                    </div>
                  )}
                </div>

                {/* ELIGIBILITY CHECKER SEGMENT */}
                <div id="eligibility-widget" className="border-t border-slate-900 pt-10">
                  <EligibilityChecker 
                    onOpenApply={setSelectedApplyScheme} 
                    onOpenDetails={setSelectedDetailsScheme} 
                    currentLanguage="en"
                    allSchemes={allSchemes}
                  />
                </div>

                {/* TRACKER SEGMENT */}
                <div id="tracking-widget" className="border-t border-slate-900 pt-10">
                  <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-left space-y-6">
                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                        <FileCheck2 size={16} className="text-amber-400" />
                        Interactive Form Applications & DBT Tracking System
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Simulate citizen application routines. When you hit apply in any card above, complete Aadhaar steps, and then track references inside this ledger database.
                      </p>
                    </div>

                    <StatusTracker 
                      applicationsList={applications} 
                      initialSearchCode={trackedReferenceCode}
                      onClearInitialCode={() => setTrackedReferenceCode('')}
                      currentLanguage="en"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ============ RENDER PROJECT 1.5: DRIVER ASSIST-IT LOGISTICS DISPATCH PORTAL ============ */}
            {selectedProject === 'driverassist' && (
              <div className="space-y-12 animate-fadeIn bg-slate-950">
                <div className="bg-gradient-to-r from-slate-900/30 to-sky-900/10 border border-slate-800 p-8 rounded-3xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Activity size={160} className="text-sky-400" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[10px] font-mono uppercase font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                    DriverAssist-it Showcase
                  </div>

                  <h3 className="text-2xl font-black text-white">DriverAssist-it — Smart Driver Dispatch & Fleet Intelligence</h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    A driver-centric logistics portal prototype built with React, TypeScript, and local persistence. It simulates job discovery, driver matching, route analytics and application tracking for modern Indian transport operations.
                  </p>

                  <div className="flex gap-3 text-[10px] font-mono text-slate-400">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850">React 19 & Vite</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850">Driver Job Dispatch</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850">Geo-Route Capacity</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                    <h4 className="text-sm font-extrabold text-white">Key Capabilities</h4>
                    <ul className="ml-4 list-disc text-slate-400 text-[11px] space-y-3">
                      <li>Browse driver jobs and shift postings with regional routing intelligence.</li>
                      <li>Manage applications, track driver status, and simulate dispatch confirmations.</li>
                      <li>Optimize matches using route distance and duty hours compliance.</li>
                      <li>Persist fleet state locally so workflow stays smooth across sessions.</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                    <h4 className="text-sm font-extrabold text-white">Why this project stands out</h4>
                    <div className="space-y-3 text-slate-400 text-[11px] leading-relaxed">
                      <p>
                        This project demonstrates full-stack thinking applied to logistics automation and driver workforce support. It blends user experience, data modeling, and dispatch intelligence in a compact platform.
                      </p>
                      <p>
                        The portal is ideal for operator dispatchers, fleet managers, and drivers who need fast visibility into available jobs, route efficiency, and live application progress.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
                  <h4 className="text-sm font-extrabold text-white">How to explore it</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    The DriverAssist-it workspace is available in the repository under <span className="font-mono text-slate-300">driver assist-it/driverassist-it</span>. It can be launched as a standalone Vite app to inspect the full driver dispatch workflow.
                  </p>
                  <a
                    href="https://driver-assist-it.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors"
                  >
                    Open Live DriverAssist-it Demo
                  </a>
                </div>
              </div>
            )}

            {/* ============ RENDER PROJECT 2: DATA SCIENCE POWERBI KPI ACCENT DASHBOARD ============ */}
            {selectedProject === 'powerbi' && (
              <div className="space-y-8 animate-fadeIn text-left">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <CreditCard size={170} className="text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white">PowerBI Interactive Sales Sandbox</h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    This module represents a prototype dashboard showcasing my analytics patterns at Entudio Pvt. Ltd. (June 2025). 
                    It parses interactive business filters to present KPI trends, revenue breakdowns, and pattern translations cleanly.
                  </p>
                  <div className="flex gap-4 text-[10px] font-mono text-slate-400">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850">PowerBI Modelling</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850">Complex Relational DAX</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850">Relational DB (SQL)</span>
                  </div>
                </div>

                {/* Interactive Sandbox widget layout */}
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6 font-mono text-xs">
                  {/* Dashboard filters top banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                      <span className="text-slate-350 font-bold tracking-wider font-sans">ENTUDIO RELATIONAL METRICS</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* View Picker */}
                      <button 
                        onClick={() => setPowerBiView(powerBiView === 'revenue' ? 'volume' : 'revenue')}
                        className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 rounded border border-slate-755 text-slate-300 font-extrabold uppercase text-[10px] cursor-pointer"
                      >
                        Metric: {powerBiView === 'revenue' ? 'Revenue (Value)' : 'Transaction Volume'}
                      </button>

                      {/* Segment filters */}
                      <div className="flex bg-slate-950 p-1 border border-slate-850 rounded text-[10px] font-black">
                        {['all', 'retail', 'corporate'].map((f) => (
                          <button
                            key={f}
                            onClick={() => setPowerBiFilter(f as any)}
                            className={`px-2 py-1 rounded uppercase cursor-pointer ${powerBiFilter === f ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* PowerBI demo project cards */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {powerBIProjects.map((project) => (
                      <div
                        key={project.title}
                        className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700"
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-56 object-cover"
                        />

                        <div className="p-5">
                          <h3 className="text-xl font-bold text-white">
                            {project.title}
                          </h3>

                          <p className="text-slate-400 mt-2">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dashboard Metrics KPI row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1">
                      <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wider">Total Sales Metric</div>
                      <div className="text-lg font-black text-white">
                        {powerBiFilter === 'all' ? '₹7,48,20,000' : powerBiFilter === 'retail' ? '₹4,12,00,000' : '₹3,36,20,000'}
                      </div>
                      <span className="text-emerald-450 text-[9px]">+14.2% YoY</span>
                    </div>

                    <div className="bg-slate-950 border border-slate-855 p-4 rounded-xl space-y-1">
                      <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wider">Operational Margin</div>
                      <div className="text-lg font-black text-amber-500">
                        {powerBiFilter === 'all' ? '38.4%' : powerBiFilter === 'retail' ? '31.2%' : '44.8%'}
                      </div>
                      <span className="text-indigo-400 text-[9px]">Stable</span>
                    </div>

                    <div className="bg-slate-950 border border-slate-855 p-4 rounded-xl space-y-1">
                      <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wider">Active Transactions</div>
                      <div className="text-lg font-black text-white">
                        {powerBiFilter === 'all' ? '46,201' : powerBiFilter === 'retail' ? '39,812' : '6,389'}
                      </div>
                      <span className="text-emerald-450 text-[9px]">+8.6% MoM</span>
                    </div>

                    <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-1">
                      <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wider">Stakeholder Insights</div>
                      <div className="text-lg font-black text-indigo-400">98.2% Accurate</div>
                      <span className="text-slate-500 text-[9px]">PowerBI Pipeline</span>
                    </div>
                  </div>

                  {/* Simulated Visual Graph Card */}
                  <div className="bg-slate-950 border border-slate-850 p-6 rounded-2xl relative">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest pl-2 mb-6 border-l-2 border-amber-500">
                      {powerBiView === 'revenue' ? 'Monthly Revenue Growth Curve (CY 2025)' : 'Monthly Order Volume Breakdown'}
                    </div>

                    <div className="space-y-4">
                      {/* Month bars */}
                      {[
                        { m: 'Jan', val: 78, col: 'bg-indigo-500' },
                        { m: 'Feb', val: 92, col: 'bg-amber-500' },
                        { m: 'Mar', val: 110, col: 'bg-emerald-500' },
                        { m: 'Apr', val: 88, col: 'bg-indigo-500' },
                        { m: 'May', val: 125, col: 'bg-orange-500' },
                        { m: 'Jun', val: 145, col: 'bg-amber-500' }
                      ].map((item, id) => {
                        const calculatedWidth = powerBiFilter === 'all' 
                          ? item.val 
                          : powerBiFilter === 'retail' 
                          ? Math.round(item.val * 0.7) 
                          : Math.round(item.val * 0.4);

                        const formattedVal = powerBiView === 'revenue' 
                          ? `₹${(calculatedWidth * 10000).toLocaleString()}`
                          : `${(calculatedWidth * 23).toLocaleString()} orders`;

                        return (
                          <div key={id} className="flex items-center gap-4 text-[10px]">
                            <span className="w-10 text-slate-400 text-left uppercase">{item.m}</span>
                            <div className="flex-1 bg-slate-900 h-6.5 rounded overflow-hidden flex items-center p-0.5">
                              <div 
                                className={`${item.col} h-full rounded transition-all duration-500 flex items-center justify-end pr-2`} 
                                style={{ width: `${Math.min(calculatedWidth / 1.5, 100)}%` }}
                              >
                              </div>
                            </div>
                            <span className="w-24 text-right text-white font-bold">{formattedVal}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actionable Analytic Summary Textbox */}
                  <div className="p-4 bg-slate-950/50 border border-slate-850 rounded-xl space-y-2 text-slate-400 font-sans leading-relaxed">
                    <span className="text-white text-xs font-bold font-mono tracking-wider">🧠 INTERPRETATIVE PATHWAY TRANSLATION</span>
                    <p className="text-[11px]">
                      The dashboard proves that during June 2025, relational sales experienced a {powerBiFilter === 'all' ? '14.2% MoM spike' : 'refined focus shift'}. 
                      The operational margin remained healthy and stable, providing robust actionable metrics for senior managers and stakeholders. 
                      Relational SQL joins maintain data coherence.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ============ RENDER PROJECT 3: EVENT COORDINATOR WORK & PUZZLE ============ */}
            {selectedProject === 'chatbot-quiz' && (
              <div className="space-y-8 animate-fadeIn text-left">
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Award size={180} className="text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-black text-white">AIDS Symposium - Chatbot Co-creation Simulator</h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    This commemorates my coordination role at the October 2025 Artificial Intelligence and Data Science Symposium 
                    at Rohini College. I champion the Technical and Quiz contests, assisting peers in learning recursive puzzle math.
                  </p>
                  <div className="flex gap-4 text-[10px] font-mono text-slate-400">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850">N-Queens Solver</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850">Coordinator Role</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-850">AIDS October 2025</span>
                  </div>
                </div>

                {/* Simple visual puzzle board */}
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-6">
                  <div className="space-y-1 font-mono text-xs">
                    <span className="text-amber-400 uppercase font-bold tracking-widest block">Interactive N-Queens Visualizer</span>
                    <p className="text-[11px] text-slate-405 font-sans leading-relaxed">
                      Representing the recursive programming loops presented in my National Level Symposium presentation! 
                      Below is the mathematical solution layout of a 4x4 Chessboard solving N-Queens puzzle with no attacks.
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5 max-w-[200px] mx-auto border-2 border-slate-800 p-2.5 bg-slate-950 rounded-2xl">
                    {[
                      { r: 0, c: 0, q: false }, { r: 0, c: 1, q: true },  { r: 0, c: 2, q: false }, { r: 0, c: 3, q: false },
                      { r: 1, c: 0, q: false }, { r: 1, c: 1, q: false }, { r: 1, c: 2, q: false }, { r: 1, c: 3, q: true },
                      { r: 2, c: 0, q: true },  { r: 2, c: 1, q: false }, { r: 2, c: 2, q: false }, { r: 2, c: 3, q: false },
                      { r: 3, c: 0, q: false }, { r: 3, c: 1, q: false }, { r: 3, c: 2, q: true },  { r: 3, c: 3, q: false }
                    ].map((cell, idx) => (
                      <div 
                        key={idx} 
                        className={`w-10 h-10 border rounded flex items-center justify-center font-mono font-black text-xs ${
                          cell.q ? 'bg-amber-500 text-slate-950 border-amber-500 scale-105 shadow-md shadow-amber-500/10' : (cell.r + cell.c) % 2 === 0 ? 'bg-slate-900 border-slate-800 text-slate-600' : 'bg-slate-850 border-slate-800 text-slate-600'
                        }`}
                      >
                        {cell.q ? '👑' : ''}
                      </div>
                    ))}
                  </div>

                  <div className="font-mono text-[10px] text-slate-500 max-w-sm mx-auto">
                    👉 Formula Checked: 4 Queens placed successfully such that no queen attacks another.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= AI TWIN CHAT INTERACTION ================= */}
        {activeTab === 'ai-twin' && (
          <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8 py-8 h-[calc(100vh-18rem)] flex flex-col justify-between text-left">
            <div className="space-y-1.5 border-b border-slate-850 pb-3 flex-none shrink-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-[10px] font-mono uppercase font-black tracking-widest leading-none">
                <Sparkles size={11} className="animate-pulse" />
                Gemini 3.5 Real-Time Proxy
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Simulated AI Digital Twin Chat
              </h2>
              <p className="text-[11px] text-slate-450 leading-relaxed">
                Connect and talk with Sudar's Digital Twin. Ask me about my internships, Kabaddi wins, programming values, or coordinate availability!
              </p>
            </div>

            {/* Chat message registry window */}
            <div className="flex-1 overflow-y-auto pr-2 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 my-4 space-y-4 max-h-[380px] min-h-[250px] overflow-x-hidden">
              {chatMessages.map((msg, idx) => {
                const isModel = msg.role === 'model';
                return (
                  <div key={idx} className={`flex ${isModel ? 'justify-start' : 'justify-end'} gap-3 max-w-full block`}>
                    <div className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[85%] text-left whitespace-pre-wrap font-sans ${
                      isModel 
                        ? 'bg-slate-905 border border-slate-800 text-slate-200 shadow-sm' 
                        : 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-900/10'
                    }`}>
                      <div className="font-mono text-[9px] text-slate-500 uppercase font-black tracking-widest pb-1.5 mb-1.5 border-b border-slate-800/15 flex items-center gap-1.5 leading-none">
                        <span>{isModel ? '🤖 SUDAR_TWIN' : '👤 VISITOR'}</span>
                      </div>
                      <p>{msg.content}</p>
                    </div>
                  </div>
                );
              })}
              
              {chatLoading && (
                <div className="flex justify-start gap-3">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin shrink-0"></span>
                    <span>Formulating response from resume corpus...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef}></div>
            </div>

            {/* Suggeted prompts row */}
            <div className="flex-none shrink-0 space-y-4">
              <div className="flex flex-wrap gap-2 text-[10px] font-sans font-bold">
                {[
                  'What did you accomplish at Entudio Pvt. Ltd.?',
                  'What are your top B.Tech specialities?',
                  'List your technical skills matrix.',
                  'How did you perform at the national level symposium?'
                ].map((sPrompt, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSendChatMessage(undefined, sPrompt)}
                    disabled={chatLoading}
                    className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500 rounded-full text-slate-400 hover:text-white cursor-pointer transition-colors"
                  >
                    "{sPrompt}"
                  </button>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChatMessage} className="flex gap-2.5 bg-slate-900 border border-slate-800 p-2.5 rounded-2xl relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask and text my AI Double here..."
                  className="w-full bg-transparent border-none py-2 px-3 text-xs outline-hidden focus:ring-0 text-slate-200 placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={chatLoading || !chatInput.trim()}
                  className="p-3.5 bg-amber-500 text-slate-950 hover:bg-amber-400 rounded-xl cursor-pointer disabled:opacity-50 transition-colors flex items-center justify-center shrink-0"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= CONNECT CONTACT SECTION ================= */}
        {activeTab === 'contact' && (
          <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12 py-8 text-left">
            <div className="space-y-1.5 border-b border-slate-850 pb-4">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <Mail className="text-amber-400" size={24} />
                Contact Directory & Let's Connect
              </h2>
              <p className="text-xs text-slate-400">
                Pick up coordinates or send me a simulated secure message instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column Contact Details Card */}
              <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
                <div className="space-y-2 border-b border-slate-800 pb-4">
                  <h3 className="text-sm uppercase font-bold text-slate-400 tracking-widest font-mono">My Coordinates</h3>
                  <p className="text-[11px] text-slate-455">Available for hybrid, remote, or location work in India.</p>
                </div>

                <div className="space-y-5 text-xs text-slate-300">
                  <div className="flex items-start gap-3.5">
                    <Mail size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-0.5 uppercase tracking-wide text-[10px] text-slate-500">Primary Email</h4>
                      <p className="font-mono text-slate-350">suderramesh541@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <PhoneCall size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-0.5 uppercase tracking-wide text-[10px] text-slate-500">Contact Number</h4>
                      <p className="font-mono text-slate-350">+91 7604992903</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-0.5 uppercase tracking-wide text-[10px] text-slate-500">Physical Address</h4>
                      <p className="leading-relaxed text-slate-350">
                        27/2, Amman Kovil Street,<br />
                        Dalapathi Samuthiram Meloor, 627101,<br />
                        Tirunelveli / Kanyakumari, Tamil Nadu, India.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PDF CV Download Simulation button */}
                <div className="pt-6 border-t border-slate-800">
                  <a
                    href="mailto:suderramesh541@gmail.com?subject=Inquiry from Portfolio Website"
                    className="w-full py-3.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-amber-500 hover:text-amber-400 transition-colors uppercase font-black tracking-widest text-[10px] font-mono rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download Raw Resume PDF</span>
                  </a>
                </div>
              </div>

              {/* Right Column Simulated Message Form */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
                
                {contactSuccess ? (
                  <div className="p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 size={32} className="animate-bounce" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-md font-extrabold text-white">Inquiry Transmitted Successfully</h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        I have saved this message buffer into the local database registry. My Gemini digital twin has also logged your feedback details!
                      </p>
                    </div>
                    <button
                      onClick={() => setContactSuccess(false)}
                      className="px-4 py-2 text-xs font-black uppercase bg-slate-800 rounded-xl text-amber-500 hover:text-amber-400 border border-slate-700 cursor-pointer text-slate-300"
                    >
                      Write Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSendContactForm} className="space-y-4 text-xs">
                    <div className="space-y-1.5 border-b border-slate-840 pb-3 mb-2">
                      <h3 className="text-sm font-extrabold text-white">Leave a Simulated Message</h3>
                      <p className="text-[11px] text-slate-400">Your message will persist in local database history loops.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest font-mono">Your Name / Organization</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Acme Recruiter"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-200 placeholder:text-slate-650"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest font-mono">Email Address Address</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="e.g. recruiter@acme.com"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-200 placeholder:text-slate-650"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest font-mono">Construct Message</label>
                      <textarea
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Detail your hiring process or projects..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-200 placeholder:text-slate-650"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-amber-500 text-slate-950 hover:bg-amber-400 uppercase font-black tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-lg shadow-amber-500/10"
                      >
                        <Send size={13} />
                        <span>Transmit Message Securely</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Local Messages History List */}
                {savedMessagesList.length > 0 && (
                  <div className="border-t border-slate-800 pt-6 space-y-4">
                    <span className="text-[10px] font-mono font-black uppercase text-slate-500 tracking-widest flex items-center gap-1.5 leading-none">
                      <Clock size={12} className="text-indigo-400" />
                      Client Messages History Loop ({savedMessagesList.length})
                    </span>

                    <div className="space-y-3.5 max-h-[160px] overflow-y-auto pr-1">
                      {savedMessagesList.map((m, id) => (
                        <div key={id} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-850 space-y-1.5 text-[11px] leading-relaxed">
                          <div className="flex justify-between text-[10px] font-mono text-slate-500">
                            <span className="font-bold text-indigo-400 uppercase truncate max-w-[130px]">{m.name}</span>
                            <span>{m.date}</span>
                          </div>
                          <p className="text-slate-350">{m.msg}</p>
                          <div className="text-[9px] text-slate-550 font-mono truncate">Email: {m.email}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Shared microdetails portfolio footer */}
      <Footer displaySource="portfolio" />

      {/* RENDER DYNAMIC SCHEME DETAILS MODAL IF ACTIVE (fromembedded schemes portal) */}
      {selectedDetailsScheme && (
        <SchemeDetailsModal
          scheme={selectedDetailsScheme}
          isOpen={true}
          onClose={() => setSelectedDetailsScheme(null)}
          onApply={(schemeId) => {
            const schemeToApply = allSchemes.find((scheme) => scheme.id === schemeId);
            if (schemeToApply) {
              setSelectedDetailsScheme(null);
              setSelectedApplyScheme(schemeToApply);
            }
          }}
          currentLanguage="en"
        />
      )}

      {/* RENDER APPLY SUBMISSION FORM DIALOG IF ACTIVE (from embedded schemes portal) */}
      {selectedApplyScheme && (
        <ApplyModal
          scheme={selectedApplyScheme}
          isOpen={true}
          onClose={() => setSelectedApplyScheme(null)}
          onSubmitApplication={handleAddApplication}
          currentLanguage="en"
        />
      )}
    </div>
  );
}

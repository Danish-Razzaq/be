import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Play, ChevronRight, Zap, Box, Map, ShieldCheck, 
  LineChart, ArrowRight, Menu, X, CheckCircle2, Star,
  Smartphone, Globe, Anchor, Plane, Truck, FileText, Bell,
  Mail, FileSpreadsheet, AlertTriangle, Activity,
  LayoutDashboard, Search, DollarSign, RefreshCw,
  ArrowUpRight, Calendar, ArrowDownUp, Crosshair, MapPin,
  MessageSquare, Terminal, Cpu, Server, Wifi, Send, 
  Users, Settings, Layers, Share2, Leaf, Clock, Building, ArrowLeft, Check, User
} from 'lucide-react';

// --- Custom Hooks ---
const useScrollReveal = (options = { threshold: 0.1 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold]);

  return [ref, isVisible];
};

// Techy Typewriter Effect
const Typewriter = ({ text }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if(i > text.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}<span className="animate-pulse font-black text-[#FF5C00]">_</span></span>;
};

// Reusable Logo Component
const LogoMark = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={`${className} text-[#FF5C00] drop-shadow-sm transition-transform`}>
    <circle cx="50" cy="50" r="50" fill="currentColor" />
    <path d="M48 22 L22 48 L48 72 L60 60 L46 48 L60 34 Z" fill="white" />
    <path d="M52 78 L78 52 L52 28 L40 40 L54 52 L40 66 Z" fill="white" />
  </svg>
);

// --- Components ---

// 1. Interactive Background
const ParticleBackground = ({ isDark }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
       <div className={`absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] ${isDark ? 'opacity-5' : 'opacity-[0.03]'}`}></div>
       <div className={`absolute top-[-10%] left-[-10%] w-[60%] lg:w-[40%] h-[40%] rounded-full blur-[100px] lg:blur-[120px] ${isDark ? 'bg-blue-900/20' : 'bg-blue-400/10'}`}></div>
       <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] lg:w-[40%] h-[40%] rounded-full blur-[100px] lg:blur-[120px] ${isDark ? 'bg-[#FF5C00]/15' : 'bg-orange-400/10'}`}></div>
    </div>
  );
};

// 2. Navigation
const Navbar = ({ isDark, toggleTheme, onOpenDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 backdrop-blur-xl bg-white/80 dark:bg-[#000836]/80 shadow-sm border-b border-gray-200/80 dark:border-blue-900/30' 
        : 'py-4 lg:py-5 bg-white/50 dark:bg-[#000836]/50 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none border-b border-gray-200/50 dark:border-blue-900/30 lg:border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative">
        
        <div className="flex items-center gap-2 group cursor-pointer z-50">
           <img src="/logo.svg" alt="Gama Logo"   className="w-18 h-18 object-contain" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {['Gama BCO', 'About', 'Blog', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#FF5C00] dark:hover:text-[#FF5C00] transition-colors relative group whitespace-nowrap">
              {item}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-5">
          <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#001566] transition-colors text-gray-500 dark:text-gray-400 border border-transparent dark:hover:border-blue-900">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="text-sm font-bold text-[#001054] dark:text-white hover:text-[#FF5C00] dark:hover:text-[#FF5C00] transition-colors whitespace-nowrap">
            Log In
          </button>
          <button onClick={onOpenDemo} className="btn-brand box-offset-contrast px-5 py-2.5 rounded-md text-white font-bold text-sm tracking-wide whitespace-nowrap">
            Book a Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden z-50">
          <button onClick={toggleTheme} className="p-2 rounded text-gray-500 dark:text-gray-400">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-gray-800 dark:text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#000836]/95 backdrop-blur-xl border-b border-gray-200 dark:border-blue-900/30 transition-all duration-300 ease-in-out overflow-hidden shadow-xl ${mobileMenuOpen ? 'max-h-[400px] py-4' : 'max-h-0 py-0 border-transparent'}`}>
        <div className="px-6 flex flex-col space-y-4 text-center">
          {['Gama BCO', 'About', 'Blog', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenuOpen(false)} className="text-base font-bold text-gray-800 dark:text-gray-200 hover:text-[#FF5C00] dark:hover:text-[#FF5C00] transition-colors py-2 border-b border-gray-100 dark:border-blue-900/30">
              {item}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
             <button className="text-base font-bold text-[#001054] dark:text-white py-2">
               Log In
             </button>
             <button 
               onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }} 
               className="bg-[#FF5C00] text-white py-3 rounded-md font-bold text-sm tracking-wide shadow-md"
             >
               Book a Demo
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// 3. Hero Section
const Hero = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="relative pt-28 sm:pt-32 pb-16 lg:pt-48 lg:pb-32 z-10 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        
        {/* Left Content */}
        <div className={`transition-all duration-1000 transform text-center lg:text-left flex flex-col items-center lg:items-start ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 mb-6 lg:mb-8 backdrop-blur-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5C00] animate-ping absolute"></span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5C00] relative"></span>
            <span className="text-[9px] sm:text-[10px] font-bold text-blue-800 dark:text-blue-400 tracking-[0.2em] uppercase">Built for Forwarders & NVOCCs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#001054] dark:text-white leading-[1.1] mb-6 tracking-tight z-10 relative">
            The Digital Engine for <br className="hidden sm:block"/>
            <span className="highlight-text text-[#001054] dark:text-white mt-2 inline-block">Modern Forwarders.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 lg:mb-10 max-w-xl leading-relaxed">
            Level up your customer experience without overhauling your backend. Gama equips independent forwarders with a branded, self-serve portal for quoting, booking, and tracking—seamlessly synced with CargoWise and your existing TMS.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto btn-brand box-offset-contrast px-8 py-3.5 lg:py-4 rounded-lg text-white font-bold text-sm tracking-wide flex items-center justify-center group">
              Start Your Free Trial
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 lg:py-4 rounded-lg font-bold text-[#001054] dark:text-white flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group text-sm">
              <Play className="text-[#FF5C00] dark:text-blue-400 mr-2" fill="currentColor" size={16} />
              Watch Platform Tour
            </button>
          </div>
        </div>

        {/* Right UI Representation - Scaled canvas for perfect mobile responsiveness */}
        <div className={`relative transition-all duration-1000 delay-300 transform w-full flex justify-center mt-12 lg:mt-0 ${isVisible ? 'translate-y-0 lg:translate-x-0 opacity-100' : 'translate-y-10 lg:translate-y-0 lg:translate-x-10 opacity-0'}`}>
           
           {/* Fixed size wrapper that scales down gracefully */}
           <div className="relative w-[600px] h-[420px] transform scale-[0.55] sm:scale-[0.75] md:scale-[0.9] lg:scale-95 xl:scale-100 origin-top lg:origin-center z-20 pointer-events-none">

              {/* Main Browser App Window (Background) */}
              <div className="absolute right-0 top-8 bottom-4 w-[85%] bg-white dark:bg-[#000524] rounded-xl shadow-2xl border border-gray-200 dark:border-blue-900/50 flex flex-col z-10 box-offset-static">

                {/* Mac Window Dots & Top Bar */}
                <div className="h-12 border-b border-gray-100 dark:border-blue-900/50 flex items-center px-4 gap-3 bg-gray-50/80 dark:bg-[#001054]/80 rounded-t-xl">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  {/* Search Bar Skeleton */}
                  <div className="ml-2 w-48 h-5 bg-white dark:bg-[#000524] rounded border border-gray-200 dark:border-blue-900/30"></div>
                  {/* Profile Skeleton */}
                  <div className="ml-auto flex items-center gap-2">
                     <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-blue-900/40"></div>
                     <div className="w-16 h-2 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                  </div>
                </div>

                {/* Main Content Pane (Skeletal Layout) */}
                <div className="flex-1 p-5 pl-[20%] flex flex-col z-10 overflow-hidden">
                   {/* Page Title Skeleton */}
                   <div className="h-4 w-32 bg-gray-300 dark:bg-blue-900/50 rounded mb-5"></div>

                   <div className="flex gap-4 h-full">
                      {/* Left Filters Skeleton */}
                      <div className="w-[35%] bg-gray-50 dark:bg-[#001054] rounded-lg border border-gray-100 dark:border-blue-900/30 p-3 flex flex-col gap-3">
                         <div className="h-2 w-20 bg-gray-300 dark:bg-blue-900/50 rounded mb-2"></div>
                         <div className="h-7 w-full bg-white dark:bg-[#000524] rounded border border-gray-100 dark:border-blue-900/30"></div>
                         <div className="h-7 w-full bg-white dark:bg-[#000524] rounded border border-gray-100 dark:border-blue-900/30"></div>
                         <div className="h-7 w-full bg-white dark:bg-[#000524] rounded border border-gray-100 dark:border-blue-900/30"></div>
                         <div className="mt-auto h-7 w-full bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                      </div>

                      {/* Right Results List Skeleton */}
                      <div className="w-[65%] flex flex-col gap-3">
                         {[1, 2, 3].map((item, idx) => (
                            <div key={idx} className={`bg-white dark:bg-[#001054] border border-gray-100 dark:border-blue-900/30 rounded-lg p-4 flex flex-col shadow-sm ${idx === 2 ? 'opacity-40' : ''}`}>
                               <div className="flex justify-between items-start mb-4">
                                  <div className="flex flex-col gap-2">
                                    <div className="h-3.5 w-16 bg-gray-800 dark:bg-gray-300 rounded"></div>
                                    <div className="h-1.5 w-12 bg-gray-300 dark:bg-blue-900/50 rounded"></div>
                                  </div>
                                  {/* Timeline Visual Skeleton */}
                                  <div className="w-[55%] flex items-center justify-between relative mt-1.5">
                                    <div className="absolute left-0 right-0 h-[1.5px] bg-gray-200 dark:bg-blue-900/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#001054] dark:bg-blue-400 z-10 border border-white dark:border-[#001054]"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-blue-900/50 z-10"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5C00] z-10 border border-white dark:border-[#001054]"></div>
                                  </div>
                               </div>
                               <div className="flex justify-between items-end mt-auto pt-2 border-t border-gray-50 dark:border-blue-900/30">
                                 <div className="h-2 w-24 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                                 <div className="h-6 w-16 bg-[#001054] dark:bg-[#FF5C00] rounded"></div>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>

              {/* Floating Sidebar (Left, overlapping & animated) */}
              <div className="absolute left-0 top-[15%] bottom-[10%] w-[32%] bg-[#0088cc] dark:bg-[#001566] rounded-xl shadow-[20px_0_40px_rgba(0,0,0,0.15)] dark:shadow-[20px_0_40px_rgba(0,0,0,0.5)] z-20 animate-float border border-[#0099e6] dark:border-blue-800/50 flex flex-col pt-10 pb-6 px-3">
                 <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded text-white/70 hover:bg-white/10 transition-colors text-[11px] font-semibold cursor-pointer">
                       <LayoutDashboard size={14} /> <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded bg-white/20 text-white font-bold text-[11px] border-l-[3px] border-white shadow-sm cursor-pointer -ml-0.5">
                       <Search size={14} /> <span>Rates & Bookings</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded text-white/70 hover:bg-white/10 transition-colors text-[11px] font-semibold cursor-pointer">
                       <Box size={14} /> <span>Shipments</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded text-white/70 hover:bg-white/10 transition-colors text-[11px] font-semibold cursor-pointer">
                       <DollarSign size={14} /> <span>Financials</span>
                    </div>
                 </div>
                 
                 <div className="mt-auto flex flex-col gap-1">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded text-white/50 hover:bg-white/10 transition-colors text-[10px] font-semibold cursor-pointer">
                       <FileText size={12} /> <span>Tutorials</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded text-white/50 hover:bg-white/10 transition-colors text-[10px] font-semibold cursor-pointer">
                       <Settings size={12} /> <span>Settings</span>
                    </div>
                 </div>
              </div>

              {/* Top Floating White-Label Logo Badge */}
              <div className="absolute left-[12%] top-0 bg-white dark:bg-[#001054] shadow-[0_15px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-blue-900/50 rounded-lg px-6 py-3.5 flex items-center gap-3 z-30 animate-float-delayed">
                   <img src="/logo.svg" alt="Gama Logo"   className="w-18 h-18 object-contain" />
              </div>

              {/* Floating background ambient blurs */}
              <div className="absolute -right-8 top-16 w-20 h-20 bg-[#FF5C00]/10 border border-[#FF5C00]/20 rounded-full animate-float blur-[2px] z-0"></div>
              <div className="absolute -left-6 bottom-10 w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-full animate-float-delayed blur-[4px] z-0"></div>

           </div>
        </div>
        {/* End UI Representation */}

      </div>
    </section>
  );
};

// 4. Social Proof Marquee
const Marquee = () => {
  const logos = [
    {
      name: "Climax Suite",
      element: (
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#0000FF] fill-current lg:w-7 lg:h-7">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.4 0 4.6-.84 6.32-2.24l-2.12-2.12C14.96 18.48 13.54 19 12 19c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7h3c0-5.52-4.48-10-10-10z" />
            <rect x="13" y="10" width="3.5" height="3.5" className="fill-[#00D1FF]" />
            <rect x="17.5" y="14.5" width="3.5" height="3.5" className="fill-[#00D1FF]" />
            <rect x="13" y="14.5" width="3.5" height="3.5" />
          </svg>
          <div className="flex flex-col text-[#0000FF] leading-none">
            <span className="font-bold text-xs lg:text-sm tracking-tight">Climax Suite</span>
            <span className="text-[4px] lg:text-[5px] font-semibold tracking-widest text-blue-400 uppercase mt-0.5">We cover it all</span>
          </div>
        </div>
      )
    },
    {
      name: "CargoWise",
      element: (
        <div className="flex items-center gap-1.5 text-[#3314A3] dark:text-indigo-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="lg:w-6 lg:h-6">
            <rect x="2" y="5" width="6" height="2.5" />
            <rect x="10" y="5" width="8" height="2.5" />
            <rect x="2" y="10.5" width="12" height="2.5" />
            <rect x="2" y="16" width="6" height="2.5" />
            <rect x="10" y="16" width="10" height="2.5" />
          </svg>
          <span className="font-sans font-semibold text-lg lg:text-xl lowercase tracking-tight">cargowise</span>
        </div>
      )
    },
    {
      name: "CMA CGM",
      element: (
        <div className="flex flex-col items-center justify-center text-[#001054] dark:text-white">
          <span className="font-sans font-black text-lg lg:text-xl tracking-tighter leading-none">CMA CGM</span>
          <svg width="32" height="5" viewBox="0 0 40 6" className="text-[#E3000F] fill-current mt-1 lg:w-10 lg:h-1.5">
            <path d="M0 6C15 6 25 0 40 0C25 2 15 6 0 6Z"/>
          </svg>
        </div>
      )
    },
    {
      name: "Hapag-Lloyd",
      element: (
        <div className="flex items-center gap-2 text-[#001054] dark:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-[#00275E] dark:text-[#3B82F6] fill-current lg:w-6 lg:h-6">
            <path d="M12 4 L4 12 L12 20 H17 L9 12 L17 4 Z" />
            <path d="M20 4 L12 12 L20 20 H25 L17 12 L25 4 Z" />
          </svg>
          <span className="font-sans font-bold text-base lg:text-lg tracking-tight">Hapag-Lloyd</span>
        </div>
      )
    },
    {
      name: "MSC",
      element: (
        <div className="font-serif font-black flex flex-col items-center leading-none text-[#001054] dark:text-white">
          <span className="text-2xl lg:text-3xl tracking-tighter">m</span>
          <span className="text-lg lg:text-xl tracking-tighter -mt-2">sc</span>
        </div>
      )
    },
    {
      name: "EVERGREEN",
      element: (
        <div className="flex items-center gap-1.5 text-[#007A3E]">
          <Globe size={18} className="stroke-[2.5px] lg:w-[22px] lg:h-[22px]" />
          <span className="font-sans font-black text-lg lg:text-xl tracking-wider">EVERGREEN</span>
        </div>
      )
    },
    {
      name: "MAERSK",
      element: (
        <div className="flex items-center gap-2 text-[#001054] dark:text-white">
          <div className="w-5 h-5 lg:w-6 lg:h-6 bg-[#42B0D5] flex items-center justify-center text-white">
            <Star size={12} fill="currentColor" strokeWidth={0}/>
          </div>
          <span className="font-sans font-black text-xl lg:text-2xl tracking-widest">MAERSK</span>
        </div>
      )
    },
    {
      name: "COSCO SHIPPING",
      element: (
        <div className="flex flex-col items-center text-[#003B7E] dark:text-[#3B82F6] leading-none">
          <div className="flex -space-x-1.5 lg:-space-x-2 mb-1">
            <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-[2.5px] lg:border-[3px] border-[#003B7E] dark:border-[#3B82F6]"></div>
            <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-[2.5px] lg:border-[3px] border-[#003B7E] dark:border-[#3B82F6]"></div>
          </div>
          <span className="font-sans font-black text-xs lg:text-sm tracking-tight">COSCO</span>
          <span className="text-[5px] lg:text-[6px] font-bold tracking-widest">SHIPPING</span>
        </div>
      )
    }
  ];

  const marqueeItems = [...logos, ...logos, ...logos];

  return (
    <div className="py-8 lg:py-10 bg-gray-50 dark:bg-[#000836] border-y border-gray-200 dark:border-blue-900/30 overflow-hidden relative z-10">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 dark:from-[#000836] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 dark:from-[#000836] to-transparent z-10 pointer-events-none"></div>
      
      <p className="text-center text-[9px] md:text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-6 lg:mb-8 uppercase tracking-[0.2em] px-4">
        Integrations With Top Industry Partners
      </p>

      <div className="flex animate-marquee whitespace-nowrap items-center">
        {marqueeItems.map((logo, idx) => (
          <div key={idx} className="flex items-center justify-center mx-8 lg:mx-12 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer">
             {logo.element}
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Before & After Slider (Control Tower)
const BeforeAfterSlider = () => {
  const [ref, isVisible] = useScrollReveal();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX;
    if (e.touches && e.touches.length > 0) { clientX = e.touches[0].clientX; } 
    else { clientX = e.clientX; }
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const sidebarMenu = [
    { icon: <LayoutDashboard size={14} />, label: 'Dashboard', active: true },
    { icon: <LineChart size={14} />, label: 'Analytics' },
    { icon: <Search size={14} />, label: 'Rates & Bookings' },
    { icon: <FileText size={14} />, label: 'Inquiry' },
    { icon: <Box size={14} />, label: 'Shipments' },
    { icon: <DollarSign size={14} />, label: 'Financials' },
  ];

  return (
    <section className="py-16 md:py-24 relative z-10 bg-white dark:bg-[#000C45]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16 relative z-10 px-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#001054] dark:text-white mb-4 tracking-tight leading-[1.2]">
            End the Manual Chaos. <br className="hidden sm:block"/>
            <span className="highlight-text text-[#001054] dark:text-white mt-1 inline-block">Command Your Freight.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-6">
            Transform fragmented spreadsheets, scattered documents, and endless status calls into a single, intelligent control tower for your entire operation.
          </p>
        </div>

        <div 
          ref={containerRef}
          className={`relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] rounded-xl lg:rounded-2xl overflow-hidden cursor-ew-resize transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} border border-gray-200 dark:border-blue-900/40 box-offset-static`}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* BACKGROUND LAYER: Before (Fixed aspect ratio, scaled to fit) */}
          <div className="absolute inset-0 z-10 bg-[#E5E5E5] dark:bg-[#000524] overflow-hidden flex items-center justify-center select-none pointer-events-none">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-30"></div>
             
             {/* Fixed Canvas to prevent mobile overlap breaking */}
             <div className="relative w-[1000px] h-[650px] transform scale-[0.35] sm:scale-[0.5] md:scale-[0.7] lg:scale-[0.9] xl:scale-100 origin-center flex-shrink-0">
                
                {/* Blurry Rejected PDF */}
                <div className="absolute top-[5%] left-[10%] w-56 h-64 bg-white shadow-lg border border-gray-200 transform rotate-[-8deg] p-4 flex flex-col z-0 opacity-70">
                  <div className="text-[8px] font-bold border-b pb-1 mb-2 text-gray-800">COMMERCIAL INVOICE_v2.pdf</div>
                  <div className="h-2 w-full bg-gray-200 mb-1"></div>
                  <div className="h-2 w-3/4 bg-gray-200 mb-3"></div>
                  <div className="flex-1 border border-gray-100 p-2 flex flex-col gap-2">
                     <div className="h-1.5 w-full bg-gray-100"></div>
                     <div className="h-1.5 w-full bg-gray-100"></div>
                     <div className="h-1.5 w-5/6 bg-gray-100"></div>
                     <div className="h-1.5 w-full bg-gray-100"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[16px] text-red-500 font-black border-4 border-red-500 rounded p-1 text-center rotate-[-25deg] opacity-60">REJECTED</div>
                </div>

                {/* Messy Desktop Folders */}
                <div className="absolute top-[8%] right-[25%] flex flex-col gap-6 z-0 opacity-60">
                   <div className="flex items-center gap-2 flex-col"><div className="w-12 h-10 bg-blue-300 rounded-sm relative shadow-sm"><div className="absolute -top-1.5 left-0 w-5 h-3 bg-blue-300 rounded-t-sm"></div></div><span className="text-[9px] text-gray-600 font-bold bg-white/50 px-1 rounded">2023_RATES</span></div>
                   <div className="flex items-center gap-2 flex-col ml-8"><div className="w-12 h-10 bg-blue-300 rounded-sm relative shadow-sm"><div className="absolute -top-1.5 left-0 w-5 h-3 bg-blue-300 rounded-t-sm"></div></div><span className="text-[9px] text-gray-600 font-bold bg-white/50 px-1 rounded">OLD_DO_NOT_USE</span></div>
                </div>

                {/* Spreadsheet */}
                <div className="absolute top-[18%] left-[15%] w-72 bg-white shadow-xl border border-gray-300 transform -rotate-3 p-3 rounded-md animate-float z-10">
                   <div className="flex items-center gap-2 mb-2 border-b pb-2 text-green-700">
                     <FileSpreadsheet size={14} /> <span className="text-[10px] font-mono font-bold">RATES_FINAL_v7_copy.xlsx</span>
                   </div>
                   <div className="grid grid-cols-4 gap-1 opacity-50">
                     {[...Array(16)].map((_, i) => <div key={i} className={`h-1.5 rounded-sm ${i % 4 === 0 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>)}
                   </div>
                </div>

                {/* Frantic Chat Notification */}
                <div className="absolute top-[32%] right-[22%] w-52 bg-white border border-blue-200 shadow-[0_5px_15px_rgba(0,0,0,0.1)] rounded-md p-2 z-30 transform rotate-[4deg] flex gap-2 animate-pulse">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">S</div>
                    <div>
                       <div className="text-[9px] font-bold text-gray-800">Sarah (Logistics)</div>
                       <div className="text-[9px] text-gray-600 leading-tight mt-0.5">Did you email the client yet?? They are threatening to cancel.</div>
                    </div>
                </div>

                {/* Manual Calculator */}
                <div className="absolute bottom-[8%] left-[12%] w-40 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-3 transform rotate-[-6deg] z-20">
                   <div className="text-[8px] text-gray-400 mb-1 text-center font-bold">Manual Markup Calc</div>
                   <div className="w-full h-8 bg-gray-900 rounded mb-2 flex items-center justify-end text-green-400 font-mono p-2 text-xs border border-gray-900 shadow-inner">1450.00 * 1.15</div>
                   <div className="grid grid-cols-4 gap-1.5">
                      {[...Array(12)].map((_, i) => <div key={i} className="h-6 bg-gray-700 rounded-sm"></div>)}
                      <div className="col-span-2 h-6 bg-orange-500 rounded-sm"></div>
                   </div>
                </div>

                {/* Frustrated Email */}
                <div className="absolute top-[48%] left-[22%] w-72 bg-white shadow-2xl border-l-4 border-red-500 transform rotate-2 p-4 rounded-md animate-float-delayed z-30">
                   <div className="flex items-center justify-between mb-2 border-b border-gray-100 pb-2">
                     <span className="text-[10px] font-bold text-gray-800">Fwd: RE: URGENT Update</span>
                     <Mail size={12} className="text-gray-400" />
                   </div>
                   <p className="text-[10px] text-gray-600 font-serif leading-relaxed">"Where is my container? You said it would arrive Tuesday. I cannot find the tracking link..."</p>
                </div>

                {/* Team Chat Note */}
                <div className="absolute bottom-[30%] left-[35%] w-60 bg-white shadow-xl border border-gray-200 p-3 rounded-tr-xl rounded-b-xl animate-float z-40 transform -rotate-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-[9px] text-white font-bold">JD</div>
                        <span className="text-[10px] font-bold text-gray-800">John (Sales Team)</span>
                    </div>
                    <p className="text-[10px] text-gray-600">Client is on line 1, where is the updated BOL for G-402?? We are losing this deal!</p>
                </div>

                {/* Password Sticky */}
                <div className="absolute bottom-[18%] right-[32%] w-36 h-36 bg-yellow-100 shadow-lg transform rotate-12 p-4 animate-float-delayed z-30" style={{ boxShadow: '3px 3px 15px rgba(0,0,0,0.08)' }}>
                   <p className="text-xs text-gray-800 italic leading-relaxed" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>Login for Carrier Portal: admin / password123</p>
                </div>

                {/* Urgent Pink Sticky */}
                <div className="absolute top-[8%] right-[8%] w-32 h-32 bg-pink-200 shadow-lg transform rotate-[-8deg] p-3 animate-float z-20" style={{ boxShadow: '2px 2px 12px rgba(0,0,0,0.1)' }}>
                   <div className="w-full flex justify-center mb-1"><div className="w-8 h-2 bg-red-400/30 -mt-4 transform rotate-3"></div></div>
                   <p className="text-[11px] text-gray-900 font-bold leading-tight mt-1" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>Call Customs Broker ASAP!! 🚢 Container stuck.</p>
                </div>

                {/* System Error Modal */}
                <div className="absolute top-[28%] right-[8%] w-64 bg-red-50 border border-red-200 shadow-2xl transform rotate-3 p-4 rounded-md animate-float z-40">
                   <div className="flex items-center gap-2 text-red-600 mb-2">
                     <AlertTriangle size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">System Error 502</span>
                   </div>
                   <div className="text-[10px] text-red-600/80 leading-relaxed font-mono">Manual API sync failed. Please update records in CargoWise manually.</div>
                </div>

                {/* Exporting Data Modal */}
                <div className="absolute top-[60%] right-[3%] w-56 bg-white shadow-xl border border-gray-300 p-4 rounded-md animate-float-delayed z-20 transform -rotate-2">
                    <div className="text-[10px] font-bold text-gray-700 mb-3 flex items-center justify-between">
                      <span>Exporting Data...</span> <RefreshCw size={10} className="animate-spin text-gray-400" />
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
                        <div className="bg-blue-500 w-[99%] h-full"></div>
                    </div>
                    <div className="text-[9px] text-red-500 font-mono">Timeout: Stuck at 99%</div>
                </div>
                
                {/* File Explorer Windows Background Clutter */}
                <div className="absolute bottom-[5%] right-[5%] w-72 h-56 bg-gray-100 shadow-md border border-gray-300 rounded-md transform rotate-6 z-10 flex flex-col">
                   <div className="h-6 bg-gray-200 border-b border-gray-300 flex items-center px-2 gap-1 rounded-t-md">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div><div className="w-2 h-2 rounded-full bg-gray-400"></div><div className="w-2 h-2 rounded-full bg-gray-400"></div>
                   </div>
                   <div className="flex-1 p-3 flex flex-wrap gap-2 content-start opacity-30">
                      {[...Array(8)].map((_,i) => <div key={i} className="w-10 h-10 bg-gray-300 rounded-sm"></div>)}
                   </div>
                </div>
                <div className="absolute bottom-[8%] right-[10%] w-64 h-48 bg-white shadow-2xl border border-gray-300 rounded-md transform rotate-12 z-10 flex flex-col">
                   <div className="h-6 bg-blue-100 border-b border-blue-200 flex items-center px-2 gap-1 rounded-t-md">
                      <div className="text-[8px] font-bold text-blue-800">Unsorted_Downloads</div>
                   </div>
                   <div className="flex-1 p-3">
                     <div className="h-2 w-2/3 bg-gray-200 mb-2 rounded"></div>
                     <div className="h-1.5 w-3/4 bg-gray-100 mb-1 rounded"></div>
                     <div className="h-1.5 w-5/6 bg-gray-100 rounded"></div>
                   </div>
                </div>
             </div>

             <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/90 dark:bg-[#000524]/80 backdrop-blur-md text-gray-900 dark:text-white px-3 py-1.5 md:px-4 md:py-1.5 rounded text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg border border-gray-200 dark:border-white/10 z-50 pointer-events-auto">
                The Chaos
             </div>
          </div>

          {/* FOREGROUND LAYER: After (Scaled to fit) */}
          <div 
            className="absolute inset-0 z-20 bg-gray-50 dark:bg-[#000836] border-r-2 md:border-r-4 border-[#FF5C00] overflow-hidden select-none shadow-[-5px_0_15px_rgba(0,0,0,0.1)] md:shadow-[-10px_0_30px_rgba(0,0,0,0.1)] pointer-events-none"
            style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-gray-50 to-gray-100 dark:from-blue-900/10 dark:via-[#000836] dark:to-[#000836]">
                
                {/* Fixed Canvas to prevent flex collapsing on mobile */}
                <div className="relative w-[1000px] h-[580px] transform scale-[0.4] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.95] xl:scale-100 origin-center flex-shrink-0">
                  <div className="w-full h-full bg-white dark:bg-[#001054] rounded-xl border border-gray-200 dark:border-blue-900/50 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex overflow-hidden">
                     
                     <div className="flex w-56 bg-gray-50/50 dark:bg-[#000524] border-r border-gray-200 dark:border-blue-900/50 flex-col py-5 z-10">
                        <div className="px-6 flex items-center gap-2 mb-8">
                            <img src="/logo.svg" alt="Gama Logo"   className="w-16 h-16 object-contain" />
                        </div>
                        <div className="flex-1 px-4 space-y-1">
                           {sidebarMenu.map((item, i) => (
                             <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded text-[11px] font-bold uppercase tracking-wider transition-colors ${item.active ? 'bg-blue-50 dark:bg-[#001566] text-blue-600 dark:text-blue-400 border-l-[3px] border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 border-l-[3px] border-transparent'}`}>
                               {item.icon} <span>{item.label}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="flex-1 flex flex-col bg-white dark:bg-[#001054]">
                        <div className="h-14 border-b border-gray-200 dark:border-blue-900/50 flex items-center justify-between px-6 bg-white dark:bg-[#001054]">
                           <Menu size={16} className="text-gray-400" />
                           <div className="flex items-center gap-6">
                              <div className="flex flex-col items-end">
                                <span className="flex items-center gap-1.5 text-[9px] text-gray-500 uppercase tracking-widest font-bold"><RefreshCw size={10} className="text-green-500"/> API SYNCED</span>
                                <span className="text-[11px] font-mono text-gray-900 dark:text-white">14:43:22 UTC</span>
                              </div>
                              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#001566] px-3 py-1.5 rounded border border-gray-200 dark:border-blue-900/50">
                                 <div className="w-5 h-5 bg-[#001054] dark:bg-[#FF5C00] rounded flex items-center justify-center text-white text-[9px] font-black">AT</div>
                                 <span className="text-[10px] text-gray-800 dark:text-white font-bold uppercase tracking-wider">Admin ▾</span>
                              </div>
                           </div>
                        </div>

                        <div className="flex-1 p-5 flex flex-col gap-5 overflow-hidden">
                           <div className="grid grid-cols-4 gap-4">
                              {[
                                { label: 'Total Bookings', val: '327 Bookings', bg: 'bg-[#E65141]' },
                                { label: 'Booking Utilized', val: '320 Bookings', bg: 'bg-[#63C268]' },
                                { label: 'Booking Cancelled', val: '7 Bookings', bg: 'bg-[#F4C144]' },
                                { label: 'Utilization', val: '98 %', bg: 'bg-[#4C84D4]' }
                              ].map((stat, i) => (
                                <div key={i} className={`${stat.bg} text-white rounded-lg p-4 shadow-sm flex flex-col justify-center min-h-[80px]`}>
                                  <div className="text-2xl font-bold mb-0.5 tracking-tight">{stat.val}</div>
                                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">{stat.label}</div>
                                </div>
                              ))}
                           </div>

                           <div className="flex-1 bg-gray-50 dark:bg-[#000836] border border-gray-200 dark:border-blue-900/50 rounded-lg relative overflow-hidden min-h-[160px]">
                              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                              <div className="absolute bottom-2 left-3 text-[9px] font-mono text-gray-400 z-10">LIVE_TRACKING_SYS_ON</div>

                              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
                                 <defs>
                                   <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                                     <feGaussianBlur stdDeviation="3" result="blur" />
                                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                   </filter>
                                   <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
                                     <feGaussianBlur stdDeviation="3" result="blur" />
                                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                   </filter>
                                 </defs>
                                 
                                 <path d="M 250 120 Q 365 50 480 100" fill="none" className="stroke-blue-300 dark:stroke-blue-500/50" strokeWidth="1.5" strokeDasharray="3,3" />
                                 <path d="M 500 140 Q 650 250 800 220" fill="none" className="stroke-orange-300 dark:stroke-[#FF5C00]/50" strokeWidth="1.5" strokeDasharray="3,3" />

                                 <circle cx="150" cy="140" r="8" fill="#63C268" fillOpacity="0.8" className="animate-pulse" />
                                 <circle cx="180" cy="160" r="6" fill="#63C268" fillOpacity="0.8" />
                                 <circle cx="220" cy="180" r="10" fill="#63C268" fillOpacity="0.8" className="animate-pulse" />
                                 <circle cx="480" cy="100" r="8" fill="#F4C144" fillOpacity="0.8" />
                                 <circle cx="500" cy="140" r="10" fill="#F4C144" fillOpacity="0.8" className="animate-pulse" />
                                 <circle cx="750" cy="180" r="6" fill="#E65141" fillOpacity="0.8" />
                                 <circle cx="800" cy="220" r="10" fill="#E65141" fillOpacity="0.8" className="animate-pulse" />
                                 <circle cx="850" cy="240" r="6" fill="#E65141" fillOpacity="0.8" />

                                 <circle r="4" className="fill-blue-600 dark:fill-blue-400" filter="url(#glow-cyan)">
                                    <animateMotion dur="5s" repeatCount="indefinite" path="M 250 120 Q 365 50 480 100" />
                                 </circle>
                                 <circle r="4" className="fill-orange-600 dark:fill-[#FF5C00]" filter="url(#glow-orange)">
                                    <animateMotion dur="7s" repeatCount="indefinite" path="M 500 140 Q 650 250 800 220" />
                                 </circle>
                              </svg>
                           </div>

                           <div className="h-32 grid grid-cols-2 gap-4">
                              <div className="bg-white dark:bg-[#001566] border border-gray-200 dark:border-blue-900/50 rounded-lg p-4 flex flex-col shadow-sm">
                                 <div className="text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-white mb-3">Recent Bookings</div>
                                 <div className="flex-1 space-y-2">
                                   {[1,2,3].map(i => (
                                     <div key={i} className="flex justify-between items-center text-[10px] border-b border-gray-100 dark:border-blue-900/40 pb-1">
                                       <span className="font-mono text-gray-500 dark:text-gray-400">BKG-{9020+i}</span>
                                       <span className="font-semibold text-gray-800 dark:text-gray-200">SHA → LAX</span>
                                       <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded font-bold">CONFIRMED</span>
                                     </div>
                                   ))}
                                 </div>
                              </div>
                              <div className="bg-white dark:bg-[#001566] border border-gray-200 dark:border-blue-900/50 rounded-lg p-4 flex flex-col justify-between shadow-sm">
                                 <div className="text-[10px] font-bold uppercase tracking-wider text-gray-800 dark:text-white mb-2">Revenue (MTD)</div>
                                 <div className="text-3xl font-black font-mono text-[#001054] dark:text-white tracking-tight">$142,500</div>
                                 <div className="flex items-center text-[10px] font-bold text-[#63C268]">
                                   <ArrowUpRight size={12} className="mr-1" /> +12.5% vs last month
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
                
             <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white dark:bg-[#000524]/80 backdrop-blur-md text-[#001054] dark:text-white px-3 py-1.5 md:px-4 md:py-1.5 rounded text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg border border-gray-200 dark:border-white/10 z-30 pointer-events-auto">
                The Control Tower
             </div>
            </div>
          </div>

          <div 
            className="absolute top-0 bottom-0 w-1 md:w-1.5 bg-[#FF5C00] shadow-[0_0_15px_rgba(255,92,0,0.6)] z-30 cursor-ew-resize hover:bg-orange-500 transition-colors"
            style={{ left: `calc(${sliderPos}% - 2px)` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white dark:bg-[#001054] rounded shadow-[0_4px_10px_rgba(0,0,0,0.1)] border-2 border-[#FF5C00] flex items-center justify-center pointer-events-none transition-transform box-offset-contrast">
              <div className="flex space-x-0 md:space-x-0.5 text-[#FF5C00]">
                <ChevronRight size={14} className="rotate-180 -mr-2 md:-mr-2" strokeWidth={3} />
                <ChevronRight size={14} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. Core Features (Restored 6-Element Bento Grid)
const Features = () => {
  const [ref, isVisible] = useScrollReveal();
  
  const chartHeights = [
    "h-[20%] group-hover:h-[45%]",
    "h-[30%] group-hover:h-[75%]",
    "h-[15%] group-hover:h-[50%]",
    "h-[40%] group-hover:h-[95%]",
    "h-[25%] group-hover:h-[65%]",
    "h-[10%] group-hover:h-[80%]",
    "h-[35%] group-hover:h-[60%]"
  ];

  return (
    <section id="platform" className="py-24 bg-gray-50 dark:bg-[#000836] relative z-10 border-t border-gray-200 dark:border-blue-900/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 md:mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#001054] dark:text-white tracking-tight">
            Core <span className="highlight-text text-[#001054] dark:text-white mt-1">Platform Features</span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            A comprehensive, enterprise-grade toolkit designed to modernize your forwarding operations. Empower your shippers to self-serve while you eliminate manual data entry and focus on scaling your business.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[auto] md:auto-rows-[280px] transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

          {/* Card 1: Search Rates, Get Quotes */}
          <div className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-blue-900/50 bg-white dark:bg-[#001054] col-span-1 md:col-span-2 row-span-1 box-offset cursor-default">
            <div className="relative h-full p-6 md:p-8 flex flex-col md:flex-row items-start justify-between z-10">
              <div className="w-full md:w-[45%]">
                <div className="w-10 h-10 rounded border border-[#FF5C00]/20 bg-orange-50 dark:bg-[#FF5C00]/10 flex items-center justify-center text-[#FF5C00] mb-4 md:mb-5">
                  <Search size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#001054] dark:text-white mb-2 tracking-tight group-hover:text-[#FF5C00] transition-colors">Search Rates, Get Quotes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Fast and reliable freight shipping rates search gives your customers on-demand pricing across all modes—with your controlled markup and branding.</p>
              </div>

              <div className="hidden md:flex absolute right-0 bottom-0 w-[50%] h-[80%] bg-white dark:bg-[#001566] rounded-tl-xl border-t border-l border-gray-200 dark:border-blue-900/50 shadow-[-5px_-5px_20px_rgba(0,0,0,0.05)] transition-all duration-500 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 flex-col p-5">
                <div className="flex justify-between items-center mb-4">
                   <div className="bg-gray-100 dark:bg-[#001054] px-2 py-1 rounded text-xs font-bold font-mono dark:text-white border border-gray-200 dark:border-blue-900/50">CNSHA</div>
                   <div className="flex-1 h-px bg-gray-200 dark:bg-blue-900/50 mx-3 relative">
                      <Plane className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-400 group-hover:text-[#FF5C00] group-hover:left-[calc(100%-1rem)] transition-all duration-700 ease-in-out" size={14}/>
                   </div>
                   <div className="bg-gray-100 dark:bg-[#001054] px-2 py-1 rounded text-xs font-bold font-mono dark:text-white border border-gray-200 dark:border-blue-900/50">USLAX</div>
                </div>
                <div className="bg-blue-50/50 dark:bg-[#001054]/50 p-3 rounded border border-blue-100 dark:border-blue-900/50 mt-auto">
                   <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Ocean FCL • 20 Days</div>
                   <div className="flex justify-between items-end">
                      <div className="text-2xl font-black font-mono text-[#001054] dark:text-white">$1,450</div>
                      <div className="bg-[#001054] dark:bg-blue-500 text-white dark:text-[#001054] text-[10px] uppercase tracking-wider px-3 py-1.5 rounded font-bold hover:bg-[#FF5C00] transition-colors cursor-pointer">Quote</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Book Shipments In All Modes */}
          <div className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-blue-900/50 bg-white dark:bg-[#001054] col-span-1 row-span-1 flex flex-col box-offset cursor-default">
             <div className="relative p-6 md:p-8 flex flex-col h-full z-10">
                <div className="w-10 h-10 rounded border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <Box size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#001054] dark:text-white mb-2 tracking-tight group-hover:text-[#FF5C00] transition-colors">Book Shipments In All Modes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 md:mb-0">Hassle-free online booking options allow your customers to self-serve and book containerized loads online, all with the look and feel of your brand.</p>

                <div className="mt-auto w-full flex justify-center hidden md:flex">
                   <div className="w-full max-w-[200px] bg-gray-50 dark:bg-[#001566] rounded border border-gray-200 dark:border-blue-900/50 p-3 shadow-sm group-hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-2">Select Mode</div>
                      <div className="flex gap-2">
                         <div className="flex-1 py-1.5 bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded flex justify-center group-hover:bg-[#FF5C00] group-hover:border-[#FF5C00] group-hover:text-white transition-colors duration-300 delay-100"><Anchor size={12}/></div>
                         <div className="flex-1 py-1.5 bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded flex justify-center transition-colors"><Plane size={12} className="text-gray-400"/></div>
                         <div className="flex-1 py-1.5 bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded flex justify-center transition-colors"><Truck size={12} className="text-gray-400"/></div>
                      </div>
                      <div className="mt-2 text-center bg-[#001054] dark:bg-white text-white dark:text-[#001054] text-[9px] font-bold uppercase tracking-wider py-1.5 rounded opacity-50 group-hover:opacity-100 transition-opacity duration-300 delay-200 cursor-pointer">Confirm</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 3: Real-Time Track And Trace */}
          <div className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-blue-900/50 bg-white dark:bg-[#001054] col-span-1 row-span-1 md:row-span-2 flex flex-col box-offset cursor-default">
             <div className="relative p-6 md:p-8 z-10 flex flex-col h-full">
                <div className="w-10 h-10 rounded border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                  <MapPin size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#001054] dark:text-white mb-2 tracking-tight group-hover:text-[#FF5C00] transition-colors">Real-Time Track And Trace</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6 leading-relaxed">Crystal clear visibility from pick-up through delivery, our freight tracking system keeps your customers updated and in the know of issues before they arise.</p>

                <div className="relative flex-1 mt-auto pl-2 flex flex-col hidden md:flex">
                   <div className="relative h-[160px] flex flex-col justify-between">
                     <div className="absolute left-[7px] top-[8px] bottom-[8px] w-px bg-gray-200 dark:bg-blue-900/50 z-0"></div>
                     <div className="absolute left-[7px] top-[8px] w-px bg-[#FF5C00] h-0 group-hover:h-[calc(100%-16px)] transition-all duration-700 ease-linear z-10"></div>

                     <div className="relative z-20 flex items-center gap-3">
                       <div className="w-4 h-4 rounded-sm bg-white dark:bg-[#001054] border-[3px] border-[#FF5C00] flex-shrink-0"></div>
                       <div>
                         <div className="text-xs font-bold dark:text-white leading-tight">Origin Port</div>
                         <div className="text-[10px] text-gray-500 font-mono mt-0.5">Departed</div>
                       </div>
                     </div>
                     
                     <div className="relative z-20 flex items-center gap-3">
                       <div className="w-4 h-4 rounded-sm bg-white dark:bg-[#001054] border-[3px] border-gray-300 dark:border-blue-900/50 group-hover:border-[#FF5C00] transition-colors duration-300 delay-[350ms] flex-shrink-0"></div>
                       <div>
                         <div className="text-xs font-bold dark:text-white leading-tight">Ocean Transit</div>
                         <div className="text-[10px] text-gray-500 font-mono mt-0.5">In Progress</div>
                       </div>
                     </div>
                     
                     <div className="relative z-20 flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity duration-300 delay-0 group-hover:delay-[600ms]">
                       <div className="w-4 h-4 rounded-sm bg-white dark:bg-[#001054] border-[3px] border-gray-300 dark:border-blue-900/50 group-hover:border-[#FF5C00] transition-colors duration-300 delay-0 group-hover:delay-[700ms] flex-shrink-0"></div>
                       <div>
                         <div className="text-xs font-bold dark:text-white leading-tight">Destination</div>
                         <div className="relative h-3 w-16 mt-0.5">
                           <div className="absolute inset-0 text-[10px] font-mono text-gray-500 transition-opacity duration-200 delay-0 group-hover:delay-[600ms] group-hover:opacity-0">Pending</div>
                           <div className="absolute inset-0 text-[10px] font-mono text-[#FF5C00] font-bold opacity-0 transition-opacity duration-200 delay-0 group-hover:delay-[700ms] group-hover:opacity-100">Arrived</div>
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 4: Manage Live Shipments */}
          <div className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-blue-900/50 bg-white dark:bg-[#001054] col-span-1 row-span-1 flex flex-col box-offset cursor-default">
             <div className="relative p-6 md:p-8 z-10 flex flex-col h-full">
                <div className="w-10 h-10 rounded border border-purple-200 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                  <LayoutDashboard size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#001054] dark:text-white mb-2 tracking-tight group-hover:text-[#FF5C00] transition-colors">Manage Live Shipments</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 md:mb-0">Through a modern, easy-to-use interface, customers can submit requests, edit or cancel bookings, download documents, and more.</p>

                <div className="mt-auto w-full flex justify-center hidden md:flex">
                   <div className="w-full bg-gray-50 dark:bg-[#001566] rounded border border-gray-200 dark:border-blue-900/50 p-3 shadow-sm group-hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                      <div className="flex justify-between items-center border-b border-gray-200 dark:border-blue-900/50 pb-2 mb-2">
                        <span className="text-[10px] font-mono font-bold dark:text-white">SHP-9021</span>
                        <span className="text-[8px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded font-black uppercase">Active</span>
                      </div>
                      <div className="flex justify-between items-center bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 p-1.5 rounded group-hover:border-[#FF5C00]/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-2">
                          <FileText size={12} className="text-purple-500" />
                          <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">BOL_Final.pdf</span>
                        </div>
                        <div className="w-5 h-5 rounded bg-gray-100 dark:bg-[#001566] flex items-center justify-center group-hover:bg-[#FF5C00] group-hover:text-white transition-colors duration-300">
                           <ArrowDownUp size={10} className="transform rotate-180" />
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 5: Pay Invoices */}
          <div className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-blue-900/50 bg-white dark:bg-[#001054] col-span-1 row-span-1 flex flex-col box-offset cursor-default">
             <div className="relative p-6 md:p-8 z-10 flex flex-col h-full">
                <div className="w-10 h-10 rounded border border-[#FF5C00]/20 bg-orange-50 dark:bg-[#FF5C00]/10 flex items-center justify-center text-[#FF5C00] mb-4">
                  <DollarSign size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#001054] dark:text-white mb-2 tracking-tight group-hover:text-[#FF5C00] transition-colors">Pay Invoices</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 md:mb-0">Quick and easy payment options allow your customers to securely pay invoices online for all freight modes with the click of a button.</p>

                <div className="mt-auto flex justify-center hidden md:flex">
                   <div className="w-full max-w-[180px] bg-gray-50 dark:bg-[#001566] rounded border border-gray-200 dark:border-blue-900/50 p-4 shadow-sm group-hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                      <div className="text-[10px] font-mono text-gray-500 mb-2">INV-9942</div>
                      <div className="text-xl font-black font-mono dark:text-white mb-3">$3,250.00</div>
                      <div className="w-full py-1.5 bg-[#001054] dark:bg-white text-white dark:text-[#001054] text-[10px] uppercase tracking-wider font-bold rounded-sm text-center">
                         Pay Now
                      </div>
                      
                      <div className="absolute inset-0 bg-green-500/95 flex items-center justify-center opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
                         <div className="border-2 border-white text-white font-black text-lg px-3 py-0.5 rounded transform -rotate-12 tracking-widest uppercase">
                           Paid
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Card 6: Gain Actionable Insight */}
          <div className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-blue-900/50 bg-white dark:bg-[#001054] col-span-1 md:col-span-2 lg:col-span-2 row-span-1 box-offset cursor-default">
            <div className="relative h-full p-6 md:p-8 flex flex-col md:flex-row items-start justify-between z-10">
              <div className="w-full md:w-[45%]">
                <div className="w-10 h-10 rounded border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 md:mb-5">
                  <LineChart size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#001054] dark:text-white mb-2 tracking-tight group-hover:text-[#FF5C00] transition-colors">Gain Actionable Insight</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Actionable information from analytical tools empowers your customers, making you an invaluable partner in freight management. Real-time data is readily accessible.</p>
              </div>

              <div className="hidden md:flex absolute right-0 bottom-0 w-[50%] h-[80%] bg-white dark:bg-[#001566] rounded-tl-xl border-t border-l border-gray-200 dark:border-blue-900/50 shadow-[-5px_-5px_20px_rgba(0,0,0,0.05)] transition-all duration-500 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 flex-col p-5">
                <div className="flex justify-between items-center mb-4">
                   <div className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Freight Spend Analysis</div>
                   <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[9px] px-2 py-0.5 rounded font-black">+14.2%</div>
                </div>
                <div className="flex-1 flex items-end justify-between gap-2 border-b border-gray-200 dark:border-blue-900/50 pb-2">
                   {chartHeights.map((classes, i) => (
                      <div key={i} className="w-full bg-gray-100 dark:bg-blue-900/40 rounded-t-sm h-full relative flex items-end overflow-hidden">
                         <div 
                           className={`w-full bg-[#001054] dark:bg-blue-500 rounded-t-sm transition-all duration-500 ease-out ${classes}`}
                           style={{ transitionDelay: `${i * 50}ms` }}
                         ></div>
                      </div>
                   ))}
                </div>
                <div className="flex justify-between mt-2 px-1">
                   <div className="text-[8px] font-mono text-gray-400">Q1</div>
                   <div className="text-[8px] font-mono text-gray-400">Q2</div>
                   <div className="text-[8px] font-mono text-gray-400">Q3</div>
                   <div className="text-[8px] font-mono text-gray-400">Q4</div>
                   <div className="text-[8px] font-mono text-gray-400">Q5</div>
                   <div className="text-[8px] font-mono text-gray-400">Q6</div>
                   <div className="text-[8px] font-mono text-gray-400">Q7</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// 7. Cross Platform Experience (Morphing Device)
const CrossPlatformExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  const platformFeatures = [
    {
      title: "Global Command Center",
      desc: "Give your shippers a comprehensive desktop dashboard. They can track all active containerized loads, view high-level analytics, and manage their entire supply chain from a single screen.",
      icon: <LayoutDashboard />
    },
    {
      title: "Centralized Documents",
      desc: "End the email chaos. Your customers can securely access, upload, and approve bills of lading, commercial invoices, and customs documents directly within their web portal.",
      icon: <FileText />
    },
    {
      title: "Port Compliance & Alerts",
      desc: "Stay ahead of customs holds and terminal fees. Automate ISF filings, screen denied parties, and trigger real-time demurrage warnings before costs accrue.",
      icon: <ShieldCheck />
    },
    {
      title: "Carbon Footprint Tracking",
      desc: "Provide comprehensive Scope 3 emissions reporting. Empower your customers to track, measure, and offset their carbon footprint directly from their dashboard.",
      icon: <Leaf />
    },
    {
      title: "Supply Chain In Their Pocket",
      desc: "Take the experience fully mobile. Provide a white-labeled iOS and Android app so clients can receive instant push notifications and track shipments on the go.",
      icon: <Smartphone />
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Dynamic trigger point: higher on desktop, lower on mobile so scroll feels natural
      const triggerPoint = typeof window !== 'undefined' && window.innerWidth < 1024 
         ? window.innerHeight * 0.75 
         : window.innerHeight * 0.45;
         
      let closestIndex = 0;
      let minDistance = Infinity;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const distance = Math.abs(triggerPoint - center);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });
      setActiveIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = activeIndex === 4;

  return (
    <section className="relative z-10 bg-white dark:bg-[#000C45] border-y border-gray-200 dark:border-blue-900/30">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row relative">

        {/* Left Column: Text Content */}
        <div className="w-full lg:w-[45%] pb-[10vh] lg:pb-[35vh] order-2 lg:order-1 pt-12 lg:pt-0">
           
           {/* Section Header */}
           <div className="pt-8 lg:pt-48 mb-16 lg:mb-24 relative z-10 text-center lg:text-left">
             <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 mb-6 backdrop-blur-sm">
               <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5C00]"></span>
               <span className="text-[10px] font-bold text-[#001054] dark:text-blue-400 tracking-[0.2em] uppercase">Omnichannel Sync</span>
             </div>
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#001054] dark:text-white mb-6 tracking-tight leading-[1.1]">
               Your supply chain, <br/>
               <span className="highlight-text text-[#001054] dark:text-white mt-2 inline-block">on every screen.</span>
             </h2>
             <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
               Provide your shippers with a fully-featured, white-labeled portal synced directly with your core system. 
             </p>
           </div>

           {/* Tighter Cinematic Scrolling Features with Timeline */}
           <div className="relative z-10">
             {/* Glowing Timeline Track (Desktop Only) */}
             <div className="absolute left-2 top-8 bottom-[-10vh] w-px bg-gradient-to-b from-blue-500/40 via-blue-500/20 to-transparent hidden lg:block"></div>

             {platformFeatures.map((f, i) => (
                <div 
                  key={i} 
                  ref={el => sectionRefs.current[i] = el} 
                  className={`relative pl-0 lg:pl-16 mb-[20vh] lg:mb-[25vh] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-center origin-left text-center lg:text-left items-center lg:items-start ${activeIndex === i ? 'opacity-100 translate-y-0 scale-100 blur-none' : 'opacity-30 lg:opacity-20 translate-y-8 lg:translate-y-12 scale-95 lg:blur-[2px]'}`}
                >
                    {/* Active Node Indicator on Timeline */}
                    <div className={`hidden lg:block absolute left-2 top-6 -translate-x-1/2 w-3 h-3 rounded-full border-2 transition-all duration-700 ${activeIndex === i ? 'bg-[#FF5C00] border-[#FF5C00] shadow-[0_0_15px_rgba(255,92,0,0.6)] scale-125' : 'bg-[#000524] border-blue-900/50 scale-100'}`}></div>

                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-2xl transition-all duration-700 relative overflow-hidden ${activeIndex === i ? 'bg-[#001054] border border-[#FF5C00]/50 lg:translate-x-2' : 'bg-gray-100 dark:bg-[#000524] border-gray-200 dark:border-blue-900/30'}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br from-[#FF5C00]/20 to-transparent transition-opacity duration-700 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`}></div>
                      <div className={`relative z-10 transition-transform duration-700 ${activeIndex === i ? 'scale-110' : 'scale-100'}`}>
                        {React.cloneElement(f.icon, { size: window.innerWidth < 640 ? 20 : 24, className: activeIndex === i ? 'text-[#FF5C00]' : 'text-gray-400 dark:text-blue-500' })}
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#001054] dark:text-white mb-2 sm:mb-3 tracking-tighter drop-shadow-md leading-tight">{f.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">{f.desc}</p>
                </div>
             ))}
           </div>
        </div>

        {/* Right Column: Sticky Morphing Hardware */}
        <div className="w-full lg:w-[55%] h-[40vh] sm:h-[50vh] lg:h-screen sticky top-20 lg:top-0 self-start flex flex-col items-center justify-center z-0 order-1 lg:order-2 overflow-hidden pointer-events-none lg:pointer-events-auto border-b border-gray-200 dark:border-blue-900/30 lg:border-none bg-gray-50/50 dark:bg-[#000836]/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none">
           
           {/* Added Responsive Scale Wrapper for Perfect Symmetry across devices */}
           <div className="relative w-full flex flex-col items-center justify-center transform scale-[0.5] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.85] xl:scale-100 origin-center transition-transform duration-500">
               
               {/* Ambient Device Glow */}
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ease-in-out ${isMobile ? 'w-64 h-[500px] bg-[#FF5C00]/20' : 'w-[500px] h-[300px] bg-blue-500/10'}`}></div>

               {/* Hardware Bezel Container */}
               <div 
                 className={`relative bg-[#111] dark:bg-[#050505] shadow-2xl flex flex-col items-center overflow-hidden z-20 mx-auto
                   transition-[width,height,border-radius,border-width] duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
                   ${isMobile 
                     ? 'w-[260px] h-[540px] rounded-[2.5rem] border-[10px] border-gray-800 dark:border-gray-800' 
                     : 'w-[540px] h-[340px] rounded-t-xl rounded-b-sm border-[12px] border-b-[16px] border-gray-800 dark:border-gray-800'
                   }
                 `}
               >
                  {/* Laptop Camera Notch */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-gray-900 rounded-b-md z-30 transition-opacity duration-300 ${isMobile ? 'opacity-0' : 'opacity-100'}`}></div>
                  
                  {/* Mobile Phone Island */}
                  <div className={`absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 bg-black rounded-full z-30 transition-all duration-700 delay-300 ${isMobile ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}></div>

                  {/* The UI Screens Content */}
                  <div className="absolute inset-0 bg-white dark:bg-[#000C45] z-10 w-full h-full overflow-hidden">
                     
                     {/* Screen 0: Desktop Dashboard */}
                     <div className={`absolute inset-0 w-[516px] h-[312px] bg-gray-50 dark:bg-[#000524] flex transition-opacity duration-500 ${activeIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-32 bg-white dark:bg-[#001054] border-r border-gray-200 dark:border-blue-900/50 p-4 flex flex-col gap-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <img src="/gamacenter.svg" alt="GamaCenter Logo" className="w-4 h-4 object-contain" /><div className="h-3 w-12 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          </div>
                          <div className="h-2.5 w-full bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-3/4 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-full bg-[#FF5C00]/20 border-l-2 border-[#FF5C00] rounded-r"></div>
                          <div className="h-2.5 w-5/6 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                        </div>
                        <div className="flex-1 p-4 relative flex flex-col gap-3">
                          <div className="h-6 w-32 bg-gray-200 dark:bg-blue-900/30 rounded"></div>
                          <div className="flex gap-3">
                            <div className="flex-1 h-16 bg-blue-50 dark:bg-[#001566] rounded-lg border border-blue-100 dark:border-blue-900/50 p-2 flex flex-col justify-end"><div className="h-2 w-1/2 bg-blue-500/50 rounded"></div></div>
                            <div className="flex-1 h-16 bg-orange-50 dark:bg-[#FF5C00]/10 rounded-lg border border-orange-100 dark:border-[#FF5C00]/30 p-2 flex flex-col justify-end"><div className="h-2 w-1/2 bg-[#FF5C00]/50 rounded"></div></div>
                            <div className="flex-1 h-16 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30 p-2 flex flex-col justify-end"><div className="h-2 w-1/2 bg-green-500/50 rounded"></div></div>
                          </div>
                          <div className="flex-1 bg-white dark:bg-[#001054] rounded-lg border border-gray-200 dark:border-blue-900/50 p-3 relative overflow-hidden flex items-center justify-center">
                             <Map size={180} className="text-gray-100 dark:text-blue-900/30 absolute" />
                             <div className="bg-white/90 dark:bg-[#000524]/90 backdrop-blur border border-gray-200 dark:border-blue-900/50 p-3 rounded shadow-lg relative z-10 w-48">
                               <div className="flex justify-between items-center mb-2"><span className="text-[8px] font-mono text-gray-500">SHP-9021</span><span className="w-1.5 h-1.5 bg-[#FF5C00] rounded-full animate-pulse"></span></div>
                               <div className="h-1.5 w-full bg-gray-100 dark:bg-blue-900/30 rounded-full overflow-hidden"><div className="h-full bg-[#FF5C00] w-2/3"></div></div>
                             </div>
                          </div>
                        </div>
                     </div>

                     {/* Screen 1: Desktop Documents */}
                     <div className={`absolute inset-0 w-[516px] h-[312px] bg-gray-50 dark:bg-[#000524] flex transition-opacity duration-500 ${activeIndex === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-32 bg-white dark:bg-[#001054] border-r border-gray-200 dark:border-blue-900/50 p-4 flex flex-col gap-3">
                          <div className="flex items-center gap-1.5 mb-2">
                             <img src="/gamacenter.svg" alt="GamaCenter Logo" className="w-4 h-4 object-contain" /><div className="h-3 w-12 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          </div>
                          <div className="h-2.5 w-full bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-3/4 bg-[#FF5C00]/20 border-l-2 border-[#FF5C00] rounded-r"></div>
                          <div className="h-2.5 w-full bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-5/6 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                        </div>
                        <div className="flex-1 p-5 flex flex-col">
                          <div className="flex justify-between items-center mb-6">
                            <div className="h-6 w-32 bg-gray-200 dark:bg-blue-900/30 rounded"></div>
                            <div className="h-6 w-20 bg-[#FF5C00] rounded text-[8px] flex items-center justify-center text-white font-bold">+ Upload</div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            {[1,2,3,4,5,6].map(i => (
                              <div key={i} className="bg-white dark:bg-[#001054] p-4 rounded-lg border border-gray-200 dark:border-blue-900/50 flex flex-col items-center text-center gap-2 group hover:border-[#FF5C00] transition-colors">
                                <FileText size={24} className="text-gray-400 dark:text-blue-400 group-hover:text-[#FF5C00]" />
                                <div className="h-1.5 w-3/4 bg-gray-200 dark:bg-blue-900/40 rounded mt-1"></div>
                                <div className="h-1 w-1/2 bg-gray-100 dark:bg-blue-900/20 rounded"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                     </div>

                     {/* Screen 2: Desktop Port Compliance */}
                     <div className={`absolute inset-0 w-[516px] h-[312px] bg-gray-50 dark:bg-[#000524] flex transition-opacity duration-500 ${activeIndex === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-32 bg-white dark:bg-[#001054] border-r border-gray-200 dark:border-blue-900/50 p-4 flex flex-col gap-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <img src="/gamacenter.svg" alt="GamaCenter Logo" className="w-4 h-4 object-contain" /><div className="h-3 w-12 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          </div>
                          <div className="h-2.5 w-full bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-3/4 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-full bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-5/6 bg-[#FF5C00]/20 border-l-2 border-[#FF5C00] rounded-r"></div>
                          <div className="h-2.5 w-full bg-gray-200 dark:bg-blue-900/40 rounded mt-auto"></div>
                        </div>
                        <div className="flex-1 p-5 flex flex-col">
                          <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-blue-900/50 pb-3">
                            <div className="flex items-center gap-2">
                              <ShieldCheck size={16} className="text-green-500" />
                              <div className="h-4 w-24 bg-gray-200 dark:bg-blue-900/30 rounded"></div>
                            </div>
                            <div className="h-5 px-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[8px] flex items-center justify-center font-bold rounded border border-red-200 dark:border-red-900/50 animate-pulse">2 Action Req</div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded-lg p-3 flex justify-between items-center shadow-sm">
                              <div>
                                <div className="h-2 w-16 bg-gray-300 dark:bg-blue-900/50 rounded mb-1.5"></div>
                                <div className="h-1.5 w-24 bg-gray-200 dark:bg-blue-900/30 rounded"></div>
                              </div>
                              <div className="flex gap-2">
                                <div className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[7px] font-bold uppercase rounded flex items-center gap-1"><CheckCircle2 size={8}/> Cleared</div>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-[#001054] border border-red-200 dark:border-red-900/50 rounded-lg p-3 flex justify-between items-center shadow-sm relative overflow-hidden">
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                              <div className="pl-2">
                                <div className="h-2 w-20 bg-gray-300 dark:bg-blue-900/50 rounded mb-1.5"></div>
                                <div className="text-[8px] text-red-500 font-bold tracking-tight">Demurrage Risk: LFD Tomorrow</div>
                              </div>
                              <div className="flex gap-2">
                                <div className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[7px] font-bold uppercase rounded flex items-center gap-1"><AlertTriangle size={8}/> Alert</div>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded-lg p-3 flex justify-between items-center shadow-sm">
                              <div>
                                <div className="h-2 w-16 bg-gray-300 dark:bg-blue-900/50 rounded mb-1.5"></div>
                                <div className="h-1.5 w-20 bg-gray-200 dark:bg-blue-900/30 rounded"></div>
                              </div>
                              <div className="flex gap-2">
                                <div className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[7px] font-bold uppercase rounded">ISF Filed</div>
                              </div>
                            </div>
                          </div>
                        </div>
                     </div>

                     {/* Screen 3: Desktop CO2 Tracking */}
                     <div className={`absolute inset-0 w-[516px] h-[312px] bg-gray-50 dark:bg-[#000524] flex transition-opacity duration-500 ${activeIndex === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="w-32 bg-white dark:bg-[#001054] border-r border-gray-200 dark:border-blue-900/50 p-4 flex flex-col gap-3">
                          <div className="flex items-center gap-1.5 mb-2">
                            <img src="/gamacenter.svg" alt="GamaCenter Logo" className="w-4 h-4 object-contain" /><div className="h-3 w-12 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          </div>
                          <div className="h-2.5 w-full bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-3/4 bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-full bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-full bg-gray-200 dark:bg-blue-900/40 rounded"></div>
                          <div className="h-2.5 w-5/6 bg-green-500/20 border-l-2 border-green-500 rounded-r"></div>
                        </div>
                        <div className="flex-1 p-5 flex flex-col gap-4">
                          <div className="flex justify-between items-center mb-2 border-b border-gray-200 dark:border-blue-900/50 pb-3">
                            <div className="flex items-center gap-2">
                              <Leaf size={16} className="text-green-500" />
                              <div className="h-4 w-32 bg-gray-200 dark:bg-blue-900/30 rounded"></div>
                            </div>
                            <div className="h-5 px-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[8px] flex items-center justify-center font-bold rounded border border-green-200 dark:border-green-900/50 hover:bg-green-100 transition-colors cursor-pointer">Export Report</div>
                          </div>
                          <div className="flex gap-4 h-24">
                             <div className="flex-1 bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded-lg p-3 flex flex-col justify-center items-center shadow-sm relative overflow-hidden group">
                                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-colors"></div>
                                <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total CO2e (MT)</div>
                                <div className="text-3xl font-black font-mono text-[#001054] dark:text-white">1,240.5</div>
                                <div className="text-[8px] text-red-500 mt-1 font-bold">+2.4% vs last quarter</div>
                             </div>
                             <div className="w-24 bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded-lg p-3 flex flex-col items-center justify-center shadow-sm gap-2">
                                <div className="w-12 h-12 rounded-full border-[4px] border-gray-100 dark:border-blue-900/30 border-t-green-500 border-r-green-500 transform -rotate-45 relative flex items-center justify-center">
                                   <div className="text-[8px] font-bold text-[#001054] dark:text-white transform rotate-45">72%</div>
                                </div>
                                <div className="text-[7px] text-gray-500 uppercase tracking-widest font-bold">Offset</div>
                             </div>
                          </div>
                          <div className="flex-1 bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded-lg p-3 shadow-sm flex flex-col justify-between">
                              <div className="flex justify-between items-center mb-2">
                                 <div className="text-[9px] font-bold text-[#001054] dark:text-white uppercase tracking-wider">Emissions by Mode</div>
                                 <div className="flex gap-2">
                                    <div className="flex items-center gap-1 text-[7px] text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Ocean</div>
                                    <div className="flex items-center gap-1 text-[7px] text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Air</div>
                                 </div>
                              </div>
                              <div className="flex gap-3 items-end h-full pt-1">
                                 <div className="flex-1 flex flex-col justify-end gap-0.5 group"><div className="w-full bg-orange-400/80 rounded-t-sm h-[20%] transition-all group-hover:opacity-80"></div><div className="w-full bg-blue-500/80 rounded-t-sm h-[40%] transition-all group-hover:opacity-80"></div></div>
                                 <div className="flex-1 flex flex-col justify-end gap-0.5 group"><div className="w-full bg-orange-400/80 rounded-t-sm h-[30%] transition-all group-hover:opacity-80"></div><div className="w-full bg-blue-500/80 rounded-t-sm h-[60%] transition-all group-hover:opacity-80"></div></div>
                                 <div className="flex-1 flex flex-col justify-end gap-0.5 group relative"><div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] font-bold text-green-600 bg-green-100 px-1.5 rounded border border-green-200">Current</div><div className="w-full bg-orange-400 rounded-t-sm h-[15%] transition-all group-hover:opacity-80"></div><div className="w-full bg-blue-500 rounded-t-sm h-[85%] transition-all group-hover:opacity-80"></div></div>
                                 <div className="flex-1 flex flex-col justify-end gap-0.5 group"><div className="w-full bg-orange-400/80 rounded-t-sm h-[25%] transition-all group-hover:opacity-80"></div><div className="w-full bg-blue-500/80 rounded-t-sm h-[50%] transition-all group-hover:opacity-80"></div></div>
                              </div>
                          </div>
                        </div>
                     </div>

                     {/* Screen 4: Mobile App (Portrait) */}
                     <div className={`absolute top-0 left-0 w-[240px] h-[516px] bg-gray-50 dark:bg-[#000C45] flex flex-col pt-10 px-4 transition-opacity duration-500 delay-200 ${activeIndex === 4 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                         <div className="flex justify-between items-center mb-6 px-1">
                           <div className="w-16 h-4 bg-gray-200 dark:bg-blue-900/50 rounded"></div>
                           <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-blue-900/50"></div>
                         </div>
                         <div className="bg-[#001054] text-white rounded-2xl p-5 mb-4 shadow-lg border border-blue-900/50 relative overflow-hidden">
                           <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#FF5C00]/20 rounded-full blur-xl"></div>
                           <div className="text-[10px] text-gray-400 font-mono mb-1">SHP-9021</div>
                           <div className="text-xl font-black tracking-tight text-[#FF5C00] mb-4">In Transit</div>
                           <div className="flex justify-between text-xs font-bold mb-2">
                             <span>SHA</span> <span className="opacity-50">⟶</span> <span>LAX</span>
                           </div>
                           <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                             <div className="w-2/3 h-full bg-[#FF5C00] rounded-full"></div>
                           </div>
                         </div>
                         <div className="flex flex-col gap-2">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">Recent Activity</div>
                            <div className="p-3 bg-white dark:bg-[#001054] rounded-xl border border-gray-200 dark:border-blue-900/50 shadow-sm flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-[#FF5C00]/10 text-[#FF5C00] flex items-center justify-center"><Bell size={14} /></div>
                               <div><div className="text-[10px] font-bold dark:text-white">Customs Cleared</div><div className="text-[8px] text-gray-500">12 mins ago</div></div>
                            </div>
                            <div className="p-3 bg-white dark:bg-[#001054] rounded-xl border border-gray-200 dark:border-blue-900/50 shadow-sm flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center"><MapPin size={14} /></div>
                               <div><div className="text-[10px] font-bold dark:text-white">Departed Origin</div><div className="text-[8px] text-gray-500">2 days ago</div></div>
                            </div>
                         </div>
                     </div>

                  </div>
               </div>

               {/* Hardware Base (Laptop Keyboard Deck) */}
               <div 
                 className={`bg-gray-300 dark:bg-[#0A0A0A] rounded-t-sm rounded-b-2xl shadow-2xl relative z-10 flex items-start justify-center pt-1 mx-auto
                   transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
                   ${isMobile 
                     ? 'w-0 h-0 opacity-0 -translate-y-4 scale-50' 
                     : 'w-[640px] h-5 opacity-100 translate-y-0 scale-100 border-t border-gray-400 dark:border-gray-700'
                   }
                 `}
               >
                  {/* Laptop Trackpad Indentation */}
                  <div className={`w-24 h-1.5 bg-gray-400 dark:bg-gray-800 rounded-b-md transition-opacity duration-300 ${isMobile ? 'opacity-0' : 'opacity-100'}`}></div>
               </div>

           </div>
        </div>
      </div>
    </section>
  );
};

// 8. Integration Ecosystem (Awwwards Fiber-Optic Bundle)
const Integrations = () => {
  const [ref, isVisible] = useScrollReveal();
  
  const LogoCargoWise = () => (
    <div className="font-sans font-bold tracking-tighter text-xl text-[#001054] dark:text-white flex items-center">
      cargo<span className="text-[#FF8A00]">wise</span>
    </div>
  );

  const LogoDescartes = () => (
    <div className="font-serif font-black tracking-tight text-xl text-[#005596] dark:text-blue-400 flex items-center">
      DESCARTES
    </div>
  );

  const LogoSAP = () => (
    <div className="font-sans font-black italic tracking-widest text-2xl text-[#008FD3] flex items-center">
      SAP
    </div>
  );

  const LogoNetSuite = () => (
    <div className="font-sans font-black tracking-tighter text-xl text-[#000000] dark:text-white flex items-center">
      NET<span className="text-[#00529A] dark:text-[#3B82F6] font-light ml-0.5">SUITE</span>
    </div>
  );

  const integrationNodes = [
    { id: 'cargowise', name: "CargoWise", desc: "Bi-directional sync ensures your operations team never leaves CargoWise, while your customers get a tier-1 digital frontend.", logo: <LogoCargoWise />, y: 15, color: "#FF8A00" },
    { id: 'descartes', name: "Descartes", desc: "Automated denied party screening, routing intelligence, and duty calculations injected directly into your quoting flow.", logo: <LogoDescartes />, y: 38, color: "#005596" },
    { id: 'sap', name: "SAP S/4HANA", desc: "Reconcile freight spend, automate vendor payments, and sync general ledger data automatically within your SAP environment.", logo: <LogoSAP />, y: 62, color: "#008FD3" },
    { id: 'netsuite', name: "Oracle NetSuite", desc: "Instant sync of customer billing and invoice generation, drastically reducing manual accounting errors and DSO.", logo: <LogoNetSuite />, y: 85, color: "#00529A" },
  ];

  const [activeNode, setActiveNode] = useState(integrationNodes[0]);

  return (
    <section id="integrations" className="py-24 lg:py-32 relative overflow-hidden z-10 bg-white dark:bg-[#000C45]" ref={ref}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

          {/* Left Content Column: Value Prop & Dynamic Card */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full order-2 lg:order-1">
             <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 mb-6 backdrop-blur-sm w-max">
               <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF5C00]"></span>
               <span className="text-[10px] font-bold text-[#001054] dark:text-blue-400 tracking-[0.2em] uppercase">Ecosystem</span>
             </div>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#001054] dark:text-white mb-4 lg:mb-6 tracking-tight relative z-10 leading-[1.1]">
               Seamless <br className="hidden md:block"/><span className="highlight-text text-[#001054] dark:text-white mt-1">Connectivity.</span>
             </h2>
             <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg mb-8 lg:mb-10 leading-relaxed">
               Gama plugs directly into your existing tech stack. Keep your operations team in the legacy tools they know, while delivering a lightning-fast, modern portal to your customers.
             </p>

             {/* Sleek Dynamic Value Box */}
             <div className="relative min-h-[160px] bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-500 box-offset-static z-20">
                <div className="absolute top-0 left-0 w-full h-1.5 transition-colors duration-500 ease-out" style={{ backgroundColor: activeNode.color }}></div>
                <div key={activeNode.id} className="animate-fade-in h-full flex flex-col justify-center">
                   <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ backgroundColor: activeNode.color }}></span>
                        <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: activeNode.color }}></span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#001054] dark:text-white tracking-tight">{activeNode.name} Sync</h4>
                   </div>
                   <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{activeNode.desc}</p>
                </div>
             </div>
          </div>

          {/* Right Network Column: The Fiber-Optic Bundle */}
          <div className="lg:col-span-7 relative w-full h-[400px] lg:h-[500px] flex items-center justify-center order-1 lg:order-2 mt-4 lg:mt-0">

            {/* Dynamic Ambient Background Glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[80px] lg:blur-[120px] transition-colors duration-1000 pointer-events-none mix-blend-screen opacity-20 dark:opacity-30"
              style={{ backgroundColor: activeNode.color }}
            ></div>

            {/* Mobile View: Clean Stack (Hidden on Desktop) */}
            <div className="md:hidden flex flex-col gap-3 w-full relative z-20 px-2">
               {integrationNodes.map(node => (
                 <div key={`mobile-${node.id}`}
                      className={`w-full p-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${activeNode.id === node.id ? 'bg-white dark:bg-[#000836] shadow-xl scale-[1.02]' : 'bg-gray-50 dark:bg-[#001054]/50 border-gray-200 dark:border-blue-900/50 grayscale opacity-70'}`}
                      style={{ borderColor: activeNode.id === node.id ? node.color : undefined }}
                      onClick={() => setActiveNode(node)}>
                     <div className="flex-1 transform scale-90 origin-left">{node.logo}</div>
                     {activeNode.id === node.id && (
                        <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: node.color, color: node.color }}></div>
                     )}
                 </div>
               ))}
            </div>

            {/* Desktop View: Interactive Fiber-Optic Bundle */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
               
               {/* Gama Core Engine (Left) */}
               <div 
                 className="absolute left-[15%] lg:left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 lg:w-40 lg:h-40 bg-white dark:bg-[#000524] border-2 rounded-3xl flex flex-col items-center justify-center transition-all duration-700 pointer-events-auto"
                 style={{ 
                   boxShadow: `0 0 60px ${activeNode.color}30, inset 0 0 20px ${activeNode.color}10`, 
                   borderColor: activeNode.color 
                 }}
               >
                   <img src="/gamacenter.svg" alt="Gama Logo"   className="w-18 h-18 object-contain" />
               </div>

               {/* SVG Connecting Paths (Middle Layer) */}
               <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                         <feGaussianBlur stdDeviation="0.5" result="blur" />
                         <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <filter id="glow-orb" x="-50%" y="-50%" width="200%" height="200%">
                         <feGaussianBlur stdDeviation="1" result="blur" />
                         <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    {integrationNodes.map(node => {
                       const isActive = activeNode.id === node.id;
                       // Draw bezier curve from center of Gama (X=15/20) to center of Partner (X=80)
                       // Using relative units for responsiveness
                       const startX = window.innerWidth < 1024 ? 15 : 20; 
                       const pathD = `M ${startX} 50 C 50 50, 50 ${node.y}, 80 ${node.y}`;
                       return (
                         <g key={`path-${node.id}`}>
                           {/* Base faint line */}
                           <path d={pathD} fill="none" stroke="currentColor" className="text-gray-300 dark:text-blue-900/30" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                           
                           {/* Active glowing base track */}
                           <path d={pathD} fill="none" stroke={isActive ? node.color : 'transparent'} strokeWidth="1.5" filter="url(#glow-line)" vectorEffect="non-scaling-stroke" className="transition-colors duration-700" />
                           
                           {/* Subtle Animated Data Orbs */}
                           {isActive && (
                              <>
                                {/* Largest leading dot */}
                                <circle r="0.8" fill="#ffffff" filter="url(#glow-orb)">
                                   <animateMotion dur="2.5s" begin="-0.2s" repeatCount="indefinite" path={pathD} />
                                </circle>
                                {/* Middle trailing dot */}
                                <circle r="0.5" fill="#ffffff" opacity="0.7" filter="url(#glow-orb)">
                                   <animateMotion dur="2.5s" begin="-0.1s" repeatCount="indefinite" path={pathD} />
                                </circle>
                                {/* Smallest tail dot */}
                                <circle r="0.3" fill="#ffffff" opacity="0.4" filter="url(#glow-orb)">
                                   <animateMotion dur="2.5s" begin="0s" repeatCount="indefinite" path={pathD} />
                                </circle>
                              </>
                           )}
                         </g>
                       )
                    })}
                  </svg>
               </div>

               {/* Partner Node Blades (Right) */}
               {integrationNodes.map(node => {
                  const isActive = activeNode.id === node.id;
                  return (
                    <div key={`node-${node.id}`}
                         className={`absolute right-[15%] lg:right-[20%] w-40 lg:w-56 h-14 lg:h-20 -translate-y-1/2 translate-x-1/2 z-20 bg-white dark:bg-[#001054] border-2 rounded-xl lg:rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden group pointer-events-auto ${isActive ? 'shadow-2xl scale-110' : 'shadow-md scale-100 border-gray-200 dark:border-blue-900/50 hover:border-gray-300 dark:hover:border-blue-700'}`}
                         style={{ 
                           top: `${node.y}%`, 
                           borderColor: isActive ? node.color : undefined 
                         }}
                         onMouseEnter={() => setActiveNode(node)}
                         onClick={() => setActiveNode(node)}>
                         
                         {/* Ambient hover tint */}
                         <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}`} style={{ backgroundColor: node.color }}></div>
                         
                         {/* Logo wrapper */}
                         <div className={`relative z-10 transition-all duration-500 transform scale-90 lg:scale-100 ${isActive ? 'grayscale-0 opacity-100' : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                            {node.logo}
                         </div>
                    </div>
                  );
               })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// 9. Trusted By Network (Forwarder Directory)
const TrustedByNetwork = () => {
  const [ref, isVisible] = useScrollReveal();

  const customers = [
    {
      id: "primorus",
      logo: (
        <div className="flex items-center gap-1.5">
          <Globe className="text-[#D32F2F]" size={20} strokeWidth={2} />
          <div className="flex flex-col justify-center leading-[0.85]">
            <span className="font-serif italic font-black text-lg text-[#D32F2F]">Primorus</span>
            <span className="text-[5px] tracking-[0.3em] text-gray-500 uppercase ml-0.5 mt-0.5">Worldwide</span>
          </div>
        </div>
      )
    },
    {
      id: "sealink",
      logo: (
        <div className="flex flex-col items-center justify-center bg-[#0071B9] text-white px-3 py-1 rounded-sm w-full max-w-[100px]">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="h-1 w-5 bg-white rounded-full"></div>
            <div className="h-1 w-5 bg-white rounded-full"></div>
          </div>
          <span className="font-black text-xs tracking-widest uppercase">Sea Link</span>
        </div>
      )
    },
    {
      id: "guided",
      logo: (
        <div className="flex items-center gap-2 text-[#0052CC]">
          <div className="relative">
            <Box size={18} className="relative z-10" />
          </div>
          <span className="font-sans font-bold text-sm tracking-tight">Guided Imports</span>
        </div>
      )
    },
    {
      id: "sgl",
      logo: (
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-0.5 mb-0.5 text-[#D32F2F]">
            <div className="w-1 h-2 bg-current transform -skew-x-12"></div>
            <div className="w-1 h-3 bg-current transform -skew-x-12"></div>
            <div className="w-1 h-4 bg-current transform -skew-x-12"></div>
          </div>
          <span className="font-black text-xl text-[#1A237E] leading-none tracking-tighter">SGL</span>
        </div>
      )
    },
    {
      id: "efreight",
      logo: (
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#4CAF50] flex items-center justify-center text-white">
            <Zap size={12} fill="currentColor" />
          </div>
          <span className="font-black text-lg text-gray-800 dark:text-gray-200 tracking-tighter">E-Freight</span>
        </div>
      )
    },
    {
      id: "cbx",
      logo: (
        <div className="bg-[#1A237E] flex items-center px-2 py-1 gap-1.5">
          <Activity className="text-[#FFC107]" size={16} />
          <span className="font-black text-xl text-[#FFC107] tracking-tighter">CBX</span>
        </div>
      )
    },
    {
      id: "greenmile",
      logo: (
        <div className="flex items-center gap-1.5">
          <Truck size={20} className="text-[#2E7D32]" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm text-[#2E7D32]">Green Mile</span>
            <span className="text-[5px] tracking-widest text-gray-500 uppercase mt-0.5">Freight Solutions</span>
          </div>
        </div>
      )
    },
    {
      id: "dhl",
      logo: (
        <div className="bg-[#FFCC00] w-full h-full flex items-center justify-center p-1 rounded-sm border-t-2 border-b-2 border-red-600 max-w-[90px]">
          <span className="font-black italic text-2xl text-[#D40511] leading-none tracking-tighter">DHL</span>
        </div>
      )
    },
    {
      id: "contamar",
      logo: (
        <div className="flex items-center gap-1.5 text-[#0277BD]">
          <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center relative">
            <div className="w-0.5 h-2 bg-red-500 absolute top-0"></div>
            <Crosshair size={10} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-light text-sm tracking-tight">Contamar</span>
          </div>
        </div>
      )
    },
    {
      id: "accessair",
      logo: (
        <div className="flex items-center justify-center px-3 py-0.5 border border-blue-200 dark:border-blue-900 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
           <span className="font-black text-sm text-[#0288D1] tracking-tighter uppercase relative z-10">Access Air</span>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#000C45] relative z-10 border-t border-gray-200 dark:border-blue-900/30 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#001054] dark:text-white mb-4 tracking-tight">
            Trusted by <span className="highlight-text text-[#001054] dark:text-white mt-1">Global Forwarders.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-6">
            Join hundreds of logistics providers already scaling their digital operations on the Gama network.
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
           {customers.map((client) => (
             <div 
               key={client.id} 
               className="bg-gray-50 dark:bg-[#000524] border border-gray-200 dark:border-blue-900/40 rounded-lg p-4 flex items-center justify-center h-20 sm:h-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-[#FF5C00] hover:bg-white dark:hover:bg-[#001054] transition-all duration-300 box-offset relative group cursor-pointer"
             >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                   <span className="text-[7px] text-green-500 font-mono tracking-widest uppercase">Verified</span>
                   <div className="relative flex h-1.5 w-1.5">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                   </div>
                </div>
                {client.logo}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

// 10. Testimonials
const Testimonials = () => {
  const [activeTab, setActiveTab] = useState('GAMA');
  const [activeIndex, setActiveIndex] = useState(1);
  const [ref, isVisible] = useScrollReveal();
  
  const allTestimonials = {
    GAMA: [
      { name: "Sarah Jenkins", role: "CEO, OceanFreight Ltd", metric: "-88% Quote Time", quote: "Gama cut our quoting time drastically. Our customers love the self-serve portal." },
      { name: "Marcus Chen", role: "VP Operations, GlobalLogix", metric: "210% More Clients", quote: "Since launching our branded portal, we've onboarded clients at a record pace. It's a game-changer." },
      { name: "Elena Rostova", role: "Director, EuroTransit", metric: "Zero Lost Emails", quote: "All communication and tracking in one place. It transformed how our team operates internally and externally." }
    ],
    BCO: [
      { name: "David Thorne", role: "Supply Chain Dir, MegaRetail", metric: "$1.2M Saved", quote: "Gama BCO gave us the direct carrier visibility we've been begging for. Freight auditing is fully automated now." },
      { name: "Anita Silva", role: "Procurement, AutoParts Co", metric: "100% Compliance", quote: "Managing multiple forwarders used to be a nightmare. Now everything flows into one central dashboard." },
      { name: "Kenji Moto", role: "Logistics Lead, TechGlobal", metric: "-40% Demurrage", quote: "The real-time exception alerts allow us to act before containers get stuck at the port." }
    ]
  };

  const currentList = allTestimonials[activeTab];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % currentList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentList.length, activeTab]);

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#000836] relative z-10 overflow-hidden border-t border-gray-200 dark:border-blue-900/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#001054] dark:text-white mb-6 md:mb-8 tracking-tight relative z-10">
          Voices of the <span className="highlight-text text-[#001054] dark:text-white mt-1">Industry.</span>
        </h2>

        {/* Custom Tabs */}
        <div className="inline-flex bg-white dark:bg-[#001566] border border-gray-200 dark:border-blue-900/50 rounded p-1 mb-8 relative z-20 box-offset-static">
           <button 
             onClick={() => { setActiveTab('GAMA'); setActiveIndex(1); }}
             className={`px-4 sm:px-6 py-2 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'GAMA' ? 'bg-[#001054] text-white shadow-md' : 'text-gray-500 hover:text-[#001054] dark:hover:text-white'}`}
           >
             Freight Forwarders
           </button>
           <button 
             onClick={() => { setActiveTab('BCO'); setActiveIndex(1); }}
             className={`px-4 sm:px-6 py-2 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'BCO' ? 'bg-[#FF5C00] text-white shadow-md' : 'text-gray-500 hover:text-[#FF5C00]'}`}
           >
             BCOs / Shippers
           </button>
        </div>

        <div className={`relative min-h-[350px] md:h-[300px] flex justify-center items-center transition-opacity duration-1000 w-full overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'} mt-4 md:mt-8`}>
          {currentList.map((t, i) => {
            let offset = i - activeIndex;
            if (offset < -1) offset += currentList.length;
            if (offset > 1) offset -= currentList.length;

            const isCenter = offset === 0;
            const style = {
              transform: `translateX(${offset * 110}%) scale(${isCenter ? 1 : 0.9})`,
              opacity: isCenter ? 1 : 0.3,
              filter: isCenter ? 'blur(0px)' : 'blur(2px)',
              zIndex: isCenter ? 20 : 10,
            };

            return (
              <div key={`${activeTab}-${i}`} className="absolute w-[90vw] md:w-full max-w-md transition-all duration-500 ease-out" style={style}>
                <div className={`bg-white dark:bg-[#001054] p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-blue-900/50 text-left ${isCenter ? 'box-offset-static' : 'shadow-lg'}`}>
                  <div className={`flex mb-4 ${activeTab === 'GAMA' ? 'text-[#001054] dark:text-blue-400' : 'text-[#FF5C00]'}`}>
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 min-h-[80px]">"{t.quote}"</p>
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-blue-900/40 pt-4">
                    <div>
                      <h4 className="font-bold text-[#001054] dark:text-white text-xs sm:text-sm">{t.name}</h4>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">{t.role}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-black font-mono text-sm sm:text-base ${activeTab === 'GAMA' ? 'text-[#001054] dark:text-blue-400' : 'text-[#FF5C00]'}`}>{t.metric}</div>
                      <div className="text-[8px] sm:text-[9px] text-gray-400 uppercase tracking-widest">Result</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// 11. FAQ Section (Editorial Awwwards Style)
const TechFAQ = () => {
  const [ref, isVisible] = useScrollReveal();
  const [activeQ, setActiveQ] = useState(0);

  const faqs = [
    {
      q: "Where do the rates our customers see come from?",
      a: "The rates your customers see are pulled directly from the contracts and agreements you have with carriers. If you do not have a contracted rate, we can dynamically offer spot rates via carrier APIs. Most importantly, you always control the exact markup rules applied before your customer ever sees a quote."
    },
    {
      q: "How much does Gama cost to implement?",
      a: "Our pricing scales smoothly with your operations, primarily based on monthly shipment volume. The more you manage, the lower your per-shipment cost becomes. While core integration is included, highly bespoke ERP or TMS mapping may incur a one-time architecture fee."
    },
    {
      q: "What existing systems do you integrate with?",
      a: "Gama is natively pre-integrated with industry staples like CargoWise, Descartes, and major carriers (Maersk, Evergreen, MSC). However, our architecture is completely agnostic—if your legacy system has a functional API, our Hub can connect to it."
    },
    {
      q: "What freight modes are supported?",
      a: "The platform is fully multimodal. Your customers can seamlessly quote, book, and track Ocean (FCL/LCL), Air Freight, Over-the-Road (FTL/LTL), and Express Parcel shipments—all aggregated within a single pane of glass."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-[#000C45] relative z-10 border-t border-gray-200 dark:border-blue-900/30 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className={`mb-12 lg:mb-20 transition-all duration-1000 transform text-center lg:text-left ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#001054] dark:text-white mb-4 lg:mb-6 tracking-tight leading-[1.1]">
            Clear <span className="highlight-text text-[#001054] dark:text-white mt-1">Answers.</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
            Everything you need to know about implementing the Gama engine into your forwarding operations.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Left: Interactive Question List */}
          <div className="lg:col-span-5 flex flex-col order-2 lg:order-1">
            {faqs.map((faq, i) => {
              const isActive = activeQ === i;
              return (
                <div 
                  key={i}
                  onClick={() => setActiveQ(i)}
                  className={`cursor-pointer border-l-4 pl-4 sm:pl-6 py-4 sm:py-6 transition-all duration-500 ease-out group ${isActive ? 'border-[#FF5C00] bg-orange-50/50 dark:bg-[#FF5C00]/5' : 'border-gray-200 dark:border-blue-900/40 hover:border-gray-300 dark:hover:border-blue-800 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                   <div className="flex items-center gap-4 mb-1 sm:mb-2">
                      <span className={`font-mono text-xs sm:text-sm font-bold transition-colors ${isActive ? 'text-[#FF5C00]' : 'text-gray-400 dark:text-gray-500'}`}>
                        0{i+1}
                      </span>
                   </div>
                   <h3 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${isActive ? 'text-[#001054] dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-[#001054] dark:group-hover:text-gray-200'}`}>
                     {faq.q}
                   </h3>
                </div>
              )
            })}
          </div>

          {/* Right: Editorial Answer Card */}
          <div className="lg:col-span-7 relative flex items-center mt-2 lg:mt-0 order-1 lg:order-2">
             <div className="w-full bg-gray-50 dark:bg-[#001054] rounded-2xl p-8 sm:p-10 md:p-14 shadow-2xl border border-gray-200 dark:border-blue-900/50 box-offset-static relative overflow-hidden min-h-[280px] lg:min-h-[320px] flex flex-col justify-center">
                
                {/* Decorative Ambient Lighting */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#FF5C00]/10 to-transparent rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-[80px] pointer-events-none"></div>
                
                {/* Massive Decorative Quote Mark */}
                <div className="absolute -top-4 right-6 text-[120px] sm:text-[180px] font-serif text-gray-200 dark:text-blue-900/30 leading-none select-none pointer-events-none font-black opacity-50">
                  "
                </div>

                {/* Answer Content */}
                <div key={activeQ} className="animate-fade-in relative z-10">
                   <div className="flex items-center gap-3 mb-6 sm:mb-8">
                      <div className="w-8 h-[2px] bg-[#FF5C00]"></div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-[#FF5C00] uppercase tracking-widest">Answer 0{activeQ + 1}</span>
                   </div>
                   <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed font-medium tracking-tight">
                      {faqs[activeQ].a}
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// 12. Latest News
const LatestNews = () => {
  const [ref, isVisible] = useScrollReveal();

  const news = [
    { 
      tag: "Product Update", 
      title: "Introducing Gama AI: Predictive Demurrage Alerts", 
      desc: "Stop paying unnecessary fees. Our new AI model predicts container delays before they happen, giving your team time to act.", 
      date: "Oct 12, 2026", 
      image: "from-[#001054] to-blue-800", 
      icon: <Cpu size={40} className="text-white opacity-50 drop-shadow-lg"/> 
    },
    { 
      tag: "Industry Insights", 
      title: "How BCOs are taking back control of their ocean freight", 
      desc: "Discover how top shippers are using direct API integrations to bypass forwarder markups and automate their freight auditing.", 
      date: "Sep 28, 2026", 
      image: "from-blue-500 to-blue-400", 
      icon: <Anchor size={40} className="text-white opacity-50 drop-shadow-lg"/> 
    },
    { 
      tag: "Company News", 
      title: "Gama raises $40M Series B to accelerate global expansion", 
      desc: "We are thrilled to announce our latest funding round led by top logistics tech investors to further build out our Core TMS engine.", 
      date: "Sep 15, 2026", 
      image: "from-[#FF5C00] to-orange-400", 
      icon: <Globe size={40} className="text-white opacity-50 drop-shadow-lg"/> 
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#000C45] relative z-10 border-t border-gray-200 dark:border-blue-900/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#001054] dark:text-white mb-4 tracking-tight">
            Latest <span className="highlight-text text-[#001054] dark:text-white mt-1">News.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-6">
            Stay tuned for our upcoming feature releases, industry insights, and platform updates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
           {news.map((item, i) => (
             <div 
               key={i} 
               className={`group bg-gray-50 dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded-2xl overflow-hidden box-offset flex flex-col cursor-pointer transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} 
               style={{ transitionDelay: `${i * 150}ms` }}
             >
                <div className={`h-40 sm:h-48 bg-gradient-to-br ${item.image} flex items-center justify-center relative overflow-hidden`}>
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                   <div className="transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 ease-out relative z-10">
                     {item.icon}
                   </div>
                   <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                     {item.tag}
                   </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-1">
                   <div className="text-[9px] sm:text-[10px] text-gray-500 font-mono mb-3">{item.date}</div>
                   <h3 className="text-lg sm:text-xl font-bold text-[#001054] dark:text-white mb-3 tracking-tight group-hover:text-[#FF5C00] transition-colors leading-snug">
                     {item.title}
                   </h3>
                   <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                     {item.desc}
                   </p>
                   <div className="mt-auto inline-flex items-center text-xs sm:text-sm font-bold text-[#001054] dark:text-white group-hover:text-[#FF5C00] transition-colors">
                     Read Article <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

// 13. Social Media Integration
const SocialFeed = () => {
  const [ref, isVisible] = useScrollReveal();
  
  const posts = [
    {
      network: "LinkedIn",
      content: "We're thrilled to announce our new partnership with GlobalLogix! By integrating Gama BCO, their shippers now have 100% real-time visibility across all trade lanes. #SupplyChain #LogisticsTech",
      user: "Gama",
      time: "2h ago",
      icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-[#0A66C2]"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    },
    {
      network: "X",
      content: "Just released: Gama API v2.2. Sub-50ms latency for all routing engine queries and full support for new customs docs parameters. Documentation updated in the portal. 🚀",
      user: "@Gama_Dev",
      time: "5h ago",
      icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-gray-900 dark:text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    },
    {
      network: "LinkedIn",
      content: "Supply Chain visibility shouldn't require 10 open tabs and 5 spreadsheets. Read our latest article on how 'Control Towers' are redefining freight forwarding. Link in comments! 👇",
      user: "Gama",
      time: "1d ago",
      icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-[#0A66C2]"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#000836] relative z-10 border-t border-gray-200 dark:border-blue-900/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 text-center md:text-left gap-4">
          <div className={`relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#001054] dark:text-white mb-2 md:mb-4 tracking-tight flex items-center justify-center md:justify-start gap-3 md:gap-4">
              Live <span className="highlight-text text-[#001054] dark:text-white mt-1">Updates.</span>
              <Share2 size={24} className="text-[#FF5C00] md:w-7 md:h-7" strokeWidth={3}/>
            </h2>
          </div>
          <button className={`hidden sm:flex items-center text-[#FF5C00] font-bold hover:text-[#CC4A00] transition-colors group text-sm transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Follow Gama
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post, i) => (
            <div key={i} className={`bg-white dark:bg-[#000C45] border border-gray-200 dark:border-blue-900/40 rounded-lg p-5 sm:p-6 flex flex-col transition-all duration-300 transform box-offset cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{transitionDelay: `${i * 100}ms`}}>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 dark:border-blue-900/40">
                 <div className="flex items-center gap-3">
                  <img src="/gamacenter.svg" alt="GamaCenter Logo" className="w-6 h-6 object-contain" />
                   <div>
                     <div className="font-bold text-[11px] sm:text-xs text-[#001054] dark:text-white leading-none mb-1">{post.user}</div>
                     <div className="text-[9px] sm:text-[10px] text-gray-500">{post.time}</div>
                   </div>
                 </div>
                 {post.icon}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6 flex-1">
                {post.content}
              </p>
              <div className="flex gap-4 text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-blue-900/40">
                 <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:text-[#FF5C00] transition-colors"><MessageSquare size={12}/> Reply</div>
                 <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:text-[#FF5C00] transition-colors"><RefreshCw size={12}/> Repost</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 15. Final CTA
const FinalCTA = ({ isDark, onOpenDemo }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 relative z-10 bg-white dark:bg-[#000C45]" ref={ref}>
      <div className={`max-w-4xl mx-auto rounded-2xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden transition-all duration-1000 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} bg-[#001054] border border-blue-900/50 box-offset-contrast`}>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Ready to upgrade your logistics?
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto">
            Join top forwarders providing a tier-1 customer experience.
          </p>
          <button onClick={onOpenDemo} className="w-full sm:w-auto bg-[#FF5C00] hover:bg-[#D94E00] transition-colors text-sm px-8 py-4 rounded font-bold uppercase tracking-wider text-white shadow-lg">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
};

// 16. Footer (Ultra Premium Awwwards Style)
const Footer = () => {
  const [copied, setCopied] = useState(false);

  // iFrame-safe clipboard copy
  const handleCopyEmail = () => {
    const textArea = document.createElement("textarea");
    textArea.value = "hello@gamasuite.com";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const footerLinks = [
    { title: "Platform", links: ["Features", "Integrations", "Pricing"] },
    { title: "Resources", links: ["Logistics Blog", "Help Center"] },
    { title: "Company", links: ["About Us", "Contact"] }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-[#00031A] relative z-10 overflow-hidden border-t border-gray-200 dark:border-white/5 pt-12 flex flex-col">
      
      {/* 1. Structural Marquee Hook */}
      <div className="w-full border-b border-gray-200 dark:border-white/10 pb-6 mb-12 lg:mb-20 overflow-hidden flex whitespace-nowrap">
         <div className="animate-marquee flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-blue-900/60">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center">
                 <span className="mx-6 text-[#FF5C00]">/ /</span> THE DIGITAL ENGINE FOR MODERN FORWARDERS
              </span>
            ))}
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 lg:divide-x divide-gray-200 dark:divide-white/10 mb-20">
           
           {/* Left: Interactive Contact Node */}
           <div className="lg:col-span-5 flex flex-col lg:pr-12">
              <div className="flex items-center gap-2 mb-8">
                 <img src="/logo.svg" alt="Gama Logo"   className="w-18 h-18 object-contain" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#001054] dark:text-white tracking-tight leading-[1.1] mb-8">
                Ready to move <br/> <span className="text-[#FF5C00]">freight faster?</span>
              </h3>
              
              {/* Copy Email Interactive Block */}
              <div 
                onClick={handleCopyEmail}
                className="group relative bg-white dark:bg-[#000A24] border border-gray-200 dark:border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-500 hover:border-[#FF5C00] shadow-sm hover:shadow-xl box-offset-static"
              >
                 <div className="absolute inset-0 bg-[#FF5C00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-0"></div>
                 <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/70 transition-colors mb-1">Drop us a line</p>
                      <p className="text-lg font-mono font-bold text-[#001054] dark:text-white group-hover:text-white transition-colors">hello@gamasuite.com</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${copied ? 'bg-green-500 text-white scale-110' : 'bg-gray-100 dark:bg-blue-900/30 text-[#001054] dark:text-white group-hover:bg-white group-hover:text-[#FF5C00]'}`}>
                       {copied ? <Check size={18} /> : <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />}
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Architectural Link Grid */}
           <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:pl-12 pt-4 lg:pt-0">
              {footerLinks.map((col, idx) => (
                 <div key={idx} className="flex flex-col">
                    <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]"></div> {col.title}
                    </h4>
                    <ul className="space-y-4">
                      {col.links.map(link => (
                        <li key={link}>
                          <a href="#" className="text-sm font-semibold text-[#001054] dark:text-gray-300 relative inline-flex items-center group">
                            <span className="relative z-10">{link}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF5C00] transition-all duration-300 group-hover:w-full"></span>
                          </a>
                        </li>
                      ))}
                    </ul>
                 </div>
              ))}
           </div>
        </div>

      </div>

      {/* 4. Bottom Row & Mega Typography Anchor */}
      <div className="relative w-full border-t border-gray-200 dark:border-white/10 pt-6 pb-8 md:pb-6 px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 z-30 bg-gray-50 dark:bg-[#00031A]">
         <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">© 2026 GAMA SUITE OS</span>
            <div className="hidden sm:flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#FF5C00] transition-colors"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
              <a href="#" className="text-gray-400 hover:text-[#FF5C00] transition-colors"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            </div>
         </div>
         {/* Added pr-24 to push it out from under the floating chatbot! */}
         <div className="flex gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest pr-16 md:pr-24 items-center relative z-40">
            <a href="#" className="hover:text-[#001054] dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#001054] dark:hover:text-white transition-colors">Terms</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1 hover:text-[#FF5C00] transition-colors cursor-pointer outline-none">
               Top <ArrowUpRight size={12} className="transform -rotate-45 pointer-events-none" />
            </button>
         </div>
      </div>

      {/* Massive Background Text */}
      <div className="w-full flex justify-center items-end mt-[-5%] overflow-hidden pointer-events-none select-none z-0 pb-2">
         <span className="text-[35vw] font-black text-[#001054] dark:text-white leading-[0.75] tracking-tighter opacity-[0.03] dark:opacity-[0.02]">
           gama
         </span>
      </div>

    </footer>
  );
};

// 17. Floating Chatbot Component
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! How can I help you automate your freight operations today?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Thanks for reaching out! A logistics specialist will review your query and connect with you shortly.", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window - Added absolute positioning so it doesn't block clicks when scaled down */}
      <div className={`absolute bottom-[calc(100%+1rem)] right-0 w-[calc(100vw-2rem)] sm:w-80 max-w-[350px] bg-white dark:bg-[#001054] border border-gray-200 dark:border-blue-900/50 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right box-offset-static ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-[#001054] p-3 sm:p-4 flex justify-between items-center border-b border-blue-900/50">
           <div className="flex items-center gap-2">
            <img src="/gamacenter.svg" alt="GamaCenter Logo" className="w-6 h-6 object-contain" />
             <div>
               <div className="text-white font-bold text-[11px] sm:text-xs tracking-wide">Gama Assistant</div>
               <div className="text-[8px] sm:text-[9px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online</div>
             </div>
           </div>
           <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1"><X size={16}/></button>
        </div>
        
        {/* Messages */}
        <div className="h-56 sm:h-64 p-3 sm:p-4 overflow-y-auto bg-gray-50 dark:bg-[#000524] flex flex-col gap-3">
           {messages.map((msg, idx) => (
             <div key={idx} className={`max-w-[85%] rounded p-2.5 text-[11px] sm:text-xs ${msg.sender === 'user' ? 'bg-[#001054] text-white self-end rounded-tr-none border border-blue-900/50' : 'bg-white dark:bg-[#001566] border border-gray-200 dark:border-blue-900/50 text-gray-800 dark:text-gray-200 self-start rounded-tl-none'}`}>
               {msg.text}
             </div>
           ))}
        </div>

        {/* Input */}
        <div className="p-2 sm:p-3 bg-white dark:bg-[#001054] border-t border-gray-200 dark:border-blue-900/50 flex gap-2">
           <input 
             type="text" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
             placeholder="Type your message..." 
             className="flex-1 bg-gray-50 dark:bg-[#001566] border border-gray-200 dark:border-blue-900/50 rounded px-3 py-2 text-[11px] sm:text-xs focus:outline-none focus:border-[#FF5C00] text-gray-800 dark:text-white"
           />
           <button onClick={handleSend} className="bg-[#FF5C00] hover:bg-[#D94E00] text-white p-2 rounded transition-colors flex items-center justify-center">
             <Send size={14} />
           </button>
        </div>
      </div>

      {/* Floating Toggle Button (Removed blocky shadow here so it's a sleek circle) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FF5C00] text-white rounded-full flex items-center justify-center shadow-2xl hover:-translate-y-1 transition-transform relative group z-50"
      >
         <div className="absolute inset-0 bg-[#FF5C00] rounded-full animate-ping opacity-20"></div>
         {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <MessageSquare size={20} className="sm:w-6 sm:h-6" />}
      </button>
    </div>
  );
};

// 18. Awwwards Style Demo Scheduler Modal
const DemoModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0); // 0: calendar, 1: form, 2: success
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(0);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Mock Calendar Generation (March 2026)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 0; // Starts on a Sunday
  const availableDays = [10, 12, 14, 15, 18, 20, 22, 25, 28];
  const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-[#000524]/80 backdrop-blur-md transition-opacity animate-fade-in cursor-pointer"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[90vh] md:h-[600px] bg-white dark:bg-[#000A24] rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-blue-900/50 animate-fade-in z-10 box-offset-static">
         
         {/* Left Panel: Branding & Value (Hidden on small mobile) */}
         <div className="hidden md:flex w-full md:w-[45%] bg-[#001054] p-10 lg:p-14 flex-col relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-[#FF5C00]/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

           <img src="/gamacenter.svg" alt="GamaCenter Logo" className="w-8 h-8 object-contain mb-2" />
            
            <div className="relative z-10">
               <h2 className="text-3xl lg:text-4xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                  Experience the <br/><span className="text-[#FF5C00]">Gama Engine.</span>
               </h2>
               <p className="text-blue-200/80 text-sm lg:text-base leading-relaxed mb-8">
                  Book a 30-minute personalized walkthrough with a logistics platform specialist.
               </p>
               
               <ul className="space-y-4">
                  {["Deep-dive into your specific workflow", "Live demonstration of the CargoWise sync", "Customized pricing and ROI roadmap"].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                       <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-400/30">
                         <Check size={12} className="text-blue-400"/>
                       </div>
                       <span className="text-sm text-white/90 font-medium">{point}</span>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="mt-auto relative z-10 border-t border-blue-800/50 pt-6">
               <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                     <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-[#001054]"></div>
                     <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#001054]"></div>
                     <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#001054] flex items-center justify-center text-[10px] text-white font-bold bg-[#FF5C00]">500+</div>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] text-blue-200/60 uppercase tracking-widest font-bold">Trusted Network</span>
                     <span className="text-xs text-white font-semibold">Join top global forwarders.</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Panel: Scheduler UI */}
         <div className="w-full md:w-[55%] h-full bg-white dark:bg-[#000524] relative flex flex-col overflow-y-auto overflow-x-hidden p-6 md:p-10 lg:p-12 scrollbar-hide">
            
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-gray-100 dark:bg-[#001054] rounded-full flex items-center justify-center text-gray-500 hover:text-[#FF5C00] dark:text-gray-400 dark:hover:text-[#FF5C00] transition-colors z-50">
               <X size={18} />
            </button>

            {/* Back Button (If in Form Step) */}
            {step === 1 && (
               <button onClick={() => setStep(0)} className="absolute top-4 left-4 md:top-6 md:left-8 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#001054] dark:hover:text-white transition-colors z-50 uppercase tracking-wider">
                  <ArrowLeft size={14} /> Back
               </button>
            )}

            <div className="flex-1 flex flex-col pt-8 md:pt-4 relative w-full h-full">
               
               {/* STEP 0: Calendar Selection */}
               <div className={`absolute inset-0 w-full transition-all duration-500 ease-in-out flex flex-col ${step === 0 ? 'translate-x-0 opacity-100 relative' : '-translate-x-full opacity-0 pointer-events-none'}`}>
                  <h3 className="text-2xl font-black text-[#001054] dark:text-white mb-2 tracking-tight">Select a Time</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">What day works best for your team?</p>
                  
                  <div className="flex-1 flex flex-col">
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-bold uppercase tracking-wider text-[#001054] dark:text-white">March 2026</span>
                        <div className="flex gap-2">
                           <button className="p-1.5 rounded border border-gray-200 dark:border-blue-900/50 text-gray-400 cursor-not-allowed"><ChevronRight size={16} className="rotate-180"/></button>
                           <button className="p-1.5 rounded border border-gray-200 dark:border-blue-900/50 text-gray-600 dark:text-white hover:border-[#FF5C00] transition-colors"><ChevronRight size={16}/></button>
                        </div>
                     </div>

                     <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-8">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{d}</div>)}
                        {/* Empty offset days */}
                        {Array.from({ length: startDayOffset }).map((_, i) => <div key={`empty-${i}`}></div>)}
                        
                        {/* Days */}
                        {days.map(d => {
                           const isAvailable = availableDays.includes(d);
                           const isSelected = selectedDate === d;
                           return (
                             <button 
                               key={d}
                               disabled={!isAvailable}
                               onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                               className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 relative
                                 ${!isAvailable ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : ''}
                                 ${isAvailable && !isSelected ? 'bg-gray-50 hover:bg-[#FF5C00]/10 dark:bg-[#001054] hover:dark:bg-[#FF5C00]/20 text-[#001054] dark:text-white cursor-pointer border border-gray-200 dark:border-blue-900/50 hover:border-[#FF5C00]/50' : ''}
                                 ${isSelected ? 'bg-[#FF5C00] text-white shadow-[0_0_15px_rgba(255,92,0,0.5)] border border-[#FF5C00] scale-110' : ''}
                               `}
                             >
                               {d}
                               {isAvailable && !isSelected && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#FF5C00]"></div>}
                             </button>
                           )
                        })}
                     </div>

                     {/* Time Slots (Appears when date is selected) */}
                     <div className={`transition-all duration-500 overflow-hidden ${selectedDate ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-t border-gray-200 dark:border-blue-900/50 pt-4 flex items-center gap-2">
                          <Clock size={14} className="text-[#FF5C00]" /> Available Times
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           {timeSlots.map(time => (
                              <button 
                                key={time}
                                onClick={() => { setSelectedTime(time); setTimeout(() => setStep(1), 300); }}
                                className={`py-3 rounded border text-sm font-bold transition-all duration-300 ${selectedTime === time ? 'bg-[#001054] dark:bg-blue-500 border-transparent text-white shadow-lg' : 'bg-white dark:bg-[#001054] border-gray-200 dark:border-blue-900/50 text-[#001054] dark:text-white hover:border-[#FF5C00] hover:text-[#FF5C00]'}`}
                              >
                                {time}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* STEP 1: User Details Form */}
               <div className={`absolute inset-0 w-full transition-all duration-500 ease-in-out flex flex-col justify-center ${step === 1 ? 'translate-x-0 opacity-100 relative' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                  <h3 className="text-2xl font-black text-[#001054] dark:text-white mb-2 tracking-tight">Your Details</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 flex items-center gap-2">
                     <Calendar size={14} className="text-[#FF5C00]" />
                     March {selectedDate}, 2026 at {selectedTime}
                  </p>
                  
                  <form className="flex-1 flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                     <div className="relative group">
                        <User size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF5C00] transition-colors" />
                        <input required type="text" placeholder="Full Name" className="w-full bg-transparent border-b-2 border-gray-200 dark:border-blue-900/50 py-3 pl-8 focus:outline-none focus:border-[#FF5C00] text-[#001054] dark:text-white font-medium transition-colors placeholder-gray-400" />
                     </div>
                     <div className="relative group">
                        <Mail size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF5C00] transition-colors" />
                        <input required type="email" placeholder="Work Email" className="w-full bg-transparent border-b-2 border-gray-200 dark:border-blue-900/50 py-3 pl-8 focus:outline-none focus:border-[#FF5C00] text-[#001054] dark:text-white font-medium transition-colors placeholder-gray-400" />
                     </div>
                     <div className="relative group">
                        <Building size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF5C00] transition-colors" />
                        <input required type="text" placeholder="Company Name" className="w-full bg-transparent border-b-2 border-gray-200 dark:border-blue-900/50 py-3 pl-8 focus:outline-none focus:border-[#FF5C00] text-[#001054] dark:text-white font-medium transition-colors placeholder-gray-400" />
                     </div>

                     <button type="submit" className="mt-8 w-full bg-[#FF5C00] hover:bg-[#D94E00] text-white font-bold text-sm tracking-widest uppercase py-4 rounded-lg shadow-[0_10px_20px_rgba(255,92,0,0.3)] transition-all hover:shadow-[0_10px_30px_rgba(255,92,0,0.5)] hover:-translate-y-1 box-offset-static">
                        Confirm Booking
                     </button>
                  </form>
               </div>

               {/* STEP 2: Success Screen */}
               <div className={`absolute inset-0 w-full transition-all duration-500 ease-in-out flex flex-col items-center justify-center text-center ${step === 2 ? 'translate-x-0 opacity-100 relative' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                  <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-full flex items-center justify-center text-green-500 mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                     <Check size={40} strokeWidth={3} className="animate-fade-in" />
                  </div>
                  <h3 className="text-3xl font-black text-[#001054] dark:text-white mb-3 tracking-tight">You're all set!</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed mb-8">
                     A calendar invitation for <span className="font-bold text-[#001054] dark:text-white">March {selectedDate} at {selectedTime}</span> has been sent to your email.
                  </p>
                  <button onClick={onClose} className="px-8 py-3 rounded-lg border border-gray-200 dark:border-blue-900/50 font-bold text-sm text-[#001054] dark:text-white hover:bg-gray-50 dark:hover:bg-[#001054] transition-colors">
                     Close Window
                  </button>
               </div>

            </div>
         </div>
      </div>
    </div>
  );
};


// --- Main App Component ---
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#000836';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F8F9FA';
    }
  }, [isDark]);

  return (
    <div id="top-of-page" className={`min-h-screen font-sans transition-colors duration-500 overflow-clip ${isDark ? 'dark bg-[#000836] text-white' : 'bg-white text-[#001054]'}`}>
      
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --color-brand-orange: #FF5C00;
          --color-brand-blue: #001054;
        }
        /* overflow-x: clip hides overflow without breaking sticky scrolling */
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', system-ui, sans-serif; overflow-x: clip; }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .translate-z-10 {
          transform: translateZ(40px);
        }
        .-translate-z-20 {
          transform: translateZ(-80px) scale(0.8);
        }

        .highlight-text {
          position: relative;
          display: inline-block;
          z-index: 1;
        }
        .highlight-text::after {
          content: '';
          position: absolute;
          bottom: 12%;
          left: -2%;
          width: 104%;
          height: 35%;
          background-color: var(--color-brand-orange);
          z-index: -1;
          opacity: 0.9;
          border-radius: 1px;
        }
        .dark .highlight-text::after {
          opacity: 0.7;
        }

        .box-offset {
          transition: all 0.3s ease;
        }
        .box-offset:hover {
          transform: translate(-4px, -4px);
          box-shadow: 6px 6px 0px var(--color-brand-orange);
        }
        .box-offset-static {
          box-shadow: 8px 8px 0px var(--color-brand-orange);
        }

        .box-offset-contrast {
          transition: all 0.3s ease;
          box-shadow: 6px 6px 0px var(--color-brand-blue);
        }
        .dark .box-offset-contrast {
          box-shadow: 6px 6px 0px #60A5FA;
        }
        .box-offset-contrast:hover {
          transform: translate(-4px, -4px);
          box-shadow: 8px 8px 0px var(--color-brand-blue);
        }
        .dark .box-offset-contrast:hover {
          box-shadow: 8px 8px 0px #60A5FA;
        }

        .btn-brand {
          background-color: var(--color-brand-orange);
          position: relative;
          overflow: hidden;
          z-index: 1;
          transition: all 0.3s ease;
        }
        .btn-brand::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 0%;
          background-color: #CC4A00;
          z-index: -1;
          transition: all 0.3s ease;
        }
        .btn-brand:hover::before {
          height: 100%;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float 4s ease-in-out 2s infinite; }

        @keyframes moveRight {
          0% { left: 0%; }
          100% { left: 100%; }
        }

        /* Network Path Animation */
        @keyframes strokeFlow {
          to { stroke-dashoffset: -20; }
        }
        .animate-stroke-flow {
          animation: strokeFlow 1.5s linear infinite;
        }

        /* NEW: Ambient Blob Rotation */
        @keyframes blobSpin {
          from { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.2); }
          to { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
        }
        .animate-blob-spin {
          animation: blobSpin 20s linear infinite;
        }
        
        /* Hide Scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />

      <ParticleBackground isDark={isDark} />
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} onOpenDemo={() => setIsDemoModalOpen(true)} />
      
      <main>
        <Hero />
        <Marquee />
        <BeforeAfterSlider />
        <Features />
        <CrossPlatformExperience />
        <Integrations />
        <TrustedByNetwork />
        <Testimonials />
        <TechFAQ />
        <LatestNews />
        <SocialFeed />
        <FinalCTA isDark={isDark} onOpenDemo={() => setIsDemoModalOpen(true)} />
      </main>

      <Footer />
      <Chatbot />
      
      {/* High-end Schedular Modal Overlay */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}


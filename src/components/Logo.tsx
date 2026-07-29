import React, { useState } from 'react';
import logoImg from '../assets/images/seven_security_logo_1785368779834.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'stacked' | 'original-image';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'full'
}) => {
  const [useImageFallback, setUseImageFallback] = useState(false);

  // Responsive dimensions
  const heightClasses = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  if (variant === 'original-image' || useImageFallback) {
    return (
      <div className={`flex items-center cursor-pointer select-none ${className}`}>
        <img 
          src={logoImg} 
          alt="Seven Security SAS Logo Soluciones en Seguridad" 
          referrerPolicy="no-referrer"
          className={`object-contain rounded ${heightClasses[size]} w-auto hover:opacity-95 transition-opacity`} 
          onError={() => setUseImageFallback(false)}
        />
      </div>
    );
  }

  // Exact Vector Replica SVG matching user uploaded image
  const ReplicaVectorLogo = () => (
    <svg 
      viewBox="0 0 360 270" 
      className="w-full h-full drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="camBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A5260" />
          <stop offset="40%" stopColor="#2E333D" />
          <stop offset="100%" stopColor="#1A1C23" />
        </linearGradient>

        <linearGradient id="lensReflect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.4" />
        </linearGradient>

        <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* 1. CCTV BULLET CAMERA AT TOP */}
      <g transform="translate(75, 5)">
        {/* Wall Mount Base Flange */}
        <ellipse cx="25" cy="38" rx="14" ry="18" fill="#383D47" stroke="#1F2228" strokeWidth="2" />
        <ellipse cx="25" cy="38" rx="8" ry="11" fill="#1E2026" />
        <ellipse cx="25" cy="38" rx="4" ry="6" fill="#0F1014" />
        
        {/* Arm Mount */}
        <path d="M25 38 Q48 38 60 32" stroke="#484E5A" strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M25 38 Q48 38 60 32" stroke="#2A2D35" strokeWidth="7" strokeLinecap="round" fill="none" />
        <circle cx="60" cy="32" r="6" fill="#1C1E24" stroke="#484E5A" strokeWidth="2" />

        {/* Camera Cylinder Body */}
        <path d="M52 18 L135 18 L126 54 L52 48 Z" fill="url(#camBody)" stroke="#15171C" strokeWidth="2" />

        {/* Top Sun Visor Hood */}
        <path d="M48 14 L145 14 L136 21 L48 20 Z" fill="#24272F" stroke="#121317" strokeWidth="1.5" />

        {/* Front Lens Ring */}
        <ellipse cx="135" cy="36" rx="7" ry="18" fill="#2D313A" stroke="#5C6373" strokeWidth="2" />
        <ellipse cx="136" cy="36" rx="5" ry="14" fill="#0D0E12" />
        <ellipse cx="137" cy="36" rx="3" ry="9" fill="#183654" />
        <ellipse cx="137.5" cy="34" rx="1.5" ry="5" fill="url(#lensReflect)" />

        {/* Text etched on camera body */}
        <text x="64" y="36" fill="#9DA5B8" fontSize="6" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.8">
          SEVEN SECURITY SAS
        </text>
      </g>

      {/* 2. BOLD NAVY FUTURISTIC TYPOGRAPHY */}
      {/* SEVEN */}
      <text 
        x="180" 
        y="128" 
        textAnchor="middle" 
        fill="#1C2758" 
        fontSize="36" 
        fontWeight="900" 
        fontFamily="'Arial Black', 'Trebuchet MS', sans-serif" 
        letterSpacing="8"
      >
        SEVEN
      </text>

      {/* SECURITY */}
      <text 
        x="180" 
        y="172" 
        textAnchor="middle" 
        fill="#1C2758" 
        fontSize="32" 
        fontWeight="900" 
        fontFamily="'Arial Black', 'Trebuchet MS', sans-serif" 
        letterSpacing="5"
      >
        SECURITY
      </text>

      {/* SAS */}
      <text 
        x="180" 
        y="212" 
        textAnchor="middle" 
        fill="#1C2758" 
        fontSize="30" 
        fontWeight="900" 
        fontFamily="'Arial Black', 'Trebuchet MS', sans-serif" 
        letterSpacing="9"
      >
        SAS
      </text>

      {/* SOLUCIONES EN SEGURIDAD */}
      <text 
        x="180" 
        y="248" 
        textAnchor="middle" 
        fill="#2B364B" 
        fontSize="17" 
        fontWeight="700" 
        fontFamily="'Trebuchet MS', sans-serif" 
        letterSpacing="1.5"
      >
        Soluciones en Seguridad
      </text>
    </svg>
  );

  // Stacked Layout (Directly matching user's image)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center justify-center cursor-pointer select-none group ${className}`}>
        <div className={`${heightClasses[size]} w-auto aspect-[360/270] transition-transform group-hover:scale-105 duration-300`}>
          <ReplicaVectorLogo />
        </div>
      </div>
    );
  }

  // Horizontal Navbar Layout (Camera on left + Futuristic 2-Line Navy text)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group ${className}`}>
      {/* CCTV Camera Icon Box */}
      <div className="relative flex items-center justify-center p-1 bg-white rounded-xl border border-slate-200 shadow-sm group-hover:border-blue-500 group-hover:bg-blue-50/50 transition-all flex-shrink-0">
        <svg viewBox="0 0 100 50" className="w-10 h-7 text-slate-800" fill="none">
          {/* Wall mount base */}
          <circle cx="12" cy="25" r="7" fill="#334155" />
          <circle cx="12" cy="25" r="4" fill="#1E293B" />
          {/* Arm mount */}
          <path d="M12 25 L24 25 L32 20" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <circle cx="32" cy="20" r="3" fill="#0F172A" />
          {/* Camera Main Body */}
          <path d="M28 14 L75 14 L72 32 L28 30 Z" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
          {/* Top Shade Hood */}
          <path d="M25 12 L82 12 L78 17 L25 15 Z" fill="#0F172A" />
          {/* Front Lens Ring */}
          <ellipse cx="75" cy="23" rx="4" ry="9" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
          <ellipse cx="76" cy="23" rx="2.5" ry="6" fill="#020617" />
          <ellipse cx="76.5" cy="23" rx="1.5" ry="4" fill="#38BDF8" opacity="0.9" />
          {/* Brand accent line on body */}
          <path d="M38 21 L65 21" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-black tracking-[0.14em] text-[#1C2758] uppercase text-sm sm:text-base font-sans">
              SEVEN SECURITY
            </span>
            <span className="text-[9px] font-black font-mono text-blue-900 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">
              SAS
            </span>
          </div>
          <span className="text-[10px] text-slate-600 font-semibold tracking-[0.18em] font-sans mt-0.5">
            Soluciones en Seguridad
          </span>
        </div>
      )}
    </div>
  );
};



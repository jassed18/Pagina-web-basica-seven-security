import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon-only';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', variant = 'full' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <div className={`flex items-center gap-3 cursor-pointer select-none group ${className}`}>
      {/* CCTV Camera Icon styled with Sleek Interface metallic gold gradient */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#D4AF37] via-[#A88B32] to-[#8A6D3B] p-2 border border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/10 group-hover:border-[#D4AF37] transition-all ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full text-slate-950 group-hover:text-black transition-colors"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Camera body angled */}
          <path d="M12 28 L38 22 L48 30 L48 42 L38 46 L12 38 Z" fill="currentColor" fillOpacity="0.2" />
          {/* Lens housing */}
          <ellipse cx="48" cy="36" rx="5" ry="9" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="3" />
          {/* Lens glass detail */}
          <circle cx="48" cy="36" r="2.5" fill="#050505" />
          {/* Mount bracket */}
          <path d="M20 36 L12 48 L4 48" strokeWidth="4" />
          <circle cx="4" cy="48" r="3" fill="currentColor" />
          {/* Infrared LEDs indicator */}
          <circle cx="38" cy="27" r="1.5" fill="#EF4444" />
        </svg>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping opacity-90" />
      </div>

      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span className={`font-semibold tracking-wider text-slate-900 uppercase font-sans ${textSizes[size]} flex items-center gap-1.5`}>
            SEVEN<span className="text-[#B8860B] font-bold">SECURITY</span>
            <span className="text-[10px] font-mono font-bold text-[#B8860B] tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">SAS</span>
          </span>
          <span className={`text-slate-600 font-medium tracking-[0.2em] uppercase ${subtitleSizes[size]} font-sans mt-0.5`}>
            Soluciones en Seguridad
          </span>
        </div>
      )}
    </div>
  );
};

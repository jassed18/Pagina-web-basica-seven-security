import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Phone, Mail, MapPin, Award } from 'lucide-react';

interface FooterProps {
  setActiveSection: (section: string) => void;
  openQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection, openQuoteModal }) => {
  const handleNav = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050505] text-slate-400 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Empresa líder en ingeniería, diseño, instalación y mantenimiento de sistemas de videovigilancia IP 4K, control de acceso biométrico y alarmas anti-intrusión con cobertura a nivel nacional.
            </p>
            <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-[11px] bg-black p-2.5 rounded-xl border border-[#D4AF37]/30 max-w-sm">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-[#D4AF37]" />
              <span>Superintendencia de Vigilancia y Seguridad Privada - Res. N° 7842</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('inicio')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Inicio & Presentación
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalogo')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Catálogo & Fichas Técnicas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('servicios')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Servicios de Instalación
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('soporte')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Soporte & Garantías Extendidas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('testimonios')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                  Testimonios & Casos de Éxito
                </button>
              </li>
            </ul>
          </div>

          {/* Solution Lines */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Líneas de Equipo</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Cámaras IP 4K Starlight AI</li>
              <li>Cámaras PTZ Solares 4G</li>
              <li>Biométricos Facial 3D Liveness</li>
              <li>Torniquetes SpeedGate 304</li>
              <li>Centrales de Alarma SevenHub</li>
              <li>Barreras Microondas 200m</li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Contacto Directo</h4>
            <div className="space-y-2 font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>(601) 700 7777 (24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>contacto@sevensecurity.com.co</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Calle 100 # 19A - 42, Bogotá D.C.</span>
              </div>
            </div>

            <button
              onClick={openQuoteModal}
              className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8A6D3B] hover:opacity-90 text-black font-extrabold text-xs transition-all cursor-pointer border border-[#D4AF37]/40 shadow-lg"
            >
              Cotizar Proyecto Ahora
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Seven Security S.A.S. - NIT 901.482.391-4. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Certificación RETIE</span>
            <span>•</span>
            <span>ISO 9001:2015</span>
            <span>•</span>
            <span>Habeas Data</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

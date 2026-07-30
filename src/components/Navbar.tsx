import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Phone, 
  MessageSquare, 
  ShoppingCart, 
  ShieldCheck, 
  Menu, 
  X, 
  Bot, 
  Calculator,
  Award,
  Sparkles,
  Eye
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  openCart: () => void;
  openQuoteModal: () => void;
  openAiAdvisor: () => void;
  openWhatsAppModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  cartCount,
  openCart,
  openQuoteModal,
  openAiAdvisor,
  openWhatsAppModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [activeLogoVariant, setActiveLogoVariant] = useState<'full' | 'stacked' | 'original-image'>('stacked');

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo & Fichas' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'soporte', label: 'Soporte & Garantías' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      {/* Top Bar for Trust & Contact */}
      <div className="bg-blue-900 text-slate-100 text-xs py-1.5 px-4 border-b border-blue-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-slate-200">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Certificación ISO 9001 & RETIE | SuperVigilancia
            </span>
            <span className="hidden md:inline text-blue-700">|</span>
            
            {/* Logo Options Trigger */}
            <button
              onClick={() => setShowLogoModal(true)}
              className="flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/40 text-[11px] font-bold cursor-pointer transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Ver Opciones de Logo</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-100">
            <a
              href="tel:+576017007777"
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-bold text-white">(601) 700 7777</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded font-mono">24/7</span>
            </a>
            <span className="text-blue-700">|</span>
            <button
              onClick={() => openWhatsAppModal?.()}
              className="flex items-center gap-1 text-emerald-300 font-bold hover:text-emerald-200 transition-colors cursor-pointer"
              title="Abrir Chat de WhatsApp Directo en pantalla (350 657 7957)"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-400/30 text-emerald-300" />
              <span>WhatsApp: 350 657 7957</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div 
          onClick={() => handleNavClick('inicio')} 
          className="flex items-center gap-2 cursor-pointer group"
          title="Ver o cambiar opción de logo"
        >
          <Logo size="md" variant={activeLogoVariant} />
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                activeSection === item.id
                  ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-sm'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Gemini AI Security Advisor button */}
          <button
            onClick={openAiAdvisor}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-400 transition-all cursor-pointer shadow-sm"
            title="Asistente de Ingeniería de Seguridad con Inteligencia Artificial"
          >
            <Bot className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="hidden xl:inline">Asesor IA Seven</span>
          </button>

          {/* Cotizador Express */}
          <button
            onClick={openQuoteModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer border border-amber-300"
          >
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Cotizador Express</span>
            <span className="sm:hidden">Cotizar</span>
          </button>

          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer shadow-sm"
            aria-label="Ver Carrito de Compras"
          >
            <ShoppingCart className="w-5 h-5 text-blue-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                activeSection === item.id
                  ? 'text-blue-700 bg-blue-50 border border-blue-200'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowLogoModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-100 text-slate-900 border border-amber-300 text-xs font-bold"
            >
              <Eye className="w-4 h-4 text-amber-700" />
              Ver Opciones de Logo de Marca
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAiAdvisor();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold"
            >
              <Bot className="w-4 h-4 text-blue-600" />
              Consultar Asesor Técnico IA
            </button>
          </div>
        </div>
      )}

      {/* Logo Variant Selector Modal */}
      {showLogoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-900 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 uppercase">
                  IDENTIDAD VISUAL SEVEN SECURITY SAS
                </span>
                <h3 className="text-xl font-black text-slate-900 font-sans mt-1">
                  Opciones de Logo Oficial
                </h3>
              </div>
              <button 
                onClick={() => setShowLogoModal(false)} 
                className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Hemos adaptado el diseño exactamente según la imagen de referencia. Puedes elegir qué presentación deseas utilizar como logo principal en el sitio web:
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {/* Option 1: Exact Image Replica Vector (Stacked) */}
              <div 
                onClick={() => setActiveLogoVariant('stacked')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3 ${
                  activeLogoVariant === 'stacked'
                    ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className="text-[10px] font-bold font-mono text-blue-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                  OPCIÓN A (Recomendada)
                </span>
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm w-full flex justify-center">
                  <Logo size="md" variant="stacked" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Logo Fiel a la Imagen</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Cámara superior + Texto futurista azul marino + Slogan</div>
                </div>
              </div>

              {/* Option 2: Horizontal Compact for Navbar */}
              <div 
                onClick={() => setActiveLogoVariant('full')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3 ${
                  activeLogoVariant === 'full'
                    ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className="text-[10px] font-bold font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  OPCIÓN B
                </span>
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm w-full flex justify-center items-center h-28">
                  <Logo size="md" variant="full" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Horizontal Menú</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Optimizado para la barra de navegación superior</div>
                </div>
              </div>

              {/* Option 3: Direct High-Res Image */}
              <div 
                onClick={() => setActiveLogoVariant('original-image')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3 ${
                  activeLogoVariant === 'original-image'
                    ? 'border-blue-600 bg-blue-50/60 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className="text-[10px] font-bold font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  OPCIÓN C
                </span>
                <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm w-full flex justify-center items-center h-28">
                  <Logo size="md" variant="original-image" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Imagen Renderizada</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Imagen original provista por el usuario</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowLogoModal(false)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition-all"
              >
                Aplicar Logo Seleccionado
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


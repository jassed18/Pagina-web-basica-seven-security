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
  Search,
  Wrench,
  Award
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  openCart: () => void;
  openQuoteModal: () => void;
  openAiAdvisor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  cartCount,
  openCart,
  openQuoteModal,
  openAiAdvisor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="flex items-center gap-4 text-slate-200">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              Certificación ISO 9001 & RETIE | SuperVigilancia
            </span>
            <span className="hidden md:inline text-blue-700">|</span>
            <span className="hidden md:inline flex items-center gap-1 text-slate-100">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              Póliza de Garantía Extendida hasta 5 Años
            </span>
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
            <a
              href="https://wa.me/573007007777?text=Hola%20Seven%20Security,%20quisiera%20solicitar%20una%20visita%20t%C3%A9cnica"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-300 font-bold hover:text-emerald-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-400/30 text-emerald-300" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div onClick={() => handleNavClick('inicio')}>
          <Logo size="md" />
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
    </header>
  );
};

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { CatalogSection } from './components/CatalogSection';
import { TechnicalSheetModal } from './components/TechnicalSheetModal';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { SupportWarrantySection } from './components/SupportWarrantySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { CheckoutModal } from './components/CheckoutModal';
import { GeminiSecurityAdvisor } from './components/GeminiSecurityAdvisor';
import { WhatsAppChatModal } from './components/WhatsAppChatModal';
import { Footer } from './components/Footer';

import { Device, CartItem, CategoryType, WarrantyTier } from './types';
import { DEVICES_DATA } from './data/devices';
import { Bot, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      device: DEVICES_DATA[0], // SevenCam Dome 4K
      quantity: 1,
      selectedWarranty: 'pro',
      includeInstallation: true,
    },
  ]);

  // Modal States
  const [selectedDeviceForSheet, setSelectedDeviceForSheet] = useState<Device | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Selected Category filter for Catalog when clicking from Services
  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<CategoryType>('all');

  // Cart Handlers
  const handleAddToCart = (device: Device, warranty: WarrantyTier = 'pro', includeInstall: boolean = true) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.device.id === device.id);
      if (existing) {
        return prev.map((item) =>
          item.device.id === device.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          device,
          quantity: 1,
          selectedWarranty: warranty,
          includeInstallation: includeInstall,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (deviceId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.device.id === deviceId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (deviceId: string) => {
    setCartItems((prev) => prev.filter((item) => item.device.id !== deviceId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateCatalogCategory = (cat: string) => {
    setCatalogCategoryFilter(cat as CategoryType);
    setActiveSection('catalogo');
    const elem = document.getElementById('catalogo');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        openCart={() => setIsCartModalOpen(true)}
        openQuoteModal={() => setIsQuoteModalOpen(true)}
        openAiAdvisor={() => setIsAiAdvisorOpen(true)}
        openWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          openQuoteModal={() => setIsQuoteModalOpen(true)}
          openAiAdvisor={() => setIsAiAdvisorOpen(true)}
          onNavigateCatalog={() => {
            setActiveSection('catalogo');
            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Services Section */}
        <ServicesSection
          openQuoteModal={() => setIsQuoteModalOpen(true)}
          onNavigateCatalogCategory={handleNavigateCatalogCategory}
        />

        {/* Catalog Section with Technical Sheets */}
        <CatalogSection
          onSelectDeviceForTechnicalSheet={(device) => setSelectedDeviceForSheet(device)}
          onAddToCart={(device) => handleAddToCart(device)}
          selectedCategoryFilter={catalogCategoryFilter}
        />

        {/* Technical Support & Extended Warranty Hub */}
        <SupportWarrantySection />

        {/* Verified Testimonials Section */}
        <TestimonialsSection />

        {/* Contact & Free Technical Inspection Form */}
        <ContactSection openWhatsAppModal={() => setIsWhatsAppModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        setActiveSection={setActiveSection}
        openQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Floating Action Buttons: AI Advisor & Quick WhatsApp */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setIsAiAdvisorOpen(true)}
          className="p-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/40 border border-blue-400/40 transition-all hover:scale-110 cursor-pointer group relative"
          title="Consultar Asesor Técnico IA"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Asesor IA Seven
          </span>
        </button>

        <button
          onClick={() => setIsWhatsAppModalOpen(true)}
          className="p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/30 transition-all hover:scale-110 cursor-pointer group relative"
          title="WhatsApp Directo Chat En Vivo"
        >
          <MessageSquare className="w-6 h-6 fill-slate-950" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            WhatsApp Directo 24/7
          </span>
        </button>
      </div>

      {/* Interactive Modals */}
      <TechnicalSheetModal
        device={selectedDeviceForSheet}
        onClose={() => setSelectedDeviceForSheet(null)}
        onAddToCart={(dev, w, inst) => handleAddToCart(dev, w, inst)}
      />

      <QuoteCalculatorModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <CheckoutModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <GeminiSecurityAdvisor
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        openQuoteModal={() => {
          setIsAiAdvisorOpen(false);
          setIsQuoteModalOpen(true);
        }}
      />

      <WhatsAppChatModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        openQuoteModal={() => {
          setIsWhatsAppModalOpen(false);
          setIsQuoteModalOpen(true);
        }}
      />
    </div>
  );
}

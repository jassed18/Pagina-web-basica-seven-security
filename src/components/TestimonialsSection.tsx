import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { Testimonial } from '../types';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Building2, 
  Home, 
  Factory, 
  Plus, 
  X, 
  Check,
  Send
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('Todos');
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [showAddModal, setShowAddModal] = useState(false);

  // New testimonial form fields
  const [authorName, setAuthorName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [sector, setSector] = useState<'Residencial' | 'Empresarial' | 'Industrial' | 'Bancario / Comercial'>('Empresarial');
  const [rating, setRating] = useState<number>(5);
  const [projectSummary, setProjectSummary] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const sectors = ['Todos', 'Industrial', 'Residencial', 'Bancario / Comercial', 'Empresarial'];

  const filteredTestimonials = testimonialsList.filter((item) => {
    return selectedSector === 'Todos' || item.sector === selectedSector;
  });

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Testimonial = {
      id: `test-${Date.now()}`,
      authorName,
      companyName,
      role,
      sector,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating,
      date: 'Reciente',
      projectSummary: projectSummary || 'Instalación de Sistema de Seguridad Seven Security SAS',
      quote: quoteText,
      verifiedBadge: true,
      installedDevices: ['SevenCam 4K', 'Control Biométrico 3D'],
    };

    setTestimonialsList([newEntry, ...testimonialsList]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowAddModal(false);
      setAuthorName('');
      setCompanyName('');
      setQuoteText('');
    }, 2000);
  };

  return (
    <section id="testimonios" className="py-20 bg-slate-50 border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <span className="text-xs font-bold font-mono text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Casos de Éxito & Opiniones Verificadas
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3 font-sans">
              La Confianza de Nuestros Clientes Habla por Nosotros
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Más de 1.200 empresas, conjuntos residenciales e industrias confían la protección de sus bienes en los sistemas de Seven Security SAS.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-300 shadow-md transition-all cursor-pointer whitespace-nowrap self-start md:self-auto font-sans"
          >
            <Plus className="w-4 h-4" />
            <span>Dejar Opinión o Testimonio</span>
          </button>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSector === sec
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 border border-blue-500'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-blue-500 transition-all shadow-md hover:shadow-2xl relative"
            >
              <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating & Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  <span className="flex items-center gap-1 text-[10px] text-emerald-800 font-bold font-mono bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    PROYECTO VERIFICADO
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic font-medium">
                  "{item.quote}"
                </p>

                {/* Installed Devices Tags */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono font-bold">Proyecto Instalado:</span>
                  <div className="text-xs font-bold text-blue-700">{item.projectSummary}</div>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <img
                  src={item.avatarUrl}
                  alt={item.authorName}
                  className="w-11 h-11 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-sans">
                    <span>{item.authorName}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-800 px-1.5 py-0.2 rounded font-mono border border-blue-200 font-bold">
                      {item.sector}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    {item.role} - <strong className="text-slate-900">{item.companyName}</strong>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-sans">Publicar Opinión de Servicio</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <div className="font-bold text-lg text-slate-900">¡Gracias por tu Testimonio!</div>
                <p className="text-xs text-slate-600">Tu opinión ha sido añadida a la comunidad de Seven Security.</p>
              </div>
            ) : (
              <form onSubmit={handleAddTestimonial} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Nombre:</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Ej: Ing. Carlos Gómez"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Empresa / Inmueble:</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ej: Plaza Central"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Cargo / Rol:</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ej: Administrador"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Sector:</label>
                    <select
                      value={sector}
                      onChange={(e: any) => setSector(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    >
                      <option value="Empresarial">Empresarial</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Bancario / Comercial">Bancario / Comercial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Resumen del Proyecto Instalado:</label>
                  <input
                    type="text"
                    value={projectSummary}
                    onChange={(e) => setProjectSummary(e.target.value)}
                    placeholder="Ej: Instalación de 12 cámaras 4K y control facial"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Tu Experiencia / Comentarios:</label>
                  <textarea
                    rows={3}
                    required
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="Detalla la atención de los técnicos, calidad de imagen, app móvil..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 resize-none focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 font-extrabold text-xs text-slate-950 cursor-pointer shadow-md transition-all border border-amber-300 font-sans"
                >
                  Enviar Testimonio
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

import React, { useState } from 'react';
import { WARRANTY_PLANS, TECHNICAL_FAQS } from '../data/warranties';
import { SupportTicket } from '../types';
import { 
  ShieldCheck, 
  Wrench, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronDown, 
  Send,
  Headphones,
  Award,
  Zap,
  Check,
  X
} from 'lucide-react';

export const SupportWarrantySection: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  
  // Ticket Tracker State
  const [searchTicketId, setSearchTicketId] = useState('TK-7842');
  const [currentTicket, setCurrentTicket] = useState<SupportTicket | null>({
    id: 'TK-7842',
    clientName: 'Edificio Centro Empresarial Alpha',
    serviceType: 'Mantenimiento Preventivo CCTVs',
    deviceModel: 'SevenCam Dome 4K Ultra AI',
    status: 'En Proceso',
    assignedTechnician: 'Ing. Carlos Mendoza (Soporte Nivel 2)',
    priority: 'Alta',
    createdAt: '2026-07-28 09:30',
    estimatedResolution: '2026-07-30 14:00',
    description: 'Revisión programada de 16 cámaras IP en zonas comunes y recalibración de visión nocturna.',
    updates: [
      { date: '2026-07-28 09:30', note: 'Ticket creado automáticamente por contrato Pro.' },
      { date: '2026-07-28 11:15', note: 'Técnico asignado. Repuestos de conectores verificados.' },
      { date: '2026-07-29 08:00', note: 'Técnico en sitio realizando diagnóstico de cableado UTP Cat6.' },
    ],
  });
  const [ticketSearchError, setTicketSearchError] = useState(false);

  // New Ticket Form Modal State
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newServiceType, setNewServiceType] = useState('Soporte Técnico Cámara 4K');
  const [newDeviceModel, setNewDeviceModel] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [ticketCreatedSuccess, setTicketCreatedSuccess] = useState<string | null>(null);

  const handleSearchTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSearchError(false);
    try {
      const res = await fetch(`/api/tickets/${searchTicketId.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentTicket(data);
      } else {
        setTicketSearchError(true);
        setCurrentTicket(null);
      }
    } catch (err) {
      setTicketSearchError(true);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: newClientName,
          serviceType: newServiceType,
          deviceModel: newDeviceModel,
          description: newDescription,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setTicketCreatedSuccess(data.ticket.id);
        setCurrentTicket(data.ticket);
        setSearchTicketId(data.ticket.id);
        setTimeout(() => {
          setShowNewTicketModal(false);
          setTicketCreatedSuccess(null);
          setNewClientName('');
          setNewDescription('');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="soporte" className="py-20 bg-slate-100 border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold border border-blue-200 shadow-sm">
            <Award className="w-4 h-4 text-blue-700" />
            <span>Centro de Garantías & Mesa de Ayuda Especializada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Soporte Técnico Especializado & Pólizas de Garantía Extendida
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            En <strong className="text-blue-900 font-bold">Seven Security SAS</strong> respaldamos cada instalación con respuesta técnica garantizada en menos de 4 horas bajo nuestro contrato Enterprise SLA.
          </p>
        </div>

        {/* 1. Extended Warranty Comparison Cards */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-sans">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <span>Pólizas de Garantía Extendida & Acuerdos SLA</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {WARRANTY_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 ${
                  plan.recommended
                    ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-600/10 scale-[1.02]'
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow-md tracking-wider font-mono">
                    OPCIÓN MÁS SOLICITADA
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                        {plan.badge}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 mt-2 font-sans">{plan.name}</h4>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-6 font-mono text-xs text-slate-800 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-bold">Duración:</span>
                      <span className="font-bold text-blue-700">{plan.durationMonths} Meses</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-bold">Respuesta SLA:</span>
                      <span className="font-bold text-emerald-700">{plan.slaResponseHours}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700 mb-8">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 text-center">
                  <span className="text-[11px] text-slate-500 block font-mono font-medium">
                    Incluido en todos los contratos oficiales de Seven Security SAS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Interactive Ticket Status Tracker & New Ticket Submission */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-300">
                MESA DE AYUDA TÉCNICA 24/7
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2 font-sans">
                Consultar Estado de Ticket de Soporte
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Ingrese su número de seguimiento (ej: <code className="text-blue-700 font-bold">TK-7842</code> o <code className="text-blue-700 font-bold">TK-8109</code>) para consultar el avance del técnico.
              </p>
            </div>

            <button
              onClick={() => setShowNewTicketModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20 transition-all cursor-pointer whitespace-nowrap border border-amber-300"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Nuevo Ticket de Soporte</span>
            </button>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchTicket} className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTicketId}
                onChange={(e) => setSearchTicketId(e.target.value)}
                placeholder="Código ej: TK-7842"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow transition-all"
            >
              Buscar
            </button>
          </form>

          {/* Ticket Search Result Card */}
          {currentTicket ? (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-slate-900 font-mono">{currentTicket.id}</span>
                    <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full ${
                      currentTicket.status === 'Resuelto'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                    }`}>
                      ● {currentTicket.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 font-bold mt-1">
                    Cliente: {currentTicket.clientName}
                  </div>
                </div>

                <div className="text-right text-xs text-slate-600 font-mono">
                  <div>Técnico: <strong className="text-blue-700">{currentTicket.assignedTechnician}</strong></div>
                  <div>Prioridad: <strong className="text-amber-700">{currentTicket.priority}</strong></div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-slate-500 block mb-0.5 font-mono font-bold">Servicio Solicitado:</span>
                  <span className="font-bold text-slate-900">{currentTicket.serviceType} ({currentTicket.deviceModel})</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-slate-500 block mb-0.5 font-mono font-bold">Estimación de Cierre:</span>
                  <span className="font-bold text-emerald-700 font-mono">{currentTicket.estimatedResolution}</span>
                </div>
              </div>

              {/* Updates Timeline */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-blue-700" />
                  <span>Bitácora de Actualizaciones del Servicio</span>
                </h4>

                <div className="space-y-2 border-l-2 border-blue-500 pl-4 ml-1">
                  {currentTicket.updates.map((update, idx) => (
                    <div key={idx} className="relative pb-2">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white" />
                      <div className="text-[10px] text-slate-500 font-mono font-bold">{update.date}</div>
                      <div className="text-xs text-slate-800 font-medium">{update.note}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : ticketSearchError ? (
            <div className="bg-red-50 p-6 rounded-2xl border border-red-200 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
              <div className="text-sm font-bold text-slate-900">Ticket no encontrado en el sistema</div>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Verifique el código digitado o cree un nuevo ticket de soporte con nuestros ingenieros.
              </p>
            </div>
          ) : null}

        </div>

        {/* 3. Knowledge Base & FAQ Accordion */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 font-sans">Preguntas Frecuentes Técnicas</h3>
            <p className="text-xs text-slate-600 mt-1">Respuesta inmediata a las dudas más comunes de nuestros clientes.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {TECHNICAL_FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-colors shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 text-sm font-bold text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 bg-slate-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-sans">Crear Ticket de Soporte Técnico</h3>
              <button onClick={() => setShowNewTicketModal(false)} className="text-slate-400 hover:text-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {ticketCreatedSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <div className="font-bold text-lg text-slate-900">Ticket Registrado Exitosamente</div>
                <div className="text-xs text-blue-700 font-mono font-bold">Código Asignado: {ticketCreatedSuccess}</div>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Nombre o Empresa:</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Ej: Conjunto Residencial Alpha"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Tipo de Servicio:</label>
                  <select
                    value={newServiceType}
                    onChange={(e) => setNewServiceType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="Soporte Técnico Cámara 4K">Soporte Técnico Cámara 4K</option>
                    <option value="Revisión Control de Acceso Biométrico">Revisión Control de Acceso Biométrico</option>
                    <option value="Falla en Alarma / Central SevenHub">Falla en Alarma / Central SevenHub</option>
                    <option value="Mantenimiento Preventivo Programado">Mantenimiento Preventivo Programado</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Modelo de Dispositivo:</label>
                  <input
                    type="text"
                    value={newDeviceModel}
                    onChange={(e) => setNewDeviceModel(e.target.value)}
                    placeholder="Ej: SevenCam Dome 4K"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1 font-mono">Detalle del Requerimiento:</label>
                  <textarea
                    rows={3}
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describa el síntoma o la solicitud..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 resize-none focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 font-extrabold text-xs text-slate-950 cursor-pointer shadow-md transition-all border border-amber-300"
                >
                  Registrar Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

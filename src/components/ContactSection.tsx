import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

interface ContactSectionProps {
  openWhatsAppModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ openWhatsAppModal }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Bogotá D.C.');
  const [propertyType, setPropertyType] = useState('Empresarial');
  const [preferredDate, setPreferredDate] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 bg-white border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Atención Comercial & Inspección Técnica Gratuita</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Agenda Tu Visita Técnica de Diagnóstico Sin Costo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Un Ingeniero de <strong className="text-blue-900 font-bold">Seven Security SAS</strong> acudirá a sus instalaciones, evaluará puntos ciegos, distancias de cableado y entregará el plano con la propuesta técnica óptima.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-lg space-y-6">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-sans">
                  Solicitar Visita Técnica Gratuita en Sitio
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1 font-mono">Nombre Completo:</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej: Ing. Mauricio Torres"
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1 font-mono">Teléfono / WhatsApp:</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej: 300 700 7777"
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1 font-mono">Correo Electrónico:</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@empresa.com"
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1 font-mono">Ciudad de Instalación:</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                    >
                      <option value="Bogotá D.C.">Bogotá D.C. & Sabana</option>
                      <option value="Medellín">Medellín & Antioquia</option>
                      <option value="Cali">Cali & Valle del Cauca</option>
                      <option value="Barranquilla">Barranquilla & Costa</option>
                      <option value="Bucaramanga">Bucaramanga & Santanderes</option>
                      <option value="Otra Ciudad">Otra Ciudad (Nacional)</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1 font-mono">Tipo de Proyecto:</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                    >
                      <option value="Empresarial">Empresa / Edificio Corporativo</option>
                      <option value="Residencial">Conjunto Residencial / Hogar</option>
                      <option value="Industrial">Planta Industrial / Bodega</option>
                      <option value="Comercial">Centro Comercial / Tienda</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1 font-mono">Fecha Preferida Inspección:</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase block mb-1 font-mono">Observaciones / Equipos de Interés:</label>
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Escriba aquí detalles como metraje, número de entradas o requerimientos de cámaras 4K..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 resize-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-300 font-sans"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Confirmar Solicitud de Visita Técnica Sin Costo</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-slate-900 font-sans">¡Solicitud de Visita Confirmada!</h3>
                <p className="text-sm text-slate-700 max-w-md mx-auto">
                  Gracias <strong className="text-slate-900">{fullName}</strong>. Un Ingeniero de Seven Security SAS te contactará al <span className="text-blue-700 font-mono font-bold">{phone}</span> para coordinar el horario exacto de la visita en <strong className="text-slate-900">{city}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer border border-blue-500 shadow"
                >
                  Enviar Otra Solicitud
                </button>
              </div>
            )}

          </div>

          {/* Right Column Contact Info & HQ Offices */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Emergency Contact Box */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-6 rounded-2xl border border-blue-800 space-y-4 shadow-xl text-white">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-400 text-slate-950 rounded-xl border border-amber-300">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block font-bold">
                    LÍNEA NACIONAL DE MESA DE AYUDA
                  </span>
                  <div className="text-2xl font-black text-white font-mono">(601) 700 7777</div>
                </div>
              </div>

              <div className="text-xs text-slate-200 space-y-1 border-t border-blue-800/80 pt-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Atención Comercial: Lunes a Sábado 7:00 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Central de Monitoreo 24/7 SLA Activa</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (openWhatsAppModal) {
                    openWhatsAppModal();
                  } else {
                    window.open('https://wa.me/573506577957?text=Hola%20Seven%20Security', '_blank');
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-extrabold text-xs text-white shadow-lg transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Abrir Chat WhatsApp Directo: 350 657 7957</span>
              </button>
            </div>

            {/* Offices List */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-md">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 font-mono">
                <MapPin className="w-4 h-4 text-blue-700" />
                <span>Sedes de Atención Principal Seven Security SAS</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="font-bold text-slate-900">Sede Principal Bogotá D.C.</div>
                  <div className="text-slate-600 mt-0.5">Calle 100 # 19A - 42, Edificio Trade Center, Piso 8</div>
                  <div className="text-blue-700 font-mono font-bold mt-1">PBX: (601) 700 7777 / Cel: 300 700 7777</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="font-bold text-slate-900">Sede Medellín - Antioquia</div>
                  <div className="text-slate-600 mt-0.5">Carrera 43A # 1-50, El Poblado, Torre San Fernando</div>
                  <div className="text-blue-700 font-mono font-bold mt-1">Tel: (604) 600 8888</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="font-bold text-slate-900">Sede Cali - Valle del Cauca</div>
                  <div className="text-slate-600 mt-0.5">Avenida 6N # 28N - 32, Edificio World Trade Center</div>
                  <div className="text-blue-700 font-mono font-bold mt-1">Tel: (602) 500 9999</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

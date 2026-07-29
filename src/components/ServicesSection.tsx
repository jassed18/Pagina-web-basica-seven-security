import React from 'react';
import { 
  Video, 
  KeyRound, 
  ShieldAlert, 
  Network, 
  Check, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

interface ServicesSectionProps {
  openQuoteModal: () => void;
  onNavigateCatalogCategory: (category: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  openQuoteModal,
  onNavigateCatalogCategory,
}) => {
  const services = [
    {
      id: 'cctv',
      categoryKey: 'cameras',
      title: 'Sistemas de Videovigilancia IP & Térmica 4K',
      subtitle: 'Monitoreo HD, visión nocturna Starlight y analítica de IA',
      icon: Video,
      accentColor: 'from-[#D4AF37] to-[#8A6D3B]',
      badge: 'CCTV Ultra HD',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      features: [
        'Cámaras IP 4K (8MP) con tecnología Starlight Full-Color en oscuridad',
        'Analítica de Inteligencia Artificial: Reconocimiento facial y lectura LPR de placas',
        'Cámaras PTZ 360° autónomas con panel solar 120W y módulo 4G LTE para zonas rurales',
        'Grabación redundante en NVRs hasta 64TB con respaldo encriptado Seven Cloud',
      ],
    },
    {
      id: 'access',
      categoryKey: 'access',
      title: 'Control de Acceso Biométrico & Torniquetes',
      subtitle: 'Gestión peatonal y vehicular con tecnología 3D Liveness',
      icon: KeyRound,
      accentColor: 'from-[#D4AF37] to-[#8A6D3B]',
      badge: 'Biométrico & RFID',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      features: [
        'Terminales de reconocimiento facial 3D en 0.2s sin contacto y anti-fotografía',
        'Torniquetes y Molinetes SpeedGate de acero inoxidable AISI 304 para edificios',
        'Lectoras RFID MiFare, tarjetas inteligentes y apertura remota con Código QR',
        'Software de control de tiempo y asistencia integrado a sistemas de nómina',
      ],
    },
    {
      id: 'alarms',
      categoryKey: 'alarms',
      title: 'Sistemas de Alarma Anti-Intrusión & Perimetral',
      subtitle: 'Detección temprana con verificación fotográfica e infrarroja',
      icon: ShieldAlert,
      accentColor: 'from-[#D4AF37] to-[#8A6D3B]',
      badge: 'Monitoreo 24/7',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      features: [
        'Centrales de alarma híbridas inalámbricas con triple vía (Ethernet, WiFi y 4G LTE)',
        'Detectores PIRCAM que envían foto instantánea a la App móvil al detectar movimiento',
        'Barreras perimetrales de microondas hasta 200m inmunes a lluvia, niebla y animales',
        'Sirenas de alta potencia 120dB con estroboscopio y botón de pánico físico y virtual',
      ],
    },
    {
      id: 'network',
      categoryKey: 'recorders',
      title: 'Infraestructura de Red & Cableado Estructurado',
      subtitle: 'Enlaces de fibra óptica, certificación Cat6A y norma RETIE',
      icon: Network,
      accentColor: 'from-[#D4AF37] to-[#8A6D3B]',
      badge: 'Redes & Fibra',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      features: [
        'Tendido y fusión de fibra óptica monomodo/multimodo para largas distancias',
        'Cableado estructurado UTP/FTP Cat6A certificado con Fluke Tester',
        'Montaje de Racks, gabinetes de comunicaciones, switches PoE+ administrables y UPS',
        'Cumplimiento estricto del Reglamento Técnico de Instalaciones Eléctricas (RETIE)',
      ],
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-slate-100 border-b border-slate-200 relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold border border-blue-200 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Portafolio de Soluciones Integrales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Servicios Profesionales de Instalación & Configuración
          </h2>
          <p className="text-slate-600 text-base">
            Cada proyecto en <strong className="text-blue-900 font-bold">Seven Security SAS</strong> se ejecuta bajo rigurosas normativas internacionales de ingeniería, con garantía de respaldo directo y mantenimientos preventivos programados.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-blue-500 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-2xl relative overflow-hidden"
              >
                {/* Accent Top Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors font-sans">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 font-medium">
                    {service.subtitle}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onNavigateCatalogCategory(service.categoryKey)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
                  >
                    <span>Ver Equipos en Catálogo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={openQuoteModal}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-300 shadow transition-all cursor-pointer"
                  >
                    Cotizar este Servicio
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

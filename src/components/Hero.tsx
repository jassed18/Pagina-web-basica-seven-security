import React from 'react';
import { 
  ShieldCheck, 
  Camera, 
  Lock, 
  Bell, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Sparkles, 
  Award,
  Zap
} from 'lucide-react';

interface HeroProps {
  openQuoteModal: () => void;
  openAiAdvisor: () => void;
  onNavigateCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  openQuoteModal,
  openAiAdvisor,
  onNavigateCatalog,
}) => {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white overflow-hidden py-16 lg:py-24 border-b border-blue-800">
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.25),rgba(15,23,42,0))]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 text-slate-950 text-xs font-mono font-extrabold tracking-wider uppercase shadow-xl shadow-amber-400/20 border border-amber-300">
              <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>Ingeniería en Seguridad Electrónica de Alta Gama</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-tight font-sans drop-shadow-sm">
              Protección Inteligente de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                Nivel Superior
              </span>{' '}
              para tu Empresa y Hogar
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Diseño, instalación y monitoreo de sistemas integrados de{' '}
              <strong className="text-amber-300 font-bold">Cámaras 4K con IA</strong>,{' '}
              <strong className="text-amber-300 font-bold">Control de Acceso Biométrico</strong> y{' '}
              <strong className="text-amber-300 font-bold">Alarmas Anti-Intrusión</strong> con respaldo de garantía extendida de hasta 5 años y certificación RETIE.
            </p>

            {/* Feature Bullets */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-blue-50 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-semibold">Instaladores Certificados con Norma RETIE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-semibold">Atención Técnica en Sitio en menos de 4 Horas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-semibold">Visita Técnica de Diagnóstico GRATUITA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-semibold">Monitoreo en App Móvil Encriptada AES-256</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={openQuoteModal}
                className="flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-extrabold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-2xl shadow-amber-400/30 transition-all cursor-pointer border border-amber-200 transform hover:scale-105"
              >
                <span>Cotizar Proyecto en 1 Minuto</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onNavigateCatalog}
                className="flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/30 text-white transition-all cursor-pointer shadow-lg backdrop-blur"
              >
                <Camera className="w-4 h-4 text-amber-300" />
                <span>Ver Catálogo & Fichas Técnicas</span>
              </button>

              <button
                onClick={openAiAdvisor}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold bg-blue-950/80 border border-blue-400/50 text-blue-200 hover:bg-blue-900 transition-all cursor-pointer shadow"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>¿Dudas? Pregunta a nuestro Asesor IA</span>
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="pt-6 border-t border-blue-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl font-black text-white">+1,200</div>
                <div className="text-xs text-blue-200 font-mono uppercase tracking-wider font-semibold">Proyectos Instalados</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">99.8%</div>
                <div className="text-xs text-blue-200 font-mono uppercase tracking-wider font-semibold">Disponibilidad SLA</div>
              </div>
              <div>
                <div className="text-2xl font-black text-amber-300">5 Años</div>
                <div className="text-xs text-blue-200 font-mono uppercase tracking-wider font-semibold">Garantía Extendida</div>
              </div>
            </div>

          </div>

          {/* Right Column Interactive Visual Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Security Dashboard Preview Mockup */}
            <div className="relative rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl p-5 space-y-4 overflow-hidden">
              
              {/* Header Status Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-extrabold text-slate-900 tracking-wide uppercase font-sans">
                    Centro de Control Seven Security 24/7
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300 font-mono">
                  SISTEMA ACTIVO
                </span>
              </div>

              {/* Camera Video Live Feed Mock */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-300 group shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
                  alt="Transmisión en Vivo Cámara 4K Seven Security"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
                
                {/* Overlay Bounding Box AI */}
                <div className="absolute top-6 left-12 w-28 h-28 border-2 border-emerald-400 rounded bg-emerald-500/20 flex flex-col justify-between p-1.5 animate-pulse">
                  <span className="text-[9px] font-mono font-bold bg-emerald-500 text-black px-1 rounded w-max">
                    HUMANO 99.4%
                  </span>
                  <span className="text-[8px] font-mono text-emerald-200 font-bold">
                    ID: #7842-OK
                  </span>
                </div>

                {/* Live Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  REC 4K HDR
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-[10px] font-mono text-slate-100 bg-slate-900/90 px-2.5 py-1 rounded backdrop-blur border border-slate-700">
                  <span>CAM-01: Acceso Principal Nivel 1</span>
                  <span className="text-amber-400 font-bold">FPS: 30 | 3840x2160</span>
                </div>
              </div>

              {/* Multi-System Status Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                  <Camera className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-900">Cámaras IP 4K</span>
                  <span className="text-[10px] text-emerald-600 font-bold font-mono">16/16 Online</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                  <Lock className="w-5 h-5 text-amber-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-900">Biométrico 3D</span>
                  <span className="text-[10px] text-slate-600 font-bold font-mono">Acceso Ok</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex flex-col items-center text-center">
                  <Bell className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-900">Central Alarma</span>
                  <span className="text-[10px] text-emerald-600 font-bold font-mono">Armado Total</span>
                </div>
              </div>

              {/* Floating Shield Badge */}
              <div className="absolute -bottom-2 -right-2 bg-blue-900 text-white border border-blue-700 p-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur">
                <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Póliza de Respaldo</div>
                  <div className="text-[10px] text-blue-200">Respuesta en Sitio &lt; 4h</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

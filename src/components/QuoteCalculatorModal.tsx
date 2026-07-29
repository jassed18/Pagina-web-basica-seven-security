import React, { useState } from 'react';
import { WarrantyTier } from '../types';
import { 
  Calculator, 
  X, 
  Building2, 
  Home, 
  Factory, 
  Store, 
  Camera, 
  KeyRound, 
  ShieldAlert, 
  Check, 
  Download, 
  Send,
  Phone,
  Sparkles
} from 'lucide-react';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [propertyType, setPropertyType] = useState<string>('Empresa / Oficina');
  const [propertyArea, setPropertyArea] = useState<number>(250);
  const [cameraCount, setCameraCount] = useState<number>(8);
  const [cameraQuality, setCameraQuality] = useState<string>('4K Ultra AI');
  const [accessDoors, setAccessDoors] = useState<number>(2);
  const [alarmZones, setAlarmZones] = useState<number>(4);
  const [warrantyTier, setWarrantyTier] = useState<WarrantyTier>('pro');

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  if (!isOpen) return null;

  // Calculation Logic (Estimated COP)
  const baseCameraCost = cameraQuality === '4K Ultra AI' ? 480000 : 290000;
  const camerasTotal = cameraCount * baseCameraCost;
  const accessTotal = accessDoors * 890000; // Biometrics + Magnetic Lock
  const alarmTotal = alarmZones > 0 ? 620000 + alarmZones * 120000 : 0;
  
  // NVR / Central Recording Infra
  const nvrCost = cameraCount > 16 ? 1150000 : cameraCount > 0 ? 650000 : 0;
  
  // Labor & UTP Cabling estimate per point
  const laborTotal = (cameraCount + accessDoors) * 140000;
  
  const subtotal = camerasTotal + accessTotal + alarmTotal + nvrCost + laborTotal;
  
  const warrantyMultiplier = warrantyTier === 'enterprise' ? 0.22 : warrantyTier === 'pro' ? 0.12 : 0;
  const warrantyCost = subtotal * warrantyMultiplier;

  const totalEstimateMin = Math.round((subtotal + warrantyCost) * 0.95);
  const totalEstimateMax = Math.round((subtotal + warrantyCost) * 1.10);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#050505]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black text-[#D4AF37] rounded-xl border border-[#D4AF37]/30 font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans">
                Cotizador Inteligente de Proyectos de Seguridad
              </h3>
              <p className="text-xs text-slate-400">
                Obtén un presupuesto estimado instantáneo para tu instalación en Seven Security
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        {!quoteSubmitted ? (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Step 1: Property Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-[#D4AF37] tracking-wider block font-mono">
                1. Tipo de Propiedad / Inmueble
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'Casa / Residencia', icon: Home },
                  { label: 'Empresa / Oficina', icon: Building2 },
                  { label: 'Planta Industrial', icon: Factory },
                  { label: 'Comercial / Local', icon: Store },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = propertyType === type.label;
                  return (
                    <button
                      type="button"
                      key={type.label}
                      onClick={() => setPropertyType(type.label)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#050505] text-[#D4AF37] shadow-md shadow-[#D4AF37]/10'
                          : 'border-white/10 bg-black text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-center font-sans">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: System Scale */}
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold uppercase text-[#D4AF37] tracking-wider block font-mono">
                2. Equipos & Cobertura Solicitada
              </label>

              <div className="grid sm:grid-cols-3 gap-4">
                
                {/* Cameras */}
                <div className="bg-[#050505] p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-sans">
                      <Camera className="w-4 h-4 text-[#D4AF37]" />
                      Cámaras IP
                    </span>
                    <span className="text-sm font-bold text-[#D4AF37] font-mono">{cameraCount}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    value={cameraCount}
                    onChange={(e) => setCameraCount(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <select
                    value={cameraQuality}
                    onChange={(e) => setCameraQuality(e.target.value)}
                    className="w-full bg-black border border-white/10 text-xs rounded-lg p-2 text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="4K Ultra AI">4K Ultra HD con IA</option>
                    <option value="Full HD 1080p">Full HD 1080p Estándar</option>
                  </select>
                </div>

                {/* Access Control Doors */}
                <div className="bg-[#050505] p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-sans">
                      <KeyRound className="w-4 h-4 text-[#D4AF37]" />
                      Puertas Biométricas
                    </span>
                    <span className="text-sm font-bold text-[#D4AF37] font-mono">{accessDoors}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={accessDoors}
                    onChange={(e) => setAccessDoors(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400 font-mono">
                    Incluye lector facial 3D + cerradura magnética 600lbs
                  </div>
                </div>

                {/* Alarm Zones */}
                <div className="bg-[#050505] p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-sans">
                      <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
                      Zonas de Alarma
                    </span>
                    <span className="text-sm font-bold text-[#D4AF37] font-mono">{alarmZones}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={16}
                    value={alarmZones}
                    onChange={(e) => setAlarmZones(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400 font-mono">
                    Incluye Central SevenHub + Sensores PIRCAM
                  </div>
                </div>

              </div>
            </div>

            {/* Step 3: Warranty Tier */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase text-[#D4AF37] tracking-wider block font-mono">
                3. Nivel de Póliza de Garantía Extendida & SLA
              </label>

              <div className="grid sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setWarrantyTier('standard')}
                  className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                    warrantyTier === 'standard'
                      ? 'border-[#D4AF37] bg-[#050505] text-white'
                      : 'border-white/10 bg-black text-slate-400'
                  }`}
                >
                  <div className="font-bold font-sans">Estándar 12M</div>
                  <div className="text-[10px] text-slate-400 font-mono">Garantía legal de fábrica</div>
                </button>

                <button
                  type="button"
                  onClick={() => setWarrantyTier('pro')}
                  className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                    warrantyTier === 'pro'
                      ? 'border-[#D4AF37] bg-[#050505] text-white'
                      : 'border-white/10 bg-black text-slate-400'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between font-sans">
                    <span>Garantía Pro 24M</span>
                    <span className="text-[9px] bg-[#D4AF37] text-black px-1 rounded font-bold font-mono">RECOMENDADO</span>
                  </div>
                  <div className="text-[10px] text-[#D4AF37] font-mono">Reemplazo exprés en 24h</div>
                </button>

                <button
                  type="button"
                  onClick={() => setWarrantyTier('enterprise')}
                  className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                    warrantyTier === 'enterprise'
                      ? 'border-[#D4AF37] bg-[#050505] text-white'
                      : 'border-white/10 bg-black text-slate-400'
                  }`}
                >
                  <div className="font-bold font-sans">Enterprise SLA 36M</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Respuesta en sitio &lt; 4 horas</div>
                </button>
              </div>
            </div>

            {/* Estimated Calculation Banner */}
            <div className="bg-[#050505] p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-slate-300 uppercase font-mono block">Presupuesto Estimado Completo (Equipos + Mano de Obra):</span>
                  <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-mono mt-1">
                    {formatCOP(totalEstimateMin)} - {formatCOP(totalEstimateMax)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-300 font-mono">
                  <div className="text-[#D4AF37] font-bold">✓ Incluye Visita Técnica Gratis</div>
                  <div>Instalación RETIE Certificada</div>
                </div>
              </div>
            </div>

            {/* Form for Direct Consultation */}
            <form onSubmit={handleSubmitQuote} className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Enviar cotización a mi correo e ingresar a lista de visitas prioritarias:
              </h4>

              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Tu Nombre o Empresa"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="bg-[#050505] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Teléfono / WhatsApp"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="bg-[#050505] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="email"
                  required
                  placeholder="Correo Electrónico"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="bg-[#050505] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#D4AF37] to-[#8A6D3B] text-black hover:opacity-90 transition-all shadow-lg shadow-[#D4AF37]/10 cursor-pointer flex items-center justify-center gap-2 border border-[#D4AF37]/40 font-sans"
              >
                <Send className="w-4 h-4" />
                <span>Solicitar Visita Técnica Sin Costo & Enviar Cotización PDF</span>
              </button>
            </form>

          </div>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-sans">¡Cotización Generada Exitosamente!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Hemos enviado la propuesta detallada por <strong className="text-white font-mono">{formatCOP(totalEstimateMin)}</strong> al correo <strong className="text-[#D4AF37]">{clientEmail}</strong>.
            </p>
            <div className="bg-[#050505] p-4 rounded-xl border border-white/10 max-w-md mx-auto text-xs text-slate-300 space-y-1">
              <div>Un Ingeniero de <strong className="text-white">Seven Security SAS</strong> te llamará al <span className="text-[#D4AF37] font-mono">{clientPhone}</span> para programar la inspección gratuita en sitio.</div>
            </div>

            <button
              onClick={() => {
                setQuoteSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer border border-white/10 font-sans"
            >
              Cerrar Cotizador
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Device, WarrantyTier } from '../types';
import { 
  X, 
  Download, 
  Check, 
  ShieldCheck, 
  ShoppingCart, 
  Cpu, 
  Zap, 
  Radio, 
  FileCheck2, 
  Printer, 
  Award,
  Layers
} from 'lucide-react';

interface TechnicalSheetModalProps {
  device: Device | null;
  onClose: () => void;
  onAddToCart: (device: Device, warranty: WarrantyTier, includeInstall: boolean) => void;
}

export const TechnicalSheetModal: React.FC<TechnicalSheetModalProps> = ({
  device,
  onClose,
  onAddToCart,
}) => {
  const [selectedWarranty, setSelectedWarranty] = useState<WarrantyTier>('pro');
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'accessories'>('specs');

  if (!device) return null;

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleDownloadPDF = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  const handleAddToCart = () => {
    onAddToCart(device, selectedWarranty, includeInstallation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#050505]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-xl border border-[#D4AF37]/30 text-[#D4AF37]">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest block">
                Ficha Técnica Oficial - Seven Security SAS
              </span>
              <h3 className="text-lg font-bold text-white leading-tight font-sans">
                {device.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Top Overview Bar */}
          <div className="grid md:grid-cols-12 gap-6 bg-[#050505] p-5 rounded-2xl border border-white/10">
            <div className="md:col-span-5 aspect-video bg-black rounded-xl overflow-hidden border border-white/10 relative">
              <img
                src={device.imageUrl}
                alt={device.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-black/90 text-[#D4AF37] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#D4AF37]/30">
                MODELO: {device.modelCode}
              </span>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-xs font-mono text-[#D4AF37] bg-black px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  {device.specsTable.protectionRating || 'IP67 Grado Industrial'}
                </span>
                <h4 className="text-xl font-bold text-white mt-1 font-sans">{device.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {device.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Precio Base Equipo:</span>
                  <span className="text-xl font-bold text-[#D4AF37] font-mono">
                    {formatCOP(device.price)}
                  </span>
                </div>

                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-white/10 transition-all cursor-pointer font-sans"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>{downloadSuccess ? 'PDF Generado ✓' : 'Descargar Ficha PDF'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 gap-4">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Especificaciones Técnicas
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'features'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Prestaciones Clave & IA
            </button>
            <button
              onClick={() => setActiveTab('accessories')}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'accessories'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Accesorios Compatibles
            </button>
          </div>

          {/* Tab Content: Specs Table */}
          {activeTab === 'specs' && (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-[#050505] text-slate-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="px-4 py-3 border-b border-white/10">Parámetro Técnico</th>
                    <th className="px-4 py-3 border-b border-white/10">Valor / Especificación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-black">
                  {Object.entries(device.specsTable).map(([key, val]) => (
                    <tr key={key} className="hover:bg-white/5">
                      <td className="px-4 py-3 font-semibold text-slate-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-100">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab Content: Features */}
          {activeTab === 'features' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 font-sans">
                <Cpu className="w-4 h-4 text-[#D4AF37]" />
                <span>Capacidades de Hardware & Inteligencia Artificial</span>
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {device.featuresList.map((feature, i) => (
                  <li key={i} className="bg-[#050505] p-3 rounded-xl border border-white/10 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab Content: Accessories */}
          {activeTab === 'accessories' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 font-sans">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                <span>Accesorios Recomendados para Instalación</span>
              </h4>
              {device.compatibleAccessories && device.compatibleAccessories.length > 0 ? (
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  {device.compatibleAccessories.map((acc, i) => (
                    <div key={i} className="bg-[#050505] p-3 rounded-xl border border-white/10 text-slate-300 font-mono flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Incluye todos los conectores y soportes de montaje estándar.</p>
              )}
            </div>
          )}

          {/* Warranty & Installation Options */}
          <div className="bg-[#050505] p-5 rounded-2xl border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-sans">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Configuración de Garantía & Servicio de Instalación</span>
            </h4>

            <div className="grid sm:grid-cols-3 gap-3">
              <label
                onClick={() => setSelectedWarranty('standard')}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedWarranty === 'standard'
                    ? 'border-[#D4AF37] bg-black text-white'
                    : 'border-white/10 bg-black/50 text-slate-400'
                }`}
              >
                <div className="font-bold font-sans">Garantía Estándar</div>
                <div className="text-[10px] text-slate-400 font-mono">12 Meses Incluidos</div>
              </label>

              <label
                onClick={() => setSelectedWarranty('pro')}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all relative ${
                  selectedWarranty === 'pro'
                    ? 'border-[#D4AF37] bg-black text-white'
                    : 'border-white/10 bg-black/50 text-slate-400'
                }`}
              >
                <div className="font-bold flex items-center gap-1 font-sans">
                  <span>Garantía Pro 24M</span>
                  <span className="text-[9px] bg-[#D4AF37] text-black px-1 rounded font-bold font-mono">RECOMENDADO</span>
                </div>
                <div className="text-[10px] text-[#D4AF37] font-mono">+12% / Reemplazo Exprés en 24h</div>
              </label>

              <label
                onClick={() => setSelectedWarranty('enterprise')}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedWarranty === 'enterprise'
                    ? 'border-[#D4AF37] bg-black text-white'
                    : 'border-white/10 bg-black/50 text-slate-400'
                }`}
              >
                <div className="font-bold font-sans">Enterprise SLA 36M</div>
                <div className="text-[10px] text-emerald-400 font-mono">+22% / Respuesta &lt; 4 horas</div>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="installCheck"
                checked={includeInstallation}
                onChange={(e) => setIncludeInstallation(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-black text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <label htmlFor="installCheck" className="text-xs text-slate-300 cursor-pointer">
                Incluir servicio de instalación profesional en sitio con técnicos certificados RETIE (+ $120.000 COP aprox por punto)
              </label>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#050505] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            * Disponibilidad inmediata para despacho nacional con Seven Security SAS.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer border border-white/10 font-sans"
            >
              Cerrar
            </button>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#8A6D3B] hover:opacity-90 text-black shadow-lg shadow-[#D4AF37]/10 transition-all cursor-pointer border border-[#D4AF37]/40 font-sans"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Añadir al Carrito</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

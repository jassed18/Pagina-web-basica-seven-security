import React, { useState } from 'react';
import { Device, CategoryType } from '../types';
import { DEVICES_DATA } from '../data/devices';
import { 
  Search, 
  Filter, 
  FileText, 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  Check, 
  Info,
  SlidersHorizontal,
  Plus
} from 'lucide-react';

interface CatalogSectionProps {
  onSelectDeviceForTechnicalSheet: (device: Device) => void;
  onAddToCart: (device: Device) => void;
  selectedCategoryFilter?: CategoryType;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onSelectDeviceForTechnicalSheet,
  onAddToCart,
  selectedCategoryFilter = 'all',
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(selectedCategoryFilter);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Todos los Dispositivos' },
    { id: 'cameras', label: 'Cámaras IP 4K & Térmicas' },
    { id: 'access', label: 'Control de Acceso Biométrico' },
    { id: 'alarms', label: 'Alarmas & Sensores' },
    { id: 'recorders', label: 'NVRs & Grabación AI' },
  ];

  const filteredDevices = DEVICES_DATA.filter((device) => {
    const matchesCategory = activeCategory === 'all' || device.category === activeCategory;
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.modelCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (device.specsTable.resolution && device.specsTable.resolution.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCartWithNotice = (device: Device) => {
    onAddToCart(device);
    setAddedItemNotice(device.name);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2500);
  };

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="catalogo" className="py-20 bg-white border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <span className="text-xs font-mono font-bold text-blue-700 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Catálogo de Dispositivos Homologados
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-3 font-sans">
              Equipos de Alta Seguridad con Ficha Técnica Detallada
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Consulte las especificaciones de óptica, resolución, grado de protección IP67/IK10 y compatibilidad PoE para cada dispositivo.
            </p>
          </div>

          {/* Added to cart toast notice */}
          {addedItemNotice && (
            <div className="bg-emerald-600 border border-emerald-500 text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 animate-bounce shadow-xl">
              <Check className="w-4 h-4 text-white" />
              <span>Añadido al Carrito: {addedItemNotice}</span>
            </div>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por modelo, 4K, IP67, AI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>

        </div>

        {/* Device Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div>
                {/* Image & Badge Overlay */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden border-b border-slate-200">
                  <img
                    src={device.imageUrl}
                    alt={device.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />

                  {/* Badge */}
                  {device.badge && (
                    <span className="absolute top-3 left-3 bg-blue-700 text-white font-extrabold text-[10px] font-mono px-2.5 py-1 rounded-md shadow-md">
                      {device.badge}
                    </span>
                  )}

                  <span className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                    COD: {device.modelCode}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  
                  {/* Rating */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{device.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({device.reviewsCount})</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {device.specsTable.protectionRating || 'IP67'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 font-sans">
                    {device.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {device.subtitle}
                  </p>

                  {/* Spec Snippet Table */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1 text-[11px] font-mono text-slate-700">
                    {device.specsTable.resolution && (
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">Res:</span>
                        <span className="text-slate-900 font-semibold truncate max-w-[150px]">{device.specsTable.resolution}</span>
                      </div>
                    )}
                    {device.specsTable.nightVisionRange && (
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold">Visión:</span>
                        <span className="text-slate-900 font-semibold">{device.specsTable.nightVisionRange}</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="pt-2 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono font-bold">Precio Equipo:</span>
                      <span className="text-lg font-black text-blue-700 font-mono">
                        {formatCOP(device.price)}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Actions */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectDeviceForTechnicalSheet(device)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
                  title="Ver Ficha Técnica Completa"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ficha Técnica</span>
                </button>

                <button
                  onClick={() => handleAddToCartWithNotice(device)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-md shadow-amber-400/20 transition-all cursor-pointer border border-amber-300"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No se encontraron dispositivos</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              Intenta buscar con otros términos como "4K", "Biométrico", "Alarma" o cambia de categoría.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

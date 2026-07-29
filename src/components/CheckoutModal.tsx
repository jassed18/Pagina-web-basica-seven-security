import React, { useState } from 'react';
import { CartItem, CheckoutCustomer, OrderConfirmation } from '../types';
import { 
  ShoppingCart, 
  X, 
  CreditCard, 
  Building, 
  QrCode, 
  ShieldCheck, 
  Check, 
  Lock, 
  FileCheck, 
  Download, 
  Printer, 
  Calendar, 
  UserCheck,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (deviceId: string, delta: number) => void;
  onRemoveItem: (deviceId: string) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'customer' | 'payment' | 'confirmation'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pse' | 'mercadopago'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Customer Form
  const [customer, setCustomer] = useState<CheckoutCustomer>({
    fullName: '',
    companyName: '',
    documentId: '',
    email: '',
    phone: '',
    city: 'Bogotá D.C.',
    address: '',
    installationNotes: '',
  });

  // Credit Card Form
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8812');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('***');

  // PSE Bank Form
  const [selectedBank, setSelectedBank] = useState('Bancolombia');

  // Order Result
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  // Total Calculations
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      let itemBase = item.device.price * item.quantity;
      if (item.selectedWarranty === 'pro') itemBase += itemBase * 0.12;
      if (item.selectedWarranty === 'enterprise') itemBase += itemBase * 0.22;
      if (item.includeInstallation) itemBase += 120000 * item.quantity;
      return acc + itemBase;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const totalAmount = Math.round(subtotal);

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          customer,
          paymentMethod:
            paymentMethod === 'card'
              ? 'Tarjeta de Crédito (Visa / Mastercard)'
              : paymentMethod === 'pse'
              ? `PSE (${selectedBank})`
              : 'Mercado Pago / QR',
          totalAmount,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrderConfirmation(data.order);
        setStep('confirmation');
        onClearCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#050505]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black rounded-xl border border-[#D4AF37]/30 text-[#D4AF37]">
              <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest block">
                Pasarela de Pago Segura SSL 256-Bit - Seven Security
              </span>
              <h3 className="text-lg font-bold text-white font-sans">
                {step === 'cart' && 'Carrito de Compras & Equipos'}
                {step === 'customer' && 'Datos de Facturación & Instalación'}
                {step === 'payment' && 'Selección de Pasarela de Pago'}
                {step === 'confirmation' && '¡Transacción Aprobada Exitosamente!'}
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

        {/* Modal Body depending on Step */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Step 1: Cart Items */}
          {step === 'cart' && (
            <div className="space-y-4">
              {cartItems.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.device.id}
                        className="bg-[#050505] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <img
                            src={item.device.imageUrl}
                            alt={item.device.name}
                            className="w-16 h-12 object-cover rounded-lg border border-white/10"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-white line-clamp-1 font-sans">{item.device.name}</h4>
                            <div className="text-[10px] text-slate-400 font-mono">
                              Póliza: <strong className="text-[#D4AF37] uppercase">{item.selectedWarranty}</strong>
                              {item.includeInstallation && ' | + Instalación RETIE'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                          <div className="flex items-center bg-black border border-white/10 rounded-lg">
                            <button
                              onClick={() => onUpdateQuantity(item.device.id, -1)}
                              className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold font-mono text-white">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.device.id, 1)}
                              className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-bold text-[#D4AF37] font-mono">
                              {formatCOP(item.device.price * item.quantity)}
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.device.id)}
                            className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#050505] p-4 rounded-xl border border-white/10 flex justify-between items-center">
                    <span className="text-xs text-slate-300 uppercase font-mono">Total Equipos + Póliza + Instalación:</span>
                    <span className="text-2xl font-black text-[#D4AF37] font-mono">{formatCOP(totalAmount)}</span>
                  </div>

                  <button
                    onClick={() => setStep('customer')}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8A6D3B] hover:opacity-90 text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/10 transition-all cursor-pointer border border-[#D4AF37]/40 font-sans"
                  >
                    Continuar a Datos de Facturación & Instalación
                  </button>
                </>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
                  <div className="text-base font-bold text-slate-200">El carrito está vacío</div>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Selecciona dispositivos de nuestro catálogo técnico para iniciar el proceso de compra directa.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Customer Data */}
          {step === 'customer' && (
            <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-[#D4AF37] tracking-wider font-mono">
                Datos de Contacto & Dirección de Instalación
              </h4>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1 font-mono">Nombre Completo / Titular:</label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="Ej: Carlos Eduardo Mendoza"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1 font-mono">Cédula o NIT:</label>
                  <input
                    type="text"
                    required
                    value={customer.documentId}
                    onChange={(e) => setCustomer({ ...customer, documentId: e.target.value })}
                    placeholder="Ej: 901.482.391-4"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1 font-mono">Correo Electrónico:</label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="ejemplo@empresa.com"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1 font-mono">Teléfono Móvil:</label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="300 700 7777"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1 font-mono">Ciudad:</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="Bogotá D.C."
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1 font-mono">Dirección Exacta:</label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Ej: Calle 100 # 19A - 42 Oficina 801"
                    className="w-full bg-[#050505] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-1/3 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs cursor-pointer border border-white/10"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8A6D3B] hover:opacity-90 text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/10 cursor-pointer border border-[#D4AF37]/40 font-sans"
                >
                  Proceder a Selección de Pago
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Payment Gateway Selection */}
          {step === 'payment' && (
            <form onSubmit={handleProcessPayment} className="space-y-5">
              <h4 className="text-xs font-bold uppercase text-[#D4AF37] tracking-wider font-mono">
                Seleccione el Método de Pago Seguro
              </h4>

              {/* Gateway Tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#D4AF37] bg-[#050505] text-white shadow-md'
                      : 'border-white/10 bg-black text-slate-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                  <span>Tarjeta Crédito/Débito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pse')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'pse'
                      ? 'border-[#D4AF37] bg-[#050505] text-white shadow-md'
                      : 'border-white/10 bg-black text-slate-400'
                  }`}
                >
                  <Building className="w-5 h-5 text-emerald-400" />
                  <span>PSE Bancos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('mercadopago')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'mercadopago'
                      ? 'border-[#D4AF37] bg-[#050505] text-white shadow-md'
                      : 'border-white/10 bg-black text-slate-400'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#D4AF37]" />
                  <span>Mercado Pago / QR</span>
                </button>
              </div>

              {/* Card Payment Form Details */}
              {paymentMethod === 'card' && (
                <div className="bg-[#050505] p-4 rounded-xl border border-white/10 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span>Procesador Cifrado Visa / MasterCard</span>
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 font-mono">Número de Tarjeta:</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 font-mono">Vencimiento (MM/AA):</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1 font-mono">CVC / CVV:</label>
                      <input
                        type="password"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PSE Form Details */}
              {paymentMethod === 'pse' && (
                <div className="bg-[#050505] p-4 rounded-xl border border-white/10 space-y-3">
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1 font-mono">Seleccione su Entidad Bancaria:</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Bancolombia">Bancolombia Persona / Pyme</option>
                    <option value="Banco de Bogotá">Banco de Bogotá</option>
                    <option value="Davivienda">Davivienda / Daviplata</option>
                    <option value="Nequi">Nequi</option>
                    <option value="BBVA Colombia">BBVA Colombia</option>
                  </select>
                </div>
              )}

              {/* Mercado Pago QR */}
              {paymentMethod === 'mercadopago' && (
                <div className="bg-[#050505] p-4 rounded-xl border border-white/10 text-center space-y-2">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl mx-auto flex items-center justify-center border border-slate-700">
                    <QrCode className="w-20 h-20 text-black" />
                  </div>
                  <div className="text-xs text-slate-300 font-mono">Escanea con App Mercado Pago o Nequi al confirmar</div>
                </div>
              )}

              {/* Summary total banner */}
              <div className="bg-[#050505] p-3.5 rounded-xl border border-white/10 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">Monto Final a Procesar:</span>
                <span className="text-xl font-bold text-[#D4AF37] font-mono">{formatCOP(totalAmount)}</span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('customer')}
                  className="w-1/3 py-3 rounded-xl bg-white/10 text-slate-300 font-bold text-xs cursor-pointer border border-white/10"
                >
                  Atrás
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8A6D3B] hover:opacity-90 text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/10 transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#D4AF37]/40 font-sans"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Procesando Pago Seguro...' : `Pagar ${formatCOP(totalAmount)}`}</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Order Receipt & Confirmation */}
          {step === 'confirmation' && orderConfirmation && (
            <div className="space-y-6">
              
              <div className="bg-[#050505] border border-[#D4AF37]/50 p-6 rounded-2xl text-center space-y-3">
                <div className="w-14 h-14 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto border border-[#D4AF37]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-sans">¡Pago Aprobado y Asignado!</h3>
                <div className="text-xs font-mono text-[#D4AF37]">
                  ORDEN: {orderConfirmation.orderId} | COD AUT: {orderConfirmation.authCode}
                </div>
              </div>

              {/* Invoice Specs */}
              <div className="bg-[#050505] p-5 rounded-2xl border border-white/10 space-y-3 text-xs text-slate-300">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400 font-mono">Titular de Factura:</span>
                  <span className="font-bold text-white">{orderConfirmation.customer.fullName} ({orderConfirmation.customer.documentId})</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400 font-mono">Dirección de Instalación:</span>
                  <span className="font-bold text-white">{orderConfirmation.customer.address}, {orderConfirmation.customer.city}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400 font-mono">Fecha Estimada Instalación:</span>
                  <span className="font-bold text-emerald-400">{orderConfirmation.estimatedInstallationDate}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400 font-mono">Cuadrilla Asignada:</span>
                  <span className="font-bold text-blue-400">{orderConfirmation.assignedTechnicianTeam}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400 font-mono">Garantía Aplicada:</span>
                  <span className="font-bold text-[#D4AF37]">{orderConfirmation.warrantyApplied}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-slate-200 hover:text-white cursor-pointer border border-white/10"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Comprobante Legal</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#8A6D3B] text-black font-bold text-xs cursor-pointer border border-[#D4AF37]/40 font-sans"
                >
                  Finalizar & Cerrar
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  CheckCheck, 
  ShieldCheck, 
  Phone, 
  Clock, 
  Paperclip, 
  Smile, 
  User, 
  CheckCircle2, 
  Sparkles,
  Bot,
  RefreshCw
} from 'lucide-react';
import logoImg from '../assets/images/seven_security_logo_1785368779834.jpg';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickOptions?: string[];
}

interface WhatsAppChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  openQuoteModal?: () => void;
}

export const WhatsAppChatModal: React.FC<WhatsAppChatModalProps> = ({
  isOpen,
  onClose,
  openQuoteModal,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: '¡Hola! 👋 Bienvenido a Seven Security S.A.S. Soy el Asesor de Servicio en Línea. ¿En qué proyecto o requerimiento de seguridad te podemos colaborar hoy?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickOptions: [
        '📹 Cotizar Cámaras 4K / CCTV',
        '🛡️ Solicitar Inspección Técnica Gratis',
        '🔧 Soporte Técnico o Garantías',
        '🏢 Proyecto Residencial / Empresarial'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [selectedDept, setSelectedDept] = useState('Ventas & Cotizaciones');
  const [isTyping, setIsTyping] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulate Agent Auto-Response
    setTimeout(() => {
      setIsTyping(false);

      let botReply = 'Gracias por escribirnos. ';
      let quickOpts: string[] | undefined;

      const lower = text.toLowerCase();
      if (lower.includes('cámara') || lower.includes('cctv') || lower.includes('cotizar')) {
        botReply = '¡Excelente! Contamos con kits 4K con IA de reconocimiento facial y visión nocturna a color. ¿Te gustaría recibir una cotización formal ajustada a tu número de puntos/cámaras?';
        quickOpts = ['Sí, cotizar ahora', 'Ver catálogo técnico', 'Hablar con un ingeniero'];
      } else if (lower.includes('inspección') || lower.includes('visita') || lower.includes('gratis')) {
        botReply = 'Perfecto. Coordinamos inspecciones técnicas presenciales sin costo en Bogotá y sabana centro para certificar cobertura RETIE e infraestructura.';
        quickOpts = ['Agendar visita técnica', 'Consultar cobertura'];
      } else if (lower.includes('soporte') || lower.includes('garantía') || lower.includes('mantenimiento')) {
        botReply = 'Nuestro centro de operaciones atiende emergencias técnicas 24/7. Por favor déjanos tu nombre y teléfono para que el Ingeniero de Turno revise tu caso de inmediato.';
      } else if (lower.includes('sí') || lower.includes('cotizar ahora')) {
        botReply = 'Por favor ingresa tu Nombre y Teléfono abajo para enviarte la propuesta PDF con descuentos del mes de forma instantánea.';
      } else {
        botReply = `Entendido. Un especialista del departamento de ${selectedDept} de Seven Security responderá tus inquietudes de inmediato. Si deseas una atención prioritaria, ingresa tu número telefónico a continuación.`;
        quickOpts = ['Solicitar llamada en 5 min', 'Enviar requerimiento formal'];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickOptions: quickOpts,
        }
      ]);
    }, 1100);
  };

  const handleQuickOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) return;

    setLeadSent(true);

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'user',
        text: `📍 Datos de Contacto Registrados:\nNombre: ${userName}\nTeléfono: ${userPhone}\nDepto: ${selectedDept}`,
        time: currentTime,
      },
      {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `✅ ¡Solicitud asignada exitosamente! Ticket de atención: #7SEC-${Math.floor(1000 + Math.random() * 9000)}.\n\nEstimado/a ${userName}, el Ing. Carlos Mendoza de Seven Security S.A.S. te contactará al número ${userPhone} en menos de 5 minutos.`,
        time: currentTime,
      }
    ]);
  };

  const handleOpenExternalWhatsApp = () => {
    const defaultText = `Hola Seven Security S.A.S., mi nombre es ${userName || 'Cliente'} (${userPhone || 'sin teléfono'}). Deseo información sobre servicios de seguridad.`;
    const url = `https://wa.me/573007007777?text=${encodeURIComponent(defaultText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-8 p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-all">
      <div className="w-full sm:w-[420px] h-[92vh] sm:h-[620px] bg-[#E5DDD5] dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300 dark:border-slate-800 animate-in slide-in-from-bottom-5 duration-300">
        
        {/* WhatsApp Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <img 
                src={logoImg} 
                alt="Seven Security SAS" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white/80 bg-white" 
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#075E54]" />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm tracking-wide leading-none">Seven Security S.A.S.</h3>
                <ShieldCheck className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              </div>
              <p className="text-[11px] text-emerald-100/90 font-mono mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                En línea 24/7 • Respuestas inmediatas
              </p>
            </div>
          </div>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
            title="Cerrar chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Department Selector Ribbon */}
        <div className="bg-[#128C7E] px-3 py-1.5 flex items-center justify-between text-[11px] text-white/90 font-sans border-b border-white/10">
          <span className="font-semibold text-emerald-100 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-300" />
            Atención Directa:
          </span>
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-black/20 text-white text-[11px] font-bold py-0.5 px-2 rounded border border-white/20 focus:outline-none cursor-pointer"
          >
            <option value="Ventas & Cotizaciones" className="bg-slate-800 text-white">Ventas & Cotizaciones</option>
            <option value="Soporte Técnico 24/7" className="bg-slate-800 text-white">Soporte Técnico 24/7</option>
            <option value="Inspecciones RETIE" className="bg-slate-800 text-white">Inspecciones RETIE</option>
          </select>
        </div>

        {/* Chat Messages Container with Authentic WhatsApp Pattern Background */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs bg-repeat"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        >
          {/* Security Notice Pill */}
          <div className="flex justify-center my-1">
            <span className="bg-[#FFF8C5] dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-[10px] px-3 py-1 rounded-lg text-center shadow-xs border border-amber-200/50 max-w-[90%] leading-tight">
              🔒 Canal Oficial Encriptado de Seven Security S.A.S. Tus datos están protegidos bajo Ley 1581.
            </span>
          </div>

          {/* Messages */}
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm relative text-slate-800 ${
                  msg.sender === 'user' 
                    ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed text-xs">
                  {msg.text}
                </p>
                
                <div className={`flex items-center gap-1 justify-end text-[9px] text-slate-400 mt-1 font-mono`}>
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && (
                    <CheckCheck className="w-3 h-3 text-blue-500" />
                  )}
                </div>
              </div>

              {/* Quick Options Chips */}
              {msg.quickOptions && msg.quickOptions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                  {msg.quickOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickOptionClick(opt)}
                      className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-800 font-semibold px-3 py-1.5 rounded-full border border-emerald-300 shadow-xs hover:border-emerald-500 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl rounded-tl-none w-24 border border-slate-200 shadow-xs">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Interactive Quick Lead Capture Form (Inline inside popup) */}
        {!leadSent && (
          <form onSubmit={handleSubmitContactForm} className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 p-2.5 space-y-2">
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>⚡ ¿Deseas llamada instantánea?</span>
              <span className="text-emerald-600 font-mono">Sin costo</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="text"
                placeholder="Tu Nombre..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input 
                type="tel"
                placeholder="Teléfono WhatsApp..."
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={!userName.trim() || !userPhone.trim()}
              className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Solicitar Atención Inmediata en Vivo</span>
            </button>
          </form>
        )}

        {/* Chat Input Footer Bar */}
        <div className="bg-[#F0F2F5] dark:bg-slate-950 p-2.5 flex items-center gap-2 border-t border-slate-200 dark:border-slate-800">
          <input
            type="text"
            placeholder="Escribe tu mensaje aquí..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs px-3.5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="p-2.5 bg-[#00A884] hover:bg-[#008f70] disabled:opacity-40 text-white rounded-full transition-all cursor-pointer shadow-sm flex-shrink-0"
            title="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>

          {/* Optional External WhatsApp Button */}
          <button
            onClick={handleOpenExternalWhatsApp}
            className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full transition-colors cursor-pointer text-[10px] font-bold flex-shrink-0"
            title="Abrir en App de WhatsApp Externa"
          >
            App
          </button>
        </div>

      </div>
    </div>
  );
};

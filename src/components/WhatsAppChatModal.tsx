import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  CheckCheck, 
  ShieldCheck, 
  Phone, 
  Clock, 
  User, 
  CheckCircle2, 
  Sparkles,
  Bot,
  UserCheck,
  Headphones,
  Settings,
  Volume2,
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import logoImg from '../assets/images/seven_security_logo_1785368779834.jpg';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'bot';
  senderName?: string;
  text: string;
  time: string;
  quickOptions?: string[];
}

interface WhatsAppChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  openQuoteModal?: () => void;
}

const STORAGE_KEY = 'seven_security_live_chat_messages_v1';
const CHANNEL_NAME = 'seven_security_chat_channel';

export const WhatsAppChatModal: React.FC<WhatsAppChatModalProps> = ({
  isOpen,
  onClose,
  openQuoteModal,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: '1',
        sender: 'agent',
        senderName: 'Asesor Seven Security (+57 350 657 7957)',
        text: '¡Hola! 👋 Bienvenido al Chat Oficial de Seven Security S.A.S. Te atiende la línea directa (+57) 350 657 7957. ¿En qué proyecto o requerimiento de seguridad te podemos colaborar hoy?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickOptions: [
          '📹 Cotizar Cámaras 4K / CCTV',
          '🛡️ Solicitar Inspección Técnica Gratis',
          '🔧 Soporte Técnico o Garantías',
          '🏢 Proyecto Residencial / Empresarial'
        ]
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [selectedDept, setSelectedDept] = useState('Ventas & Cotizaciones');
  const [isTyping, setIsTyping] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [isOperatorMode, setIsOperatorMode] = useState(false);
  const [agentName, setAgentName] = useState('Ing. Carlos Mendoza');
  const [autoBotEnabled, setAutoBotEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Broadcast Channel & LocalStorage Sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error(err);
    }
  }, [messages]);

  useEffect(() => {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = bc;

      bc.onmessage = (event) => {
        if (event.data && Array.isArray(event.data.messages)) {
          setMessages(event.data.messages);
        }
      };

      return () => {
        bc.close();
      };
    }
  }, []);

  const broadcastUpdate = (newMessages: ChatMessage[]) => {
    setMessages(newMessages);
    if (channelRef.current) {
      channelRef.current.postMessage({ messages: newMessages });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping, isOperatorMode]);

  if (!isOpen) return null;

  // Send message as CUSTOMER / USER
  const handleUserSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: userName ? userName : 'Cliente en Línea',
      text,
      time: currentTime,
    };

    const updated = [...messages, userMsg];
    broadcastUpdate(updated);
    if (!textToSend) setInputMessage('');

    // If Operator is active or autoBot disabled, notify operator
    if (!autoBotEnabled) return;

    // Simulated Auto-Bot assist when operator isn't actively typing
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let botReply = 'Gracias por escribirnos. Tu mensaje ha sido notificado al equipo de atención corporativa (+57 350 657 7957). ';
      let quickOpts: string[] | undefined;

      const lower = text.toLowerCase();
      if (lower.includes('cámara') || lower.includes('cctv') || lower.includes('cotizar')) {
        botReply = '¡Excelente! Contamos con kits 4K Hikvision & Dahua con Inteligencia Artificial y Visión Nocturna Color. ¿Cuántos puntos o cámaras necesitas instalar?';
        quickOpts = ['2 a 4 Cámaras', '8 Cámaras', '16+ Cámaras Empresarial', 'Solicitar Visita Técnica'];
      } else if (lower.includes('inspección') || lower.includes('visita') || lower.includes('gratis') || lower.includes('retie')) {
        botReply = 'Perfecto. Realizamos inspecciones técnicas presenciales sin costo en Bogotá y Sabana de Bogotá para certificar normatividad RETIE y cobertura.';
        quickOpts = ['Agendar Visita Mañana', 'Consultar Zonas de Cobertura'];
      } else if (lower.includes('soporte') || lower.includes('garantía') || lower.includes('mantenimiento')) {
        botReply = 'Nuestro departamento de soporte técnico atiende emergencias 24/7. Por favor ingresa tu número abajo para que el Ingeniero de Turno valide tu sistema.';
      } else {
        botReply = `Un especialista del área de ${selectedDept} de Seven Security (+57 350 657 7957) revisará tu requerimiento en este chat. Si deseas atención telefónica inmediata, registra tus datos abajo.`;
        quickOpts = ['Llamarme en 5 Minutos', 'Hablar con Asesor Comercial'];
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        senderName: 'Asesor Seven Security (+57 350 657 7957)',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickOptions: quickOpts,
      };

      setMessages((prev) => {
        const next = [...prev, botMsg];
        if (channelRef.current) channelRef.current.postMessage({ messages: next });
        return next;
      });
    }, 1000);
  };

  // Send message as OPERATOR / AGENT (+57 350 657 7957)
  const handleAgentSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const agentMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'agent',
      senderName: `${agentName} • Línea Corporativa (+57 350 657 7957)`,
      text,
      time: currentTime,
    };

    const updated = [...messages, agentMsg];
    broadcastUpdate(updated);
    if (!textToSend) setInputMessage('');
  };

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) return;

    setLeadSent(true);

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: userName,
      text: `📋 Registro de Contacto en Vivo:\n• Nombre: ${userName}\n• Teléfono: ${userPhone}\n• Área solicitada: ${selectedDept}`,
      time: currentTime,
    };

    const confirmMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'agent',
      senderName: 'Asesor Seven Security (+57 350 657 7957)',
      text: `✅ ¡Datos confirmados! Estimado/a ${userName}, tus datos quedaron vinculados a la línea oficial +57 350 657 7957. Un especialista te estará respondiendo en este mismo chat o vía llamada telefónica en breve.`,
      time: currentTime,
    };

    const updated = [...messages, userMsg, confirmMsg];
    broadcastUpdate(updated);
  };

  const handleClearChat = () => {
    const defaultMsg: ChatMessage[] = [
      {
        id: Date.now().toString(),
        sender: 'agent',
        senderName: 'Asesor Seven Security (+57 350 657 7957)',
        text: 'Reiniciaste la conversación. ¿En qué te podemos asesorar en esta ocasión?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ];
    broadcastUpdate(defaultMsg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-8 p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-all">
      <div className="w-full sm:w-[440px] h-[92vh] sm:h-[640px] bg-[#E5DDD5] dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300 dark:border-slate-800 animate-in slide-in-from-bottom-5 duration-300">
        
        {/* WhatsApp Header Bar */}
        <div className={`${isOperatorMode ? 'bg-slate-900 border-b-2 border-amber-500' : 'bg-[#075E54]'} text-white px-4 py-3 flex items-center justify-between shadow-md flex-shrink-0 transition-colors`}>
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

            {/* Title & Info */}
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm tracking-wide leading-none">
                  {isOperatorMode ? 'Panel Agente WhatsApp' : 'Seven Security S.A.S.'}
                </h3>
                <ShieldCheck className="w-4 h-4 text-amber-300 flex-shrink-0" />
              </div>
              <p className="text-[11px] text-emerald-100/90 font-mono mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                <span>Línea Oficial: (+57) 350 657 7957</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Operator Switch Toggle */}
            <button
              onClick={() => setIsOperatorMode(!isOperatorMode)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                isOperatorMode 
                  ? 'bg-amber-400 text-slate-950 font-black ring-2 ring-amber-300' 
                  : 'bg-white/15 text-emerald-100 hover:bg-white/25'
              }`}
              title="Cambiar entre Vista de Cliente y Consola de Agente/Operador"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>{isOperatorMode ? 'Modo Agente ON' : 'Consola Operador'}</span>
            </button>

            {/* Close button */}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
              title="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-Header Toolbar */}
        <div className={`${isOperatorMode ? 'bg-slate-800 text-amber-200' : 'bg-[#128C7E] text-white/90'} px-3 py-1.5 flex items-center justify-between text-[11px] font-sans border-b border-white/10 transition-colors`}>
          {isOperatorMode ? (
            <div className="flex items-center justify-between w-full">
              <span className="font-bold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                Agente:
                <input 
                  type="text" 
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="bg-black/40 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 font-semibold focus:outline-none w-32 text-[10px]"
                />
              </span>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleClearChat} 
                  className="text-[10px] underline hover:text-white cursor-pointer"
                >
                  Vaciar Chat
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="font-semibold text-emerald-100 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-300" />
                Atención Directa en Línea:
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
            </>
          )}
        </div>

        {/* Chat Messages Container */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs bg-repeat"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        >
          {/* Security & System Notice */}
          <div className="flex justify-center my-1">
            <span className="bg-[#FFF8C5] dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-[10px] px-3 py-1 rounded-lg text-center shadow-xs border border-amber-200/50 max-w-[95%] leading-tight font-medium flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300 flex-shrink-0" />
              <span>
                Chat en vivo con sincronización instantánea • Línea <strong>+57 350 657 7957</strong>
              </span>
            </span>
          </div>

          {/* Messages */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Tag */}
                {msg.senderName && (
                  <span className="text-[10px] font-bold text-slate-500 mb-0.5 px-1 font-mono">
                    {msg.senderName}
                  </span>
                )}

                <div 
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm relative text-slate-800 ${
                    isUser 
                      ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed text-xs">
                    {msg.text}
                  </p>
                  
                  <div className={`flex items-center gap-1 justify-end text-[9px] text-slate-400 mt-1 font-mono`}>
                    <span>{msg.time}</span>
                    {isUser && (
                      <CheckCheck className="w-3 h-3 text-blue-500" />
                    )}
                  </div>
                </div>

                {/* Quick Options Chips */}
                {!isOperatorMode && msg.quickOptions && msg.quickOptions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.quickOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleUserSendMessage(opt)}
                        className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-800 font-semibold px-3 py-1.5 rounded-full border border-emerald-300 shadow-xs hover:border-emerald-500 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                      >
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

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

        {/* Lead Phone Capture Form for Customers */}
        {!isOperatorMode && !leadSent && (
          <form onSubmit={handleSubmitContactForm} className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 p-2.5 space-y-2">
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>⚡ ¿Deseas ser contactado por llamada?</span>
              <span className="text-emerald-600 font-mono">Sin Costo</span>
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
                placeholder="Teléfono / Celular..."
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
              <span>Vincular mis datos a la Línea 350 657 7957</span>
            </button>
          </form>
        )}

        {/* Operator Quick Responses Palette */}
        {isOperatorMode && (
          <div className="bg-slate-800 border-t border-slate-700 p-2 text-slate-200">
            <p className="text-[10px] font-bold uppercase text-amber-400 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Plantillas de Respuesta Rápida:
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button 
                onClick={() => handleAgentSendMessage('¡Hola! Claro que sí, con gusto te enviamos la cotización de cámaras 4K. ¿A qué correo o número te la adjuntamos?')}
                className="text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-white whitespace-nowrap border border-slate-600 cursor-pointer"
              >
                📹 Cotización Cámaras
              </button>
              <button 
                onClick={() => handleAgentSendMessage('Hola, confirmamos que podemos realizar la visita técnica de inspección RETIE mañana mismo sin costo.')}
                className="text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-white whitespace-nowrap border border-slate-600 cursor-pointer"
              >
                📅 Visita Técnica RETIE
              </button>
              <button 
                onClick={() => handleAgentSendMessage('Un técnico especializado de turno ha recibido tu caso y se comunicará en breve.')}
                className="text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-white whitespace-nowrap border border-slate-600 cursor-pointer"
              >
                🔧 Soporte Inmediato
              </button>
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="bg-[#F0F2F5] dark:bg-slate-950 p-2.5 flex items-center gap-2 border-t border-slate-200 dark:border-slate-800">
          <input
            type="text"
            placeholder={
              isOperatorMode 
                ? `Responder como ${agentName} (+57 350 657 7957)...` 
                : "Escribe tu mensaje en vivo aquí..."
            }
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (isOperatorMode) {
                  handleAgentSendMessage();
                } else {
                  handleUserSendMessage();
                }
              }
            }}
            className="flex-1 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs px-3.5 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
          />

          <button
            onClick={() => isOperatorMode ? handleAgentSendMessage() : handleUserSendMessage()}
            disabled={!inputMessage.trim()}
            className={`px-3.5 py-2.5 disabled:opacity-40 text-white rounded-full transition-all cursor-pointer shadow-sm flex-shrink-0 flex items-center gap-1 font-bold text-xs ${
              isOperatorMode ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-[#00A884] hover:bg-[#008f70]'
            }`}
            title="Enviar mensaje en línea"
          >
            <span>{isOperatorMode ? 'Responder' : 'Enviar'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};


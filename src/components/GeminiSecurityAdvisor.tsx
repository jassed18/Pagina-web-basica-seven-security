import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Zap,
  ArrowRight
} from 'lucide-react';

interface GeminiSecurityAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  openQuoteModal: () => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export const GeminiSecurityAdvisor: React.FC<GeminiSecurityAdvisorProps> = ({
  isOpen,
  onClose,
  openQuoteModal,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: '¡Hola! Soy **SevenBot**, el Ingeniero Consultor en Seguridad Electrónica de **Seven Security SAS**. ¿Qué tipo de propiedad deseas proteger o qué inquietud técnica tienes sobre nuestras cámaras 4K, control de acceso biométrico o alarmas?',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Tengo un local comercial de 150m2, ¿qué kit 4K me recomiendan?',
    '¿Cómo funciona el control de acceso biométrico facial para un edificio?',
    'Necesito cámaras para una finca rural sin energía ni internet cableado.',
    '¿Qué diferencia hay entre la Garantía Pro de 24 meses y la Enterprise?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: 'Nuestro sistema de ingeniería recomienda programar una visita técnica en sitio gratuita para evaluar los ángulos de visión y distancias de cableado.',
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Lo sentimos, hubo un pequeño inconveniente de red. Puedes comunicarte directamente a nuestra línea nacional (601) 700 7777.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-500/30 text-blue-400">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">SevenBot - Asesor Técnico de Seguridad IA</h3>
                <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded font-mono">
                  GEMINI 3.6
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Resuelve dudas de equipamiento 4K, biometría y garantías en tiempo real
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Questions Chips */}
        <div className="p-3 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-[11px] text-slate-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Feed */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 bg-slate-900/50">
          {messages.map((msg, index) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={index}
                className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed space-y-2 ${
                    isBot
                      ? 'bg-slate-950 border border-slate-800 text-slate-200'
                      : 'bg-blue-600 text-white font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-blue-400 font-mono p-2">
              <Zap className="w-4 h-4 animate-spin" />
              <span>SevenBot está analizando las especificaciones técnicas...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer Input */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu consulta sobre cámaras, molinetes o alarmas..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <span>Respaldo oficial Seven Security SAS</span>
            <button
              onClick={() => {
                onClose();
                openQuoteModal();
              }}
              className="text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ir al Cotizador Directo</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

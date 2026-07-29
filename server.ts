import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI on server-side
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Mock Ticket DB in memory
const ticketsDb: Record<string, any> = {
  "TK-7842": {
    id: "TK-7842",
    clientName: "Edificio Centro Empresarial Alpha",
    serviceType: "Mantenimiento Preventivo CCTVs",
    deviceModel: "SevenCam Dome 4K Ultra AI",
    status: "En Proceso",
    assignedTechnician: "Ing. Carlos Mendoza (Soporte Nivel 2)",
    priority: "Alta",
    createdAt: "2026-07-28T09:30:00Z",
    estimatedResolution: "2026-07-30T14:00:00Z",
    description: "Revisión programada de 16 cámaras IP en zonas comunes y recalibración de visión nocturna.",
    updates: [
      { date: "2026-07-28 09:30", note: "Ticket creado automáticamente por contrato Pro." },
      { date: "2026-07-28 11:15", note: "Técnico asignado. Repuestos de conectores verificados." },
      { date: "2026-07-29 08:00", note: "Técnico en sitio realizando diagnóstico de cableado UTP Cat6." },
    ],
  },
  "TK-8109": {
    id: "TK-8109",
    clientName: "Logística e Industria del Norte",
    serviceType: "Garantía Extendida - Molinete Biométrico",
    deviceModel: "SevenAccess Turnstile SpeedGate",
    status: "Resuelto",
    assignedTechnician: "Ing. Andrea Ruiz",
    priority: "Urgente",
    createdAt: "2026-07-25T14:20:00Z",
    estimatedResolution: "2026-07-26T10:00:00Z",
    description: "Sustitución de electroimán de bloqueo por desgaste normal bajo Garantía Enterprise.",
    updates: [
      { date: "2026-07-25 14:20", note: "Llamada de soporte urgente recibida." },
      { date: "2026-07-25 16:00", note: "Pieza de reemplazo despachada de bodega central." },
      { date: "2026-07-26 09:45", note: "Reemplazo completado y pruebas de lectura RFID exitosas." },
    ],
  },
};

// API Routes

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", company: "Seven Security SAS" });
});

// AI Assistant / Security Advisor endpoint
app.post("/api/gemini/advisor", async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensaje requerido" });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not set
      return res.json({
        reply: `Basado en tus requerimientos para **${context?.propertyType || "tu propiedad"}**, en Seven Security SAS te sugerimos un sistema integral compuesto por:
        
1. **Cámaras IP 4K Starlight (SevenCam Dome 4K)** para perímetro y accesos clave con inteligencia artificial de detección humana.
2. **Control de Acceso Biométrico 3D (FacePass Pro)** para entradas principales con registro de auditoría.
3. **Alarma Anti-intrusión Inalámbrica (SevenHub Central)** con sensores PIRCAM y verificación en tiempo real desde la App Móvil.

¿Te gustaría que un ingeniero técnico agende una **visita en sitio sin costo** para tomar medidas exactas?`,
        suggestedKits: ["Kit Empresa Segura 4K", "Control de Acceso Biométrico Enterprise"],
      });
    }

    const systemInstruction = `Eres "SevenBot", el Ingeniero Consultor Senior de Seguridad Electrónica de la empresa Seven Security SAS (Soluciones en Seguridad).
Tu misión es asesorar a clientes empresariales, industriales y residenciales con profesionalismo, lenguaje técnico claro y persuasivo.
Debes recomendar dispositivos de nuestro catálogo oficial:
- Cámaras: SevenCam Dome 4K Ultra AI, SevenCam Bullet Dual-Lens Thermal, SevenCam PTZ Solar 360°, SevenCam FishEye 12MP.
- Control de Acceso: SevenBiometric FacePass Pro 3D, SevenAccess Turnstile SpeedGate, SevenLock Smart Magnetic.
- Alarmas: SevenHub Central Anti-Intrusión, SevenMotion PIRCAM, SevenPerimeter Microwave 200m.
- Grabadores: SevenNVR Pro 32 Ch 4K.
Informa también sobre los planes de Garantía Extendida Pro (24 meses) y Enterprise (36-60 meses con soporte SLA en menos de 4h).
Responde siempre en español con tono elegante, experto y orientado a brindar tranquilidad y protección de primer nivel.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({
      reply: response.text || "Gracias por contactar a Seven Security SAS. ¿En qué tipo de propiedad deseas instalar tu sistema?",
    });
  } catch (error: any) {
    console.error("Error in /api/gemini/advisor:", error);
    return res.status(500).json({
      error: "Error procesando consulta de IA",
      reply: "Nuestro equipo técnico recomienda realizar una visita de diagnóstico gratuita para evaluar el metraje y puntos ciegos de tu propiedad. Puedes agendarla directamente en la sección de Contacto.",
    });
  }
});

// Ticket status & creation endpoints
app.get("/api/tickets/:id", (req, res) => {
  const ticket = ticketsDb[req.params.id.toUpperCase()];
  if (!ticket) {
    return res.status(404).json({ message: "Ticket no encontrado" });
  }
  return res.json(ticket);
});

app.post("/api/tickets", (req, res) => {
  const { clientName, serviceType, deviceModel, description, email, phone } = req.body;
  const newId = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const newTicket = {
    id: newId,
    clientName: clientName || "Cliente Seven",
    serviceType: serviceType || "Soporte Técnico General",
    deviceModel: deviceModel || "No especificado",
    status: "Abierto",
    assignedTechnician: "Asignando Ingeniero de Guardia...",
    priority: "Normal",
    createdAt: new Date().toISOString(),
    estimatedResolution: new Date(Date.now() + 86400000 * 2).toISOString(),
    description: description || "Solicitud de asistencia técnica recibida.",
    email,
    phone,
    updates: [
      { date: new Date().toISOString().replace("T", " ").substring(0, 16), note: "Ticket de soporte recibido y registrado en sistema Seven Security." },
    ],
  };

  ticketsDb[newId] = newTicket;
  return res.status(201).json({ success: true, ticket: newTicket });
});

// Payment & Order Checkout endpoint
app.post("/api/checkout", (req, res) => {
  const { cartItems, customer, paymentMethod, totalAmount } = req.body;
  
  const orderId = `SEVEN-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const authCode = `AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const responseOrder = {
    orderId,
    authCode,
    status: "Aprobado",
    date: new Date().toISOString(),
    customer,
    paymentMethod,
    totalAmount,
    items: cartItems,
    warrantyApplied: "Garantía Oficial Seven Security SAS - 2 Años con Reemplazo Directo",
    estimatedInstallationDate: new Date(Date.now() + 86400000 * 3).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    assignedTechnicianTeam: "Cuadrilla 07 - Certificación RETIE / CCTV Hik-Dahua High-End",
  };

  return res.json({ success: true, order: responseOrder });
});

// Express & Vite server startup logic
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Seven Security SAS server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

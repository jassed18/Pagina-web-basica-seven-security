import { WarrantyPlan } from '../types';

export const WARRANTY_PLANS: WarrantyPlan[] = [
  {
    id: 'standard',
    name: 'Garantía Estándar Seven',
    badge: 'Incluida sin Costo',
    durationMonths: 12,
    priceMultiplier: 0,
    slaResponseHours: '24 Horas Hábiles',
    features: [
      'Garantía directa de repuestos y reparación por defectos de fábrica',
      'Atención por mesa de ayuda telefónica y soporte por ticket web',
      'Actualizaciones de firmware y parches de seguridad para cámaras y NVRs',
      'Diagnóstico inicial remoto en menos de 12 horas',
      'Reemplazo de partes en centro de servicio autorizado Seven Security',
    ],
  },
  {
    id: 'pro',
    name: 'Garantía Extendida Pro',
    badge: 'Más Popular',
    durationMonths: 24,
    priceMultiplier: 0.12, // 12% del valor del proyecto
    slaResponseHours: '8 Horas (24/7)',
    recommended: true,
    features: [
      'Cobertura total por 24 Meses (Repuestos + Mano de obra en sitio)',
      '1 Mantenimiento Preventivo Semestral en sitio con limpieza óptica e inspección de cableado',
      'Sustitución Exprés en Sitio: Instalamos equipo de respaldo temporal en 24h si requiere taller',
      'Atención Prioritaria Nivel 2 las 24 horas, los 365 días del año',
      'Descuento del 20% en expansión de equipos y reubicación de cámaras',
      'Certificado Digital de Inspección Técnica para aseguradoras',
    ],
  },
  {
    id: 'enterprise',
    name: 'Garantía Enterprise SLA 24/7',
    badge: 'Máxima Protección Corporate',
    durationMonths: 36, // De 36 a 60 meses
    priceMultiplier: 0.22, // 22% del valor del proyecto
    slaResponseHours: '4 Horas Garantizadas en Sitio',
    features: [
      'Cobertura de 36 a 60 Meses Extendibles sin límite de eventos',
      'Mantenimientos Preventivos Trimestrales con Certificación de Red y Energía RETIE',
      'SLA de atención crítica en sitio en < 4 horas para fallas totales de sistema',
      'Ingeniero de Soporte Dedicado asignado exclusivamente a su cuenta empresarial',
      'Stock de Repuestos Críticos reservado exclusivamente en bodega local para su proyecto',
      'Monitoreo remoto activo de salud de discos duros NVR y temperatura de servidores',
      'Póliza de Responsabilidad Civil de Garantía respaldada por Aseguradora de Primer Nivel',
    ],
  },
];

export const TECHNICAL_FAQS = [
  {
    question: '¿Qué incluye la visita de diagnóstico e inspección técnica gratuita?',
    answer: 'Un Ingeniero de Seven Security SAS acudirá a su propiedad o empresa, medirá distancias de cableado UTP/Fibra, analizará los ángulos de visión y puntos ciegos, evaluará la infraestructura eléctrica existente y le entregará un plano técnico con la propuesta detallada y presupuesto exacto sin ningún compromiso.',
  },
  {
    question: '¿Cómo funciona la App Móvil para ver las cámaras 4K y abrir accesos?',
    answer: 'Al finalizar la instalación, nuestro técnico configura la app "Seven Security Cloud" en los smartphones y computadores de los administradores autorizados. Permite visualización en vivo en 4K, reproducción de grabaciones con IA, alertas de intrusión instantáneas y apertura remota de puertas o molinetes con encriptación AES-256.',
  },
  {
    question: '¿Qué sucede con el sistema si hay un corte de energía eléctrica?',
    answer: 'Todos los kits instalados por Seven Security cuentan con sistemas de alimentación ininterrumpida (UPS) o baterías de respaldo de LiFePO4 incorporadas. Las cámaras y alarmas continuarán grabando y notificando durante cortes de luz de entre 6 y 24 horas continuas.',
  },
  {
    question: '¿Cómo tramitar una garantía o solicitar mantenimiento preventivo?',
    answer: 'Puede abrir un ticket directamente en nuestra sección de Soporte Técnico con el código de su factura o número de contrato. El sistema le asignará de inmediato un técnico certificado y le enviará un código de seguimiento SMS para ver la ruta del técnico en tiempo real.',
  },
  {
    question: '¿Los equipos cuentan con homologación legal e ISO en Colombia?',
    answer: 'Sí. Todos nuestros dispositivos cuentan con certificaciones internacionales CE, FCC, RoHS, homologación de la Comisión de Regulación de Comunicaciones (CRC) para módulos 4G/LTE, y cumplimiento pleno con la normativa RETIE y la Ley de Protección de Datos Personales (Habeas Data).',
  },
];

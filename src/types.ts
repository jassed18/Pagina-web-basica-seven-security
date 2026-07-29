export type CategoryType = 'all' | 'cameras' | 'access' | 'alarms' | 'recorders' | 'accessories';

export interface Device {
  id: string;
  name: string;
  modelCode: string;
  category: 'cameras' | 'access' | 'alarms' | 'recorders' | 'accessories';
  subtitle: string;
  description: string;
  price: number;
  badge?: string; // e.g. "Top Ventas 2026", "Grado Industrial", "Novedad 4K"
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  specsTable: {
    resolution?: string;
    sensor?: string;
    nightVisionRange?: string;
    protectionRating?: string; // e.g. IP67, IK10
    connectivity?: string; // e.g. PoE 802.3af, WiFi 6, 4G LTE
    powerSupply?: string;
    operatingTemp?: string;
    aiFeatures?: string;
    storageSupport?: string;
    certifications?: string;
    warrantyStandard?: string;
  };
  featuresList: string[];
  compatibleAccessories?: string[];
}

export type WarrantyTier = 'standard' | 'pro' | 'enterprise';

export interface CartItem {
  device: Device;
  quantity: number;
  selectedWarranty: WarrantyTier;
  includeInstallation: boolean;
}

export interface WarrantyPlan {
  id: WarrantyTier;
  name: string;
  badge: string;
  durationMonths: number;
  priceMultiplier: number; // e.g. 0, 0.12, 0.25
  slaResponseHours: string;
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: string;
  companyName: string;
  sector: 'Residencial' | 'Empresarial' | 'Industrial' | 'Bancario / Comercial';
  avatarUrl: string;
  rating: number;
  date: string;
  projectSummary: string;
  quote: string;
  verifiedBadge: boolean;
  installedDevices: string[];
}

export interface SupportTicket {
  id: string;
  clientName: string;
  serviceType: string;
  deviceModel: string;
  status: 'Abierto' | 'En Proceso' | 'Resuelto' | 'En Espera';
  assignedTechnician: string;
  priority: 'Alta' | 'Urgente' | 'Normal';
  createdAt: string;
  estimatedResolution: string;
  description: string;
  updates: { date: string; note: string }[];
}

export interface QuoteRequest {
  propertyType: 'Residencia / Casa' | 'Local Comercial' | 'Edificio / Conjunto' | 'Planta Industrial' | 'Oficina Corporativa';
  propertyAreaSqM: number;
  cameraCount: number;
  cameraQuality: '4K Ultra AI' | 'Full HD 1080p' | 'Térmica Perimetral';
  accessDoorCount: number;
  alarmZoneCount: number;
  warrantyTier: WarrantyTier;
  estimatedTotalMin: number;
  estimatedTotalMax: number;
}

export interface CheckoutCustomer {
  fullName: string;
  companyName?: string;
  documentId: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  installationNotes?: string;
}

export interface OrderConfirmation {
  orderId: string;
  authCode: string;
  status: string;
  date: string;
  customer: CheckoutCustomer;
  paymentMethod: string;
  totalAmount: number;
  items: CartItem[];
  warrantyApplied: string;
  estimatedInstallationDate: string;
  assignedTechnicianTeam: string;
}

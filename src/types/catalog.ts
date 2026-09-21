import type {
  ModelConfiguration,
  ModelValidationReport,
  MockupPlacement,
  PriceBreakdown,
  PricingRules,
  PrintMethod,
  ProductionRules,
  ProductMetadata,
  ProductTag,
  SafeArea,
  TextureConfig,
} from '@cpd/shared';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  status: 'ACTIVE' | 'INACTIVE';
  _count?: { products: number };
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  color: string | null;
  colorName: string | null;
  size: string | null;
  material: string | null;
  sku: string;
  price: number | null;
  stock: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface PrintArea {
  id: number;
  key: string;
  name: string;
  width: number;
  height: number;
  maxDesignWidth: number | null;
  maxDesignHeight: number | null;
  bleed: number;
  safeArea: SafeArea;
  physicalWidthIn: number | null;
  physicalHeightIn: number | null;
  mockup: MockupPlacement | null;
  templateImage: string | null;
  modelMeshName: string | null;
  textureConfig: TextureConfig | null;
  sortOrder: number;
}

export interface ProductModel {
  id: number;
  modelUrl: string | null;
  thumbnailUrl: string | null;
  modelType: 'GLTF' | 'PRIMITIVE';
  configuration: ModelConfiguration;
  validation?: ModelValidationReport | null;
  qualityScore?: number | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number;
  pricingRules: Partial<PricingRules> | null;
  tags?: ProductTag[];
  metadata?: ProductMetadata | null;
  printMethods?: PrintMethod[];
  productionRules?: Partial<ProductionRules> | null;
  version?: number;
  featured: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  category: { id: number; name: string; slug: string };
  createdAt: string;
  images: ProductImage[];
  variants: ProductVariant[];
  printAreas: PrintArea[];
  model: ProductModel | null;
}

export interface DesignSummary {
  id: number;
  name: string;
  productId: number;
  variantId: number | null;
  previewImage: string | null;
  updatedAt: string;
  createdAt: string;
  product?: { id: number; name: string; slug: string };
  _count?: { versions: number };
}

export interface UploadedAsset {
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  metadata: { width: number; height: number; format: string; hasAlpha: boolean } | null;
  createdAt: string;
}

export interface DesignTemplate {
  id: number;
  name: string;
  category: string;
  templateJson: {
    canvas: { width: number; height: number };
    elements: unknown[];
  };
  previewImage: string | null;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CartItem {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: { id: number; name: string; slug: string; image: string | null };
  variant: {
    id: number;
    name: string;
    color: string | null;
    colorName: string | null;
    size: string | null;
  } | null;
  design: { id: number; name: string; previewImage: string | null } | null;
}

export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  productName: string;
  variantName: string | null;
  hasDesign: boolean;
  product: { id: number; name: string; slug: string; image: string | null } | null;
  variant: { id: number; name: string; color: string | null; colorName: string | null; size: string | null } | null;
  design: { id: number; name: string; previewImage: string | null } | null;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PRODUCTION' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Record<string, string> | null;
  createdAt: string;
  items: OrderItem[];
  user?: { id: number; name: string; email: string };
}

export interface PublicUser {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  emailVerified: boolean;
  createdAt: string;
}

export type { PriceBreakdown };

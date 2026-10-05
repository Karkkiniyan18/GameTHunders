export type ProductCategory = 
  | 'all'
  | 'rigs'
  | 'keyboards'
  | 'mice'
  | 'audio'
  | 'displays'
  | 'accessories';

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier?: number;
  inStock?: boolean;
}

export interface TechnicalSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tagline: string;
  description: string;
  image: string;
  inStock: boolean;
  stockCount: number;
  specs: TechnicalSpecs;
  keyFeatures: string[];
  variants?: {
    type: string; // e.g. "Switches" or "Finish" or "Cable"
    options: ProductVariant[];
  };
  warrantyYears: number;
  switchType?: 'linear' | 'tactile' | 'clicky' | 'magnetic';
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
  customRigSpecs?: CustomRigConfig;
  unitPrice: number;
}

export interface CustomRigComponent {
  id: string;
  name: string;
  price: number;
  wattage: number;
  description: string;
}

export interface CustomRigConfig {
  chassis: CustomRigComponent;
  cpu: CustomRigComponent;
  gpu: CustomRigComponent;
  ram: CustomRigComponent;
  cooler: CustomRigComponent;
  storage: CustomRigComponent;
  psu: CustomRigComponent;
  cables: CustomRigComponent;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface OrderConfirmation {
  orderId: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  shippingMethod: string;
  paymentMethod: string;
  estimatedDelivery: string;
  trackingNumber: string;
}

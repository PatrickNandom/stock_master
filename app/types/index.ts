//types/index.ts
import { UserRole, PaymentType, SaleStatus, HistoryType } from "@prisma/client";

// User Types
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  businessId: string;
  createdAt: Date;
}

export interface UserWithBusiness extends User {
  business: {
    id: string;
    name: string;
    address: string | null;
    email: string;
    phone: string | null;
  };
}

// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  description: string | null;
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Sale Types
export interface SaleItem {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  priceAtSale: number;
  product?: {
    id: string;
    name: string;
  };
}

export interface Sale {
  id: string;
  totalAmount: number;
  paymentType: PaymentType;
  status: SaleStatus;
  businessId: string;
  createdAt: Date;
  items: SaleItem[];
}

// History Types
export interface History {
  id: string;
  type: HistoryType;
  description: string;
  productId: string | null;
  businessId: string;
}

// Business Types
export interface Business {
  id: string;
  name: string;
  address: string | null;
  email: string;
  phone: string | null;
  createdAt: Date;
}

// API Response Types
export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    role: UserRole;
    businessId: string;
    businessName: string;
  };
}

export interface ApiError {
  error: string;
}

export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
  message?: string;
}

export interface SalesResponse {
  sales: Sale[];
}

export interface SaleResponse {
  sale: Sale;
  message?: string;
}

export interface StaffResponse {
  staff: User[];
}

export interface StaffMemberResponse {
  staff: User;
  message?: string;
}

export interface HistoryResponse {
  history: History[];
}

export interface BusinessResponse {
  business: Business;
  message?: string;
}

export interface UserResponse {
  user: UserWithBusiness;
}

// Form Types
export interface RegisterForm {
  businessName: string;
  ownerName: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface ProductForm {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export interface SaleForm {
  items: Array<{ productId: string; quantity: number }>;
  paymentType: PaymentType;
}

export interface StaffForm {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "STAFF";
}

export interface BusinessUpdateForm {
  name?: string;
  address?: string;
  phone?: string;
}

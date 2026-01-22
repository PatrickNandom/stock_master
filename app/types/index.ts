// app/types/index.ts
export type UserRole = "ADMIN" | "STAFF";

export type PaymentType = "CASH" | "CARD" | "TRANSFER";
export type SaleStatus = "PENDING" | "COMPLETED" | "CANCELLED";
export type HistoryType = "sold" | "updated" | "added";

// User Types
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  businessId: string;
  createdAt: Date;
}

// user type as response
export interface UserData {
  id: string;
  email: string;
  name: string | null;
  role: string;
  businessId: string | null;
  createdAt: Date;
  business: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    role: string;
  } | null;
}

// a user type with business
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

// Sale Item Types
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

// Sale
export interface Sale {
  id: string;
  totalAmount: number;
  paymentType: PaymentType;
  status: SaleStatus;
  businessId: string;
  createdAt: Date;
  items: SaleItem[];
}

// Mock History Types
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

// Links
export interface NavLink {
  label: string;
  href: string;
  iconPath: string;
  isLogout?: boolean;
}

// Error Response
export interface ApiError {
  error: string;
}

// Products Response List
export interface ProductsResponse {
  products: Product[];
}

//Single User Response
export interface ProductResponse {
  product: Product;
  message?: string;
}

//Sales Response List
export interface SalesResponse {
  sales: Sale[];
}

// Single Sales Response
export interface SaleResponse {
  sale: Sale;
  message?: string;
}

// Staff Response List
export interface StaffResponse {
  staff: User[];
}

// Single Staff Response List
export interface StaffMemberResponse {
  staff: User;
  message?: string;
}

// History Response List
export interface HistoryResponse {
  history: History[];
}

// Single Business Response
export interface BusinessResponse {
  business: Business;
  message?: string;
}

// Single User Response
export interface UserResponse {
  user: UserWithBusiness;
}

// Registration Form Types
export interface RegisterForm {
  businessName: string;
  ownerName: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Loging UI Form
export interface LoginForm {
  email: string;
  password: string;
}

// Product UI Form
export interface ProductForm {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

// Sales UI Form
export interface SaleForm {
  items: Array<{ productId: string; quantity: number }>;
  paymentType: PaymentType;
}

// Staff UI Form
export interface StaffForm {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "STAFF";
}

// Business UI Ubdate Form
export interface BusinessUpdateForm {
  name?: string;
  address?: string;
  phone?: string;
}

// Dialugue UI Props types
export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

// Mock Transaction Types
export type AppDataType = "sold" | "updated" | "added";

// Mock History Item Types
export interface HistoryItem {
  id: string;
  productId: string;
  type: AppDataType;
  createdAt: string;
}

// Mock Notification Item Types
export interface NotificationItem {
  id: string;
  productId: string;
  type: AppDataType;
  createdAt: string;
}

// Mock product UI Types
export interface ProductUIData {
  id: string;
  image: string;
  name: string;
  code: string;
  price: number;
  stock: number;
}

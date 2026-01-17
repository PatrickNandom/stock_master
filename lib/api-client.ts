// app/lib/api-client.ts
import {
  AuthResponse,
  RegisterForm,
  ProductsResponse,
  ProductResponse,
  ProductForm,
  SalesResponse,
  SaleResponse,
  SaleForm,
  StaffResponse,
  StaffMemberResponse,
  StaffForm,
  HistoryResponse,
  BusinessResponse,
  BusinessUpdateForm,
  UserResponse,
} from "@/app/types";
import { HistoryType } from "@prisma/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Helper to get token from localStorage
function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

// Helper to make authenticated requests
async function fetchWithAuth<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data as T;
}

// Auth APIs
export const authAPI = {
  register: async (data: RegisterForm): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);

    // Save token to localStorage
    if (result.token) {
      localStorage.setItem("token", result.token);
    }
    return result as AuthResponse;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);

    // Save token to localStorage
    if (result.token) {
      localStorage.setItem("token", result.token);
    }
    return result as AuthResponse;
  },

  logout: (): void => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async (): Promise<UserResponse> => {
    return fetchWithAuth<UserResponse>("/api/auth/me");
  },
};

// Products APIs
export const productsAPI = {
  getAll: async (): Promise<ProductsResponse> => {
    return fetchWithAuth<ProductsResponse>("/api/products");
  },

  getOne: async (id: string): Promise<ProductResponse> => {
    return fetchWithAuth<ProductResponse>(`/api/products/${id}`);
  },

  create: async (data: ProductForm): Promise<ProductResponse> => {
    return fetchWithAuth<ProductResponse>("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (
    id: string,
    data: Partial<ProductForm>,
  ): Promise<ProductResponse> => {
    return fetchWithAuth<ProductResponse>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<{ message: string }> => {
    return fetchWithAuth<{ message: string }>(`/api/products/${id}`, {
      method: "DELETE",
    });
  },
};

// Sales APIs
export const salesAPI = {
  getAll: async (): Promise<SalesResponse> => {
    return fetchWithAuth<SalesResponse>("/api/sales");
  },

  create: async (data: SaleForm): Promise<SaleResponse> => {
    return fetchWithAuth<SaleResponse>("/api/sales", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Staff APIs
export const staffAPI = {
  getAll: async (): Promise<StaffResponse> => {
    return fetchWithAuth<StaffResponse>("/api/staff");
  },

  create: async (data: StaffForm): Promise<StaffMemberResponse> => {
    return fetchWithAuth<StaffMemberResponse>("/api/staff", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateRole: async (
    id: string,
    role: "OWNER" | "ADMIN" | "STAFF",
  ): Promise<StaffMemberResponse> => {
    return fetchWithAuth<StaffMemberResponse>(`/api/staff/${id}`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    });
  },

  delete: async (id: string): Promise<{ message: string }> => {
    return fetchWithAuth<{ message: string }>(`/api/staff/${id}`, {
      method: "DELETE",
    });
  },
};

// History API
export const historyAPI = {
  getAll: async (filters?: {
    type?: HistoryType;
    productId?: string;
    limit?: number;
  }): Promise<HistoryResponse> => {
    const params = new URLSearchParams();
    if (filters?.type) params.append("type", filters.type);
    if (filters?.productId) params.append("productId", filters.productId);
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    return fetchWithAuth<HistoryResponse>(`/api/history${query}`);
  },
};

// Business API
export const businessAPI = {
  get: async (): Promise<BusinessResponse> => {
    return fetchWithAuth<BusinessResponse>("/api/business");
  },

  update: async (data: BusinessUpdateForm): Promise<BusinessResponse> => {
    return fetchWithAuth<BusinessResponse>("/api/business", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

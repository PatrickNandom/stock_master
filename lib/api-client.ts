// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Helper to get token from localStorage
function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

// Helper to make authenticated requests
async function fetchWithAuth(url: string, options: RequestInit = {}) {
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

  return data;
}

// Auth APIs
export const authAPI = {
  register: async (data: {
    businessName: string;
    ownerName: string;
    address?: string;
    email: string;
    phone?: string;
    password: string;
    confirmPassword: string;
  }) => {
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
    return result;
  },

  login: async (email: string, password: string) => {
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
    return result;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async () => {
    return fetchWithAuth("/api/auth/me");
  },
};

// Products APIs
export const productsAPI = {
  getAll: async () => {
    return fetchWithAuth("/api/products");
  },

  getOne: async (id: string) => {
    return fetchWithAuth(`/api/products/${id}`);
  },

  create: async (data: {
    name: string;
    price: number;
    quantity: number;
    image?: string;
    description?: string;
  }) => {
    return fetchWithAuth("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (
    id: string,
    data: {
      name?: string;
      price?: number;
      quantity?: number;
      image?: string;
      description?: string;
    }
  ) => {
    return fetchWithAuth(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/api/products/${id}`, {
      method: "DELETE",
    });
  },
};

// Sales APIs
export const salesAPI = {
  getAll: async () => {
    return fetchWithAuth("/api/sales");
  },

  create: async (data: {
    items: Array<{ productId: string; quantity: number }>;
    paymentType: "CASH" | "TRANSFER";
  }) => {
    return fetchWithAuth("/api/sales", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Staff APIs
export const staffAPI = {
  getAll: async () => {
    return fetchWithAuth("/api/staff");
  },

  create: async (data: {
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "STAFF";
  }) => {
    return fetchWithAuth("/api/staff", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateRole: async (id: string, role: "OWNER" | "ADMIN" | "STAFF") => {
    return fetchWithAuth(`/api/staff/${id}`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    });
  },

  delete: async (id: string) => {
    return fetchWithAuth(`/api/staff/${id}`, {
      method: "DELETE",
    });
  },
};

// History API
export const historyAPI = {
  getAll: async (filters?: {
    type?: "ADDED" | "UPDATED" | "SOLD";
    productId?: string;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters?.type) params.append("type", filters.type);
    if (filters?.productId) params.append("productId", filters.productId);
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    return fetchWithAuth(`/api/history${query}`);
  },
};

// Business API
export const businessAPI = {
  get: async () => {
    return fetchWithAuth("/api/business");
  },

  update: async (data: { name?: string; address?: string; phone?: string }) => {
    return fetchWithAuth("/api/business", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

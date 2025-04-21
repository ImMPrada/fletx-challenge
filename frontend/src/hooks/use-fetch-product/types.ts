export interface Company {
  id: number;
  name: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  category: string;
  price: number;
  company: Company;
}

export interface ApiResponse {
  data?: ProductResponse;
  error?: string;
}

export interface UseFetchProductReturn {
  product: ProductResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchProduct: (id: string) => Promise<void>;
} 
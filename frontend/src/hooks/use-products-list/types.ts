export interface Company {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  company_id: number;
  company?: Company;
}

export interface UseProductsListReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
} 
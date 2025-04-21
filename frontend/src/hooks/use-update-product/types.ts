export type ProductData = {
  name: string;
  category: string;
  price: number | string;
  company_id: number;
}

export type UpdateProductParams = {
  product: ProductData;
}

export interface ValidationErrors {
  name?: string[];
  category?: string[];
  price?: string[];
  company_id?: string[];
}

export interface ProductResponse {
  id: number;
  name: string;
  category: string;
  price: number;
  company_id: number;
}

export interface ApiResponse<T> {
  data?: T;
  status?: number;
  error?: string;
  errors?: ValidationErrors;
  message?: string;
}

export interface UseUpdateProductReturn {
  product: ProductResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  validationErrors: ValidationErrors | null;
  updateProduct: (id: number, data: UpdateProductParams) => Promise<ApiResponse<ProductResponse>>;
  resetState: () => void;
} 
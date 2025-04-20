export type CompanyData = {
  name: string;
  address: string;
  phone_number: string;
  category?: string;
  assets: string;
  liabilities: string;
  department?: string;
  city_id: number;
}

export type UpdateCompanyParams = {
  company: CompanyData;
}

export interface ValidationErrors {
  name?: string[];
  address?: string[];
  phone_number?: string[];
  category?: string[];
  assets?: string[];
  liabilities?: string[];
  department?: string[];
  city_id?: string[];
}

export interface CompanyResponse {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  category: string;
  assets: string;
  liabilities: string;
  city_id: number;
}

export interface ApiResponse<T> {
  data?: T;
  status?: number;
  error?: string;
  errors?: ValidationErrors;
  message?: string;
}

export interface UseUpdateCompanyReturn {
  company: CompanyResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  validationErrors: ValidationErrors | null;
  updateCompany: (id: number, data: UpdateCompanyParams) => Promise<ApiResponse<CompanyResponse>>;
  resetState: () => void;
} 
export type CompanyData = {
  company: {
    name: string;
    address: string;
    phone_number: string;
    category?: string;
    assets: string;
    liabilities: string;
    department: string;
    city_id: number;
  }
}

export interface ValidationErrors {
  name?: string[];
  address?: string[];
  phoneNumber?: string[];
  category?: string[];
  assets?: string[];
  liabilities?: string[];
  department?: string[];
  city?: string[];
}

export interface CompanyResponse {
  id: string;
  name: string;
  // otros campos que devuelva la API
}

export interface ApiResponse<T> {
  data?: T;
  status?: number;
  error?: string;
  errors?: ValidationErrors;
  message?: string;
}

export interface UseCreateCompanyReturn {
  company: CompanyResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  validationErrors: ValidationErrors | null;
  createCompany: (data: CompanyData) => Promise<ApiResponse<CompanyResponse>>;
  resetState: () => void;
} 
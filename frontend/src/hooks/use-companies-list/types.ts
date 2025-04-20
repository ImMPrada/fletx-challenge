export interface City {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  category: string;
  address: string;
  phone_number: string;
  assets: string;
  liabilities: string;
  department: Department;
  city: City;
}

export interface UseCompaniesListReturn {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  fetchCompanies: () => Promise<void>;
} 
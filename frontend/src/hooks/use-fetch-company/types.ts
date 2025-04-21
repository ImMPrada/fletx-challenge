import { User } from "../use-fetch-user/types";

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
  department: Department | null;
  city: City | null;
  users: User[];
}

export interface UseFetchCompanyReturn {
  company: Company | null;
  isLoading: boolean;
  error: string | null;
  fetchCompany: (id: string | number) => Promise<void>;
} 
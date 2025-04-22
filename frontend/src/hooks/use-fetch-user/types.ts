import { Role, Company } from "../use-users-list/types";

export interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  work_position?: string;
  phone_number?: string;
  salary?: string;
  role_id: number;
  company_id: number;
  role: Role;
  company: Company;
}

export interface ApiResponse {
  data?: User;
  status: number;
  error?: string;
  message?: string;
}

export interface UseFetchUserReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: (id: string) => Promise<void>;
} 
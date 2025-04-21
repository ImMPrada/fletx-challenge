export interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  role_id: number;
  company_id: number;
  work_position?: string;
  phone_number?: string;
  salary?: string;
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
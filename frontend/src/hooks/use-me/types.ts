export interface User {
  id: string;
  email: string;
  name?: string;
  last_name?: string;
  work_position?: string;
  phone_number?: string;
  salary?: number;
  role_id: number;
  company_id: number;
  role?: {
    id: number;
    code: string;
    description: string;
  };
  company?: {
    id: string;
    name: string;
  };
}

export interface UseMeReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  isAuthenticated: boolean;
} 
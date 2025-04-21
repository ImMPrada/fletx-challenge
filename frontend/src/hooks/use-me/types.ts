export interface User {
  id: string;
  email: string;
  name?: string;
  lastName?: string;
  workPosition?: string;
  phoneNumber?: string;
  salary?: number;
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
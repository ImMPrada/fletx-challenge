export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface UseMeReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  isAuthenticated: boolean;
} 
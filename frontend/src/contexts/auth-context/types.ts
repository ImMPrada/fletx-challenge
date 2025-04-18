export interface UseAuthenticateTokenParams {
  token: string;
}

export interface UseAuthenticateTokenResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isFetchingAuth: boolean;
  isError: boolean;
  requiresAuth: boolean;
  data: UseAuthenticateTokenResponse | null;
}

export interface AuthContextParams {
  state: AuthState;
  authenticate: (params: UseAuthenticateTokenParams) => void;
}

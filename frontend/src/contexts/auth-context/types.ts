export interface UseAuthenticateTokenParams {
  token?: string;
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
  isAuthenticated: boolean;
  isFetching: boolean;
  isError: boolean;
  data: string | null;
}

export interface AuthContextParams {
  state: AuthState;
  authenticate: (params: UseAuthenticateTokenParams) => void;
  removeJwt: () => void;
}

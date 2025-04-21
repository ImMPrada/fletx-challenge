import { createContext } from 'react';
import { AuthContextParams, AuthState } from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  isFetching: false,
  isError: false,
  data: null,
};

export const AuthContext = createContext<AuthContextParams>({
  state: initialState,
  authenticate: () => {},
  removeJwt: () => {},
}); 
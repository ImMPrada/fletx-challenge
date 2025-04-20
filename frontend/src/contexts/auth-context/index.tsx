import { createContext, ReactNode, useState } from 'react';
import { AuthState, AuthContextParams, UseAuthenticateTokenParams, UseAuthenticateTokenResponse } from './types';
import { config } from '../../config';

const initialState: AuthState = {
  isAuthenticated: false,
  isFetching: false,
  isError: false,
  data: null,
};

export const AuthContext = createContext<AuthContextParams>({
  state: initialState,
  authenticate: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const authenticate = async (params: UseAuthenticateTokenParams) => {
    setState({ ...state, isFetching: true });

    const token = sessionStorage.getItem('jwt');

    if (token) {
      setState({
        ...state,
        isFetching: false,
        isAuthenticated: true,
      });

      return;
    }

    const response = await fetch(`${config.apiUrl}/api/v1/magic_auths`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        magic_link: {
          token: params.token,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setState({
        ...state,
        isFetching: false,
        data: errorData.message || 'Token inválido o expirado',
        isError: true,
        isAuthenticated: false,
      });

      return;
    }

    const data = await response.json() as UseAuthenticateTokenResponse;
    sessionStorage.setItem('jwt', data.token);

    setState({
      ...state,
      isFetching: false,
      data: 'logged in',
      isAuthenticated: true,
    });
  };

  const value: AuthContextParams = {
    state,
    authenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

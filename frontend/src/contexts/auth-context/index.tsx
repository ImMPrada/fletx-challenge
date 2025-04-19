import { createContext, ReactNode, useState } from 'react';
import { AuthState, AuthContextParams } from './types';
import { config } from '../../config';
import { UseAuthenticateTokenParams } from './types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isFetchingAuth: false,
  isError: false,
  requiresAuth: false,
  data: null,
};


export const AuthContext = createContext<AuthContextParams>({
  state: initialState,
  authenticate: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const authenticate = async (params: UseAuthenticateTokenParams) => {
    setState({...state, isFetchingAuth: true});
    
    try {
      const response = await fetch(`${config.apiUrl}/api/v1/magic_auths`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ 
          magic_link: {
            token: params.token
          }
         })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setState({ 
          ...state,
          isFetchingAuth: false,
          data: errorData.message || 'Token inválido o expirado',
          isError: true,
          isAuthenticated: false,
          requiresAuth: true
        });
  
        return;
      }

      const data = await response.json();

      setState({
        ...state,
        isFetchingAuth: false,
        data,
        isAuthenticated: true
      });
      
      await fetchMe();
    } catch (error) {
      console.error('Error during token authentication:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      throw errorMessage;
    }
  };

  const fetchMe = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/v1/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await response.json();

      if (!response.ok) {
        setState({ ...state, isError: true, isAuthenticated: false, requiresAuth: true });
        return;
      }

      setState({ ...initialState, user: data, isAuthenticated: true });
    } catch (error) {
      console.error('Error during fetchMe:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      throw errorMessage;
    }
  };

  const value: AuthContextParams = {
    state,
    authenticate
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

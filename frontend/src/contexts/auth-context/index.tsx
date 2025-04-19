import { createContext, ReactNode, useState } from 'react';
import { AuthState, AuthContextParams } from './types';
import { config } from '../../config';
import { UseAuthenticateTokenParams, UseAuthenticateTokenResponse } from './types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: false,
  data: null,
};


export const AuthContext = createContext<AuthContextParams>({
  state: initialState,
  authenticate: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const authenticate = async (params: UseAuthenticateTokenParams) => {
    setState({...state, isLoading: true});
    
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
          isLoading: false,
          data: errorData.message || 'Token inválido o expirado',
          error: true,
          isAuthenticated: false
        });
  
        return;
      }

      const data = await response.json();

      setState({
        ...state,
        isLoading: false,
        data,
        isAuthenticated: true
      });
      
      return data;
    } catch (error) {
      console.error('Error during token authentication:', error);
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

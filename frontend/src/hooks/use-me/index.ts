import { useState } from 'react';
import { useApi } from '../use-api';
import { User, UseMeReturn } from './types';

export const useMe = (): UseMeReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { fetchData } = useApi();

  const fetchUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // La lógica de verificación de token y errores de autenticación 
      // ya está manejada por useApi internamente
      const userData = await fetchData<User>('/api/v1/me');
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      // Si llegamos aquí es porque hay un error que no es de autenticación
      // (los errores 401 ya son manejados por useApi)
      setUser(null);
      setIsAuthenticated(false);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    fetchUser,
    isAuthenticated
  };
}; 
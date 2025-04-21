import { useState } from 'react';
import { useApi } from '../use-api';
import { User, ApiResponse, UseFetchUserReturn } from './types';

export const useFetchUser = (): UseFetchUserReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const fetchUser = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchData<ApiResponse>(`/api/v1/users/${id}`, {}, true);
      
      if (response.status >= 400) {
        throw new Error(response.error || 'Error al obtener el usuario');
      }
      
      setUser(response.data || null);
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err.message : 'Error al obtener el usuario');
      console.error('Error fetching user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    fetchUser
  };
}; 
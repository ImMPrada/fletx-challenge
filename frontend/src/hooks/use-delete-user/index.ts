import { useState, useCallback } from 'react';
import { useApi } from '../use-api';
import { UseDeleteUserReturn } from './types';

interface ApiResponse {
  message?: string;
  error?: string;
  status: number;
}

export const useDeleteUser = (): UseDeleteUserReturn => {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const deleteUser = useCallback(async (id: string | number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response = await fetchData<ApiResponse>(`/api/v1/users/${id}`, {
      method: 'DELETE',
    }, true);
    
    if (response.status === 404) {
      setError('Usuario no encontrado');
      setIsLoading(false);
      return;
    }
    
    if (response.status === 403) {
      setError('No tienes permiso para eliminar este usuario');
      setIsLoading(false);
      return;
    }
    
    setMessage(response.message || null);
    setIsLoading(false);
  }, [fetchData]);

  return {
    message,
    isLoading,
    error,
    deleteUser
  };
}; 
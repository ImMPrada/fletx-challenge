import { useState, useCallback } from 'react';
import { useApi } from '../use-api';
import { UseDeleteCompanyReturn } from './types';

interface ApiResponse {
  message?: string;
  error?: string;
  status: number;
}

export const useDeleteCompany = (): UseDeleteCompanyReturn => {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const deleteCompany = useCallback(async (id: string | number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response = await fetchData<ApiResponse>(`/api/v1/companies/${id}`, {
      method: 'DELETE',
    }, true);
    
    if (response.status === 404) {
      setError('Empresa no encontrada');
      setIsLoading(false);
      return;
    }
    
    if (response.status === 403) {
      setError('No tienes permiso para eliminar esta empresa');
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
    deleteCompany
  };
}; 
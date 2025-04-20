import { useState, useCallback } from 'react';
import { useApi } from '../use-api';
import { Company, UseFetchCompanyReturn } from './types';

interface ApiResponse {
  data?: Company;
  status: number;
  message?: string;
  [key: string]: unknown;
}

export const useFetchCompany = (): UseFetchCompanyReturn => {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const fetchCompany = useCallback(async (id: string | number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response = await fetchData<ApiResponse>(`/api/v1/companies/${id}`, {}, true);
    
    if (response.status === 404) {
      setError('Empresa no encontrada');
      setIsLoading(false);
      return;
    }
    
    if (response.status === 403) {
      setError('No tienes permiso para ver esta empresa');
      setIsLoading(false);
      return;
    }
    
    setCompany(response.data || null);
    setIsLoading(false);
  }, [fetchData]);

  return {
    company,
    isLoading,
    error,
    fetchCompany
  };
}; 
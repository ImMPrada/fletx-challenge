import { useState } from 'react';
import { useApi } from '../use-api';
import { Company, UseCompaniesListReturn } from './types';

interface ApiResponse {
  data?: Company[];
  status: number;
  message?: string;
  [key: string]: unknown;
}

export const useCompaniesList = (): UseCompaniesListReturn => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const fetchCompanies = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchData<ApiResponse>('/api/v1/companies', {}, true);
      setCompanies(response.data || []);
    } catch (err) {
      setCompanies([]);
      setError(err instanceof Error ? err.message : 'Error al obtener la lista de empresas');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    companies,
    isLoading,
    error,
    fetchCompanies
  };
}; 
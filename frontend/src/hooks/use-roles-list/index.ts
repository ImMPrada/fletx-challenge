import { useState } from 'react';
import { useApi } from '../use-api';
import { Role, UseRolesListReturn } from './types';

interface ApiResponse {
  data?: Role[];
  status: number;
  message?: string;
  [key: string]: unknown;
}

export const useRolesList = (): UseRolesListReturn => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const fetchRoles = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchData<ApiResponse>('/api/v1/roles', {}, true);
      setRoles(response.data || []);
    } catch (err) {
      setRoles([]);
      setError(err instanceof Error ? err.message : 'Error al obtener la lista de roles');
      console.error('Error fetching roles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    roles,
    isLoading,
    error,
    fetchRoles
  };
};

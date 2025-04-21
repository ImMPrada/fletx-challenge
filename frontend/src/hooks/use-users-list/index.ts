import { useState } from 'react';
import { useApi } from '../use-api';
import { User, UseUsersListReturn } from './types';

interface ApiResponse {
  data?: User[];
  status: number;
  message?: string;
  [key: string]: unknown;
}

export const useUsersList = (): UseUsersListReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const fetchUsers = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchData<ApiResponse>('/api/v1/users', {}, true);
      setUsers(response.data || []);
    } catch (err) {
      setUsers([]);
      setError(err instanceof Error ? err.message : 'Error al obtener la lista de usuarios');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    isLoading,
    error,
    fetchUsers
  };
}; 
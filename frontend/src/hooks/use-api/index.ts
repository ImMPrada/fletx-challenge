import { useNavigate } from 'react-router-dom';
import { config } from '../../config';
import { RequestOptions, UseApiReturn } from './types';
import { FlashContext } from '../../contexts/flash-context';
import { useContext } from 'react';

export const useApi = (): UseApiReturn => {
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();

  const fetchData = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    const token = sessionStorage.getItem('jwt');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions: RequestInit = {
      method: options.method || 'GET',
      headers,
      credentials: options.includeCredentials ? 'include' : 'same-origin',
    };

    if (options.body && options.method !== 'GET') {
      fetchOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(`${config.apiUrl}${endpoint}`, fetchOptions);

      if (response.status === 401) {
        sessionStorage.removeItem('jwt');
        setFlash('Sesión expirada o token inválido', 'error');
        navigate('/login');

        throw new Error('Sesión expirada o token inválido');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ha ocurrido un error');
      }

      return await response.json() as T;
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error;
    }
  };

  return { fetchData };
};
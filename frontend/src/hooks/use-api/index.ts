import { useNavigate } from 'react-router-dom';
import { useContext, useCallback } from 'react';
import { config } from '../../config';
import { RequestOptions, UseApiReturn } from './types';
import { FlashContext } from '../../contexts/flash-context';

export const useApi = (): UseApiReturn => {
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();

  const fetchData = useCallback(async <T>(
    endpoint: string,
    options: RequestOptions = {},
    formatedResponse: boolean = false,
    flashMessage: boolean = true
  ): Promise<T> => {
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
      
      // Leemos el cuerpo de la respuesta una sola vez
      const responseData = await response.json();

      console.log(responseData);

      // Agregamos el status a los datos para poder manejarlo fácilmente
      let result;

      if (formatedResponse) {
        result = {
          data: responseData,
          status: response.status
        };
      } else {
        result = {
          ...responseData,
          status: response.status
        };
      }

      // Manejamos el caso de sesión expirada
      if (response.status === 401) {
        sessionStorage.removeItem('jwt');
        if(flashMessage) setFlash('Sesión expirada o token inválido', 'error');
        navigate('/login');
      }

      return result as T;
    } catch (error) {
      console.error('Error en fetchData:', error);
      throw error;
    }
  }, [navigate, setFlash]);

  return { fetchData };
};
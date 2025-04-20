import { useState } from 'react';
import { useApi } from '../use-api';
import { FeatureCheckResponse, UseFeatureCheckReturn } from './types';

export const useFeatureCheck = (): UseFeatureCheckReturn => {
  const [can, setCan] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const checkFeature = async (featureCode: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // La llamada a la API para verificar la característica
      const response = await fetchData<FeatureCheckResponse>(`/api/v1/check_feature?code=${featureCode}`);
      
      // Actualizamos el estado con el resultado
      setCan(response.can);
      return response.can;
    } catch (err) {
      // Si hay un error, asumimos que la característica no está habilitada
      setCan(false);
      setError(err instanceof Error ? err.message : 'Error al verificar la característica');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    can,
    isLoading,
    error,
    checkFeature
  };
}; 
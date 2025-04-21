import { useState } from 'react';
import { useApi } from '../use-api';
import { ApiResponse, ProductResponse, UseFetchProductReturn } from './types';

export const useFetchProduct = (): UseFetchProductReturn => {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const fetchProduct = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchData<ApiResponse>(`/api/v1/products/${id}`, {}, true);
      
      if (response.data) {
        setProduct(response.data);
      } else if (response.error) {
        setError(response.error);
      } else {
        setError('Error al obtener el producto');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el producto');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    product,
    isLoading,
    error,
    fetchProduct
  };
}; 
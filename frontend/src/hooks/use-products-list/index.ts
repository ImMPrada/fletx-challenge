import { useState } from 'react';
import { useApi } from '../use-api';
import { Product, UseProductsListReturn } from './types';

interface ApiResponse {
  data?: Product[];
  status: number;
  message?: string;
  [key: string]: unknown;
}

export const useProductsList = (): UseProductsListReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useApi();

  const fetchProducts = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response = await fetchData<ApiResponse>('/api/v1/products', {}, true);
    setProducts(response.data || []);
    setIsLoading(false);
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts
  };
}; 
import { useState } from 'react';
import { useApi } from '../use-api';
import { ApiResponse, UpdateProductParams, ProductResponse, UseUpdateProductReturn, ValidationErrors } from './types';

export function useUpdateProduct(): UseUpdateProductReturn {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);
  const { fetchData } = useApi();

  const resetState = () => {
    setProduct(null);
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
    setValidationErrors(null);
  };

  const updateProduct = async (id: number, data: UpdateProductParams): Promise<ApiResponse<ProductResponse>> => {
    // Preparamos el estado para la petición
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    setValidationErrors(null);

    try {
      // Realizamos la petición usando useApi
      const response = await fetchData<ApiResponse<ProductResponse>>(`/api/v1/products/${id}`, {
        method: 'PUT',
        body: data as Record<string, unknown>
      });

      // Verificamos si la respuesta contiene un indicador de error
      if (response.status && response.status >= 400) {
        // Manejar errores específicos
        if (response.status === 401) {
          // Este caso ya está manejado por useApi, pero por si acaso
          setError('No estás autorizado para realizar esta acción');
        } else if (response.status === 422 && response.errors) {
          // Error de validación
          setValidationErrors(response.errors);
          setError('La información proporcionada no es válida');
        } else if (response.status === 403) {
          // Error de permisos
          setError('No tienes permisos para actualizar este producto');
        } else {
          // Otro tipo de error
          setError(response.error || 'Ha ocurrido un error al actualizar el producto');
        }
      } else {
        // La petición fue exitosa
        if (response.data) {
          setProduct(response.data);
        } else {
          // Si no hay un campo data específico, usamos la respuesta completa como la data
          // excluyendo el campo status que añadimos
          const responseWithoutStatus = { ...response };
          delete responseWithoutStatus.status;
          setProduct(responseWithoutStatus as unknown as ProductResponse);
        }
        setIsSuccess(true);
      }
      
      return response;
    } catch (error) {
      // Capturar errores de red u otros errores inesperados
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      
      return {
        status: 500,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    product,
    isLoading,
    isSuccess,
    error,
    validationErrors,
    updateProduct,
    resetState
  };
} 
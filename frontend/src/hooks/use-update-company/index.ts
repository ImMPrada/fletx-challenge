import { useState } from 'react';
import { useApi } from '../use-api';
import { ApiResponse, UpdateCompanyParams, CompanyResponse, UseUpdateCompanyReturn, ValidationErrors } from './types';

export function useUpdateCompany(): UseUpdateCompanyReturn {
  const [company, setCompany] = useState<CompanyResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);
  const { fetchData } = useApi();

  const resetState = () => {
    setCompany(null);
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
    setValidationErrors(null);
  };

  const updateCompany = async (id: number, data: UpdateCompanyParams): Promise<ApiResponse<CompanyResponse>> => {
    // Preparamos el estado para la petición
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    setValidationErrors(null);

    try {
      // Realizamos la petición usando useApi
      const response = await fetchData<ApiResponse<CompanyResponse>>(`/api/v1/companies/${id}`, {
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
          setError('No tienes permisos para actualizar esta empresa');
        } else {
          // Otro tipo de error
          setError(response.error || 'Ha ocurrido un error al actualizar la empresa');
        }
      } else {
        // La petición fue exitosa
        if (response.data) {
          setCompany(response.data);
        } else {
          // Si no hay un campo data específico, usamos la respuesta completa como la data
          // excluyendo el campo status que añadimos
          const responseWithoutStatus = { ...response };
          delete responseWithoutStatus.status;
          setCompany(responseWithoutStatus as unknown as CompanyResponse);
        }
        setIsSuccess(true);
      }
      
      return response;
    } catch (error) {
      // Capturar errores de red u otros errores inesperados
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error en updateCompany:', error);
      
      return {
        status: 500,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    company,
    isLoading,
    isSuccess,
    error,
    validationErrors,
    updateCompany,
    resetState
  };
} 
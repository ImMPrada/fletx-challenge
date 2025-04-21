import { useState } from 'react';
import { useApi } from '../use-api';
import { ApiResponse, UpdateUserParams, UserResponse, UseUpdateUserReturn, ValidationErrors } from './types';

export function useUpdateUser(): UseUpdateUserReturn {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);
  const { fetchData } = useApi();

  const resetState = () => {
    setUser(null);
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
    setValidationErrors(null);
  };

  const updateUser = async (id: number, data: UpdateUserParams): Promise<ApiResponse<UserResponse>> => {
    // Preparamos el estado para la petición
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    setValidationErrors(null);

    try {
      // Realizamos la petición usando useApi
      const response = await fetchData<ApiResponse<UserResponse>>(`/api/v1/users/${id}`, {
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
          setError('No tienes permisos para actualizar este usuario');
        } else {
          // Otro tipo de error
          setError(response.error || 'Ha ocurrido un error al actualizar el usuario');
        }
      } else {
        // La petición fue exitosa
        if (response.data) {
          setUser(response.data);
        } else {
          // Si no hay un campo data específico, usamos la respuesta completa como la data
          // excluyendo el campo status que añadimos
          const responseWithoutStatus = { ...response };
          delete responseWithoutStatus.status;
          setUser(responseWithoutStatus as unknown as UserResponse);
        }
        setIsSuccess(true);
      }
      
      return response;
    } catch (error) {
      // Capturar errores de red u otros errores inesperados
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error en updateUser:', error);
      
      return {
        status: 500,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isSuccess,
    error,
    validationErrors,
    updateUser,
    resetState
  };
} 
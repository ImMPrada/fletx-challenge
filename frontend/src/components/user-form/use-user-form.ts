import { useReducer, useEffect } from 'react';
import { UserFormAction, UserFormState } from './types';
import { userFormReducer, initialState } from './reducer';

// Definimos la interfaz User para los datos iniciales
interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  role_id: number | undefined;
  company_id: number | undefined;
  work_position?: string;
  phone_number?: string;
  salary?: string;
}

interface UseUserFormResult {
  formState: UserFormState;
  dispatch: React.Dispatch<UserFormAction>;
  validateForm: () => boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, onSubmit: (data: Omit<UserFormState, 'errors'>) => void) => void;
}

export function useUserForm(initialData?: User | null): UseUserFormResult {
  const [formState, dispatch] = useReducer(userFormReducer, initialState);

  // Llenar el formulario con datos iniciales si existen
  useEffect(() => {
    if (initialData) {
      // Establecer los valores iniciales
      dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'name', value: initialData.name || '' });
      dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'lastName', value: initialData.last_name || '' });
      dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'email', value: initialData.email || '' });
      
      // Asegurarse de que role_id no sea undefined antes de convertirlo a string
      if (initialData.role_id !== undefined && initialData.role_id !== null) {
        dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'roleId', value: initialData.role_id.toString() });
      }
      
      // Asegurarse de que company_id no sea undefined antes de convertirlo a string
      if (initialData.company_id !== undefined && initialData.company_id !== null) {
        dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'companyId', value: initialData.company_id.toString() });
      }
      
      if (initialData.work_position) {
        dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'workPosition', value: initialData.work_position });
      }
      
      if (initialData.phone_number) {
        dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'phoneNumber', value: initialData.phone_number });
      }
      
      if (initialData.salary) {
        dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'salary', value: initialData.salary });
      }
    }
  }, [initialData]);

  const validateEmail = (email: string): boolean => {
    // Validación simple de email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!formState.name) {
      dispatch({ type: 'SET_ERROR', field: 'name', message: 'El nombre es requerido' });
      isValid = false;
    }

    if (!formState.lastName) {
      dispatch({ type: 'SET_ERROR', field: 'lastName', message: 'El apellido es requerido' });
      isValid = false;
    }

    if (!formState.email) {
      dispatch({ type: 'SET_ERROR', field: 'email', message: 'El email es requerido' });
      isValid = false;
    } else if (!validateEmail(formState.email)) {
      dispatch({ type: 'SET_ERROR', field: 'email', message: 'Ingrese un email válido' });
      isValid = false;
    }

    if (!formState.roleId) {
      dispatch({ type: 'SET_ERROR', field: 'roleId', message: 'El rol es requerido' });
      isValid = false;
    }

    if (!formState.companyId) {
      dispatch({ type: 'SET_ERROR', field: 'companyId', message: 'La empresa es requerida' });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    onSubmit: (data: Omit<UserFormState, 'errors'>) => void
  ) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_ERRORS' });

    if (!validateForm()) {
      return;
    }

    // Extraemos solo los datos relevantes (sin los errores)
    const { name, lastName, email, roleId, companyId, workPosition, phoneNumber, salary } = formState;
    onSubmit({ name, lastName, email, roleId, companyId, workPosition, phoneNumber, salary });
  };

  return {
    formState,
    dispatch,
    validateForm,
    handleSubmit,
  };
} 
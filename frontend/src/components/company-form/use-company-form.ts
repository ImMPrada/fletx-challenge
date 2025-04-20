import { useReducer, useEffect } from 'react';
import { CompanyFormAction, CompanyFormState } from './types';
import { companyFormReducer, initialState } from './reducer';
import { Company } from '../../hooks/use-fetch-company/types';

interface UseCompanyFormResult {
  formState: CompanyFormState;
  dispatch: React.Dispatch<CompanyFormAction>;
  validateForm: () => boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, onSubmit: (data: Omit<CompanyFormState, 'errors'>) => void) => void;
}

export function useCompanyForm(initialData?: Company | null): UseCompanyFormResult {
  const [formState, dispatch] = useReducer(companyFormReducer, initialState);

  // Llenar el formulario con datos iniciales si existen
  useEffect(() => {
    if (initialData) {
      // Establecer los valores iniciales
      dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'name', value: initialData.name });
      dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'address', value: initialData.address });
      dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'phoneNumber', value: initialData.phone_number });
      dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'category', value: initialData.category });
      dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'assets', value: initialData.assets.toString() });
      dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'liabilities', value: initialData.liabilities.toString() });
      
      if (initialData.department) {
        dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'department', value: initialData.department.id.toString() });
      }
      if (initialData.city) {
        dispatch({ type: 'UPDATE_INPUT_FIELD', field: 'city', value: initialData.city.id.toString() });
      }
    }
  }, [initialData]);

  const isValidDecimalNumber = (value: string): boolean => {
    // Acepta números enteros o decimales con punto como separador
    return /^-?\d+(\.\d+)?$/.test(value);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!formState.name) {
      dispatch({ type: 'SET_ERROR', field: 'name', message: 'El nombre es requerido' });
      isValid = false;
    }

    if (!formState.address) {
      dispatch({ type: 'SET_ERROR', field: 'address', message: 'La dirección es requerida' });
      isValid = false;
    }

    if (!formState.phoneNumber) {
      dispatch({ type: 'SET_ERROR', field: 'phoneNumber', message: 'El teléfono es requerido' });
      isValid = false;
    }

    if (!formState.category) {
      dispatch({ type: 'SET_ERROR', field: 'category', message: 'El sector es requerido' });
      isValid = false;
    }

    if (!formState.department) {
      dispatch({ type: 'SET_ERROR', field: 'department', message: 'El departamento es requerido' });
      isValid = false;
    }

    if (!formState.city) {
      dispatch({ type: 'SET_ERROR', field: 'city', message: 'La ciudad es requerida' });
      isValid = false;
    }

    if (!formState.assets) {
      dispatch({ type: 'SET_ERROR', field: 'assets', message: 'Los activos son requeridos' });
      isValid = false;
    } else if (!isValidDecimalNumber(formState.assets)) {
      dispatch({ type: 'SET_ERROR', field: 'assets', message: 'Ingrese un valor numérico válido' });
      isValid = false;
    }

    if (!formState.liabilities) {
      dispatch({ type: 'SET_ERROR', field: 'liabilities', message: 'Los pasivos son requeridos' });
      isValid = false;
    } else if (!isValidDecimalNumber(formState.liabilities)) {
      dispatch({ type: 'SET_ERROR', field: 'liabilities', message: 'Ingrese un valor numérico válido' });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    onSubmit: (data: Omit<CompanyFormState, 'errors'>) => void
  ) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_ERRORS' });

    if (!validateForm()) {
      return;
    }

    // Extraemos solo los datos relevantes (sin los errores)
    const { name, address, phoneNumber, category, assets, liabilities, department, city } = formState;
    onSubmit({ name, address, phoneNumber, category, assets, liabilities, department, city });
  };

  return {
    formState,
    dispatch,
    validateForm,
    handleSubmit,
  };
} 
import { useReducer } from 'react';
import { CompanyFormAction, CompanyFormState } from './types';
import { companyFormReducer, initialState } from './reducer';

interface UseCompanyFormResult {
  formState: CompanyFormState;
  dispatch: React.Dispatch<CompanyFormAction>;
  validateForm: () => boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, onSubmit: (data: Omit<CompanyFormState, 'errors'>) => void) => void;
}

export function useCompanyForm(): UseCompanyFormResult {
  const [formState, dispatch] = useReducer(companyFormReducer, initialState);

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
import { useReducer, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { productFormReducer, initialState } from './reducer';
import { ProductFormData, ValidationErrors } from './types';
import { useCreateProduct } from '../../hooks/use-create-product';
import { useUpdateProduct } from '../../hooks/use-update-product';
import { useCompaniesList } from '../../hooks/use-companies-list';
import { ProductResponse } from '../../hooks/use-fetch-product/types';

export const useProductForm = (initialData?: ProductResponse | null, mode: 'create' | 'edit' = 'create') => {
  const [state, dispatch] = useReducer(productFormReducer, initialState);
  const { createProduct, isLoading: isCreating, isSuccess: createSuccess, error: createError, validationErrors: createValidationErrors } = useCreateProduct();
  const { updateProduct, isLoading: isUpdating, isSuccess: updateSuccess, error: updateError, validationErrors: updateValidationErrors } = useUpdateProduct();
  const { fetchCompanies, companies, isLoading: isLoadingCompanies } = useCompaniesList();
  
  const navigate = useNavigate();

  // Cargar compañías al montar el componente
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Inicializar formulario con datos iniciales
  useEffect(() => {
    if (initialData) {
      dispatch({
        type: 'INITIALIZE_FORM',
        data: {
          name: initialData.name,
          category: initialData.category,
          price: initialData.price.toString(),
          company_id: initialData.company.id.toString(),
        },
      });
    }
  }, [initialData]);

  // Manejar errores de validación
  useEffect(() => {
    const validationErrors = mode === 'create' ? createValidationErrors : updateValidationErrors;
    
    if (validationErrors) {
      dispatch({ type: 'SET_VALIDATION_ERRORS', errors: validationErrors });
    }
  }, [createValidationErrors, updateValidationErrors, mode]);

  // Manejar redirección en caso de éxito
  useEffect(() => {
    if ((mode === 'create' && createSuccess) || (mode === 'edit' && updateSuccess)) {
      navigate('/products');
    }
  }, [createSuccess, updateSuccess, navigate, mode]);

  const handleChange = useCallback((field: keyof ProductFormData, value: string) => {
    dispatch({
      type: 'SET_FIELD',
      field,
      value,
    });
  }, []);

  const validateForm = useCallback((): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    if (!state.formData.name.trim()) {
      errors.name = ['El nombre es obligatorio'];
    }
    
    if (!state.formData.category.trim()) {
      errors.category = ['La categoría es obligatoria'];
    }
    
    if (!state.formData.price.trim()) {
      errors.price = ['El precio es obligatorio'];
    } else {
      const priceValue = parseFloat(state.formData.price);
      if (isNaN(priceValue) || priceValue <= 0) {
        errors.price = ['El precio debe ser un número positivo'];
      }
    }
    
    if (!state.formData.company_id.trim()) {
      errors.company_id = ['Debe seleccionar una empresa'];
    }
    
    return errors;
  }, [state.formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_VALIDATION_ERRORS', errors });
      return;
    }
    
    dispatch({ type: 'RESET_VALIDATION_ERRORS' });
    
    const productData = {
      product: {
        name: state.formData.name,
        category: state.formData.category,
        price: parseFloat(state.formData.price),
        company_id: parseInt(state.formData.company_id),
      }
    };
    
    if (mode === 'create') {
      await createProduct(productData);
    } else if (initialData) {
      await updateProduct(initialData.id, productData);
    }
  }, [state.formData, validateForm, createProduct, updateProduct, initialData, mode]);

  return {
    formData: state.formData,
    validationErrors: state.validationErrors,
    handleChange,
    handleSubmit,
    isLoading: isCreating || isUpdating || isLoadingCompanies,
    error: mode === 'create' ? createError : updateError,
    companies,
  };
}; 
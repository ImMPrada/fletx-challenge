import Form from './form';
import { useCompanyForm } from './use-company-form';
import { useCreateCompany } from '../../hooks/use-create-company';
import { useEffect, useState, useContext } from 'react';
import { FlashContext } from '../../contexts/flash-context';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../hooks/use-fetch-company/types';
import { useUpdateCompany } from '../../hooks/use-update-company';

interface CompanyFormProps {
  initialData?: Company | null;
  mode?: 'create' | 'edit';
}

const CompanyForm = ({ initialData = null, mode = 'create' }: CompanyFormProps) => {
  const { formState, dispatch, handleSubmit } = useCompanyForm(initialData);
  const { setFlash } = useContext(FlashContext);
  const { 
    createCompany, 
    isSuccess: isCreateSuccess, 
    validationErrors: createValidationErrors, 
    isLoading: isCreating
  } = useCreateCompany();
  
  const {
    updateCompany,
    isSuccess: isUpdateSuccess,
    validationErrors: updateValidationErrors,
    isLoading: isUpdating
  } = useUpdateCompany();
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const isLoading = mode === 'create' ? isCreating : isUpdating;
  const validationErrors = mode === 'create' ? createValidationErrors : updateValidationErrors;
  const isSuccess = mode === 'create' ? isCreateSuccess : isUpdateSuccess;

  // Manejar errores de validación de la API
  useEffect(() => {
    if (validationErrors && formSubmitted) {
      // Limpiar errores existentes antes de añadir nuevos
      dispatch({ type: 'CLEAR_ERRORS' });
      
      // Convertir errores de validación de la API al formato del formulario
      Object.entries(validationErrors).forEach(([field, errors]) => {
        if (errors && errors.length > 0) {
          // Mapear los nombres de campo si es necesario (backend vs frontend)
          const fieldMap: Record<string, string> = {
            phone_number: 'phoneNumber',
            city_id: 'city'
          };

          const formField = fieldMap[field] || field;

          dispatch({
            type: 'SET_ERROR',
            field: formField as keyof Omit<typeof formState, 'errors'>,
            message: errors[0]
          });
        }
      });
      
      // Scroll al inicio del formulario para mostrar los errores
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validationErrors, dispatch, formSubmitted]);

  // Manejar mensaje de éxito o error general
  useEffect(() => {
    if (isSuccess) {
      setFormSubmitted(false);

      setFlash(
        mode === 'create' ? 'Empresa creada exitosamente' : 'Empresa actualizada exitosamente', 
        'success'
      );
      navigate('/companies'); 
    }
   
  }, [isSuccess]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, async (data) => {
      setFormSubmitted(true);
      
      // Preparamos el cuerpo de la petición con los datos del formulario
      const requestBody = {
        company: {
          name: data.name,
          address: data.address,
          phone_number: data.phoneNumber,
          category: data.category,
          assets: data.assets,
          liabilities: data.liabilities,
          department: data.department,
          city_id: parseInt(data.city),
        }
      };
      
      try {
        if (mode === 'create') {
          await createCompany(requestBody);
        } else if (mode === 'edit' && initialData) {
          await updateCompany(initialData.id, requestBody);
        }
      } catch {
        // Error silenciado
      }
    });
  };

  return (
    <>
      <Form
        formState={formState}
        dispatch={dispatch}
        handleSubmit={handleFormSubmit}
        isLoading={isLoading}
        mode={mode}
      />
    </>
  );
};

export default CompanyForm;

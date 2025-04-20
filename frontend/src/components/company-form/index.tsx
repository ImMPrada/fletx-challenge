import Form from './form';
import { useCompanyForm } from './use-company-form';
import { useCreateCompany } from '../../hooks/use-create-company';
import { useEffect, useState, useContext } from 'react';
import { FlashContext } from '../../contexts/flash-context';


const CompanyForm = () => {
  const { formState, dispatch, handleSubmit } = useCompanyForm();
  const { setFlash } = useContext(FlashContext);
  const { 
    createCompany, 
    isSuccess, 
    error, 
    validationErrors, 
    isLoading
  } = useCreateCompany();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Manejar errores de validación de la API
  useEffect(() => {
    if (validationErrors && formSubmitted) {
      console.log('Errores de validación recibidos:', validationErrors);
      
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
      console.log('Empresa creada exitosamente');
      setFormSubmitted(false);

      // Mostrar mensaje de éxito o redireccionar
      // Por ejemplo:
      // navigate('/empresas');
      setFlash('Empresa creada exitosamente', 'success');
    }
  }, [isSuccess, error]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, async (data) => {
      setFormSubmitted(true);
      console.log('Datos de la empresa:', data);
      
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
        await createCompany(requestBody); 

      } catch (error) {
        console.error('Error inesperado:', error);
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
      />
    </>
  );
};

export default CompanyForm;

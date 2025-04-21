import Form from './form';
import { useUserForm } from './use-user-form';
import { useCreateUser } from '../../hooks/use-create-user';
import { useEffect, useState, useContext } from 'react';
import { FlashContext } from '../../contexts/flash-context';
import { useNavigate } from 'react-router-dom';
import { useUpdateUser } from '../../hooks/use-update-user';
import { UpdateUserParams } from '../../hooks/use-update-user/types';

// Tipos temporales hasta crear el hook real
interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  role_id: number;
  company_id: number;
  work_position?: string;
  phone_number?: string;
  salary?: string;
}

interface UserFormProps {
  initialData?: User | null;
  mode?: 'create' | 'edit';
}

const UserForm = ({ initialData = null, mode = 'create' }: UserFormProps) => {
  const { formState, dispatch, handleSubmit } = useUserForm(initialData);
  const { setFlash } = useContext(FlashContext);
  const { 
    createUser, 
    isSuccess: isCreateSuccess, 
    validationErrors: createValidationErrors, 
    isLoading: isCreating
  } = useCreateUser();
  
  const {
    updateUser,
    isSuccess: isUpdateSuccess,
    validationErrors: updateValidationErrors,
    isLoading: isUpdating
  } = useUpdateUser();
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const isLoading = mode === 'create' ? isCreating : isUpdating;
  const validationErrors = mode === 'create' ? createValidationErrors : updateValidationErrors;
  const isSuccess = mode === 'create' ? isCreateSuccess : isUpdateSuccess;

  // Manejar errores de validación de la API
  useEffect(() => {
    if (validationErrors && formSubmitted) {
      console.log('Errores de validación recibidos:', validationErrors);
      
      // Limpiar errores existentes antes de añadir nuevos
      dispatch({ type: 'CLEAR_ERRORS' });
      
      // Convertir errores de validación de la API al formato del formulario
      Object.entries(validationErrors || {}).forEach(([field, errors]) => {
        if (errors && errors.length > 0) {
          // Mapear los nombres de campo si es necesario (backend vs frontend)
          const fieldMap: Record<string, string> = {
            last_name: 'lastName',
            role_id: 'roleId',
            company_id: 'companyId',
            phone_number: 'phoneNumber',
            work_position: 'workPosition'
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
      console.log(mode === 'create' ? 'Usuario creado exitosamente' : 'Usuario actualizado exitosamente');
      setFormSubmitted(false);

      setFlash(
        mode === 'create' ? 'Usuario creado exitosamente' : 'Usuario actualizado exitosamente', 
        'success'
      );
      navigate('/users'); 
    }
   
  }, [isSuccess, mode, navigate, setFlash]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, async (data) => {
      setFormSubmitted(true);
      console.log('Datos del usuario:', data);
      
      // Preparamos el cuerpo de la petición con los datos del formulario
      const requestBody: UpdateUserParams = {
        user: {
          name: data.name,
          last_name: data.lastName,
          email: data.email,
          role_id: parseInt(data.roleId),
          company_id: parseInt(data.companyId),
          work_position: data.workPosition,
          phone_number: data.phoneNumber,
          salary: data.salary
        }
      };
      
      try {
        if (mode === 'create') {
          await createUser(requestBody);
        } else if (mode === 'edit' && initialData) {
          await updateUser(parseInt(initialData.id), requestBody);
        }
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
        mode={mode}
      />
    </>
  );
};

export default UserForm;

import { Button } from '../ui';
import { Input, Select } from '../ui/form-elements';
import { FormProps } from './types';
import Loading from '../loading';
import { useCompaniesList } from '../../hooks/use-companies-list';
import { useContext, useEffect } from 'react';
import { RolesContext } from '../../contexts/roles-context';

const Form = ({
  formState,
  dispatch,
  handleSubmit,
  isLoading,
  mode = 'create'
}: FormProps) => {
  const { companies, fetchCompanies, isLoading: isLoadingCompanies } = useCompaniesList();
  const { roles, isFetchingRoles } = useContext(RolesContext);
  
  const { 
    name, 
    lastName, 
    email, 
    roleId, 
    companyId, 
    workPosition, 
    phoneNumber, 
    salary, 
    errors 
  } = formState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_INPUT_FIELD',
      field: name as keyof Omit<typeof formState, 'errors'>,
      value
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_INPUT_FIELD',
      field: name as keyof Omit<typeof formState, 'errors'>,
      value
    });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (isLoadingCompanies || isFetchingRoles) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8 p-10 bg-white rounded-md w-full mx-2 max-w-[700px]">
      <h1 className="text-heading-s font-bold text-navy">
        {mode === 'create' ? 'Información del usuario' : 'Editar información del usuario'}
      </h1>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:gap-2">
            <Input
              label="Nombre:"
              name="name"
              errorMessage={errors.name}
              type="text"
              placeholder="Nombre del usuario"
              value={name}
              onChange={handleInputChange}
            />

            <Input
              label="Apellido:"
              name="lastName"
              errorMessage={errors.lastName}
              type="text"
              placeholder="Apellido del usuario"
              value={lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-2">
            <Input
              label="Email:"
              name="email"
              errorMessage={errors.email}
              type="email"
              placeholder="Email del usuario"
              value={email}
              onChange={handleInputChange}
            />

            <Input
              label="Teléfono:"
              name="phoneNumber"
              errorMessage={errors.phoneNumber}
              type="tel"
              placeholder="Número de teléfono"
              value={phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-2">
            <Select
              label="Rol:"
              name="roleId"
              errorMessage={errors.roleId}
              value={roleId}
              onChange={handleSelectChange}
              options={[
                { id: "placeholder", value: "", label: "Selecciona un rol" },
                ...roles.map(role => ({
                  id: String(role.id),
                  value: String(role.id),
                  label: role.code
                }))
              ]}
            />

            <Select
              label="Empresa:"
              name="companyId"
              errorMessage={errors.companyId}
              value={companyId}
              onChange={handleSelectChange}
              options={[
                { id: "placeholder", value: "", label: "Selecciona una empresa" },
                ...companies.map(company => ({
                  id: String(company.id),
                  value: String(company.id),
                  label: company.name
                }))
              ]}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-2">
            <Input
              label="Cargo:"
              name="workPosition"
              errorMessage={errors.workPosition}
              type="text"
              placeholder="Cargo del usuario"
              value={workPosition}
              onChange={handleInputChange}
            />

            <Input
              label="Salario:"
              name="salary"
              errorMessage={errors.salary}
              type="text"
              placeholder="Salario del usuario (ej: 5000.75)"
              value={salary}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {isLoading ? (
          <Loading/>
        ) : (
          <Button
            label={mode === 'create' ? "Guardar usuario" : "Actualizar usuario"}
            type="submit"
            variant="primary"
          />
        )}
      </form>
    </div>
  );
};

export default Form;

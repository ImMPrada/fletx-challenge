import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { Button } from '../ui';
import { Input, Select } from '../ui/form-elements';
import { FormProps } from './types';
import { DepartmentsContext } from '../../contexts/departments-context';
import { CitiesType } from '../../contexts/departments-context/types';

const Form = ({
  formState,
  dispatch,
  handleSubmit,
}: FormProps) => {
  const { departments, getCities } = useContext(DepartmentsContext);
  const [cities, setCities] = useState<CitiesType[]>([]);
  const { name, address, phoneNumber, category, assets, liabilities, department, city, errors } = formState;

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
    if (formState.department) {
      const departmentCities = getCities(Number(formState.department));
      setCities(departmentCities);
      return;
    }

    setCities([]);
  }, [formState.department]);

  return (
    <div className="flex flex-col gap-4 p-10 bg-white rounded-md w-full mx-2 max-w-[500px]">
      <h1 className="text-heading-s font-bold text-navy">Información de la empresa</h1>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input
          label="Nombre:"
          name="name"
          errorMessage={errors.name}
          type="text"
          placeholder="Nombre de la empresa"
          value={name}
          onChange={handleInputChange}
        />

        <Input
          label="Sector:"
          name="category"
          errorMessage={errors.category}
          type="text"
          placeholder="Sector de la empresa"
          value={category}
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

        <Select
          label="Departamento:"
          name="department"
          errorMessage={errors.department}
          value={department}
          onChange={handleSelectChange}
          options={[
            { id: "placeholder", value: "", label: "Selecciona un departamento" },
            ...departments.map(dept => ({
              id: String(dept.id),
              value: String(dept.id),
              label: dept.name
            }))
          ]}
        />

        <Select
          label="Ciudad:"
          name="city"
          errorMessage={errors.city}
          value={city}
          onChange={handleSelectChange}
          disabled={cities.length === 0}
          options={[
            { id: "placeholder", value: "", label: "Selecciona una ciudad" },
            ...cities.map(city => ({
              id: String(city.id),
              value: String(city.id),
              label: city.name
            }))
          ]}
        />

        <Input
          label="Dirección:"
          name="address"
          errorMessage={errors.address}
          type="text"
          placeholder="Dirección de la empresa"
          value={address}
          onChange={handleInputChange}
        />

        <Input
          label="Activos:"
          name="assets"
          errorMessage={errors.assets}
          type="text"
          placeholder="Activos de la empresa (ej: 10000.50)"
          value={assets}
          onChange={handleInputChange}
        />

        <Input
          label="Pasivos:"
          name="liabilities"
          errorMessage={errors.liabilities}
          type="text"
          placeholder="Pasivos de la empresa (ej: 5000.75)"
          value={liabilities}
          onChange={handleInputChange}
        />

        <Button
          label="Guardar información"
          type="submit"
          variant="primary"
        />
      </form>
    </div>
  );
};

export default Form;

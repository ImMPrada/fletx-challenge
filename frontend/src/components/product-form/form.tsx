import { ProductFormData, ValidationErrors } from './types';
import { Company } from '../../hooks/use-companies-list/types';
import Loading from '../loading';
import { Button } from '../ui';
import { Input, Select } from '../ui/form-elements';

interface ProductFormComponentProps {
  formData: ProductFormData;
  validationErrors: ValidationErrors;
  handleChange: (field: keyof ProductFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  companies: Company[];
  mode: 'create' | 'edit';
}

const ProductFormComponent = ({
  formData,
  validationErrors,
  handleChange,
  handleSubmit,
  isLoading,
  error,
  companies,
  mode,
}: ProductFormComponentProps) => {
  if (isLoading && companies.length === 0) {
    return <Loading />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof ProductFormData, value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof ProductFormData, value);
  };

  return (
    <div className="flex flex-col gap-8 p-10 bg-white rounded-md w-full mx-2 max-w-[700px]">
      <h1 className="text-heading-s font-bold text-navy">
        {mode === 'create' ? 'Crear Nuevo Producto' : 'Editar Producto'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:gap-2">
            <Input
              label="Nombre:"
              name="name"
              errorMessage={validationErrors.name?.[0]}
              type="text"
              placeholder="Nombre del producto"
              value={formData.name}
              onChange={handleInputChange}
            />

            <Input
              label="Categoría:"
              name="category"
              errorMessage={validationErrors.category?.[0]}
              type="text"
              placeholder="Categoría del producto"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col md:flex-row md:gap-2">
            <Input
              label="Precio:"
              name="price"
              errorMessage={validationErrors.price?.[0]}
              type="number"
              min="0"
              step="0.01"
              placeholder="Precio del producto"
              value={formData.price}
              onChange={handleInputChange}
            />

            <Select
              label="Empresa:"
              name="company_id"
              errorMessage={validationErrors.company_id?.[0]}
              value={formData.company_id}
              onChange={handleSelectChange}
              options={[
                { id: "placeholder", value: "", label: "Seleccione una empresa" },
                ...companies.map(company => ({
                  id: String(company.id),
                  value: String(company.id),
                  label: company.name
                }))
              ]}
            />
          </div>
        </div>
        
        {isLoading ? (
          <Loading />
        ) : (
          <Button
            label={mode === 'create' ? 'Crear Producto' : 'Actualizar Producto'}
            type="submit"
            variant="primary"
          />
        )}
      </form>
    </div>
  );
};

export default ProductFormComponent; 
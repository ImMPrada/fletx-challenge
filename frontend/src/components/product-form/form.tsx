import { ProductFormData, ValidationErrors } from './types';
import { Company } from '../../hooks/use-companies-list/types';
import Loading from '../loading';
import { Button } from '../ui';

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

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl font-bold mb-6">
        {mode === 'create' ? 'Crear Nuevo Producto' : 'Editar Producto'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className={`shadow appearance-none border ${
              validationErrors.name ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="name"
            type="text"
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs italic mt-1">{validationErrors.name[0]}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Categoría
          </label>
          <input
            className={`shadow appearance-none border ${
              validationErrors.category ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="category"
            type="text"
            placeholder="Categoría del producto"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          />
          {validationErrors.category && (
            <p className="text-red-500 text-xs italic mt-1">{validationErrors.category[0]}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Precio
          </label>
          <input
            className={`shadow appearance-none border ${
              validationErrors.price ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Precio del producto"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
          />
          {validationErrors.price && (
            <p className="text-red-500 text-xs italic mt-1">{validationErrors.price[0]}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company_id">
            Empresa
          </label>
          <select
            className={`shadow appearance-none border ${
              validationErrors.company_id ? 'border-red-500' : 'border-gray-300'
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="company_id"
            value={formData.company_id}
            onChange={(e) => handleChange('company_id', e.target.value)}
          >
            <option value="">Seleccione una empresa</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          {validationErrors.company_id && (
            <p className="text-red-500 text-xs italic mt-1">{validationErrors.company_id[0]}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : mode === 'create' ? 'Crear Producto' : 'Actualizar Producto'}
          </button>

          {isLoading ? (
            <Loading/>
            ) : (
              <Button
                label={isLoading ? 'Procesando...' : mode === 'create' ? 'Crear Producto' : 'Actualizar Producto'}
                type="submit"
                variant="primary"
              />
            )}
        </div>
      </form>
    </div>
  );
};

export default ProductFormComponent; 
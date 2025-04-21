import { ProductFormProps } from './types';
import { useProductForm } from './use-product-form';
import ProductFormComponent from './form';

const ProductForm = ({ initialData, mode = 'create' }: ProductFormProps) => {
  const { 
    formData, 
    validationErrors, 
    handleChange, 
    handleSubmit, 
    isLoading, 
    error, 
    companies 
  } = useProductForm(initialData, mode);

  return (
    <ProductFormComponent
      formData={formData}
      validationErrors={validationErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      companies={companies}
      mode={mode}
    />
  );
};

export default ProductForm; 
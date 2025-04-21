import { useEffect, useContext } from 'react';
import { useProductsList } from '../../hooks/use-products-list';
import { FlashContext } from '../../contexts/flash-context';
import Loading from '../loading';
import ProductsTable from '../products-table';
import { Button } from '../ui';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@primer/octicons-react';
import { ProductsListProps } from './types';

const ProductsList = ({
  canCreateProduct,
  canUpdateProduct,
  canDeleteProduct
}: ProductsListProps) => {
  const { products, isLoading, error, fetchProducts } = useProductsList();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (error) {
      setFlash(error, 'error');
    }
  }, [error, setFlash]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-center gap-6 items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        {canCreateProduct && (
          <Button 
            label={<PlusIcon />}
            type="button" 
            variant="primary" 
            onClick={() => navigate('/products/new')}
          />
        )}
      </div>

      <ProductsTable
        products={products}
        canUpdateProduct={canUpdateProduct}
        canDeleteProduct={canDeleteProduct}
        fetchProducts={fetchProducts}
      />
    </>
  );
};

export default ProductsList; 
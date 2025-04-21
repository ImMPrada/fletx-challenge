import { useEffect, useContext } from 'react';
import { useProductsList } from '../../hooks/use-products-list';
import { FlashContext } from '../../contexts/flash-context';
import Loading from '../loading';
import ProductsTable from '../products-table';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { FEATURES } from '../../data/features';
import { Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const { products, isLoading, error, fetchProducts } = useProductsList();
  const { setFlash } = useContext(FlashContext);
  const { checkFeature } = useFeatureCheck();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    checkFeature(FEATURES.CREATE_PRODUCT);
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
    <div>
      <div className="flex justify-center gap-6 items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>

        <Button 
          label="Agregar" 
          type="button" 
          variant="primary" 
          onClick={() => navigate('/products/new')}
        />

      </div>
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsList; 
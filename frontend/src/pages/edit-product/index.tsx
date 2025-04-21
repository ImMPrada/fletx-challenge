import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import ProductForm from '../../components/product-form';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';
import { useFetchProduct } from '../../hooks/use-fetch-product';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const {
    checkFeature: checkUpdateProduct,
    isLoading: isCheckingUpdateProduct,
    can: canEditProduct
  } = useFeatureCheck();
  const { product, isLoading: isLoadingProduct, fetchProduct } = useFetchProduct();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkUpdateProduct(FEATURES.UPDATE_PRODUCT);
  }, []);

  useEffect(() => {
    if(!canEditProduct) { return; }

    fetchProduct(id ?? '');
  }, [canEditProduct]);

  useEffect(() => {
    if (canEditProduct === false) {
      setFlash('No tienes permisos para editar un producto', 'warning');
      navigate('/products');
    }
  }, [canEditProduct, setFlash, navigate]);

  if (isCheckingUpdateProduct || isLoadingProduct) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    );
  }

  if (!product && !isLoadingProduct && !isLoadingProduct) {
    return (
      <ContainerWithFloatingNavbar>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>No se encontró el producto</p>
        </div>
      </ContainerWithFloatingNavbar>
    );
  }

  return (
    <ContainerWithFloatingNavbar>
      <h1 className="text-2xl font-bold mb-6">
        Editar Producto
      </h1>

      <ProductForm initialData={product} mode="edit" />
    </ContainerWithFloatingNavbar>
  );
};

export default EditProduct; 
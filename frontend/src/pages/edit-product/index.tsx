import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import ProductForm from '../../components/product-form';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';
import { useFetchProduct } from '../../hooks/use-fetch-product';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { checkFeature, isLoading: isCheckingFeature, can: canEditProduct } = useFeatureCheck();
  const { product, isLoading: isLoadingProduct, error, fetchProduct } = useFetchProduct();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  const hasCheckedPermission = useRef(false);
  const hasLoadedProduct = useRef(false);
  
  const verifyPermission = useCallback(() => {
    checkFeature(FEATURES.UPDATE_PRODUCT);
  }, [checkFeature]);
  
  // Efecto para verificar permisos solo una vez
  useEffect(() => {
    if (!hasCheckedPermission.current) {
      verifyPermission();
      hasCheckedPermission.current = true;
    }
  }, [verifyPermission]);

  // Efecto para cargar el producto solo una vez cuando tengamos permisos
  useEffect(() => {
    if (id && canEditProduct === true && !hasLoadedProduct.current) {
      fetchProduct(id);
      hasLoadedProduct.current = true;
    }
  }, [id, fetchProduct, canEditProduct]);

  // Efecto para redirigir si no tiene permisos
  useEffect(() => {
    if (canEditProduct === false) {
      setFlash('No tienes permisos para editar un producto', 'warning');
      navigate('/');
    }
  }, [canEditProduct, setFlash, navigate]);

  // Efecto para manejar errores
  useEffect(() => {
    if (error) {
      setFlash(error, 'error');
      navigate('/products');
    }
  }, [error, setFlash, navigate]);

  if (isCheckingFeature || isLoadingProduct) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    );
  }

  if (!product && !isLoadingProduct && !hasLoadedProduct.current) {
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
      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
      <ProductForm initialData={product} mode="edit" />
    </ContainerWithFloatingNavbar>
  );
};

export default EditProduct; 
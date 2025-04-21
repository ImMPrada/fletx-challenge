import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import { useContext, useEffect } from 'react';
import { FEATURES } from '../../data/features';
import { useNavigate } from 'react-router-dom';
import { FlashContext } from '../../contexts/flash-context';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import Loading from '../../components/loading';
import ProductsList from '../../components/products-list';

const ProductsPage = () => {
  const { checkFeature, isLoading: isCheckingFeature, can: canListProducts } = useFeatureCheck();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkFeature(FEATURES.LIST_PRODUCTS);
  }, []); 

  useEffect(() => {
    if (canListProducts === undefined) { return; }

    if (!canListProducts) {
      setFlash('No tienes permisos para listar productos', 'warning');
      navigate('/');
    }
  }, [canListProducts, navigate, setFlash]);

  if (isCheckingFeature) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    )
  }

  return (
    <ContainerWithFloatingNavbar>
      <ProductsList />
    </ContainerWithFloatingNavbar>
  );
};

export default ProductsPage; 
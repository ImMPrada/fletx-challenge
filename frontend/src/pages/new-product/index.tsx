import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import ProductForm from '../../components/product-form';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';

const NewProduct = () => {
  const { checkFeature, isLoading: isCheckingFeature, can: canCreateProduct } = useFeatureCheck();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkFeature(FEATURES.CREATE_PRODUCT);
  }, []); 

  useEffect(() => {
    if (canCreateProduct === undefined) { return; }

    if (!canCreateProduct) {
      setFlash('No tienes permisos para crear un producto', 'warning');
      navigate('/');
    }
  }, [canCreateProduct, navigate, setFlash]);

  if (isCheckingFeature) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    )
  }

  return (
    <ContainerWithFloatingNavbar>
      <ProductForm />
    </ContainerWithFloatingNavbar>
  );
};

export default NewProduct; 
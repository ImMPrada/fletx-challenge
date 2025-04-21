import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import { useContext, useEffect } from 'react';
import { FEATURES } from '../../data/features';
import { useNavigate } from 'react-router-dom';
import { FlashContext } from '../../contexts/flash-context';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import Loading from '../../components/loading';
import ProductsList from '../../components/products-list';

const ProductsPage = () => {
  const {
    checkFeature: checkListProducts,
    isLoading: isCheckingListProducts,
    can: canListProducts
  } = useFeatureCheck();

  const {
    checkFeature: checkCreateProduct,
    isLoading: isCheckingCreateProduct,
    can: canCreateProduct
  } = useFeatureCheck();

  const {
    checkFeature: checkUpdateProduct,
    isLoading: isCheckingUpdateProduct,
    can: canUpdateProduct
  } = useFeatureCheck();

  const {
    checkFeature: checkDeleteProduct,
    isLoading: isCheckingDeleteProduct,
    can: canDeleteProduct
  } = useFeatureCheck();
 
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkListProducts(FEATURES.LIST_PRODUCTS);
    checkCreateProduct(FEATURES.CREATE_PRODUCT);
    checkUpdateProduct(FEATURES.UPDATE_PRODUCT);
    checkDeleteProduct(FEATURES.DELETE_PRODUCT);
  }, []); 

  useEffect(() => {
    if (canListProducts === undefined) { return; }

    if (!canListProducts) {
      setFlash('No tienes permisos para listar productos', 'warning');
      navigate('/');
    }
  }, [canListProducts, navigate, setFlash]);

  if (isCheckingListProducts || isCheckingCreateProduct || isCheckingUpdateProduct || isCheckingDeleteProduct) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    )
  }

  return (
    <ContainerWithFloatingNavbar>
      <ProductsList
        canCreateProduct={canCreateProduct}
        canUpdateProduct={canUpdateProduct}
        canDeleteProduct={canDeleteProduct}
      />
    </ContainerWithFloatingNavbar>
  );
};

export default ProductsPage; 
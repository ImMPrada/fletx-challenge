import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';
import CompaniesList from '../../components/comapnies-list';

const Companies = () => {
  const { checkFeature, isLoading: isCheckingFeature, can: canListCompanies } = useFeatureCheck();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkFeature(FEATURES.LIST_COMPANIES);
  }, []); 

  useEffect(() => {
    if (canListCompanies === undefined) { return; }

    if (!canListCompanies) {
      setFlash('No tienes permisos para listar empresas', 'warning');
      navigate('/');
    }
  }, [canListCompanies]);

  if (isCheckingFeature) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    )
  }

  return (
    <ContainerWithFloatingNavbar>
      <CompaniesList />
    </ContainerWithFloatingNavbar>
  );
};

export default Companies;

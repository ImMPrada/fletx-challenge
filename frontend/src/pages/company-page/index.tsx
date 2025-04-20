import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import Company from '../../components/company';
import { useContext } from 'react';
import { FEATURES } from '../../data/features';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlashContext } from '../../contexts/flash-context';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import Loading from '../../components/loading';

const CompanyPage = () => {
  const { checkFeature, isLoading: isCheckingFeature, can: canListCompanies } = useFeatureCheck();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkFeature(FEATURES.VIEW_COMPANY);
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
      <Company />
    </ContainerWithFloatingNavbar>
  );
};

export default CompanyPage;

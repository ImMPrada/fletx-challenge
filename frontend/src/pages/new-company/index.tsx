import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import CompanyForm from '../../components/company-form';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';

const NewCompany = () => {
  const { checkFeature, isLoading: isCheckingFeature, can: canCreateCompany } = useFeatureCheck();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkFeature(FEATURES.CREATE_COMPANY);
  }, []); 

  useEffect(() => {
    if (canCreateCompany === undefined) { return; }

    if (!canCreateCompany) {
      setFlash('No tienes permisos para crear una empresa', 'warning');
      navigate('/');
    }
  }, [canCreateCompany]);

  if (isCheckingFeature) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    )
  }

  return (
    <ContainerWithFloatingNavbar>
      <CompanyForm />
    </ContainerWithFloatingNavbar>
  );
};

export default NewCompany;

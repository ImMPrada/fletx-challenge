import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';
import CompaniesList from '../../components/comapnies-list';

const Companies = () => {
  const { 
    checkFeature: checkListCompanies,
    isLoading: isCheckingListCompanies,
    can: canListCompanies
  } = useFeatureCheck();

  const {
    checkFeature: checkDeleteCompany,
    isLoading: isCheckingDeleteCompany,
    can: canDeleteCompany
  } = useFeatureCheck();

  const {
    checkFeature: checkCreateCompany,
    isLoading: isCheckingCreateCompany,
    can: canCreateCompany
  } = useFeatureCheck();

  const {
    checkFeature: checkUpdateCompany,
    isLoading: isCheckingUpdateCompany,
    can: canUpdateCompany
  } = useFeatureCheck();

  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkListCompanies(FEATURES.LIST_COMPANIES);
    checkDeleteCompany(FEATURES.DELETE_COMPANY);
    checkCreateCompany(FEATURES.CREATE_COMPANY);
    checkUpdateCompany(FEATURES.UPDATE_COMPANY);
  }, []); 

  useEffect(() => {
    if (canListCompanies === undefined) { return; }

    if (!canListCompanies) {
      setFlash('No tienes permisos para listar empresas', 'warning');
      navigate('/');
    }
  }, [canListCompanies, navigate, setFlash]);

  if (isCheckingListCompanies || isCheckingDeleteCompany || isCheckingCreateCompany || isCheckingUpdateCompany) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    )
  }

  return (
    <ContainerWithFloatingNavbar>
      <CompaniesList
        canDeleteCompany={canDeleteCompany ?? false}
        canCreateCompany={canCreateCompany ?? false}
        canUpdateCompany={canUpdateCompany ?? false}
      />
    </ContainerWithFloatingNavbar>
  );
};

export default Companies;

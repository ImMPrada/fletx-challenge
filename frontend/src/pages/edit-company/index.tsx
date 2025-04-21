import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import CompanyForm from '../../components/company-form';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';
import { useFetchCompany } from '../../hooks/use-fetch-company';

const EditCompany = () => {
  const { id } = useParams<{ id: string }>();
  const { checkFeature, isLoading: isCheckingFeature, can: canEditCompany } = useFeatureCheck();
  const { company, isLoading: isLoadingCompany, error, fetchCompany } = useFetchCompany();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  const verifyPermission = useCallback(() => {
    checkFeature(FEATURES.UPDATE_COMPANY);
  }, [checkFeature]);
  
  useEffect(() => {
    let mounted = true;
    
    if (mounted) {
      verifyPermission();
    }
    
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (id && canEditCompany) {
      fetchCompany(id);
    }
  }, [id, fetchCompany, canEditCompany]);

  useEffect(() => {
    if (canEditCompany === undefined) { return; }

    if (!canEditCompany) {
      setFlash('No tienes permisos para editar una empresa', 'warning');
      navigate('/');
    }
  }, [canEditCompany]);

  useEffect(() => {
    if (error) {
      setFlash(error, 'error');
      navigate('/companies');
    }
  }, [error]);

  if (isCheckingFeature || isLoadingCompany) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    );
  }

  if (!company && !isLoadingCompany) {
    return (
      <ContainerWithFloatingNavbar>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>No se encontró la empresa</p>
        </div>
      </ContainerWithFloatingNavbar>
    );
  }

  return (
    <ContainerWithFloatingNavbar>
      <h1 className="text-2xl font-bold mb-6">Editar Empresa</h1>
      <CompanyForm initialData={company} mode="edit" />
    </ContainerWithFloatingNavbar>
  );
};

export default EditCompany;

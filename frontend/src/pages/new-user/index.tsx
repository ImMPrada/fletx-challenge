import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import UserForm from '../../components/user-form';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';

const NewUser = () => {
  const { checkFeature, isLoading: isCheckingFeature, can: canCreateUser } = useFeatureCheck();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkFeature(FEATURES.CREATE_USER);
   
  }, []); 

  useEffect(() => {
    if (canCreateUser === undefined) { return; }

    if (!canCreateUser) {
      setFlash('No tienes permisos para crear un usuario', 'warning');
      navigate('/');
    }
  }, [canCreateUser, navigate, setFlash]);

  if (isCheckingFeature) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    )
  }

  return (
    <ContainerWithFloatingNavbar>
      <UserForm />
    </ContainerWithFloatingNavbar>
  );
};

export default NewUser;

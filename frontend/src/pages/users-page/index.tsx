import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import { useContext } from 'react';
import { FEATURES } from '../../data/features';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlashContext } from '../../contexts/flash-context';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import Loading from '../../components/loading';
import UsersList from '../../components/users-list';

const UsersPage = () => {
  const { checkFeature, isLoading: isCheckingFeature, can: canListUsers } = useFeatureCheck();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkFeature(FEATURES.VIEW_USERS);
   
  }, []); 

  useEffect(() => {
    if (canListUsers === undefined) { return; }

    if (!canListUsers) {
      setFlash('No tienes permisos para listar usuarios', 'warning');
      navigate('/');
    }
  }, [canListUsers]);

  if (isCheckingFeature) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    )
  }

  return (
    <ContainerWithFloatingNavbar>
      <UsersList />
    </ContainerWithFloatingNavbar>
  );
};

export default UsersPage;

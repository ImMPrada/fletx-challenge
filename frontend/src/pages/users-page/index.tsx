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
  const {
    checkFeature: checkListUsers,
    isLoading: isCheckingListUsers,
    can: canListUsers,
  } = useFeatureCheck();
  const {
    checkFeature: checkCreateUser,
    isLoading: isCheckingCreateUser,
    can: canCreateUser
  } = useFeatureCheck();
  const {
    checkFeature: checkUpdateUser,
    isLoading: isCheckingUpdateUser,
    can: canUpdateUser
  } = useFeatureCheck();
  const {
    checkFeature: checkDeleteUser,
    isLoading: isCheckingDeleteUser,
    can: canDeleteUser
  } = useFeatureCheck();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    checkListUsers(FEATURES.VIEW_USERS);
    checkCreateUser(FEATURES.CREATE_USER);
    checkUpdateUser(FEATURES.UPDATE_USER);
    checkDeleteUser(FEATURES.DELETE_USER);
  }, []); 

  useEffect(() => {
    if (canListUsers === undefined) { return; }

    if (!canListUsers) {
      setFlash('No tienes permisos para listar usuarios', 'warning');
      navigate('/');
    }
  }, [canListUsers]);

  if (isCheckingListUsers || isCheckingCreateUser || isCheckingUpdateUser || isCheckingDeleteUser) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    )
  }

  return (
    <ContainerWithFloatingNavbar>
      <UsersList
        canCreateUser={canCreateUser}
        canUpdateUser={canUpdateUser}
        canDeleteUser={canDeleteUser}
      />
    </ContainerWithFloatingNavbar>
  );
};

export default UsersPage;

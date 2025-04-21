import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import UserForm from '../../components/user-form';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';
import { useFetchUser } from '../../hooks/use-fetch-user';

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const {
    checkFeature: checkUpdateUser,
    isLoading: isCheckingUpdateUser,
    can: canEditUser
  } = useFeatureCheck();
  const {
    user,
    isLoading: isFetchingUser,
    fetchUser
  } = useFetchUser();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkUpdateUser(FEATURES.UPDATE_USER);
  }, []);

  useEffect(() => {
    if(!canEditUser) { return; }

    fetchUser(id ?? '');
  }, [id, canEditUser]);

  useEffect(() => {
    if (canEditUser === false) {
      setFlash('No tienes permisos para editar un usuario', 'warning');
      navigate('/users');
    }
  }, [canEditUser, setFlash, navigate]);

  if (isCheckingUpdateUser || isFetchingUser) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    );
  }

  if (!user && !isFetchingUser && !isFetchingUser) {
    return (
      <ContainerWithFloatingNavbar>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>No se encontró el usuario</p>
        </div>
      </ContainerWithFloatingNavbar>
    );
  }

  return (
    <ContainerWithFloatingNavbar>
      <h1 className="text-2xl font-bold mb-6">Editar Usuario</h1>
      <UserForm initialData={user} mode="edit" />
    </ContainerWithFloatingNavbar>
  );
};

export default EditUser;

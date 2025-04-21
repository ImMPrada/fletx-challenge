import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import UserForm from '../../components/user-form';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { useEffect, useContext, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';
import { FEATURES } from '../../data/features';
import { useFetchUser } from '../../hooks/use-fetch-user';

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { checkFeature, isLoading: isCheckingFeature, can: canEditUser } = useFeatureCheck();
  const { user, isLoading: isLoadingUser, error, fetchUser } = useFetchUser();
  const { setFlash } = useContext(FlashContext);
  const navigate = useNavigate();
  const hasCheckedPermission = useRef(false);
  const hasLoadedUser = useRef(false);
  
  const verifyPermission = useCallback(() => {
    checkFeature(FEATURES.UPDATE_USER);
  }, [checkFeature]);
  
  // Efecto para verificar permisos solo una vez
  useEffect(() => {
    if (!hasCheckedPermission.current) {
      verifyPermission();
      hasCheckedPermission.current = true;
    }
  }, [verifyPermission]);

  // Efecto para cargar el usuario solo una vez cuando tengamos permisos
  useEffect(() => {
    if (id && canEditUser === true && !hasLoadedUser.current) {
      fetchUser(id);
      hasLoadedUser.current = true;
    }
  }, [id, fetchUser, canEditUser]);

  // Efecto para redirigir si no tiene permisos
  useEffect(() => {
    if (canEditUser === false) {
      setFlash('No tienes permisos para editar un usuario', 'warning');
      navigate('/');
    }
  }, [canEditUser, setFlash, navigate]);

  // Efecto para manejar errores
  useEffect(() => {
    if (error) {
      setFlash(error, 'error');
      navigate('/users');
    }
  }, [error, setFlash, navigate]);

  if (isCheckingFeature || isLoadingUser) {
    return (
      <ContainerWithFloatingNavbar>
        <Loading />
      </ContainerWithFloatingNavbar>
    );
  }

  if (!user && !isLoadingUser && !hasLoadedUser.current) {
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

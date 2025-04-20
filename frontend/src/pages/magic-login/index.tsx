import { useContext, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import CenterMidleContainer from '../../templates/center-midle-container';
import { AuthContext } from '../../contexts/auth-context';
import Loading from '../../components/loading';
import { FlashContext } from '../../contexts/flash-context';

const MagicLogin = () => {
  const [searchParams] = useSearchParams();
  const { authenticate, state } = useContext(AuthContext);
  const { setFlash } = useContext(FlashContext);

  useEffect(() => {
    authenticate({ token: searchParams.get('token') || '' });
  }, []);

  if (state.isAuthenticated) {
    return (
      <CenterMidleContainer>
        <Navigate to="/" />
      </CenterMidleContainer>
    );
  }

  if (state.isError) {
    setFlash(state.data ?? 'Error de autenticación', 'error');

    return (
      <CenterMidleContainer>
        <Navigate to="/login" />
      </CenterMidleContainer>
    );
  }

  return (
    <CenterMidleContainer>
      <Loading />
    </CenterMidleContainer>
  );
};

export default MagicLogin;

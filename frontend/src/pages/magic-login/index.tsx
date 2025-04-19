import { useContext, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import CenterMidleContainer from '../../templates/center-midle-container';
import { AuthContext } from '../../contexts/auth-context';
import { SpinLoading } from 'respinner'

const MagicLogin = () => {
  const [searchParams] = useSearchParams();
  const { authenticate, state } = useContext(AuthContext);

  useEffect(() => {
    authenticate({ token: searchParams.get('token') || '' });
  }, []);

  if (state.isAuthenticated) {
    return (
      <CenterMidleContainer>
        Autenticado....
      </CenterMidleContainer>
    );
  }

  if (state.isError) {
    return (
      <CenterMidleContainer>
        <Navigate to="/login" />
      </CenterMidleContainer>
    );
  }

  return (
    <CenterMidleContainer>
      <div className="w-full flex justify-center items-center">
        <SpinLoading fill="#A729F5" borderRadius={10} count={20} size={100} />
      </div>
    </CenterMidleContainer>
  );
};

export default MagicLogin;

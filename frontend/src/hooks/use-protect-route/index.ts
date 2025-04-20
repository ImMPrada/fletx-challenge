import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlashContext } from '../../contexts/flash-context';
import { AuthContext } from '../../contexts/auth-context';

export const useProtectRoute = () => {
  const navigate = useNavigate();
  const { setFlash } = useContext(FlashContext);
  const { state, authenticate } = useContext(AuthContext);

  // Verificar la autenticación al montar el componente
  useEffect(() => {
    const verifyAuthentication = async (): Promise<boolean> => {
      await authenticate({});
      return state.isAuthenticated;
    };

    const checkAuthentication = async () => {
      const isAuthenticated = await verifyAuthentication();
      
      if (!isAuthenticated) {
        setFlash('Debe iniciar sesión para acceder a esta ruta', 'warning');
        navigate('/login');
      }
    };
    
    checkAuthentication();
   
  }, []);

  return;
}; 
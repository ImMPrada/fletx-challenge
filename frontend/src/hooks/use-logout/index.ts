import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../use-api';
import { AuthContext } from '../../contexts/auth-context';
import { FlashContext } from '../../contexts/flash-context';
import { UseLogoutReturn } from './types';

export const useLogout = (): UseLogoutReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchData } = useApi();
  const navigate = useNavigate();
  const { removeJwt } = useContext(AuthContext);
  const { setFlash } = useContext(FlashContext);
  const [ isLogout, setIsLogout ] = useState<boolean>(false);

  const logout = async (): Promise<void> => {
    setIsLoading(true);

    try {
      // Llamar al endpoint de logout en el backend
      await fetchData('/api/v1/logout', { method: 'DELETE' });

      removeJwt();
      setFlash('Sesión cerrada correctamente', 'success');
      
      // Redirigir al usuario a la página de login
      setIsLogout(true);
      navigate('/login');
    } catch {
      setFlash('Error al cerrar sesión', 'error');
      
      // En caso de error, intentar hacer logout localmente de todas formas
      removeJwt();
      setIsLogout(true);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    logout,
    isLogout
  };
}; 
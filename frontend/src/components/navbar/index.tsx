import Button from '../ui/button';
import { NavbarProps } from './types';
import {SignOutIcon} from '@primer/octicons-react'
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/use-logout';
import Loading from '../loading';

const Navbar = ({ title }: NavbarProps) => {
  const { logout, isLoading: isLogoutLoading } = useLogout();

  const handleLogout = () => {
    logout();
  };

  if (isLogoutLoading) {
    return <Loading />;
  }

  return (
    <nav className="flex justify-between items-center px-5 md:px-20 h-12 bg-white shadow">
      <div className="flex items-center md:items-left gap-6">
        <div className="text-xl font-bold text-purple">{title}</div>
        <div className="text-sm text-gray-500 hover:text-purple cursor-pointer">
          <Link to="/companies">Empresas</Link>
        </div>
        <div className="text-sm text-gray-500 hover:text-purple cursor-pointer">
          <Link to="/users">Usuarios</Link>
        </div>
        <div className="text-sm text-gray-500 hover:text-purple cursor-pointer">
          <Link to="/products">Productos</Link>
        </div>
      </div>

      <Button
        label={<SignOutIcon size={24} />}
        type="button" 
        variant="primary" 
        onClick={handleLogout}
        className="w-auto"
        disabled={isLogoutLoading}
      />
    </nav>
  );
};

export default Navbar;

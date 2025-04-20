import Button from '../ui/button';
import { NavbarProps } from './types';
import {SignOutIcon} from '@primer/octicons-react'

const Navbar = ({ title }: NavbarProps) => {
  const handleLogout = () => {
    alert('va a cerrar session');
  };

  return (
    <nav className="flex justify-between items-center px-5 md:px-20 h-12 bg-white shadow">
      <div className="text-xl font-bold text-purple">{title}</div>
      <Button 
        label={<SignOutIcon size={24} />}
        type="button" 
        variant="primary" 
        onClick={handleLogout}
        className="w-auto"
      />
    </nav>
  );
};

export default Navbar;

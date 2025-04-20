import { ContainerWithFloatingNavbarProps } from './types';
import Navbar from '../../components/navbar';

const ContainerWithFloatingNavbar = ({ children }: ContainerWithFloatingNavbarProps) => {
  return (
    <>
      <Navbar title="FLETX challenge" />
      {children}
    </>
  );
};

export default ContainerWithFloatingNavbar;

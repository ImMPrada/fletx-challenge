import { ContainerWithFloatingNavbarProps } from './types';
import Navbar from '../../components/navbar';

const ContainerWithFloatingNavbar = ({ children }: ContainerWithFloatingNavbarProps) => {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Navbar title="FLETX challenge" />

      <div className="flex flex-col p-10 justify-start items-center w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ContainerWithFloatingNavbar;

import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import { useProtectRoute } from '../../hooks/use-protect-route';
import Profile from '../../components/profile';

const ProfilePage = () => {
  useProtectRoute();

  return (
    <ContainerWithFloatingNavbar>
      <Profile />
    </ContainerWithFloatingNavbar>
  );
};

export default ProfilePage;

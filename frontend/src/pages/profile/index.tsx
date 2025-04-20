import ContainerWithFloatingNavbar from '../../templates/container-with-floating-navbar';
import { useProtectRoute } from '../../hooks/use-protect-route';
import Profile from '../../components/profile';
import CenterMidleContainer from '../../templates/center-midle-container';

const ProfilePage = () => {
  useProtectRoute();

  return (
    <ContainerWithFloatingNavbar>
      <CenterMidleContainer>
        <Profile />
      </CenterMidleContainer>
    </ContainerWithFloatingNavbar>
  );
};

export default ProfilePage;

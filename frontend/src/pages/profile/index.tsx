import CenterMidleContainer from '../../templates/center-midle-container';
import { useProtectRoute } from '../../hooks/use-protect-route';
import Profile from '../../components/profile';

const ProfilePage = () => {
  useProtectRoute();

  return (
    <CenterMidleContainer>
      <Profile />
    </CenterMidleContainer>
  );
};

export default ProfilePage;

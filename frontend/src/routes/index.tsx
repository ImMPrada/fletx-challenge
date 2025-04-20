import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import MagicLogin from '../pages/magic-login';
import ProfilePage from '../pages/profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/magic-login" element={<MagicLogin />} />
    </Routes>
  );
};

export default AppRoutes;

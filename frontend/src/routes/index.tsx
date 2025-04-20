import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import MagicLogin from '../pages/magic-login';
import ProfilePage from '../pages/profile';
import NewCompany from '../pages/new-company';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/magic-login" element={<MagicLogin />} />
      <Route path="/companies/new" element={<NewCompany />} />
    </Routes>
  );
};

export default AppRoutes;

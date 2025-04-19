import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import MagicLogin from '../pages/magic-login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/magic-login" element={<MagicLogin />} />
    </Routes>
  );
};

export default AppRoutes;

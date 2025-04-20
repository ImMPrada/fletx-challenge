import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import MagicLogin from '../pages/magic-login';
import ProfilePage from '../pages/profile';
import NewCompany from '../pages/new-company';
import Companies from '../pages/companies';
import CompanyPage from '../pages/company-page';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/magic-login" element={<MagicLogin />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/companies/:id" element={<CompanyPage />} />
      <Route path="/companies/new" element={<NewCompany />} />
    </Routes>
  );
};

export default AppRoutes;

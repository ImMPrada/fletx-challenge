import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import MagicLogin from '../pages/magic-login';
import ProfilePage from '../pages/profile';
import NewCompany from '../pages/new-company';
import Companies from '../pages/companies';
import CompanyPage from '../pages/company-page';
import EditCompany from '../pages/edit-company';
import UsersPage from '../pages/users-page';
import { RolesProvider } from '../contexts/roles-context';
import NewUser from '../pages/new-user';
import EditUser from '../pages/edit-user';

const AppRoutes = () => {
  return (
    <RolesProvider> 
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/magic-login" element={<MagicLogin />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/new" element={<NewUser />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyPage />} />
        <Route path="/companies/new" element={<NewCompany />} />
        <Route path="/companies/:id/edit" element={<EditCompany />} />
      </Routes>
    </RolesProvider>

  );
};

export default AppRoutes;

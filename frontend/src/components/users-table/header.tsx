import { HeaderProps } from './types';

const Header = ({ canCreateUser, canUpdateUser, canDeleteUser }: HeaderProps) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        <th className="py-2 px-4 border-b text-left">Nombre</th>
        <th className="py-2 px-4 border-b text-left">Email</th>
        <th className="py-2 px-4 border-b text-left">Cargo</th>
        <th className="py-2 px-4 border-b text-left">Rol</th>
        <th className="py-2 px-4 border-b text-left">Empresa</th>
        <th className="py-2 px-4 border-b text-left">Salario</th>
        {(canCreateUser || canUpdateUser || canDeleteUser) && (
          <th className="py-2 px-4 border-b text-left">Acciones</th>
        )}
      </tr>
    </thead>
  );
};

export default Header;
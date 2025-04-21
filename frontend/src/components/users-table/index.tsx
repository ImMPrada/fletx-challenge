import { Link } from 'react-router-dom';
import { UsersTableProps } from './types';

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <div className="w-3/4">
      <table className="max-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Cargo</th>
            <th className="py-2 px-4 border-b text-left">Rol</th>
            <th className="py-2 px-4 border-b text-left">Empresa</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <Link to={`/users/${user.id}`}>
                  {user.name || ''} {user.lastName || ''}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/users/${user.id}`}>
                  {user.email}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/users/${user.id}`}>
                  {user.workPosition || '-'}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/users/${user.id}`}>
                  {user.role.description}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/users/${user.id}`}>
                  {user.company ? user.company.name : '-'}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable; 
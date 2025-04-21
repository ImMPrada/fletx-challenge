import { Link } from 'react-router-dom';
import { UsersTableProps } from './types';
import {PencilIcon} from '@primer/octicons-react'

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
            <th className="py-2 px-4 border-b text-left">Salario</th>
            <th className="py-2 px-4 border-b text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                {user.name || '-'} {user.lastName || ''}
              </td>
              <td className="py-2 px-4 border-b">
                {user.email}
              </td>
              <td className="py-2 px-4 border-b">
                {user.workPosition || '-'}
              </td>
              <td className="py-2 px-4 border-b">
                {user.role.code}: {user.role.description}
              </td>
              <td className="py-2 px-4 border-b">
                {user.company ? user.company.name : '-'}
              </td>
              <td className="py-2 px-4 border-b">
                {user.salary ? `$${Number(user.salary).toLocaleString()}` : '-'}
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/users/${user.id}/edit`}>
                  <PencilIcon size={18} />
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
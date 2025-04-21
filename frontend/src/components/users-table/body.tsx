import { BodyProps } from './types';
import Actions from './actions';

const Body = ({ users, canCreateUser, canUpdateUser, canDeleteUser }: BodyProps) => {
  return (
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
          {(canCreateUser || canUpdateUser || canDeleteUser) && (
            <td className="py-2 px-4 border-b">
              <Actions
                user={user}
                canUpdateUser={canUpdateUser}
                canDeleteUser={canDeleteUser}
              />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default Body;
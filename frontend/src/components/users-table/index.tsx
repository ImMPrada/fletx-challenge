import { UsersTableProps } from './types';
import Header from './header';
import Body from './body';

const UsersTable = ({ users, canCreateUser, canUpdateUser, canDeleteUser }: UsersTableProps) => {
  return (
    <div className="w-full">
      <table className="max-w-full bg-white border border-gray-300">
        <Header
          canCreateUser={canCreateUser}
          canUpdateUser={canUpdateUser}
          canDeleteUser={canDeleteUser}
        />
        <Body
          users={users}
          canCreateUser={canCreateUser}
          canUpdateUser={canUpdateUser} 
          canDeleteUser={canDeleteUser}
        />
      </table>
    </div>
  );
};

export default UsersTable;
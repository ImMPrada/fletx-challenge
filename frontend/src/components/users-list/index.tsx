import { useEffect } from 'react';
import { useUsersList } from '../../hooks/use-users-list';
import Loading from '../loading';
import Button from '../ui/button';
import { useNavigate } from 'react-router-dom';
import UsersTable from '../users-table';
import { UsersListProps } from './types';
import { PlusIcon } from '@primer/octicons-react';
const UsersList = ({
  canCreateUser,
  canUpdateUser,
  canDeleteUser }: UsersListProps) => {
  const { users, isLoading, fetchUsers } = useUsersList();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start gap-6">
      <div className="flex items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        {canCreateUser && (
          <Button 
            label={<PlusIcon />}
            type="button" 
            variant="primary" 
            onClick={() => navigate('/users/new')}
          />
        )}
      </div>
      
      {users && users.length > 0 ? (
        <UsersTable
          users={users}
          canCreateUser={canCreateUser || false}
          canUpdateUser={canUpdateUser || false}
          canDeleteUser={canDeleteUser || false}
          fetchUsers={fetchUsers}
        />
      ) : (
        <p>No hay usuarios disponibles</p>
      )}
    </div>
  );
};

export default UsersList;


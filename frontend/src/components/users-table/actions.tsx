import { Link } from 'react-router-dom';
import { ActionsProps } from './types';
import { PencilIcon } from '@primer/octicons-react'; 
import DeleteButton from './delete-button';

const Actions = ({ user, canUpdateUser, canDeleteUser, fetchUsers }: ActionsProps) => {
  return (
    <div className="w-full flex justify-start items-center gap-2">
      {canUpdateUser && (
        <Link to={`/users/${user.id}/edit`}>
          <PencilIcon />
        </Link>
      )}

      {canDeleteUser && (
        <DeleteButton userId={user.id.toString()} fetchUsers={fetchUsers} />
      )}
    </div>
  );
};

export default Actions;
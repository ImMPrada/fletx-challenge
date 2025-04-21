import { TrashIcon } from '@primer/octicons-react';
import { Button } from '../ui';
import Loading from '../loading';
import { useDeleteUser } from '../../hooks/use-delete-user';

const DeleteButton = ({ userId, fetchUsers }: { userId: string, fetchUsers: () => void }) => {
  const { deleteUser, isLoading: isDeleting } = useDeleteUser();

  const handleClick = async () => {
    await deleteUser(userId);
    fetchUsers();
  }

  return (
    <Button 
      variant="warning"
      onClick={handleClick}
      type="button"
      label={isDeleting ? <Loading size={16}/> : <TrashIcon/>}
    />
  );
};

export default DeleteButton;

import { TrashIcon } from '@primer/octicons-react';
import { Button } from '../ui';
import Loading from '../loading';
import { useDeleteUser } from '../../hooks/use-delete-user';

const DeleteButton = ({ userId }: { userId: string }) => {
  const { deleteUser, isLoading: isDeleting } = useDeleteUser();

  return (
    <Button 
      variant="warning"
      onClick={() => deleteUser(userId)}
      type="button"
      label={isDeleting ? <Loading/> : <TrashIcon/>}
    />
  );
};

export default DeleteButton;

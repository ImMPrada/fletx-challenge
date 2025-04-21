import { TrashIcon } from '@primer/octicons-react';
import { Button } from '../ui';
import { useDeleteCompany } from '../../hooks/use-delete-company';
import Loading from '../loading';

const DeleteButton = ({ companyId }: { companyId: string }) => {
  const { deleteCompany, isLoading: isDeleting } = useDeleteCompany();

  return (
    <Button 
      variant="secondary"
      onClick={() => deleteCompany(companyId)}
      type="button"
      label={isDeleting ? <Loading/> : <TrashIcon/>}
    />
  );
};

export default DeleteButton;

import { TrashIcon } from '@primer/octicons-react';
import { Button } from '../ui';
import Loading from '../loading';
import { useDeleteProduct } from '../../hooks/use-delete-product';

const DeleteButton = ({ productId }: { productId: string }) => {
  const { deleteProduct, isLoading: isDeleting } = useDeleteProduct();

  return (
    <Button 
      variant="warning"
      onClick={() => deleteProduct(productId)}
      type="button"
      label={isDeleting ? <Loading/> : <TrashIcon/>}
    />
  );
};

export default DeleteButton;

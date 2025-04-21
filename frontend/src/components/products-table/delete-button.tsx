import { TrashIcon } from '@primer/octicons-react';
import { Button } from '../ui';
import Loading from '../loading';
import { useDeleteProduct } from '../../hooks/use-delete-product';

const DeleteButton = ({ productId, fetchProducts }: { productId: string, fetchProducts: () => void }) => {
  const { deleteProduct, isLoading: isDeleting } = useDeleteProduct();

  const handleClick = async () => {
    await deleteProduct(productId);
    fetchProducts();
  }

  return (
    <Button 
      variant="warning"
      onClick={handleClick}
      type="button"
      label={isDeleting ? <Loading/> : <TrashIcon/>}
    />
  );
};

export default DeleteButton;

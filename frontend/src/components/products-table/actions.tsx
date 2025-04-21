import { Link } from 'react-router-dom';
import { ActionsProps } from './types';
import { PencilIcon } from '@primer/octicons-react'; 
import DeleteButton from './delete-button';

const Actions = ({ product, canUpdateProduct, canDeleteProduct, fetchProducts }: ActionsProps) => {
  return (
    <div className="w-full flex justify-start items-center gap-2">
      {canUpdateProduct && (
        <Link to={`/products/${product.id}/edit`}>
          <PencilIcon />
        </Link>
      )}

      {canDeleteProduct && (
        <DeleteButton productId={product.id.toString()} fetchProducts={fetchProducts} />
      )}
    </div>
  );
};

export default Actions;
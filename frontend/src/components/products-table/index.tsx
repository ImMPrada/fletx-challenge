import { ProductsTableProps } from './types';
import Header from './header';
import Body from './body';

const ProductsTable = ({
  products,
  canUpdateProduct,
  canDeleteProduct
}: ProductsTableProps) => {

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <Header
          canUpdateProduct={canUpdateProduct}
          canDeleteProduct={canDeleteProduct}
        />

        <Body
          products={products}
          canUpdateProduct={canUpdateProduct}
          canDeleteProduct={canDeleteProduct}
        />
      </table>
    </div>
  );
};

export default ProductsTable; 
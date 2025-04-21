import { BodyProps } from './types';
import Actions from './actions';

const ProductsTable = ({
  products,
  canUpdateProduct,
  canDeleteProduct,
  fetchProducts
}: BodyProps) => {

  return (
    <tbody>
      {products.map((product) => (
        <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
          <td className="py-3 px-4">{product.name}</td>
          <td className="py-3 px-4">{product.category}</td>
          <td className="py-3 px-4">${product.price.toFixed(2)}</td>
          <td className="py-3 px-4">{product.company?.name}</td>
          <td className="py-3 px-4">
            <Actions 
              product={product} 
              canUpdateProduct={canUpdateProduct} 
              canDeleteProduct={canDeleteProduct} 
              fetchProducts={fetchProducts}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ProductsTable; 
import { Link } from 'react-router-dom';
import { ProductsTableProps } from './types';
import { useFeatureCheck } from '../../hooks/use-feature-check';
import { FEATURES } from '../../data/features';
import { useEffect } from 'react';
import { PencilIcon } from '@primer/octicons-react';

const ProductsTable = ({ products }: ProductsTableProps) => {
  const { checkFeature, can: canUpdateProduct } = useFeatureCheck();

  useEffect(() => {
    checkFeature(FEATURES.UPDATE_PRODUCT);
  }, []);

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-sm">Nombre</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Categoría</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Precio</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Empresa</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4">{product.category}</td>
              <td className="py-3 px-4">${product.price.toFixed(2)}</td>
              <td className="py-3 px-4">{product.company?.name}</td>
              <td className="py-3 px-4">
                {canUpdateProduct && (
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <PencilIcon size={18} />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable; 
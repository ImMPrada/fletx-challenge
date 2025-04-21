import { HeaderProps } from './types';

const Header = ({
  canUpdateProduct,
  canDeleteProduct
}: HeaderProps) => {
  return (
    <thead>
      <tr className="bg-gray-100 border-b border-gray-200">
        <th className="text-left py-3 px-4 font-semibold text-sm">Nombre</th>
        <th className="text-left py-3 px-4 font-semibold text-sm">Categoría</th>
        <th className="text-left py-3 px-4 font-semibold text-sm">Precio</th>
        <th className="text-left py-3 px-4 font-semibold text-sm">Empresa</th>
        {(canUpdateProduct || canDeleteProduct) && (
          <th className="text-left py-3 px-4 font-semibold text-sm">Acciones</th>
        )}
      </tr>
    </thead>
  );
};

export default Header; 
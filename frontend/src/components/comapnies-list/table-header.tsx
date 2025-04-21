
const TableHeader = ({ canDeleteCompany, canUpdateCompany }: { canDeleteCompany: boolean, canUpdateCompany: boolean }) => {
  return (
    <thead className="bg-gray-100">
      <tr>
        <th className="py-2 px-4 border-b text-left">Nombre</th>
        <th className="py-2 px-4 border-b text-left">Categoría</th>
        <th className="py-2 px-4 border-b text-left">Departamento</th>
        <th className="py-2 px-4 border-b text-left">Ciudad</th>
        {(canDeleteCompany || canUpdateCompany) && (
          <th className="py-2 px-4 border-b text-left">Acciones</th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;

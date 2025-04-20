import { Company } from '../../hooks/use-companies-list/types';
import { Link } from 'react-router-dom';

const Table = ({ companies }: { companies: Company[] }) => {

  return (
    <div className="w-1/2">
      <table className="max-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Categoría</th>
            <th className="py-2 px-4 border-b text-left">Departamento</th>
            <th className="py-2 px-4 border-b text-left">Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <Link to={`/companies/${company.id}`}>
                  {company.name}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/companies/${company.id}`}>
                  {company.category}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/companies/${company.id}`}>
                  {company.department.name}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <Link to={`/companies/${company.id}`}>
                  {company.city.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

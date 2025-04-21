import { Link } from 'react-router-dom';
import { TableBodyProps } from './types';
import Actions from './actions';

const TableBody = ({ companies, canDeleteCompany, canUpdateCompany }: TableBodyProps) => {

  return (
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
          {(canDeleteCompany || canUpdateCompany) && (
            <td className="py-2 px-4 border-b">
              <Actions
                company={company}
                canDeleteCompany={canDeleteCompany}
                canUpdateCompany={canUpdateCompany}
              />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

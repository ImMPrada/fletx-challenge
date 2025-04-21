import TableHeader from './table-header';
import TableBody from './table-body';
import { TableProps } from './types';

const Table = ({ companies, canDeleteCompany, canUpdateCompany, fetchCompanies }: TableProps) => {
  return (
    <div className="w-full">
      <table className="max-w-full bg-white border border-gray-300">
        <TableHeader canDeleteCompany={canDeleteCompany} canUpdateCompany={canUpdateCompany} />

        <TableBody 
          companies={companies}
          canDeleteCompany={canDeleteCompany}
          canUpdateCompany={canUpdateCompany}
          fetchCompanies={fetchCompanies}
        />
      </table>
    </div>
  );
};

export default Table;

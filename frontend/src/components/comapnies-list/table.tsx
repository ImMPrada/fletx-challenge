import TableHeader from './table-header';
import TableBody from './table-body';
import { TableProps } from './types';

const Table = ({ companies, canDeleteCompany, canUpdateCompany }: TableProps) => {
  return (
    <div className="w-full">
      <table className="max-w-full bg-white border border-gray-300">
        <TableHeader canDeleteCompany={canDeleteCompany} canUpdateCompany={canUpdateCompany} />

        <TableBody 
          companies={companies}
          canDeleteCompany={canDeleteCompany}
          canUpdateCompany={canUpdateCompany}
        />
      </table>
    </div>
  );
};

export default Table;

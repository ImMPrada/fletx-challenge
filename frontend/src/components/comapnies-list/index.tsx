import { useEffect } from 'react';
import { useCompaniesList } from '../../hooks/use-companies-list';
import Table from './table';
import Loading from '../loading';
import Button from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { CompaniesListProps } from './types';
import { PlusIcon } from '@primer/octicons-react';
const CompaniesList = ({
  canDeleteCompany = false,
  canCreateCompany = false,
  canUpdateCompany = false
}: CompaniesListProps) => {
  const { companies, isLoading, fetchCompanies } = useCompaniesList();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
   
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start gap-6">
      <div className="flex items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">Empresas</h1>

        {canCreateCompany && (
          <Button 
            label={<PlusIcon />}
            type="button" 
            variant="primary" 
            onClick={() => navigate('/companies/new')}
          />
        )}
      </div>
      
      {companies && companies.length > 0 ? (
        <Table
          companies={companies}
          canDeleteCompany={canDeleteCompany}
          canUpdateCompany={canUpdateCompany}
          fetchCompanies={fetchCompanies}
        />
      ) : (
        <p>No hay empresas disponibles</p>
      )}
    </div>
  );
};

export default CompaniesList;

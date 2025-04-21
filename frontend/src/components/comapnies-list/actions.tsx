import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import { useDeleteCompany } from '../../hooks/use-delete-company';
import Loading from '../loading';
import { ActionsProps } from './types';

const Actions = ({ company, canDeleteCompany, canUpdateCompany, fetchCompanies }: ActionsProps) => {
  const { deleteCompany, isLoading: isDeleting } = useDeleteCompany();

  const handleClick = async () => {
    await deleteCompany(company.id);
    fetchCompanies();
  }

  return (
    <div className="w-full flex justify-start items-center gap-2">
      {canUpdateCompany && (
        <Link to={`/companies/${company.id}/edit`}>
          <PencilIcon />
        </Link>
      )}

      {canDeleteCompany && (
        <Button 
          variant="warning"
          onClick={handleClick}
          type="button"
          disabled={isDeleting}
          label={isDeleting ? <Loading /> : <TrashIcon />}
        />
      )}
    </div>
  );
};

export default Actions;

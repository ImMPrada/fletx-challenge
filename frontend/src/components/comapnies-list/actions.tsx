import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import { useDeleteCompany } from '../../hooks/use-delete-company';
import Loading from '../loading';
import { ActionsProps } from './types';

const Actions = ({ company, canDeleteCompany, canUpdateCompany }: ActionsProps) => {
  const { deleteCompany, isLoading: isDeleting } = useDeleteCompany();

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
          onClick={() => deleteCompany(company.id)}
          type="button"
          disabled={isDeleting}
          label={isDeleting ? <Loading /> : <TrashIcon />}
        />
      )}
    </div>
  );
};

export default Actions;

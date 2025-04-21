import { ReactNode, useEffect } from 'react';
import { RolesContextParams } from './types';
import { RolesContext } from './context';
import { useRolesList } from '../../hooks/use-roles-list';
export { RolesContext } from './context';

export const RolesProvider = ({ children }: { children: ReactNode }) => {
  const { roles, isLoading, fetchRoles } = useRolesList();

  useEffect(() => {
    fetchRoles();
  }, []);

  const value: RolesContextParams = {
    roles,
    isFetchingRoles: isLoading,
  };

  return <RolesContext.Provider value={value}>{children}</RolesContext.Provider>;
};

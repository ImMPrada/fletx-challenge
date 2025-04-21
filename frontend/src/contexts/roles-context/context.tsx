import { createContext } from 'react';
import { RolesContextParams } from './types';

export const RolesContext = createContext<RolesContextParams>({
  roles: [],
  isFetchingRoles: false,
}); 
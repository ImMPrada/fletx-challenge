import { createContext } from 'react';
import { DepartmentsContextParams } from './types';

export const DepartmentsContext = createContext<DepartmentsContextParams>({
  departments: [],
  getCities: () => [],
  isFetchingDepartments: false,
  isFetchingCities: false,
}); 
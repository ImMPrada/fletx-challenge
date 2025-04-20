import { createContext, ReactNode, useEffect, useState } from 'react';
import { DepartmentsContextParams, DepartmentsType } from './types';
import { config } from '../../config';


export const DepartmentsContext = createContext<DepartmentsContextParams>({
  departments: [],
  getCities: () => [],
  isFetchingDepartments: false,
  isFetchingCities: false,
});

export const DepartmentsProvider = ({ children }: { children: ReactNode }) => {
  const [isFetchingDepartments, setIsFetchingDepartments] = useState(false);
  const [isFetchingCities, setIsFetchingCities] = useState(false);
  const [departments, setDepartments] = useState<DepartmentsType[]>([]);

  const fetchDepartments = async () => {
    setIsFetchingDepartments(true);
    if(departments.length > 0) return;

    const response = await fetch(`${config.apiUrl}/api/v1/departments`);
    const data = await response.json();
    setDepartments(data);
    setIsFetchingDepartments(false);
  };
  
  const getCities = (departmentId: number) => {
    setIsFetchingCities(true);
    const departmentCities = departments.find((department) => department.id === departmentId)?.cities;
    setIsFetchingCities(false);

    return departmentCities || [];
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const value: DepartmentsContextParams = {
    departments,
    getCities,
    isFetchingDepartments,
    isFetchingCities,
  };

  return <DepartmentsContext.Provider value={value}>{children}</DepartmentsContext.Provider>;
};

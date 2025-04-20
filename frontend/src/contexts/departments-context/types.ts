
export interface DepartmentsType {
  id: number;
  name: string;
  cities: CitiesType[];
}

export interface CitiesType {
  id: number;
  name: string;
}

export interface DepartmentsContextParams {
  departments: DepartmentsType[];
  getCities: (departmentId: number) => CitiesType[];
  isFetchingDepartments: boolean;
  isFetchingCities: boolean;
}

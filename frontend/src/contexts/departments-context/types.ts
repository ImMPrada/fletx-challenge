
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
  cities: CitiesType[];
  getCities: (departmentId: number) => void;
  isFetchingDepartments: boolean;
  isFetchingCities: boolean;
}

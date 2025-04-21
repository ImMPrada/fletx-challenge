export type UserData = {
  name: string;
  last_name: string;
  email: string;
  role_id: number;
  company_id: number;
  work_position: string;
  phone_number: string;
  salary: string;
}

export type UpdateUserParams = {
  user: UserData;
}

export interface ValidationErrors {
  name?: string[];
  last_name?: string[];
  email?: string[];
  role_id?: string[];
  company_id?: string[];
  work_position?: string[];
  phone_number?: string[];
  salary?: string[];
}

export interface UserResponse {
  id: string;
  name: string;
  last_name: string;
  email: string;
  role_id: number;
  company_id: number;
  work_position: string;
  phone_number: string;
  salary: string;
}

export interface ApiResponse<T> {
  data?: T;
  status?: number;
  error?: string;
  errors?: ValidationErrors;
  message?: string;
}

export interface UseUpdateUserReturn {
  user: UserResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  validationErrors: ValidationErrors | null;
  updateUser: (id: number, data: UpdateUserParams) => Promise<ApiResponse<UserResponse>>;
  resetState: () => void;
} 
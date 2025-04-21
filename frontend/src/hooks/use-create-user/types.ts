export type UserData = {
  user: {
    name: string;
    last_name: string;
    email: string;
    role_id: number;
    company_id: number;
    work_position?: string;
    phone_number?: string;
    salary?: string;
  }
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
  work_position?: string;
  phone_number?: string;
  salary?: string;
}

export interface ApiResponse<T> {
  data?: T;
  status?: number;
  error?: string;
  errors?: ValidationErrors;
  message?: string;
}

export interface UseCreateUserReturn {
  user: UserResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  validationErrors: ValidationErrors | null;
  createUser: (data: UserData) => Promise<ApiResponse<UserResponse>>;
  resetState: () => void;
} 
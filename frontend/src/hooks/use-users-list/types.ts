export interface Role {
  id: number;
  code: string;
  description: string;
}

export interface Company {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  lastName?: string;
  workPosition?: string;
  phoneNumber?: string;
  salary?: number;
  role: Role;
  company?: Company;
}

export interface UseUsersListReturn {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
} 
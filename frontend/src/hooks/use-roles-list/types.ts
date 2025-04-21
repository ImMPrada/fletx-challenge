export interface Role {
  id: number;
  code: string;
  description: string;
  features?: Feature[];
}

export interface Feature {
  code: string;
}

export interface UseRolesListReturn {
  roles: Role[];
  isLoading: boolean;
  error: string | null;
  fetchRoles: () => Promise<void>;
} 
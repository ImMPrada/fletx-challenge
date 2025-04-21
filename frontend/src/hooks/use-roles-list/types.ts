export interface Role {
  id: number;
  code: string;
  description: string;
}

export interface UseRolesListReturn {
  roles: Role[];
  isLoading: boolean;
  error: string | null;
  fetchRoles: () => Promise<void>;
} 
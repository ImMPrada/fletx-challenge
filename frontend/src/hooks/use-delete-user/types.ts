export interface UseDeleteUserReturn {
  message: string | null;
  isLoading: boolean;
  error: string | null;
  deleteUser: (id: string | number) => Promise<void>;
} 
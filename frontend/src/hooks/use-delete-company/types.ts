export interface UseDeleteCompanyReturn {
  message: string | null;
  isLoading: boolean;
  error: string | null;
  deleteCompany: (id: string | number) => Promise<void>;
} 
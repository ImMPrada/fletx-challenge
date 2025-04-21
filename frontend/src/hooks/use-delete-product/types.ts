export interface UseDeleteProductReturn {
  message: string | null;
  isLoading: boolean;
  error: string | null;
  deleteProduct: (id: string | number) => Promise<void>;
} 
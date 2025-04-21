export interface UseLogoutReturn {
  isLoading: boolean;
  logout: () => Promise<void>;
  isLogout: boolean;
}

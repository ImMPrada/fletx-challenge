export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  includeCredentials?: boolean;
}

export interface UseApiReturn {
  fetchData: <T>(endpoint: string, options?: RequestOptions, formatedResponse?: boolean) => Promise<T>;
}

export interface FeatureCheckResponse {
  can: boolean;
}

export interface UseFeatureCheckReturn {
  can: boolean | undefined;
  isLoading: boolean;
  error: string | null;
  checkFeature: (featureCode: string) => Promise<boolean>;
}

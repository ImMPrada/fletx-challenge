export interface UseSendMagicLinkParams {
  email: string;
}

export interface UseSendMagicLinkResponse {
  magic_link: {
    message: string;
  };
}

export interface UseSendMagicLinkState {
  isLoading: boolean;
  error: boolean;
  data: UseSendMagicLinkResponse | null;
  sent: boolean;
}

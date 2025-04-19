
export type FlashType = 'success' | 'error' | 'warning' | 'info';

export interface FlashContextParams {
  message: string;
  type: FlashType | null;
  blankFlash: () => void;
  setFlash: (message: string, type: FlashType) => void;
}

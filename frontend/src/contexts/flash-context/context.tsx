import { createContext } from 'react';
import { FlashContextParams } from './types';

export const FlashContext = createContext<FlashContextParams>({
  message: '',
  type: null,
  blankFlash: () => {},
  setFlash: () => {},
}); 
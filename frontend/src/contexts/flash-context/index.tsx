import { ReactNode, useState } from 'react';
import { FlashContextParams, FlashType } from './types';
import { FlashContext } from './context';

export { FlashContext } from './context';

export const FlashProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<FlashType | null>(null);

  const blankFlash = () => {
    setMessage('');
    setType(null);
  };

  const setFlash = (message: string, type: FlashType) => {  
    setMessage(message);
    setType(type);
  };

  const value: FlashContextParams = {
    message,
    type,
    blankFlash,
    setFlash,
  };

  return <FlashContext.Provider value={value}>{children}</FlashContext.Provider>;
};

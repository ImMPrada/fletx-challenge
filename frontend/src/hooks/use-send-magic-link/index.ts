import { useState } from 'react';
import { config } from '../../config';
import { UseSendMagicLinkParams, UseSendMagicLinkResponse, UseSendMagicLinkState } from './types';

export const useSendMagicLink = () => {
  const [state, setState] = useState<UseSendMagicLinkState>({
    isLoading: false,
    error: null,
    data: null
  });

  const sendMagicLink = async (params: UseSendMagicLinkParams) => {
    setState({ isLoading: true, error: null, data: null });
    
    try {
      const response = await fetch(`${config.apiUrl}/api/v1/magic_links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: params.email })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json() as UseSendMagicLinkResponse;
      setState({ isLoading: false, error: null, data });
      return data;
    } catch (error) {
      const errorObject = error instanceof Error ? error : new Error('Error desconocido');
      setState({ isLoading: false, error: errorObject, data: null });
      throw errorObject;
    }
  };

  return {
    state,
    sendMagicLink
  };
};

export default useSendMagicLink;

import { useState } from 'react';
import { config } from '../../config';
import {
  UseSendMagicLinkParams,
  UseSendMagicLinkResponse,
  UseSendMagicLinkState,
} from './types';

export const useSendMagicLink = () => {
  const [state, setState] = useState<UseSendMagicLinkState>({
    isLoading: false,
    error: false,
    data: null,
    sent: false,
  });

  const sendMagicLink = async (params: UseSendMagicLinkParams) => {
    setState({ isLoading: true, error: false, data: null, sent: false });

    try {
      const response = await fetch(`${config.apiUrl}/api/v1/magic_links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: params.email }),
      });

      if (!response.ok) {
        setState({ isLoading: false, error: true, data: null, sent: false });
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as UseSendMagicLinkResponse;
      setState({ isLoading: false, error: false, data, sent: true });
    } catch (error) {
      const errorObject =
        error instanceof Error ? error : new Error('Error desconocido');
      throw errorObject;
    }
  };

  return {
    state,
    sendMagicLink,
  };
};

export default useSendMagicLink;

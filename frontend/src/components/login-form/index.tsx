import { useState } from 'react';
import { useSendMagicLink } from '../../hooks/use-send-magic-link';
import SucceedSentMessage from './succeed-sent-message';
import Form from './form';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<{ email: string } | null>(null);
  const { sendMagicLink, state: magicLinkState } = useSendMagicLink();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);

    if (!email) {
      setError({ email: 'El email es requerido' });
      return;
    }

    sendMagicLink({ email });
  };

  if (magicLinkState.sent && !magicLinkState.error) {
    return <SucceedSentMessage />;
  }

  return (
    <Form
      email={email}
      magicLinkState={magicLinkState}
      error={error}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginForm;

import { UseSendMagicLinkState } from "../../hooks/use-send-magic-link/types";

export interface FormProps {
  email: string;
  magicLinkState: UseSendMagicLinkState;
  error: {email: string} | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
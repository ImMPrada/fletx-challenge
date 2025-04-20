import { SelectHTMLAttributes } from 'react';

export type Option = {
  id: string;
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  errorMessage?: string | null;
  options: Option[];
}

export interface CompanyFormState {
  name: string;
  address: string;
  phoneNumber: string;
  category: string;
  assets: string;
  liabilities: string;
  department: string;
  city: string;
  errors: {
    name?: string;
    address?: string;
    phoneNumber?: string;
    category?: string;
    assets?: string;
    liabilities?: string;
    department?: string;
    city?: string;
  };
}

export type CompanyFormAction = 
  | { type: 'UPDATE_INPUT_FIELD'; field: keyof Omit<CompanyFormState, 'errors'>; value: string }
  | { type: 'SET_ERROR'; field: keyof Omit<CompanyFormState, 'errors'>; message: string }
  | { type: 'CLEAR_ERRORS' };

export interface FormProps {
  formState: CompanyFormState;
  dispatch: React.Dispatch<CompanyFormAction>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

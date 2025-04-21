export interface UserFormState {
  name: string;
  lastName: string;
  email: string;
  roleId: string;
  companyId: string;
  workPosition: string;
  phoneNumber: string;
  salary: string;
  errors: {
    name?: string;
    lastName?: string;
    email?: string;
    roleId?: string;
    companyId?: string;
    workPosition?: string;
    phoneNumber?: string;
    salary?: string;
  };
}

export type UserFormAction = 
  | { type: 'UPDATE_INPUT_FIELD'; field: keyof Omit<UserFormState, 'errors'>; value: string }
  | { type: 'SET_ERROR'; field: keyof Omit<UserFormState, 'errors'>; message: string }
  | { type: 'CLEAR_ERRORS' };

export interface FormProps {
  formState: UserFormState;
  dispatch: React.Dispatch<UserFormAction>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  mode?: 'create' | 'edit';
}

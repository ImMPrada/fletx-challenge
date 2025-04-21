import { UserFormAction, UserFormState } from './types';

export const initialState: UserFormState = {
  name: '',
  lastName: '',
  email: '',
  roleId: '',
  companyId: '',
  workPosition: '',
  phoneNumber: '',
  salary: '',
  errors: {}
};

export function userFormReducer(state: UserFormState, action: UserFormAction): UserFormState {
  switch (action.type) {
    case 'UPDATE_INPUT_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: undefined
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message
        }
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      };
    default:
      return state;
  }
} 
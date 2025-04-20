import { CompanyFormAction, CompanyFormState } from './types';

export const initialState: CompanyFormState = {
  name: '',
  address: '',
  phoneNumber: '',
  category: '',
  assets: '',
  liabilities: '',
  department: '',
  city: '',
  errors: {}
};

export function companyFormReducer(state: CompanyFormState, action: CompanyFormAction): CompanyFormState {
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
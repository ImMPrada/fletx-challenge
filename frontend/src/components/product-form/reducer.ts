import { ProductFormState, ProductFormAction } from './types';

export const initialState: ProductFormState = {
  formData: {
    name: '',
    category: '',
    price: '',
    company_id: '',
  },
  validationErrors: {},
  isSubmitting: false,
  isSubmitted: false,
};

export const productFormReducer = (state: ProductFormState, action: ProductFormAction): ProductFormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case 'SET_VALIDATION_ERRORS':
      return {
        ...state,
        validationErrors: action.errors,
      };
    case 'RESET_VALIDATION_ERRORS':
      return {
        ...state,
        validationErrors: {},
      };
    case 'RESET_FORM':
      return initialState;
    case 'INITIALIZE_FORM':
      return {
        ...state,
        formData: action.data,
      };
    default:
      return state;
  }
}; 
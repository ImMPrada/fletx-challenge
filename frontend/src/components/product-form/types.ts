import { ProductResponse } from '../../hooks/use-fetch-product/types';

export interface ProductFormProps {
  initialData?: ProductResponse | null;
  mode?: 'create' | 'edit';
}

export interface ProductFormData {
  name: string;
  category: string;
  price: string;
  company_id: string;
}

export interface ValidationErrors {
  name?: string[];
  category?: string[];
  price?: string[];
  company_id?: string[];
}

export type ProductFormAction = 
  | { type: 'SET_FIELD'; field: keyof ProductFormData; value: string }
  | { type: 'SET_VALIDATION_ERRORS'; errors: ValidationErrors }
  | { type: 'RESET_VALIDATION_ERRORS' }
  | { type: 'RESET_FORM' }
  | { type: 'INITIALIZE_FORM'; data: ProductFormData };

export interface ProductFormState {
  formData: ProductFormData;
  validationErrors: ValidationErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
} 
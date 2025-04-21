import { Product } from '../../hooks/use-products-list/types';

export interface ProductsTableProps {
  products: Product[];
  canUpdateProduct: boolean;
  canDeleteProduct: boolean;
  fetchProducts: () => void;
} 

export interface HeaderProps {
  canUpdateProduct: boolean;
  canDeleteProduct: boolean;
} 

export interface BodyProps {
  products: Product[];
  canUpdateProduct: boolean;
  canDeleteProduct: boolean;
  fetchProducts: () => void;
}

export interface ActionsProps {
  product: Product;
  canUpdateProduct: boolean;
  canDeleteProduct: boolean;
  fetchProducts: () => void;
}

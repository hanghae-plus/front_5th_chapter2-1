import { Cart } from '../../store/cart';
import { Product } from '../../store/productList';

export interface CartOperationProps {
  cart: Cart;
  productList: Product[];
  updateCart: (cart: Cart) => void;
  updateProductList: (products: Product[]) => void;
}

export interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, change: number) => void;
  onRemove: (productId: string) => void;
} 
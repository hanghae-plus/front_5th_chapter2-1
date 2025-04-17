import { Product } from '../../store/productList';

export interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, change: number) => void;
  onRemove: (productId: string) => void;
}

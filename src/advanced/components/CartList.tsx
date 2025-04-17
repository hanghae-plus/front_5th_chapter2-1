import { Product, CartItem as CartItemType } from '../types';
import { CartItem } from './CartItem';

interface CartListProps {
  cartItems: CartItemType[];
  products: Product[];
  actions: {
    onChangeQuantity: (id: string, delta: number) => void;
    onRemoveItem: (id: string) => void;
  };
}

// CartList 컴포넌트
// 장바구니에 담긴 상품 목록을 표시합니다.
// 장바구니가 비어있을 경우 "장바구니가 비어 있습니다."라는 메시지를 표시합니다.
export const CartList = ({
  cartItems,
  products,
  actions: { onChangeQuantity, onRemoveItem },
}: CartListProps) => {
  return (
    <div className="space-y-2">
      {cartItems.length === 0 ? (
        <p className="text-gray-400">장바구니가 비어 있습니다.</p>
      ) : (
        cartItems.map(item => {
          const product = products.find(p => p.id === item.productId);

          if (!product) return null;

          return (
            <CartItem
              key={item.productId}
              product={product}
              quantity={item.quantity}
              actions={{
                onChangeQuantity,
                onRemove: onRemoveItem,
              }}
            />
          );
        })
      )}
    </div>
  );
};

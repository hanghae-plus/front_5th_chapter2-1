import { Product } from '../types';
import { ButtonGroup } from './ButtonGroup';

interface CartItemProps {
  product: Product;
  quantity: number;
  actions: {
    onChangeQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
  };
}

// CartItem 컴포넌트
// 장바구니에 담긴 상품의 정보를 표시합니다.
// 상품명, 가격, 수량, 수량 변경 및 삭제 버튼을 포함합니다.
export const CartItem = ({
  product,
  quantity,
  actions: { onChangeQuantity, onRemove },
}: CartItemProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span>
        {product.name} - {product.price.toLocaleString()}원 x {quantity}
      </span>

      <ButtonGroup
        productId={product.id}
        actions={{ onChangeQuantity, onRemove }}
      />
    </div>
  );
};

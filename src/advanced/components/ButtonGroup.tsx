interface ButtonGroupProps {
  productId: string;
  actions: {
    onChangeQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
  };
}

// 버튼 그룹 컴포넌트
// 장바구니 아이템의 수량을 변경하거나 삭제하는 버튼을 포함합니다.
export const ButtonGroup = ({
  productId,
  actions: { onChangeQuantity, onRemove },
}: ButtonGroupProps) => {
  return (
    <div>
      <button
        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        onClick={() => onChangeQuantity(productId, -1)}
      >
        -
      </button>
      <button
        className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
        onClick={() => onChangeQuantity(productId, 1)}
      >
        +
      </button>
      <button
        className="remove-item bg-red-500 text-white px-2 py-1 rounded"
        onClick={() => onRemove(productId)}
      >
        삭제
      </button>
    </div>
  );
};

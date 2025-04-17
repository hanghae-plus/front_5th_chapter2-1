import { Product } from '../types';

interface ProductSelectProps {
  products: Product[];
  selectedId: string;
  actions: {
    onChange: (id: string) => void;
    onAddToCart: (id: string) => void;
  };
}

// 상품 선택 컴포넌트
// 상품 목록에서 상품을 선택하고 장바구니에 추가하는 기능을 제공합니다.
// 상품이 품절인 경우 선택할 수 없도록 비활성화합니다.
export const ProductSelect = ({
  products,
  selectedId,
  actions: { onChange, onAddToCart },
}: ProductSelectProps) => {
  return (
    <div>
      <select
        value={selectedId}
        onChange={e => onChange(e.target.value)}
        className="border rounded p-2 flex-1 mr-2"
      >
        <option value="">상품 선택</option>
        {products.map(p => (
          <option key={p.id} value={p.id} disabled={p.quantity === 0}>
            {p.name} - {p.quantity === 0 ? '품절' : `${p.price}원`}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onAddToCart(selectedId)}
        disabled={!selectedId}
      >
        추가
      </button>
    </div>
  );
};

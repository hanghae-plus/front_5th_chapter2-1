import React from "react";

import { useCartStore } from "../store/useCartStore";

type Props = {
  selectedId: string | null;
  onChange: (id: string) => void;
};

/** 상품 선택 드롭다운 컴포넌트 */

function ProductSelect({ selectedId, onChange }: Props) {
  const { products } = useCartStore();

  return (
    <select
      className="border rounded p-2 mr-2"
      value={selectedId ?? ""}
      onChange={(e) => onChange(e.target.value)}
    >
      {products.map((p) => (
        <option key={p.id} value={p.id} disabled={p.q === 0}>
          {p.name} - {p.val}원
        </option>
      ))}
    </select>
  );
}

export default ProductSelect;

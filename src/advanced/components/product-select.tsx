import React from "react";

import { useCartStore } from "../store/useCartStore";

type Props = {
  selectedId: string | null;
  onChange: (id: string) => void;
};

function ProductSelect({ selectedId, onChange }: Props) {
  const { products } = useCartStore();

  return (
    <select value={selectedId ?? ""} onChange={(e) => onChange(e.target.value)}>
      {products.map((p) => (
        <option key={p.id} value={p.id} disabled={p.q === 0}>
          {p.name} - {p.val}원
        </option>
      ))}
    </select>
  );
}

export default ProductSelect;

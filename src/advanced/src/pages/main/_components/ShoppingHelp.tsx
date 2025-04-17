import React from "react";

import useCart from "#advanced/pages/main/_hooks/useCart";

const ShoppingHelp: React.FC = () => {
  const { emptyProducts } = useCart();

  return (
    <section>
      <span className="text-sm text-gray-500">** 품절 상품들은 장바구니에 추가할 수 없습니다. **</span>
      {emptyProducts.length > 0 && (
        <p className="text-sm text-gray-400">( {emptyProducts.map(({ name }) => name).join(", ") + " "} )</p>
      )}
    </section>
  );
};

export default React.memo(ShoppingHelp);

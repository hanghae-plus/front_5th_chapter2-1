import React from "react";

const CartHeader: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <h6 className="text-2xl font-bold">🕹️ 아무튼 장바구니 🕹️</h6>
      <p className="text-xs text-gray-700">장바구니에 담긴 상품을 확인할 수 있습니다.</p>
    </section>
  );
};

export default React.memo(CartHeader, () => false);

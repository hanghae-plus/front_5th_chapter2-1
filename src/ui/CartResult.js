import React from 'react';

const CartResult = () => {
  // totalAmount
  
  const totalAmount = 1; // TODO: 총액가져오기 필요
  const discountRate = 1; // TODO: 할인율
  const isDiscount = discountRate > 0;

  
  const bonusPoint = 0; //TODO: 보너스 포인트


  return (
    <div id="cart-total" className="text-xl font-bold my-4">
      총액: ${Math.round(totalAmount)}원
      {isDiscount && <span className="text-green-500 ml-2">{`(${(discountRate * 100).toFixed(1)}% 할인 적용)`}</span>}
    </div>
  );
};

export default CartResult;

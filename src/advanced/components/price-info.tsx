import React from "react";

type PriceInfoProps = {
  finalTotal: number;
  discountRate: number;
};

/** 총 금액과 할인 정보 */

function PriceInfo({ finalTotal, discountRate }: PriceInfoProps) {
  const baseText = `총액: ${Math.round(finalTotal)}원`;
  const formattedDiscount = `${(discountRate * 100).toFixed(1)}% 할인 적용`;

  return (
    <>
      {discountRate > 0 ? (
        <span className="text-green-500 ml-2">{formattedDiscount}</span>
      ) : (
        baseText
      )}
    </>
  );
}

export default PriceInfo;

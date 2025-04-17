import React from "react";

interface TotalAmountProps {
    children: number;
}

const TotalAmount = ({ children }: TotalAmountProps) => {
    return (
        <div id="cart-total" className="text-xl font-bold my-4">
            총액: {Math.round(children)}원
            <span id="loyalty-points" className="text-blue-500 ml-2">
                (포인트: 0)
            </span>
        </div>
    );
};

export default TotalAmount;

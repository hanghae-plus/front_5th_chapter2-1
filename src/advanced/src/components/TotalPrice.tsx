import React from 'react';

interface TotalPriceProps {
    total: number;
    discountRate: number;
}

export const TotalPrice: React.FC<TotalPriceProps> = React.memo(({ total, discountRate }) => {
    const bonusPoints = Math.floor(total / 1000);

    return (
        <div className="text-xl font-bold my-4">
            총액: {Math.round(total).toLocaleString()}원
            {discountRate > 0 && (
                <span className="text-green-500 ml-2">({(discountRate * 100).toFixed(1)}% 할인 적용)</span>
            )}
            <span className="text-blue-500 ml-2">(포인트: {bonusPoints})</span>
        </div>
    );
});

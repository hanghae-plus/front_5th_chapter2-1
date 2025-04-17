import { HTMLAttributes } from 'react';

interface CartTotalAmountTextProps extends HTMLAttributes<HTMLDivElement> {
	totalAmount: number;
	loyaltyPoints: number;
	discountRate: number;
}

export const CartTotalAmountText: React.FC<CartTotalAmountTextProps> = ({
	totalAmount,
	loyaltyPoints,
	discountRate,
	...props
}) => {
	return (
		<div className={`text-xl font-bold my-4 ${props.className}`} {...props}>
			총액: {totalAmount}원
			{discountRate > 0 && (
				<span className="text-green-500 ml-2">
					({(discountRate * 100).toFixed(1)}% 할인 적용)
				</span>
			)}
			<span id="loyalty-points" className="text-blue-500 ml-2">
				(포인트: {loyaltyPoints})
			</span>
		</div>
	);
};

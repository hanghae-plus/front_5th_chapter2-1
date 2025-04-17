export const calculateItemDiscount = (productId, quantity) => {
	if (quantity < 10) return 0;

	switch (productId) {
		case 'p1':
			return 0.1;
		case 'p2':
			return 0.15;
		case 'p3':
			return 0.2;
		case 'p4':
			return 0.05;
		case 'p5':
			return 0.25;
		default:
			return 0;
	}
};

export const calculateQuantityDiscount = (
	totalAmount,
	subtotal,
	totalItemCount,
) => {
	let discountRate = (subtotal - totalAmount) / subtotal;

	// 30개 이상 구매 시 대량 구매 할인 적용 (25%)
	if (totalItemCount >= 30) {
		const volumeDiscountAmount = totalAmount * 0.25;
		const currentDiscountAmount = subtotal - totalAmount;

		// 대량 구매 할인이 기존 할인보다 더 큰 경우 대량 구매 할인 적용
		if (volumeDiscountAmount > currentDiscountAmount) {
			totalAmount = subtotal * (1 - 0.25);
			discountRate = 0.25;
		}
	}

	// 화요일 할인 적용 (10%)
	if (new Date().getDay() === 2) {
		totalAmount *= 0.9;
		discountRate = Math.max(discountRate, 0.1);
	}

	return { totalAmount, discountRate };
};

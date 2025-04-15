import { createLoyaltyPointText } from '../../components/loyalty-point-text/LoyaltyPointText';

export const updateLoyaltyPoints = (totalElement, totalAmount) => {
	const pointsAmount = Math.floor(totalAmount / 1000);
	// return  `(포인트: ${pointsAmount})`;
	const pointsElement = document.getElementById('loyalty-points');
	if (!pointsElement) {
		const pointsElement = createLoyaltyPointText({
			text: `(포인트: ${pointsAmount})`,
			id: 'loyalty-points',
			className: 'text-blue-500 ml-2',
		});
		totalElement.appendChild(pointsElement);
	} else {
		pointsElement.textContent = `(포인트: ${pointsAmount})`;
	}
};

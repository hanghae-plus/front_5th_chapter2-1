export const createLoyaltyPointText = ({ text, id, className }) => {
	const loyaltyPointText = document.createElement('span');
	loyaltyPointText.textContent = text;
	loyaltyPointText.id = id;
	loyaltyPointText.className = className;
	return loyaltyPointText;
};

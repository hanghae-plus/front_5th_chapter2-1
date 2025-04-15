export const createTotalAmountText = ({ text, id, className }) => {
	const totalAmountText = document.createElement('div');
	totalAmountText.textContent = text;
	totalAmountText.id = id;
	totalAmountText.className = className;
	return totalAmountText;
};

export const createDiscountText = ({ text, id, className }) => {
	const discountElement = document.createElement('span');
	discountElement.textContent = text;
	discountElement.id = id;
	discountElement.className = className;
	return discountElement;
};

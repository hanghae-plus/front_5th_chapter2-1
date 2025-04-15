export const createProductStateText = ({ text, id, className }) => {
	const productStateText = document.createElement('div');
	productStateText.textContent = text;
	productStateText.id = id;
	productStateText.className = className;
	return productStateText;
};

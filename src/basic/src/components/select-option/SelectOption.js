export const createSelectOption = ({ id, text, disabled }) => {
	const option = document.createElement('option');
	option.value = id;
	option.textContent = text;
	option.disabled = disabled;
	return option;
};

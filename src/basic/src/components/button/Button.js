export const createButton = (options) => {
	const { onClick, text, id, className } = options;
	const button = document.createElement('button');

	button.id = id;
	button.className = className;
	button.textContent = text;

	button.addEventListener('click', () => {
		if (onClick) {
			onClick();
		}
	});

	return button;
};

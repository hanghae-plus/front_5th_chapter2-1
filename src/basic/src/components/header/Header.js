export const createHeader = ({ text, className }) => {
	const header = document.createElement('h1');
	header.className = className ?? 'text-2xl font-bold mb-4';
	header.textContent = text;
	return header;
};

export const createSelect = ({ id, className }) => {
	const select = document.createElement('select');
	select.id = id;
	select.className = className;
	return select;
};

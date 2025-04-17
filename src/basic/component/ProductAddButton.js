export const ProductAddButton = () => {
  const button = document.createElement('button');
  button.id = 'add-to-cart';
  button.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  button.textContent = '추가';

  return button;
};

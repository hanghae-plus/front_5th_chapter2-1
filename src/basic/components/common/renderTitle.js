export default function renderTitle(tag, title) {
  const textElement = document.createElement(tag);
  textElement.className = 'text-2xl font-bold mb-4';
  textElement.textContent = title;
  return textElement;
}

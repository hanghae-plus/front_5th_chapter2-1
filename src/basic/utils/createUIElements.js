export const createUIElement = ({
  tag,
  id,
  className,
  textContent,
  innerHTML,
}) => {
  const element = document.createElement(tag);

  if (id) {
    element.id = id;
  }
  if (className) {
    element.className = className;
  }
  if (textContent) {
    element.textContent = textContent;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};

export const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);
  if (options.id) {
    element.id = options.id;
  }
  if (options.className) {
    element.className = options.className;
  }
  if (options.text) {
    element.textContent = options.text;
  }
  if (options.value) {
    element.value = options.value;
  }

  return element;
};

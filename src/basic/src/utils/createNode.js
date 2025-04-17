export const createElement = (type, id, className) => {
  const element = document.createElement(type);
  if (id) element.id = id;
  if (className) element.className = className;

  return element;
};

export const createTypography = (type, className, text) => {
  const element = document.createElement(type);
  if (className) element.className = className;
  if (text) element.textContent = text;

  return element;
};

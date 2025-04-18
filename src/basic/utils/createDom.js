export const createElement = (
  tag,
  { className = "", id = "", attributes = {}, textContent = "", props = {} } = {}
) => {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (id) {
    element.id = id;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  // boolean 직접 property 처리
  Object.entries(props).forEach(([key, value]) => {
    element[key] = value;
  });

  return element;
};

export const createTextNode = (text) => {
  return document.createTextNode(text);
};

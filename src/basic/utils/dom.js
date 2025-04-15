import { DOM_ATTRIBUTES } from '../consts/dom';

export const createElement = (
  tag,
  { id, className, attributes = {}, textContent } = {},
) => {
  const element = document.createElement(tag);

  if (id) element.id = id;
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
};

export const getDataAttribute = (element, attribute) => {
  return element.getAttribute(DOM_ATTRIBUTES.PRODUCT[attribute]);
};

export const setDataAttribute = (element, attribute, value) => {
  element.setAttribute(DOM_ATTRIBUTES.PRODUCT[attribute], value);
};

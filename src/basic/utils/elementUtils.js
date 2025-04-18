export function createElement(tagName, props) {
  return Object.assign(document.createElement(tagName), props);
}

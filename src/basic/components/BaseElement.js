class BaseElement {
  constructor({ tag, id, className, textContent }) {
    this.$element = document.createElement(tag);
    if (id) this.$element.id = id;
    if (className) this.$element.className = className;
    if (textContent) this.$element.textContent = textContent;
  }

  get() {
    return this.$element;
  }
}

export default BaseElement;

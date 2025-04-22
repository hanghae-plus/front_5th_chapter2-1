function createEl(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.id) el.id = options.id;
  if (options.className) el.className = options.className;
  if (options.text) el.textContent = options.text;
  if (options.value) el.value = options.value;
  return el;
}

export default createEl;

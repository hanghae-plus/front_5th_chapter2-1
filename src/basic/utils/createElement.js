export function createElement(tag, {className = '', text = '', id = ''} = {}) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    if (id) el.id = id;
    return el;
}
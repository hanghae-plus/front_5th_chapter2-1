export function createElement(tagName, attributes = {}, textContent = "") {
    const element = document.createElement(tagName);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

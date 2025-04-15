export const startRandomlyInMs = (ms) => (callback) => {
  const startsAt = Math.random(0) * ms;
  setTimeout(callback, startsAt);
};

export const createElement = (tag, props) => {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    element[key] = value;
  }
  return element;
};

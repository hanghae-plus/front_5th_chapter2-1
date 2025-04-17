// TODO: tag, props 검증하기

export const createElement = (tag, props) => {
  const element = document.createElement(tag);
  const propKeys = Object.keys(props);

  propKeys.forEach((key) => {
    element[key] = props[key];
  });

  return element;
};

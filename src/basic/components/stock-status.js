import { createElementFromHTML } from '../utils/dom-utils.js';

const $stockStatus = () => {
  return createElementFromHTML(/* html */ `
    <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
  `);
};

export { $stockStatus };

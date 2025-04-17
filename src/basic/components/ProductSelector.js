import { createElement } from '../utils/createElement';

const ProductSelector = () => {
    return createElement('select', {
        id: 'product-select',
        className: 'border rounded p-2 mr-2',
    });
};

export default ProductSelector;

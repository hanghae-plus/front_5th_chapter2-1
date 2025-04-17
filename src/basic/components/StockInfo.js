import { createElement } from '../utils/createElement';

const StockInfo = () => {
    return createElement('div', {
        id: 'stock-status',
        className: 'text-sm text-gray-500 mt-2',
    });
};

export default StockInfo;

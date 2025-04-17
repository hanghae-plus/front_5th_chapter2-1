import { createElement } from '../utils/createElement';

const Heading = () => {
    return createElement('h1', {
        className: 'text-2xl font-bold mb-4',
        textContent: '장바구니',
    });
};

export default Heading;

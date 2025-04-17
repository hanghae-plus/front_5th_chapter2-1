import {createElement} from '../utils/createElement.js';

export function Title() {
    return createElement('h1', {
        className: 'text-2xl font-bold mb-4',
        text: '장바구니',
    });
}

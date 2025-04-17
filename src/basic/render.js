import AddButton from './components/AddButton';
import CartItem from './components/CartItem';
import CartTotal from './components/CartTotal';
import Heading from './components/Heading';
import ProductSelector from './components/ProductSelector';
import StockInfo from './components/StockInfo';

export const render = () => {
    const $root = document.getElementById('app');
    const $wrap = document.createElement('div');

    $wrap.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 mt-8';

    const components = [Heading(), CartItem(), CartTotal(), ProductSelector(), AddButton(), StockInfo()];

    $root.appendChild($wrap);
    components.forEach((component) => $wrap.appendChild(component));
};

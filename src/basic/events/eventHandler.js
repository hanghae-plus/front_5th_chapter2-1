import handleAddCart from './handleAddCart';
import handleCart from './handleCart';

const eventHandler = () => {
  handleAddCart();
  handleCart();
};

export default eventHandler;

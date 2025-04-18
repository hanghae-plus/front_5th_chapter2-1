import { useCallback } from 'react';
import { useCartContext } from '../contexts/CartContext';
import useProduct from './useProduct';

const useCart = () => {
  const { cartItems, setCartItems } = useCartContext();
  const { setProducts, getProductById } = useProduct();

  const getCartItemById = useCallback(
    (productId: string) => cartItems.find(item => item.id === productId),
    [cartItems]
  );

  const incrementCartItemQuantity = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      const cartItem = getCartItemById(productId);
      const newQuantity = cartItem ? cartItem.quantity + 1 : 1;

      if (!product || product.quantity <= newQuantity) {
        alert('재고가 부족합니다.');
        return false;
      }

      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity, price: product.price } : item
        )
      );
      setProducts(prev =>
        prev.map(p => (p.id === productId ? { ...p, quantity: p.quantity - 1 } : p))
      );
    },
    [getProductById, setCartItems, setProducts, getCartItemById]
  );

  const addNewCartItem = useCallback(
    (productId: string) => {
      const product = getProductById(productId);

      if (!product) {
        return;
      }

      const newCartItem = {
        id: productId,
        quantity: 1,
        price: product.price,
        name: product.name,
      };

      setCartItems(prev => [...prev, newCartItem]);
      setProducts(prev =>
        prev.map(p => (p.id === productId ? { ...p, quantity: p.quantity - 1 } : p))
      );
    },
    [getProductById, setCartItems, setProducts]
  );

  const addCartItem = useCallback(
    (productId: string) => {
      const cartItem = getCartItemById(productId);

      if (!cartItem) {
        addNewCartItem(productId);
      } else {
        incrementCartItemQuantity(productId);
      }
    },
    [getCartItemById, incrementCartItemQuantity, addNewCartItem]
  );

  const hasEnoughStock = useCallback((productQuantity: number, change: number) => {
    if (change < 0) {
      return true;
    }

    return change <= productQuantity;
  }, []);

  const updateCartItem = useCallback(
    (productId: string, change: number) => {
      const product = getProductById(productId);
      const cartItem = getCartItemById(productId);
      const quantity = cartItem ? cartItem.quantity : 1;
      const newQuantity = quantity + change;

      if (!product) {
        return;
      }

      if (!hasEnoughStock(product?.quantity, change)) {
        alert('재고가 부족합니다.');
        return;
      }

      if (newQuantity <= 0) {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        setProducts(prev =>
          prev.map(p => (p.id === productId ? { ...p, quantity: p.quantity + change } : p))
        );
      } else {
        setCartItems(prev =>
          prev.map(item => (item.id === productId ? { ...item, quantity: newQuantity } : item))
        );
        setProducts(prev =>
          prev.map(p => (p.id === productId ? { ...p, quantity: p.quantity - change } : p))
        );
      }
    },
    [getProductById, setCartItems, setProducts, getCartItemById]
  );

  const removeCartItem = useCallback(
    (productId: string) => {
      const product = getProductById(productId);

      if (!product) {
        return;
      }

      const cartItem = getCartItemById(productId);
      const quantity = cartItem ? cartItem.quantity : 1;

      setCartItems(prev => prev.filter(item => item.id !== productId));
      setProducts(prev =>
        prev.map(p => (p.id === productId ? { ...p, quantity: p.quantity + quantity } : p))
      );
    },
    [getProductById, setCartItems, setProducts, getCartItemById]
  );

  return {
    cartItems,
    addCartItem,
    updateCartItem,
    removeCartItem,
  };
};

export default useCart;

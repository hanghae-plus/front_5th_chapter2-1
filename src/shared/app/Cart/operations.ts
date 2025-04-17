import { Cart, CartItem } from '../../store/cart';
import { Product, findProduct } from '../../store/productList';
import { CartOperationProps } from './types';

export function handleQuantityChange(
  productId: string, 
  change: number,
  { cart, productList, updateCart, updateProductList }: CartOperationProps
): void {
  const product = findProduct(productList, productId);
  if (!product) return;

  if (change > 0 && product.q <= 0) {
    alert('재고가 부족합니다.');
    return;
  }

  const newCart = cart.map(item => {
    if (item.productId === productId) {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) return null;
      return { ...item, quantity: newQuantity };
    }
    return item;
  }).filter((item): item is CartItem => item !== null);

  const newProductList = [...productList];
  const productIndex = newProductList.findIndex(p => p.id === productId);
  if (productIndex >= 0) {
    newProductList[productIndex] = {
      ...newProductList[productIndex],
      q: newProductList[productIndex].q - change
    };
  }
  
  updateCart(newCart);
  updateProductList(newProductList);
}

export function handleRemoveItem(
  productId: string,
  { cart, productList, updateCart, updateProductList }: CartOperationProps
): void {
  const itemToRemove = cart.find(item => item.productId === productId);
  if (!itemToRemove) return;

  const newCart = cart.filter(item => item.productId !== productId);
  const newProductList = [...productList];
  const productIndex = newProductList.findIndex(p => p.id === productId);
  
  if (productIndex >= 0) {
    newProductList[productIndex] = {
      ...newProductList[productIndex],
      q: newProductList[productIndex].q + itemToRemove.quantity
    };
  }

  updateCart(newCart);
  updateProductList(newProductList);
}

export function handleAddToCart(
  productId: string,
  { cart, productList, updateCart, updateProductList }: CartOperationProps
): void {
  const product = findProduct(productList, productId);
  if (!product || product.q <= 0) {
    alert('재고가 부족합니다.');
    return;
  }

  const existingItemIndex = cart.findIndex(item => item.productId === productId);
  let newCart: Cart;

  if (existingItemIndex >= 0) {
    newCart = cart.map((item, index) => 
      index === existingItemIndex 
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    newCart = [...cart, { productId, quantity: 1 }];
  }

  const newProductList = [...productList];
  const productIndex = newProductList.findIndex(p => p.id === productId);
  if (productIndex >= 0) {
    newProductList[productIndex] = {
      ...newProductList[productIndex],
      q: newProductList[productIndex].q - 1
    };
  }
  
  updateCart(newCart);
  updateProductList(newProductList);
} 
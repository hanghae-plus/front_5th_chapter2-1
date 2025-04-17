// hooks/useCart.ts
import { useState } from 'react';
import { Product, CartItem } from '../types';

export function useCartHook(initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastSelectedProduct, setLastSelectedProduct] = useState<string | null>(null);

  // 재고 감소
  function decreaseProductStock(productId: string): void {
    setProducts(function (prevProducts) {
      return prevProducts.map(function (product) {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
    });
  }

  // 카트에 추가 또는 수량 증가
  function updateCartItems(selectedProduct: Product): void {
    setCartItems(function (prevItems) {
      const exists = prevItems.find(function (item) {
        return item.product.id === selectedProduct.id;
      });
      if (exists) {
        return prevItems.map(function (item) {
          if (item.product.id === selectedProduct.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return prevItems.concat({ product: selectedProduct, quantity: 1 });
    });
  }

  // 상품 추가 핸들러
  function handleProductAdd(selectedProduct: Product): void {
    if (!selectedProduct || selectedProduct.quantity <= 0) {
      alert('선택할 수 없는 상품입니다.');
      return;
    }
    updateCartItems(selectedProduct);
    decreaseProductStock(selectedProduct.id);
    setLastSelectedProduct(selectedProduct.id);
  }

  // 수량 변경 핸들러 (+1 또는 -1)
  function handleQuantityChange(productId: string, amount: number): void {
    const product = products.find(function (p) {
      return p.id === productId;
    });

    if (!product) {
      return;
    }

    if (amount > 0 && product.quantity <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    setCartItems(function (prevItems) {
      return prevItems
        .map(function (item) {
          if (item.product.id === productId) {
            return { ...item, quantity: item.quantity + amount };
          }
          return item;
        })
        .filter(function (item) {
          return item.quantity > 0;
        });
    });

    setProducts(function (prevProducts) {
      return prevProducts.map(function (product) {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity - amount };
        }
        return product;
      });
    });
  }

  // 아이템 제거 핸들러
  function handleRemove(productId: string): void {
    const itemToRemove = cartItems.find(function (item) {
      return item.product.id === productId;
    });
    if (!itemToRemove) {
      return;
    }

    // 재고 복구
    setProducts(function (prevProducts) {
      return prevProducts.map(function (p) {
        if (p.id === productId) {
          return { ...p, quantity: p.quantity + itemToRemove.quantity };
        }
        return p;
      });
    });

    // 카트에서 제거
    setCartItems(function (prevItems) {
      return prevItems.filter(function (item) {
        return item.product.id !== productId;
      });
    });
  }

  return {
    products,
    setProducts,
    cartItems,
    lastSelectedProduct,
    handleProductAdd,
    handleQuantityChange,
    handleRemove,
  };
}

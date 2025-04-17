import React, { useEffect, useState } from 'react';
import { ProductSelectOption } from './component/ProductSelectOption';
import { ProductAddButton } from './component/ProductAddButton';
import { ProductStockInfo } from './component/ProductStockInfo';
import { PRODUCTS } from './constant/product';
import { CartTotal } from './component/CartTotal';
import { IProduct, ICartProduct } from './type/product';
import { CartProducts } from './component/CartProducts';
import {
  DISCOUNT_LUCKY_ITEM,
  DISCOUNT_SUGGEST_ITEM,
  LUCKY_ITEM_INTERVAL,
  SUGGEST_ITEM_INTERVAL,
} from './constant/cart';

const App = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [cartProducts, setCartProducts] = useState<Record<string, ICartProduct>>({});
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  useEffect(() => {
    setTimeout(function () {
      setInterval(function () {
        const luckyItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
        if (Math.random() < 0.3 && luckyItem.stock > 0) {
          const discountedPrice = Math.round(luckyItem.price * DISCOUNT_LUCKY_ITEM);
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
          updateSelectOption(luckyItem.id, discountedPrice);
        }
      }, LUCKY_ITEM_INTERVAL);
    }, Math.random() * 10000);

    setTimeout(function () {
      setInterval(function () {
        if (selectedProduct) {
          const suggest = PRODUCTS.find(function (item) {
            return item.id !== selectedProduct.id && item.stock > 0;
          });
          if (suggest) {
            const discountedPrice = Math.round(suggest.price * DISCOUNT_SUGGEST_ITEM);
            alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
            updateSelectOption(suggest.id, discountedPrice);
          }
        }
      }, SUGGEST_ITEM_INTERVAL);
    }, Math.random() * 20000);
  }, []);

  const handleAddToCart = () => {
    const productId = selectedProduct.id;
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return;
    }
    if (product.stock <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    setCartProducts((prevCart) => {
      const existingProduct = prevCart[productId];

      // 이미 카트에 존재한다면 수량 증가
      if (existingProduct) {
        return {
          ...prevCart,
          [productId]: {
            ...existingProduct,
            quantity: (existingProduct.quantity ?? 1) + 1,
          },
        };
      }

      // 새로 추가하는 경우
      const productToAdd = products.find((p) => p.id === productId);
      if (!productToAdd) {
        return prevCart;
      }

      updateProducts(productId, -1);

      return {
        ...prevCart,
        [productId]: {
          ...productToAdd,
          quantity: 1,
        },
      };
    });
  };

  const handleSelectOption = (productId: string) => {
    const product = products.find((p) => p.id === productId) as IProduct;
    setSelectedProduct(product);
  };

  const handleDecreaseQuantity = (productId: string) => {
    setCartProducts((prevCart) => {
      const currentProduct = prevCart[productId];
      if (!currentProduct) {
        return prevCart;
      }

      const productInStock = products.find((p) => p.id === productId);
      if (!productInStock) {
        return prevCart;
      }

      if (currentProduct.quantity > 1) {
        updateProducts(productId, 1);
        return {
          ...prevCart,
          [productId]: {
            ...currentProduct,
            quantity: currentProduct.quantity - 1,
          },
        };
      } else {
        const newCart = { ...prevCart };

        delete newCart[productId];

        updateProducts(productId, currentProduct.quantity);

        return newCart;
      }
    });
  };

  const handleIncreaseQuantity = (productId: string) => {
    setCartProducts((prevCart) => {
      const currentProduct = prevCart[productId];
      const productInStock = products.find((p) => p.id === productId);

      if (productInStock && productInStock.stock <= 0) {
        alert('재고가 부족합니다.');
        return prevCart;
      }

      updateProducts(productId, -1);
      return {
        ...prevCart,
        [productId]: {
          ...currentProduct,
          quantity: currentProduct.quantity + 1,
        },
      };
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartProducts((prevCart) => {
      const currentProduct = prevCart[productId];
      const newCart = { ...prevCart };

      delete newCart[productId];

      updateProducts(productId, currentProduct.quantity);

      return newCart;
    });
  };

  const updateProducts = (productId, value) => {
    const updateProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, stock: product.stock + value };
      }
      return product;
    });
    setProducts(updateProducts);
  };

  const updateSelectOption = (productId: string, newPrice: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, price: newPrice } : product,
      ),
    );
  };

  return (
    <div className='bg-gray-100 p-8'>
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8'>
        <h1 className='text-2xl font-bold mb-4'>장바구니</h1>
        <CartProducts
          products={cartProducts}
          onDecreaseQuantity={handleDecreaseQuantity}
          onIncreaseQuantity={handleIncreaseQuantity}
          onRemoveProduct={handleRemoveFromCart}
        />
        <CartTotal products={Object.values(cartProducts)} />
        <ProductSelectOption products={products} onClick={handleSelectOption} />
        <ProductAddButton onClick={handleAddToCart} />
        <ProductStockInfo products={products} />
      </div>
    </div>
  );
};

export default App;

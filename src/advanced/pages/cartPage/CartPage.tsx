import { useState } from 'react';
import { CartItemList, TotalAmount, ProductSelector, OutOfStockList } from './components';
import { Product } from '../../types/product';
import { products } from '../../data';
import { useCart } from './hooks';
import Button from '../../components/Button';

export default function CartPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  const {
    cartItems,
    totalPrice,
    bonusPoints,
    discountRate,
    productsOptions,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const handleSelectProduct = (productId: string) => {
    const product = products.find((product) => product.id === productId);

    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleAddProduct = () => {
    addToCart(selectedProduct);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <CartItemList
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
      <TotalAmount totalPrice={totalPrice} discountRate={discountRate} bonusPoints={bonusPoints} />
      <ProductSelector
        products={productsOptions}
        selectedProduct={selectedProduct}
        onSelectProduct={handleSelectProduct}
      />
      <Button className={'bg-blue-500 px-4 py-2'} onClick={handleAddProduct}>
        추가
      </Button>
      <OutOfStockList products={productsOptions} />
    </div>
  );
}

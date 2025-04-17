import React from 'react';
import { products as initialProducts } from './src/const/products';
import { useCart } from './src/hooks/useCart';
import { useDiscount } from './src/hooks/useDiscount';
import { useSale } from './src/hooks/useSale';
import { CartItemList } from './src/components/CartItemList';
import { Header } from './src/components/Header';
import { TotalPrice } from './src/components/TotalPrice';
import { ProductSelect } from './src/components/ProductSelect';
import { AddButton } from './src/components/AddButton';
import { StockInformation } from './src/components/StockInformation';

const App: React.FC = () => {
    const {
        products,
        setProducts,
        cartItems,
        selectedProductId,
        setSelectedProductId,
        handleAddToCart,
        handleQuantityChange,
        handleRemoveItem,
    } = useCart(initialProducts);

    const { calculateTotal } = useDiscount();
    const { total, discountRate } = calculateTotal(cartItems);

    useSale(products, setProducts, selectedProductId);

    return (
        <div className="bg-gray-100 p-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
                <Header />
                <CartItemList
                    cartItems={cartItems}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                />
                <TotalPrice total={total} discountRate={discountRate} />
                <ProductSelect
                    products={products}
                    selectedProductId={selectedProductId}
                    onProductSelect={setSelectedProductId}
                />
                <AddButton onClick={handleAddToCart} />
                <StockInformation products={products} />
            </div>
        </div>
    );
};

export default App;

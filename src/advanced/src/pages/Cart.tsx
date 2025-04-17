import { Heading, CartItemList, ProductSelector, AddButton, StockInfo } from '../components';
import { useState } from 'react';

const Cart = () => {
    const [selectedOptionId, setSelectedOptionId] = useState<string>('p1');

    const handleSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const currentOptionId = event.target.options[event.target.selectedIndex].id;
        setSelectedOptionId(currentOptionId);
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 mt-8">
            <Heading />
            <CartItemList />
            <ProductSelector onChange={handleSelectorChange} />
            <AddButton selectedOptionId={selectedOptionId} />
            <StockInfo />
        </div>
    );
};

export default Cart;

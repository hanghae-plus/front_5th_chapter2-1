import React, { useEffect, useState } from 'react';
import CartLayout from './components/CartLayout';

const App = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <CartLayout>
                {<div>안녕하세요</div>}
            </CartLayout>
        </div>
    );
};

export default App;

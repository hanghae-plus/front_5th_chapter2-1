import { useEffect } from 'react';

export function setEvents(addToCartHandler) {
    useEffect(() => {
        const addToCartButton = document.getElementById('add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', addToCartHandler);
        }

        return () => {
            if (addToCartButton) {
                addToCartButton.removeEventListener('click', addToCartHandler);
            }
        };
    }, [addToCartHandler]);
}
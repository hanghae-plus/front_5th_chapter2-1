import { OUT_OF_STOCKS } from "../../context/product";

function addCartItem(product, selectItemId, cartItems, setCartItems){
    const product$ = product.find(item => item.id === selectItemId);

    if(product$.stock <= 0){
        alert(OUT_OF_STOCKS);
        return;
    }

    setCartItems((prevItem) => {
        const existItem = prevItem.find(item => item.id === product$.id);

        //동일 아이템 있으면 새 아이템 추가
        if(existItem){
            return prevItem.map(item => item.id === product$.id ? { ...item, qty: item.qty+1} : item);
        }

        const updatedProduct = { ...product$, stock: product$.stock - 1 };
        return [...prevItem, { ...updatedProduct, qty: 1 }];
    });
}

export {addCartItem};
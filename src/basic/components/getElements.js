import { AddCartButton, Cart, ItemSelect, Title, Sum, StockState } from './createElements';

let $addCartButton = new AddCartButton().get();

let $cart = new Cart().get();

let $itemSelect = new ItemSelect().get();

let $title = new Title().get();

let $sum = new Sum().get();

let $stockState = new StockState().get();

export { $addCartButton, $cart, $title, $itemSelect, $sum, $stockState };

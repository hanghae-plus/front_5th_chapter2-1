import { ShoppingList } from "./hooks/components/shoppingList.js";
import { alertPromotion1, alertPromotion2 } from "./hooks/hooks/setIntervals.js";
import { getCartPrice } from "./hooks/hooks/getCartPrice.js";
import { addCart } from "./hooks/hooks/addCart.js";
import { DeleteCart } from "./hooks/hooks/deleteCart.js";

ShoppingList();
getCartPrice();
alertPromotion1();
alertPromotion2();
addCart();
DeleteCart();

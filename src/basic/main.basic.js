import { ShoppingList } from "../components/shoppingList.js";
import { alertPromotion1, alertPromotion2 } from "../hooks/setIntervals.js";
import { getCartPrice } from "../hooks/getCartPrice.js";
import { addCart } from "../hooks/addCart.js";
import { DeleteCart } from "../hooks/deleteCart.js";

ShoppingList();
getCartPrice();
alertPromotion1();
alertPromotion2();
addCart();
DeleteCart();

//cart에 name,price로 구성된 아이템을 넣습니다.
function add_item_to_cart(cart, name, price) {
  cart.push({
    name: name,
    price: price,
  });
}

//몰루
function update_shipping_icons() {
  var buy_buttons = get_buy_buttons_dom();
  for (var i = 0; i < buy_buttons.length; i++) {
    var button = buy_buttons[i];
    var item = button.item;
    if (item.price + shopping_cart_total >= 20) button.show_free_shopping_icon();
    else button.hide_free_shopping_icon();
  }
}

function update_tax_dom() {
  const 세금이_계산된_총액 = 총액에_세금을_계산하는_함수(0.1);
  대충업데이트(세금이_계산된_총액); //추가
}

function 총액에_세금을_계산하는_함수(tax) {
  const 세금이_계산된_총액 = get_cart_total(cart) * tax;
  return 세금이_계산된_총액;
}

//cart의 아이템 총액을 리턴합니다.
function get_cart_total(cart) {
  const cart_total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    cart_total += item.price;
  }
  return cart_total;
}

export const saleTimer = (productList, lastSelectedProduct, updateSelectOptions) => {
    setTimeout(function () {
        setInterval(function () {
            var luckyItem = productList[Math.floor(Math.random() * productList.length)];
            if (Math.random() < 0.3 && luckyItem.quantity > 0) {
                luckyItem.val = Math.round(luckyItem.val * 0.8);
                alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
                updateSelectOptions();
            }
        }, 30000);
    }, Math.random() * 10000);
    setTimeout(function () {
        setInterval(function () {
            if (lastSelectedProduct) {
                var suggest = productList.find(function (item) { return item.id !== lastSelectedProduct && item.quantity > 0; });
                if (suggest) {
                    alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
                    suggest.val = Math.round(suggest.val * 0.95);
                    updateSelectOptions();
                }
            }
        }, 60000);
    }, Math.random() * 20000);
}
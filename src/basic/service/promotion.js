// 번개세일
export function startFlashSaleTimer(productList, updateCallback) {
    setTimeout(function () {
        setInterval(function () {
            const flashSaleProduct =
                productList[Math.floor(Math.random() * productList.length)];
            if (Math.random() < 0.3 && flashSaleProduct.q > 0) {
                flashSaleProduct.val = Math.round(flashSaleProduct.val * 0.8);
                alert(
                    "번개세일! " +
                        flashSaleProduct.name +
                        "이(가) 20% 할인 중입니다!"
                );
                updateCallback();
            }
        }, 30000);
    }, Math.random() * 10000);
}

// 제안세일
export function startProductSuggestionTimer(
    productList,
    lastSelected,
    updateCallback
) {
    setTimeout(function () {
        setInterval(function () {
            if (lastSelected) {
                const suggest = productList.find(function (item) {
                    return item.id !== lastSelected && item.q > 0;
                });
                if (suggest) {
                    alert(
                        suggest.name +
                            "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!"
                    );
                    suggest.val = Math.round(suggest.val * 0.95);
                    updateCallback();
                }
            }
        }, 60000);
    }, Math.random() * 2000);
}

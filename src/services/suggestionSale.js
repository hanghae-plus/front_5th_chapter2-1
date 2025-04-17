
//상품 제안
export function suggestionSale(ctx) {
    const { productList, updateSelOpts } = ctx;
  
    setTimeout(() => {
      setInterval(() => {
        if (ctx.lastSel) {
          const suggestion = productList.find(item => item.id !== ctx.lastSel && item.q > 0);
          if (suggestion) {
            alert(`${suggestion.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
            suggestion.val = Math.round(suggestion.val * 0.95);
            updateSelOpts(ctx);
          }
        }
      }, 60000);
    }, Math.random() * 20000);
  }
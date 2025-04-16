


import { prodList } from "../data/product";

// updateSelectOptions 함수
function updateSelectOptions(select) {
  select.innerHTML='';

  prodList.forEach(function (item) {
    const opt = document.createElement('option');
    opt.value=item.id;
    opt.textContent=item.name + ' - ' + item.val + '원';
    if(item.q === 0) opt.disabled=true;

    select.appendChild(opt);
  });
}

// luckySaleTimer함수
const startLuckySaleTimer = () =>{

  setTimeout(function () {
    setInterval(function () {

      const luckyItem=prodList[Math.floor(Math.random() * prodList.length)];

      if(Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val=Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);
}


// lastSaleTimer함수
const startLastSaleTimer =(getLastSale) =>{

    setTimeout(function () {
      setInterval(function () {

        const lastSale = getLastSale(); 
        if(lastSale) {
          const suggest=prodList.find(function (item) { return item.id !== lastSel && item.q > 0; });
          
          if(suggest) {
            alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
            suggest.val=Math.round(suggest.val * 0.95);

            updateSelectOptions();
          }
        }
      }, 60000);
    }, Math.random() * 20000);
}

export { startLastSaleTimer, startLuckySaleTimer, updateSelectOptions };


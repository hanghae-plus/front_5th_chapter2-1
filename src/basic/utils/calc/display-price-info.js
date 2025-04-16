export function displayPriceInfo (sum,totalAmount,discountRate) {
  sum.textContent='총액: ' + Math.round(totalAmount) + '원';

  if(discountRate > 0) {
    const span=document.createElement('span');
    span.className='text-green-500 ml-2';
    span.textContent='(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
    
    sum.appendChild(span);
  }

}
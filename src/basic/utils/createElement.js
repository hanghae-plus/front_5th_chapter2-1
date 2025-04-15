//요소 생성 함수

export const createElement =(tag,options={})=>{

  const el = document.createElement(tag);

  if(options.className){
    el.className = options.className;
  }

  if(options.id){
    el.id = options.id;
  }

  if(options.textContent){
    el.textContent = options.textContent;
  }

  return el;
}
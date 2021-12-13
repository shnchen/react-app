import React from 'react';



const Switch = (props)=>{
  return (
    <div className='switch-wrapper'>
      <div onClick={()=>{
        let dom = document.querySelector('.scroll-bar');
        let faDom = document.querySelector('.switch-wrapper');
        if(!dom.style.left||dom.style.left==='0px'){
          dom.style.left = '15px';
          faDom.style.backgroundColor = '#2f5fd3';
          props.callback(true);
        }else{
          dom.style.left=0;
          faDom.style.backgroundColor = '#eee';
          props.callback(false);
        }
        
      }} className='scroll-bar'></div>
    </div>
  )
}


export default Switch;
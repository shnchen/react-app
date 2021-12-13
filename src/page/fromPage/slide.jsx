import React from 'react';


const Slide = (props)=>{
  return (
    <div className='slide-wrapper'>
      <div onMouseDown={()=>{
        const outOffsetLeft = document.querySelector('.out-box');
        const slide = document.querySelector('.slide');
        const mark = document.querySelector('.mark');
        document.onmousemove=(e)=>{
          let slideWidth = e.clientX - outOffsetLeft.offsetLeft ;
          if(slideWidth>=300){
            slide.style.width='300px';
            mark.style.left='290px';
          }else if(slideWidth<=0){
            slide.style.width=0;
            mark.style.left='1px';
          }else{
            slide.style.width=slideWidth +'px';
            mark.style.left=slideWidth+'px';
          }
          props.callback(Math.floor(slideWidth/300*100))
        }
      }} 
      onMouseUp={()=>{
        document.onmousemove=()=>null;
      }}
      className='out-box'>
        <div className='slide'></div>
        <div  className='mark'></div>
      </div>      
    </div>
  )
}


export default Slide;

import React,{useEffect} from 'react';


const Tip = (props)=>{
  console.log(props);
  useEffect(()=>{
    let timer = setTimeout(() => {
      props.callback();
    }, 3000);
    return ()=>{
      timer=null;
    }
  },[])
  return (
    <div className='tip-wrapper'>
      <div className='right-icon'></div>
      提交成功，即将更新右侧
      <div onClick={()=>{
        props.callback();
      }} className='tip-icon'></div>
      
      </div>
  )
}

export default Tip;
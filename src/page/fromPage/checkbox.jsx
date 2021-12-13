import React,{useState,useEffect} from 'react';


const CheckBox = ({item,callback})=>{
const [isCheck,setIsCheck] = useState(false)
useEffect(()=>{
  setIsCheck(item.value)
},[])
  return (
    <div className='check-box'>
      
      <label>
      
      <input onChange={(e)=>{
          callback({isCheck:e.target.checked,key:item.key});
          setIsCheck(e.target.checked);
      }} type='checkbox' checked={isCheck} />
      {item.key}
      </label>
    </div>
  )
}


export default CheckBox;
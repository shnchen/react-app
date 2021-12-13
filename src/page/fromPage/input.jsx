import React,{useState} from 'react';


const Input = (props)=>{
  const [value,setValue] = useState('')
  return (
    <div className='input-wrapper'>
      <input placeholder='输入内容后出现清除按钮' onChange={(e)=>{
        setValue(e.target.value);
        props.callback(e.target.value);
      }} value={value} />
      {value && <div onClick={()=>{
        setValue('')
      }} className='clear-icon'></div>}
    </div>
  )
}

export default Input;
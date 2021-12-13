import React,{useState} from 'react';
import './index.less';
import CheckBox from './checkbox.jsx';
import Select from './select.jsx';
import Slide from './slide.jsx';
import Input from './input.jsx';
import Switch from './switch.jsx';
import Tip from './tip.jsx';
let checkBoxArray = []
const checkBoxList = [
  {key:'数学',value:false},
  {key:'语文',value:false},
  {key:'英语',value:false}
]
const FormPage = ()=>{
  const [checkedList,setCheckedList] = useState([]);
  const [selectData,seSelectData] = useState('');
  const [showTip,setShowTip]=useState(false);
  const [slideValue,setSlideValue] = useState(0);
  const [inputValue,setInputValue] = useState('');
  const [switchValue,setSwitchValue] = useState(false);
  const [showData,setShowData] = useState(null);
  return (
    <div className='form-page'>
      
      <div className='page-left'>
      <header>
        <h1>代码示范列子</h1>
        </header>
        <div className='checkbox-title'>checkbox多选：</div>
       {
         checkBoxList.map(item=>{
           return <CheckBox
                    callback={(e)=>{
                      if(e.isCheck && !checkBoxArray.includes(e.key)  ){
                        checkBoxArray.push(e.key);
                      }else{
                        checkBoxArray.length&&
                        checkBoxArray.splice(checkBoxArray.findIndex(item=>item===e.key),1);
                      }
                      setCheckedList(checkBoxArray);
                    }}
                    key={item.key} 
                    item={item} />
         })
       }
       <div className='select-title'>Select多选框：</div>
       <Select callback={(e)=>{
         seSelectData(e)
       }} />
       <div className='slide-title'>Slide进度条（可拖动）：</div>
       <Slide callback={(e)=>{
         setSlideValue(e);
       }} />
       <div className='input-title'>input输入后可清除：</div>
       <Input callback={(e)=>{
         setInputValue(e);
       }} />
       <div className='switch-title'>switch开关：</div>
       <Switch callback={(e)=>{
         console.log(e);
         setSwitchValue(e)
       }} />
       <div onClick={()=>{
         setShowTip(true);
         let params={
          checkbox:checkedList,
          selectData,
          slide:slideValue,
          inputValue,
          switchValue
         };
         setShowData(params);
         }} className='btn'>提交</div>
       <div className='text'>点击提交后，会进行snackbar提示</div>
      </div>
      {showData && <div className='page-right'>
        <div className='checkbox-title'>checkbox多选：</div>
        {showData.checkbox.map(item=>{
          return <span key={item}>{item}</span>
        })}
        <div className='select-title'>Select多选框：</div>
        <span>{showData.selectData}</span>
        <div className='slide-title'>Slide进度条（可拖动）：</div>
        <span>{showData.slide}</span>
        <div className='input-title'>input输入后可清除：</div>
        <span>{showData.inputValue}</span>
        <div className='switch-title'>switch开关：</div>
        <span>{`${showData.switchValue}`}</span> 
      </div>}
     {showTip&& <Tip callback={()=>{
       setShowTip(false)
     }} />}
    </div>
  )
}

export default FormPage;
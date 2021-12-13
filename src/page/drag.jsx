import React,{useEffect} from 'react';
import DragClass from '../component/drag'


const Drag = ()=>{


useEffect(()=>{
  let drag =new DragClass({selector:'.drag-box'});
  drag.init()

},[])
  return (
    <div
    className="drag-box"
      style={{width:'100px',height:'100px',backgroundColor:'pink'}}
    >123</div>
  )
}


export default Drag;

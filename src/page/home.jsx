import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFun} from '../store/action';
import {Button} from 'antd';
import Fly from '../assets/images/fly.jpeg'
class Home extends React.Component{
    constructor(props){
        super(props)
    }
    goList(){
        this.props.history.push('/list');
        this.props.setFun('34');
    }
    render(){
    return <div className="home" style={{position:'relative'}} >
        <Button>{this.props.state}</Button>
        <Button type="primary" onClick={()=>{
            let dom = document.querySelector('.box');
            dom.style.transition='left 3s ease 0.05s';
            dom.style.transform='rotate(160deg)';
            dom.style.left='100px';
            
           

        }}>Primary Button</Button>
        <div className='box' style={{
            width:'50px',
            height:'50px',
            position:'absolute',
            backgroundImage:`url(${Fly})`,
            backgroundSize:'100%',
            left:'300px',
            top:'300px'
        }}></div>
        </div>
    }
}
const mapStateToProps=(state)=>{
    return{
        state
    }
}
const mapDispathcToProps = (dispatch) =>{
    return{
        setFun:bindActionCreators(setFun,dispatch)
    }
}
export default connect(mapStateToProps,mapDispathcToProps)(Home);
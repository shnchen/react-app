import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFun} from '../store/action';
// import {Form, Input,Button,Checkbox} from 'antd';
import '../assets/style/home.less';
import Img from '../assets/images/timg1.jpeg'
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            layout : {
                labelCol: {
                  span: 8,
                },
                wrapperCol: {
                  span: 16,
                },
              },  
              tailLayout:{
                wrapperCol: {
                  offset: 8,
                  span: 16,
                },
              }
        }
    }
    goList(){
        this.props.history.push('/list');
        this.props.setFun('34');
    };
      
    
    onFinish(values){
          console.log('Success:', values);
        };
      
     onFinishFailed(errorInfo){
          console.log('Failed:', errorInfo);
        };
    render(){
        const {layout,tailLayout} = this.state;
        return (
            <div className="home">
                <img src={Img} className="logo" alt="logo"/>
                1233
            </div>
          );
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
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFun} from '../store/action';
// import {Form, Input,Button,Checkbox} from 'antd';
import '../assets/style/home.less';
import Img from '../assets/images/timg1.jpeg'
import Son from './son.jsx'
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentWillMount(){
        console.log('f will')
    }
    componentDidMount(){
    }
    goList(){
        this.props.history.push('/list');
        this.props.setFun('34');
    };
    render(){
        return (
            <div className="home">
                <img onClick={()=>this.goList()} src={Img} className="logo" alt="logo"/>
                1233
                <Son />
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
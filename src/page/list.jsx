import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { setFun } from '../store/action';
import '../assets/style/index.less'
class List extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        console.log(this.props)
    }
    goHome(){
        this.props.history.push('/home');
    }
    render(){
        return(
        <div className="list" onClick={_=>{this.goHome()}}>{this.props.state.sec.secState}</div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        state
    }
};
const mapDispathToProps = (dispatch) =>{
    return{
        // setFun:bindActionCreators(setFun,dispatch)
    }
}
export default connect(mapStateToProps,mapDispathToProps)(List);
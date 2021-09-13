import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFun,getFun,setSec} from '../store/action';
import {Button} from 'antd';
class Home extends React.Component{
    constructor(props){
        super(props)
    }
    goList(){
        
        this.props.setSec({secState:900});
        this.props.history.push('/list');
    }
    componentDidMount() {
        console.log(this.props)
    }
    render(){
    return <div className="home">
        <Button onClick={()=>{this.props.getFun({num:800})}}>{this.props.state.frist.num}</Button>
        <Button type="primary" onClick={_=>this.goList()}>Primary Button</Button>
        <div>dsklfjklfdskjldfskj</div>
        kdfkjdskk
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
        setFun:bindActionCreators(setFun,dispatch),
        getFun:bindActionCreators(getFun,dispatch),
        setSec:bindActionCreators(setSec,dispatch)
    }
}
export default connect(mapStateToProps,mapDispathcToProps)(Home);
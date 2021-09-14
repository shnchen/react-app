import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFun} from '../store/action';
import {Button} from 'antd';
class Home extends React.Component{
    constructor(props){
        super(props)
    }
    goList(){
        this.props.history.push('/list');
        this.props.setFun('34');
    }
    render(){
    return <div className="home" onClick={_=>this.goList()}>
            <Button>{this.props.state}</Button>
            <Button type="primary">Primary Button</Button>
            <div>终于成功了!</div>
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
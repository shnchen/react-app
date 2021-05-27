import React from 'react';
import {Button} from 'antd'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFun} from '../store/action';
// import {Form, Input,Button,Checkbox} from 'antd';
import '../assets/style/home.less';
import Img from '../assets/images/10.jpeg'
import Son from './son.jsx'
import TipComponent from '../component/common/tip.jsx'
import '../loader'
import {translateLanguage} from '@gaodun.com/gtools';

const message = translateLanguage('zh-TW','10423012');
import {test} from '../api'
console.log(message);
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentWillMount(){
        test()
    }
    componentDidMount(){
        this.setCookie('MY',1234,10)
        const data = [
            {
                name:'a',
                children:[
                    { name:'a1', children:[{name:'a11'}] },
                    { name:'a2',children:[{name:'a21'}]},
                    { name:'a3', children:[{name:'a31'}]}
                ]
            },
            {
                name:'b',
                children:[
                    { name:'b1',children:[{name:'b11'}]},
                    { name:'b2',children:[{name:'b21'}]},
                    { name:'b3',children:[{name:'b31'}]}
                ]
            }
        ]
        function deepFirstSearch(data,result){
            data.map(item=>{
                result.push(item.name);
                if(item.children){
                    deepFirstSearch(item.children,result)
                }
            })
            return result;
        }
        console.log(deepFirstSearch(data,[]))
        function breadFirstSearch(data){
            let result = [];
            let queue = data;
            while(queue.length>0){
                [...queue].forEach(item=>{
                    queue.shift();
                    result.push(item.name);
                    item.children&&(queue.push(...item.children))
                })
            }
            return result
        }
       console.log(breadFirstSearch(data))
    }
    goList(){
        console.log(this.getCookie('MY'))
        // this.props.history.push('/list');
        // this.props.setFun('34');
    };
    open(tip){
        TipComponent.open({
            tip,
            close:()=>{
                console.log('关闭了123')
            }
        })
    }
    setCookie(cname,cvalue,exdays){
        var d = new Date();
        d.setTime(d.getTime()+(exdays*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
        }
    render(){
        return (
            <div className="home">
                <img onClick={()=>this.goList()} src={Img} className="logo" alt="logo"/>
                <Button type="link" onClick={()=>{this.open('dfgsgfdsgdsgdggf')}}>开启</Button>
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
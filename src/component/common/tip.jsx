import React from 'react';
import {Button} from 'antd';
import ReactDom from 'react-dom'
import '../../assets/style/tip.less'
const defaultStatus = {
    tip:'hello',
    status:false,
    close:()=>{
        console.log('close')
    }
}

class Tip extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...defaultStatus
        }
    }
    confirm(){
        this.setState({
            status:false
        }),
        this.state.close()
    }
    open(options={}){
        options.status=true
        this.setState({
            ...defaultStatus,
            ...options
        })
    }
    render(){
        const {status,tip} = this.state;
        if(!status){return null}
        return (<div className="tip-wrapper">
            <div className="message">{tip}</div>
            <Button onClick={()=>{this.confirm()}}>关闭</Button>
        </div>)
    }
}

let div = document.createElement('div');
div.className = 'global-tip';
let props = {}

document.body.append(div)

let TipComponent = ReactDom.render(React.createElement(
    Tip,
    props
),div)

export default TipComponent;
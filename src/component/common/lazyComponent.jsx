import React from 'react';
import { resolve } from '../../../webpack.config';

const lazyComponent = (fn)=>{
    class LazyComponent extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                component:null
            }
        }
        async componentWillMount(){
            const {default:compoment} = await fn();
            this.setState({compoment})
        }
        render(){
            const C = this.state.component;
            return C?<C {...this.props} /> : null;
        }

    }
    return LazyComponent;
}

export default lazyComponent;
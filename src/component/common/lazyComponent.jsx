import React from 'react';

const lazyComponent = (fn)=>{
    class LazyComponent extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                Comp: null
            }
        }
        
        async componentDidMount(){
            let res = await fn();
            this.setState({
                Comp:res.default
            })
        }
        render(){
            const {Comp} = this.state;
            return Comp?<Comp {...this.props} /> : Comp;
        }
    }
    return LazyComponent;
}

export default lazyComponent;
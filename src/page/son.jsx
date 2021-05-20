import React from 'react';
import style from '@/assets/style/cssmodule.css'
class Son extends React.Component{
    constructor(props){
        super(props)
    }

    componentWillMount(){
        console.log('s will');
    }

    componentDidMount(){
        
    }
    render(){
        return (
            <div className='son'>
                龟儿子
                <span className={style.text}>一些文字</span>
            </div>
        )
    }
}

export default Son;
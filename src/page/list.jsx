import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { setFun } from '../store/action';
import '../assets/style/index.css';
class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array:[]
        }
    }
    
    componentDidMount(){
    //     let arr = ['1.1.4','2.12.1','1.1.3.4.5.6.7','0.18.1','0.18'];
    //    const compare = (a,b)=>{
    //        const aArr = a.split('.');
    //        const bArr = b.split('.');
    //        let len = Math.min(aArr.length,bArr.length);
    //        for(let i=0;i<len;i++){
    //            if(+aArr[i]>+bArr[i]){
    //                return 1;
    //            }else if(+aArr[i]<+bArr[i]){
    //             return -1;
    //            }
    //        }
    //        if(aArr.length>bArr.length){
    //            return 1
    //        }else{
    //            return -1
    //        }
    //    }
    //    console.log(arr.sort((a,b)=>compare(a,b)))
    //1.xiaoshuo-ss-sfff-fe  变为驼峰xiaoshuoSsSfffFe
    // let str = 'xiaoshuo-ss-sfff-fe';
    // ['xiaoshuo','ss','sfff','fe']
    // let str = 'xiaoshuoSsSfffFe';
    // const tohump = (str)=>{
    //     let tem = str.split('-');
    //     let res =[tem[0]];
    //     tem.map((item,index)=>{
    //         index && res.push(`${item[0].toUpperCase()}${item.substr(1)}`)
            
    //     })
    //     return res.join('')
    // }
    // const tohump = (str)=>{
    //     return str.replace(/-([a-z])/g,(all,i)=>{
    //         return i.toUpperCase()
    //     })
    // }
    // const lineSplit = (str)=>{
    //     let tem = [];
    //     str.split('').map(item=>{
    //         if(/[A-Z]/.test(item)){
    //             item=`-${item.toLowerCase()}`
    //             console.log(item)
    //         }
    //         tem.push(item)
    //     })
       
    //     return tem.join('')
    // }
    // console.log(lineSplit(str))
    //var arry =[1,25,15,1,2,15,5,15,25,35,1];
   //[...new Set(arry)]
   //let tem =[]
   //arry.map(item=>{
        // !tem.includes(item) && tem.push(item)
        //tem.indexOf(item)===-1 && tem.push(item)
   //})
   //console.log(tem)
   let str = 'are you ok';
//    let obj = {}
//         for(let i = 0;i<str.length;i++){
//             if(str[i] in obj){
//                 obj[str[i]] = obj[str[i]]+1
//             }else{
//                 obj[str[i]] = 1
//             }
//         }
//         console.log(obj)
//         let v=0;
//         let k=''
//         for(let key in obj){
//             if(obj[key]>v){
//                 v=obj[key];
//                 k=key
//             }
//         }
        // console.log(str.split('').reverse().join(''))
    //     var arr = [[1, 2], [0, 3, 5], [-1, 4]];
    //    console.log( arr.flat(Infinity).sort((a,b)=>a-b))
    
    }
    goHome(){
        this.props.history.push('/home');
    }
    render(){
        return(
        <div className="list" onClick={_=>{this.goHome()}}>{this.props.state}</div>
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
        setFun:bindActionCreators(setFun,dispatch)
    }
}
export default connect(mapStateToProps,mapDispathToProps)(List);
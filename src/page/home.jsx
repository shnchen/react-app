import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFun,getFun,setSec} from '../store/action';
// import {Button} from 'antd';
import wx from 'weixin-js-sdk'
import { Button } from 'antd-mobile';
class Home extends React.Component{
    constructor(props){
        super(props)
    }
    goList(){
        
        console.log(9)
        this.props.setSec({secState:900});
        this.props.history.push('/list');
        
    }
    componentDidMount() {
       this.isIosStopScroll();
       console.log(/^1([3|4|5|6|7|8|9])(\d{9})/.exec('15981968987'))
       var a1 = [1,2,3];
    }
    getSnapshotBeforeUpdate(){
      console.log(123);
    }
    componentDidUpdate(){
      console.log(1234);
    }
    isIosStopScroll() {
        const ios = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // 判断是否为ios
        if (ios) {
          var divEl = document.querySelector('.home'); //这是你需要定义的容器，这个容器里滑动正常，出了这个容器，页面的橡皮筋效果就被禁用掉了
          this.iosTrouchFn(divEl);
        }
     }
    iosTrouchFn(el) {
        //el需要滑动的元素
        el.addEventListener('touchmove', function (e) {
          e.isSCROLL = true;
        })
        document.body.addEventListener('touchmove', function (e) {
          if (e.isSCROLL) {
            e.preventDefault(); //阻止默认事件(上下滑动)
          } else {
            //需要滑动的区域
            var top = el.scrollTop; //对象最顶端和窗口最顶端之间的距离 
            var scrollH = el.scrollHeight; //含滚动内容的元素大小
            var offsetH = el.offsetHeight; //网页可见区域高
            var cScroll = top + offsetH; //当前滚动的距离
      
            //被滑动到最上方和最下方的时候
            if (top == 0) {
              top = 1; //0～1之间的小数会被当成0
            } else if (cScroll === scrollH) {
              el.scrollTop = top - 0.1;
            }
          }
        }, { passive: false }) //passive防止阻止默认事件不生效
      }
    render(){
    return <div className="home">
        <div className='content' style={{height:'1000px'}}>
        <Button onClick={()=>{this.props.getFun({num:800})}}>{this.props.state.frist.num}</Button>
        <Button type="primary" className='primary' onClick={_=>this.goList()}>Primary Button</Button>
        <Button type="primary">primary</Button>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div> <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div> <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div> <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div> <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div> <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div> <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div> <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div> <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>

        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        <div>dsklfjklfdskjldfskj</div>
        </div>
        <button>12515</button>
       
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
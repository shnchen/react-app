import React from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import { setFun } from '../store/action';
// import '../assets/style/index.less'
// class List extends React.Component{
//     constructor(props){
//         super(props)
//     }
//     componentDidMount() {
//         console.log(this.props)
//     }
//     goHome(){
//         this.props.history.push('/home');
//     }
//     render(){
//         return(
//         <div className="list" onClick={_=>{this.goHome()}}>{this.props.state.sec.secState}</div>
//         )
//     }
// }
// const mapStateToProps = (state) =>{
//     return{
//         state
//     }
// };
// const mapDispathToProps = (dispatch) =>{
//     return{
//         // setFun:bindActionCreators(setFun,dispatch)
//     }
// }
// export default connect(mapStateToProps,mapDispathToProps)(List);

import { PullToRefresh, Button } from 'antd-mobile';
import ReactDOM from 'react-dom'
function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
      data: [],
    };
  }
  scrollEvent(){
      const scrollDom = document.querySelector('.am-pull-to-refresh.am-pull-to-refresh-down');
      scrollDom.addEventListener('scroll',()=>{
          
          let distance = scrollDom.scrollTop;
          if(distance>10 && this.state.down){
            console.log(1);
              this.setState({
                  down:false
              })
          }else if(distance<20 && !this.state.dowm){
            console.log(2);
            this.setState({
                down:true
            })
          }
      })
  }
  componentDidMount() {
      this.scrollEvent()
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      data: genData(),
    }), 0);
  }

  render() {
    return (
      <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        distanceToRefresh={25}
        onRefresh={() => {
            console.log(1233);
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
        }}
      >
        {this.state.data.map(i => (
          <div key={i} style={{ textAlign: 'center', padding: 20 }}>
            {this.state.down ? 'pull down' : 'pull up'} {i}
          </div>
        ))}
      </PullToRefresh>);
  }
}
export default Demo
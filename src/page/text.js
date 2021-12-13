import React from 'react'


let wrap ={
  height: '100px',
  width :'200px',
  padding: '1px solid #eee',
  overflow:'auto',
}
 
 class SnapshotSample extends React.Component {
      constructor(props) {
         super(props);
         this.state = {
           messages: [],//用于保存子div
         }
      }
  
      handleMessage () {//用于增加msg
        this.setState( pre => ({
          messages: [`msg: ${ pre.messages.length }`, ...pre.messages],
        }))
      }
      componentDidMount () {
         
        for (let i = 0; i < 20; i++) this.handleMessage();//初始化20条
        this.timeID = window.setInterval( () => {//设置定时器
             if (this.state.messages.length > 200 ) {//大于200条，终止
               window.clearInterval(this.timeID);
               return ;
             } else {
               this.handleMessage();
             }
        }, 1000)
      }
      componentWillUnmount () {//清除定时器
        window.clearInterval(this.timeID);
      }
      getSnapshotBeforeUpdate () {//很关键的，我们获取当前rootNode的scrollHeight，传到componentDidUpdate 的参数perScrollHeight
        return this.rootNode.scrollHeight;
      }
      componentDidUpdate (perProps, perState, perScrollHeight) {
        const curScrollTop= this.rootNode.scrollTop;
        if (curScrollTop < 5) return ;
        this.rootNode.scrollTop = curScrollTop + (this.rootNode.scrollHeight  - perScrollHeight);
        //加上增加的div高度，就相当于不动
      }
      render () {
       
        return (
            <div className = 'wrap' style={wrap} ref = { node => (  this.rootNode = node)} >
                { this.state.messages.map( msg => (
                  <div>{ msg } </div>
                ))}
           </div>
        );
      }
 }


 export default SnapshotSample
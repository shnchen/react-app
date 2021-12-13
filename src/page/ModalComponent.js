import React from 'react';
import {Button,Modal,Row,Col,Checkbox,Select,Radio,Input} from 'antd';
import './style.scss';
import {getSimpleMemberInfo} from '@/api'
const messageSwitch = {
  title:'消息开关',
  option:[
    {
      label:'系统消息',
      value:1,
    },
    {
      label:'短信通知',
      value:2
    },
    {
      label:'邮件通知',
      value:3
    }
  ]
}
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
class ModalComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
          showModal:true,
          messageList:[],
          isLimit:undefined,
          limitTime:undefined,
          isWarnInterval:undefined,
          warnIntervalTime:undefined,
          receivers:[],
          unit:'m',
          isSeizureRate:false,
          seizureRate:undefined,
          triggerType:[],
          triggerValue1:undefined,
          triggerValue2:undefined,
          warnTemp:'',
          receiverList:[],
        }
    }
    componentDidMount(){ 
        const {data} = this.props;
        data && this.pageInit(data);
    }
    pageInit(data){
        
      let temp=[]
      data.receivers.map(item=>{
        if(item.name){
          temp.push(item.name)
        }
        
      })
    const dealMessageList = ()=>{
      let tem =[]
      data.messageSwitch.value.map((item,index)=>{
        if(item.isSelected){
            tem.push(index+1)
        }
      });
      return tem
    }
    const deal = ()=>{
      let a =undefined
      data.warningInterval.map((item,index)=>{
        if(index!==0&&item.isSelected){
            a =index
        }
      })
      return a;
    }
    const dealLimitTime = ()=>{
      let time = undefined
      if(data.warningCount[1].isSelected){
        time = +data.warningCount[1].name.match(/\d+/g)?data.warningCount[1].name.match(/\d+/g)[0]:'';
      }
      return time
    }
    const dealTriggerEvent = ()=>{
      let temp = [];
      data.triggerEvent.map((item,index)=>{
        if(item.isSelected){
          temp.push(index+1)
        }
      })
      return temp;
    }
      this.setState({
          messageList:dealMessageList(),
          receivers:temp,
          isLimit:(data.warningCount.findIndex(item=>item.isSelected===true))+1,
          limitTime:dealLimitTime(),
          isWarnInterval:data.warningInterval[0].isSelected?1:undefined,
          warnIntervalTime:undefined,
          unit:['s','m','h'][deal()],
          triggerType:dealTriggerEvent(),
          triggerValue1:dealTriggerEvent().includes(1)?data.triggerEvent[0].value:undefined,
          triggerValue2:dealTriggerEvent().includes(2)?data.triggerEvent[1].value:undefined,
          warnTemp:data.warningTemplate.value

      })
    }
    submit(){
        const {receivers,isLimit,limitTime,isWarnInterval,warnIntervalTime,unit,messageList,triggerType,triggerValue1,triggerValue2,warnTemp,receiverList} = this.state;
        let params  = this.props.data;
        params.messageSwitch.value.map((item,index)=>{
        item.isSelected = messageList.includes(index+1)
      })
      let receiversData = [];
      receivers.map((item,index)=>{
        receiversData.push({
          name:receiverList.find(v=>v.userId=== item)["userName"],
          value:index
        })
      })
      params.receivers = receiversData.length?receiversData:this.props.data.receivers;
      params.warningCount.map((item,index)=>{
        item.isSelected = (isLimit===(index+1))
        if(index === 1){
          item.name = `同一警告发送${limitTime}次后不再发送`
        }
      })
      params.warningInterval.map((item,index)=>{
        if(index ===0){
          item.isSelected = (isLimit ===2)
        }
        if(index===1){
          item.isSelected = (unit==='s')
        }
        if(index===2){
          item.isSelected = (unit==='m')
        }
        if(index===3){
          item.isSelected = (unit==='h')
        }
      })
      params.triggerEvent.map((item,index)=>{
        if(index ===0){
          item.value = triggerValue1?triggerValue1:item.value
          item.isSelected=(triggerType.includes(1))
        }
        if(index ===1){
          item.value = triggerValue2?triggerValue2:item.value
          item.isSelected=(triggerType.includes(2))
        }
      })
      params.warningTemplate = warnTemp;
      this.props.submit(params)
    }
    getReceivers(e){
      // 在这里请求接口,data是模拟接口数据
      getSimpleMemberInfo(e).then((res)=>{
        if(res.data){
          this.setState({
            receiverList:[...res.data],
          })
        }
       
      })
    }
    render(){

    const {messageList,isLimit,limitTime,isWarnInterval,warnIntervalTime,unit,receivers,triggerType,triggerValue1,triggerValue2,warnTemp,receiverList} = this.state; 
    const triggerEventList = this.props.modalNum?[
      {
        label:<>可用率低于
        <Input type='number' disabled={!triggerType.includes(1)} value={triggerValue1} onChange={(e)=>{
           this.setState({triggerValue1:e.target.value})
          }} style={{ width: 60, marginLeft: 10,marginRight: 10 }} 
          min={0}/> 
        %时警告</>,
        value:1,
      },
      {
        label:<> 可用硬盘低于
        <Input type='number' disabled={!triggerType.includes(2)} value={triggerValue2} onChange={(e)=>{
           this.setState({triggerValue2:e.target.value})
          }} style={{ width: 60, marginLeft: 10,marginRight: 10 }}
          min={0} /> 
        MB时警告</>,
        value:2,
      },
    ]:[
      {
        label:<>可用率低于
        <Input type='number' disabled={!triggerType.includes(1)} value={triggerValue1} onChange={(e)=>{
           this.setState({triggerValue1:e.target.value})
          }} style={{ width: 60, marginLeft: 10,marginRight: 10 }} 
          min={0}/> 
        %时警告</>,
        value:1,
      }
    ]
    return (
        <Modal
        destroyOnClose
        width={750}
        title={<span className='title-style'>告警消息设置</span>}
        visible={!this.props.isShow}
        onOk={()=>{this.submit()}}
        onCancel={()=>{this.props.hideFunction()}}
        bodyStyle={{overflowY:'scroll'}}
>
  <Row>
    <Col span={4}>消息开关</Col>
    <Col span={5}>
      <Checkbox.Group
        options={
          [
          {
            label:'系统消息',
            value:1,
          },
          {
            label:'短信通知',
            value:2,
          },
          {
            label:'邮件通知',
            value:3
          }
        ]}
        defaultValue={messageList}
        onChange={(e)=>{this.setState({messageList:e})}}
      />
    </Col>
  </Row>
  <Row style={{marginBottom:'32px'}}>
  <Col span={4}>接收人员</Col>
    <Col span={16}>
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="请输入要接受人员"
      defaultValue={receivers}
      onChange={(e)=>{this.setState({receivers:e})}}
      onSearch={(e)=>{this.getReceivers(e)}}
      optionLabelProp="label"
      notFoundContent={null}
    >
     {receiverList.map(item=>{
       return <Select.Option key={item.userId} value={item.userId} label={item.userName}>
         {item.userName}({item.departmentName})
     </Select.Option>
    }

     )} 
    </Select>
    </Col>
  </Row>
  <Row style={{marginBottom:'32px'}}>
  <Col span={4}>警告次数</Col>
    <Col span={16}>
    <Radio.Group onChange={(e)=>{this.setState({isLimit:e.target.value})}} value={isLimit}>
      <Radio style={radioStyle} value={1} style={{marginBottom:'32px'}}>
        不限次数 
      </Radio>
      <Radio style={radioStyle} value={2}>
        同一事件告警发送
       <Input type='number' disabled={isLimit!==2} value={limitTime} onChange={(e)=>{
          this.setState({limitTime:e.target.value})
         }} style={{ width: 60, marginLeft: 10,marginRight: 10 }}
         min={0} /> 
       次后不再发送
      </Radio>
    </Radio.Group>
    </Col>
  </Row>
  <Row style={{marginBottom:'32px'}}>
  <Col span={4}>警告间隔</Col>
    <Col span={16}>
    <Radio.Group onChange={(e)=>{this.setState({isWarnInterval:e.target.value})}} value={isWarnInterval}>
      
      <Radio style={radioStyle} value={1}>
        同一事件每间隔
       <Input type='number' onChange={(e)=>{this.setState({warnIntervalTime:e.target.value})}} value={warnIntervalTime} style={{ width: 60, marginLeft: 10,marginRight: 10 }}  min={0} /> ，
       <Select
        style={{ width: '100px' }}
        defaultValue={unit}
        onChange={(e)=>{this.setState({unit:e})}}
       >
        <Select.Option value="s" label="秒"> 秒 </Select.Option>
        <Select.Option value="m" label="分钟">  分钟 </Select.Option>
        <Select.Option value="h" label="小时"> 小时 </Select.Option>
       </Select>
       发送
      </Radio>
    </Radio.Group>
    </Col>
  </Row>
  <Row>
  <Row>
    <Col span={4}>触发事件</Col>
    <Col span={10}>
      {console.log(triggerType)}
      <Checkbox.Group
        options={triggerEventList}
        defaultValue={triggerType}
        onChange={(e)=>{
          this.setState({triggerType:e})
    }}
      />
    </Col>
  </Row>
  </Row>
  <Row style={{marginBottom:'32px'}}>
  <Col span={4}>警告模板</Col>
    <Col span={16} style={{marginBottom:'32px'}}>
         <div style={{width:'580px',border:'1px solid #ccc'}}>
           <div style={{backgroundVColor:'#D4DEFF',fontSize:'10px',width:'100%',height:'33px',lineHeight:'33px',textAlign:'center'}}>
           {'书写规范：{name}姓名、{XXX}IP、{XXX}原因、{startime}开始时间、{endtime}结束时间、{XXX}告警类型'}
           <Input.TextArea onChange={(e)=>{this.setState({warnTemp:e.target.value})}} value={warnTemp} placeholder='' maxLength={200} style={{width:'100%',height:'100px'}} />
           </div>
         </div>
    </Col>
  </Row>
</Modal>)
    }
}
export default ModalComponent;
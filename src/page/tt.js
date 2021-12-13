import React from 'react';
import {Button,Modal,Row,Col,Checkbox,Select,Radio,Input,DatePicker} from 'antd';
// import './index.css';
const messageSwitch = {
  title:'消息开关',
  option:[
    {
      label:'系统消息',
      value:1
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
class Home extends React.Component{
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
          triggerType:undefined,
          triggerValue1:undefined,
          triggerValue2:undefined,
          warnTemp:''
        }
    }
    componentDidMount(){
      //  请求接口得到的数据data
      let data= {
        messageSwitch: {
          name: '消息开关',
          value: [
            {
              name: '系统消息',
              value: 1.0,
              isSelected: true
            },
            {
              name: '短信通知',
              value: 2.0,
              isSelected: true
            },
            {
              name: '邮件通知',
              value: 3.0,
              isSelected: false
            }
          ]
        },
        receivers: [
          {
            name: '',
            value: 0.0
          }
        ],
        warningCount: [
          {
            name: '时间间隔',
            value: -1.0,
            isSelected: false
          },
          {
            name: '同一警告发送n次后不再发送',
            value: 1.0,
            isSelected: true
          }
        ],
        warningInterval: [
          {
            name: '间隔时间',
            value: 0.0,
            isSelected: false
          },
          {
            name: '时间单位-秒',
            value: 1.0,
            isSelected: false
          },
          {
            name: '时间单位-分钟',
            value: 2.0,
            isSelected: true
          },
          {
            name: '时间单位-分钟',
            value: 3.0,
            isSelected: false
          }
        ],
        triggerEvent: [
          {
            name: '可用率低于告警',
            value: 20,
            isSelected: false
          },
          {
            name: '可用空间低于告警',
            value: 2048,
            isSelected: false
          }
        ],
        warningTemplate: {
          name: '告警模板',
          value: ''
        }
      }
      
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
      return data.triggerEvent.findIndex(item=>item.isSelected === true)
    }
      this.setState({
          messageList:dealMessageList(),
          receivers:temp,
          isLimit:(data.warningCount.findIndex(item=>item.isSelected===true))+1,
          limitTime:dealLimitTime(),
          isWarnInterval:data.warningInterval[0].isSelected?1:undefined,
          warnIntervalTime:undefined,
          unit:['s','m','h'][deal()],
          triggerType:dealTriggerEvent()>-1?dealTriggerEvent()+1:undefined,
          triggerValue1:dealTriggerEvent()===0?data.triggerEvent[0].value:undefined,
          triggerValue2:dealTriggerEvent()===1?data.triggerEvent[1].value:undefined,
          warnTemp:data.warningTemplate.value

      })
    }
    submit(){
      const {receivers,isLimit,limitTime,isWarnInterval,warnIntervalTime,unit,messageList,triggerType,triggerValue1,triggerValue2,warnTemp} = this.state;
      params.messageSwitch.value.map((item,index)=>{
        item.isSelected = messageList[index+1]
      })
      let receiversData = [];
      receivers.map((item,index)=>{
        receiversData.push({
          name:item,
          value:index
        })
      })
      params.receivers = receiversData;
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
          item.value = triggerValue1
          item.isSelected=triggerType===1
        }
        if(index ===1){
          item.value = triggerValue2
          item.isSelected=triggerType===2
        }
      })
      params.warningTemplate = warnTemp;
      let params = {
          messageSwitch: {
            name: "消息开关",
            value: [
              {
                name: "系统消息",
                value: 1.0,
                isSelected: messageList.includes(1)
              },
              {
                name: "短信通知",
                value: 2.0,
                isSelected: messageList.includes(2)
              },
              {
                name: "邮件通知",
                value: 3.0,
                isSelected: messageList.includes(3)
              }
            ]
          },
          receivers: [
            {
              name: receivers.join(),
              value: 0.0
            }
          ],
          warningCount: [
            {
              name: "时间间隔",
              value: -1.0,
              isSelected: isLimit===1
            },
            {
              name: `同一警告发送${limitTime}次后不再发送`,
              value: 1.0,
              isSelected: isLimit===2
            }
          ],
          warningInterval: [
            {
              name: "间隔时间",
              value: 0.0,
              isSelected: isLimit===2
            },
            {
              name: "时间单位-秒",
              value: 1.0,
              isSelected: unit ==='s'
            },
            {
              name: "时间单位-分钟",
              value: 2.0,
              isSelected: unit ==='m'
            },
            {
              name: "时间单位-分钟",
              value: 3.0,
              isSelected: unit ==='h'
            }
          ],
          triggerEvent: [
            {
              name: '可用率低于告警',
              value: triggerValue1,
              isSelected: triggerType === 1
            },
            {
              name: '可用空间低于告警',
              value: triggerValue2,
              isSelected: triggerType === 2
            }
          ],
          warningTemplate: {
            name: '告警模板',
            value: warnTemp
          }
        }
      
      console.log(params);
    }
    render(){
      const {messageList,isLimit,limitTime,isWarnInterval,warnIntervalTime,unit,receivers,triggerType,triggerValue1,triggerValue2,warnTemp} = this.state;
    return (<div className="home">
      <Button onClick={()=>{this.setState({showModal:true})}}>点击</Button>
              <Modal
                width={750}
                title={<span className='title-style'>警告消息设置</span>}
                visible={this.state.showModal}
                onOk={()=>{this.submit()}}
                onCancel={()=>{this.setState({showModal:false})}}
                bodyStyle={{overflowY:'scroll'}}
        >
         { false&&<>
          <Row style={{marginBottom:'10px'}} >
            <Col span={4}>消息开关</Col>
            <Col span={5}>
              <Checkbox.Group
                options={[
                  {
                    label:'系统消息',
                    value:1
                  },
                  {
                    label:'短信通知',
                    value:2
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
          <Row style={{marginBottom:'10px'}}>
          <Col span={4}>接收人员</Col>
            <Col span={16}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择"
              defaultValue={receivers}
              onChange={(e)=>{this.setState({receivers:e})}}
              optionLabelProp="label"
            >
              <Select.Option value="china" label="China">
                China (中国)
              </Select.Option>
              <Select.Option value="usa" label="USA">
                USA (美国)
              </Select.Option>
              <Select.Option value="japan" label="Japan">
                Japan (日本)
              </Select.Option>
              <Select.Option value="korea" label="Korea">
                Korea (韩国)
              </Select.Option>
            </Select>
            </Col>
          </Row>
          <Row style={{marginBottom:'10px'}}>
          <Col span={4}>警告次数</Col>
            <Col span={16}>
            <Radio.Group onChange={(e)=>{this.setState({isLimit:e.target.value})}} value={isLimit}>
              <Radio style={radioStyle} value={1}>
                不限次数 
              </Radio>
              <Radio style={radioStyle} value={2}>
                同一事件告警发送
               <Input type='number' disabled={isLimit!==2} value={limitTime} onChange={(e)=>{
                  this.setState({limitTime:e.target.value})
                 }} style={{ width: 60, marginLeft: 10,marginRight: 10 }} /> 
               次后不再发送
              </Radio>
            </Radio.Group>
            </Col>
          </Row>
          <Row style={{marginBottom:'10px'}}>
          <Col span={4}>警告间隔</Col>
            <Col span={16}>
            <Radio.Group onChange={(e)=>{this.setState({isWarnInterval:e.target.value})}} value={isWarnInterval}>
              
              <Radio style={radioStyle} value={1}>
                同一事件每间隔
               <Input type='number' onChange={(e)=>{this.setState({warnIntervalTime:e.target.value})}} value={warnIntervalTime} style={{ width: 60, marginLeft: 10,marginRight: 10 }} /> ，
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
          <Row style={{marginBottom:'10px'}}>
          <Col span={4}>触发事件</Col>
            <Col span={16} style={{marginBottom:'10px'}}>
            <Radio.Group onChange={(e)=>{this.setState({triggerType:e.target.value})}} value={triggerType}>
            <Radio style={radioStyle} value={1}>
                可用率低于
               <Input type='number' disabled={triggerType!==1} value={triggerValue1} onChange={(e)=>{
                  this.setState({triggerValue1:e.target.value})
                 }} style={{ width: 60, marginLeft: 10,marginRight: 10 }} /> 
               %时警告
              </Radio>
              <br />
              <Radio style={radioStyle} value={2}>
               可用硬盘低于
               <Input type='number' disabled={triggerType!==2} value={triggerValue2} onChange={(e)=>{
                  this.setState({triggerValue2:e.target.value})
                 }} style={{ width: 60, marginLeft: 10,marginRight: 10 }} /> 
               MB时警告
              </Radio>
            </Radio.Group>
            </Col>
          </Row>
          <Row style={{marginBottom:'10px'}}>
          <Col span={4}>警告模板</Col>
            <Col span={16} style={{marginBottom:'10px'}}>
                 <div style={{width:'600px',border:'1px solid #ccc'}}>
                   <div style={{backgroundVColor:'#D4DEFF',fontSize:'12px',width:'100%',height:'33px',lineHeight:'33px',textAlign:'center'}}>
                   {'书写规范：{name}姓名、{XXX}IP、{XXX}原因、{startime}开始时间、{endtime}结束时间、{XXX}告警类型'}
                   <Input.TextArea onChange={(e)=>{this.setState({warnTemp:e.target.value})}} value={warnTemp} placeholder='' maxLength={200} style={{width:'100%',height:'100px'}} />
                   </div>
                 </div>
            </Col>
          </Row>
          </>}
          <>
          <Checkbox.Group style={{ width: '100%' }} onChange={(e)=>{console.log(e);}}>
            <Row>
              <Col span={4}>
                <Checkbox value="A">门禁记录</Checkbox>
              </Col>
              <Col span={8}>
                <Radio.Group onChange={()=>{}} value={''}>
                    <Radio value={1}>全部数据</Radio>
                    <br/>
                    <Radio value={2}>时间选择</Radio>
                </Radio.Group>
              </Col>
              </Row>
              <Row>
              <Col span={4}>
                <Checkbox value="C">访客记录</Checkbox>
              </Col>
              <Col span={10}>
                <Radio.Group onChange={()=>{}} value={''}>
                
                    <Radio value={1}>全部数据</Radio>
                    <br/>
                    <Radio value={2}>
                    <span style={{marginRight:'15px'}}> 日期范围</span>
                    <DatePicker.RangePicker 
                      showTime
                      format="YYYY/MM/DD HH:mm:ss"
                      onChange={()=>{}} />
                    </Radio>
                 
                </Radio.Group>
              </Col>
              </Row>
              <Row>
              <Col span={4}>
                <Checkbox value="E">考勤记录</Checkbox>
              </Col>
              <Col span={10}>
                <Radio.Group onChange={()=>{}} value={''}>
                    <Radio value={1}>全部数据</Radio>
                    <br/>
                    <Radio value={2}>
                      <span style={{marginRight:'15px'}}> 日期范围</span>
                      <DatePicker.RangePicker 
                        showTime
                        format="YYYY/MM/DD HH:mm:ss"
                        onChange={()=>{}} />
                      </Radio>
                
                </Radio.Group>
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <Checkbox value="F">确认清除</Checkbox>
              </Col>
              <Col span={16}>
                删除相关记录可能会导致一些数据缺失
              </Col>
            </Row>
          </Checkbox.Group>
          </>
        </Modal>
        </div>)
    }
}
export default Home;
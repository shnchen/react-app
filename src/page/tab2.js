import React from 'react';
import {Row,Col ,Radio,Select,InputNumber,Button} from 'antd'
import './tab2.less';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
  marginBottom:'15px'
};
class TabTwo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      pageData:null,
      accessControlRecordChecked:undefined,
      accessControlRecordType:2,
      accessControlRecordRange:undefined,
      accessControlRecordNum:undefined,
      unusualAccessRecordChecked:undefined,
      unusualAccessRecordType:2,
      unusualAccessRecordRange:undefined,
      unusualAccessRecordNum:undefined,
      visitorRegisterRecordCheck:undefined,
      visitorRegisterRecordType:2,
      visitorRegisterRecordRange:undefined,
      visitorRegisterRecordNum:undefined,
      visitorOrderRecordChecked:undefined,
      visitorOrderRecordType:2,
      visitorOrderRecordRange:undefined,
      visitorOrderRecordNum:undefined,
      visitorInviteRecordChecked:undefined,
      visitorInviteRecordType:2,
      visitorInviteRecordRange:undefined,
      visitorInviteRecordNum:undefined
    }
  }
  componentDidMount(){
    this.initPage();
  }
  initPage(){
    //data是模拟接口请求出来的数据，可在这里请求接口拿到数据进行数据展示到页面
    let data = {
      "accessControlRecordStrategy": {
        "accessControlRecord": {
          "name": "门禁通行记录",
          "value": [
            {
              "name": "onStrategy",
              "description": "按策略",
              "value": [
                {
                  "name": "满覆盖",
                  "value": 1.0,
                  "isSelected": false
                },
                {
                  "name": "满即停",
                  "value": 2.0,
                  "isSelected": true
                }
              ],
              "isSelected": true
            },
            {
              "name": "onMaxMemory",
              "description": "最长存储范围",
              "value": 32.0,
              "isSelected": false
            },
            {
              "name": "onMaxRecords",
              "description": "最长存储数量",
              "value": 32.0,
              "isSelected": false
            }
          ]
        },
        "unusualAccessRecord": {
          "name": "异常通行记录",
          "value": [
            {
              "name": "onStrategy",
              "description": "按策略",
              "value": [
                {
                  "name": "满覆盖",
                  "value": 1.0,
                  "isSelected": true
                },
                {
                  "name": "满即停",
                  "value": 2.0,
                  "isSelected": false
                }
              ],
              "isSelected": true
            },
            {
              "name": "onMaxMemory",
              "description": "最长存储范围",
              "value": 32.0,
              "isSelected": false
            },
            {
              "name": "onMaxRecords",
              "description": "最长存储数量",
              "value": 32.0,
              "isSelected": false
            }
          ]
        }
      },
      "visitorRecordStrategy": {
        "visitorRegisterRecord": {
          "name": "访客登记记录",
          "value": [
            {
              "name": "onStrategy",
              "description": "按策略",
              "value": [
                {
                  "name": "满覆盖",
                  "value": 1.0,
                  "isSelected": true
                },
                {
                  "name": "满即停",
                  "value": 2.0,
                  "isSelected": false
                }
              ],
              "isSelected": true
            },
            {
              "name": "onMaxMemory",
              "description": "最长存储范围",
              "value": 32.0,
              "isSelected": false
            },
            {
              "name": "onMaxRecords",
              "description": "最长存储数量",
              "value": 32.0,
              "isSelected": false
            }
          ]
        },
        "visitorOrderRecord": {
          "name": "访预约记记录",
          "value": [
            {
              "name": "onStrategy",
              "description": "按策略",
              "value": [
                {
                  "name": "满覆盖",
                  "value": 1.0,
                  "isSelected": true
                },
                {
                  "name": "满即停",
                  "value": 2.0,
                  "isSelected": false
                }
              ],
              "isSelected": true
            },
            {
              "name": "onMaxMemory",
              "description": "最长存储范围",
              "value": 32.0,
              "isSelected": false
            },
            {
              "name": "onMaxRecords",
              "description": "最长存储数量",
              "value": 32.0,
              "isSelected": false
            }
          ]
        },
        "visitorInviteRecord": {
          "name": "访客邀请记录",
          "value": [
            {
              "name": "onStrategy",
              "description": "按策略",
              "value": [
                {
                  "name": "满覆盖",
                  "value": 1.0,
                  "isSelected": true
                },
                {
                  "name": "满即停",
                  "value": 2.0,
                  "isSelected": false
                }
              ],
              "isSelected": true
            },
            {
              "name": "onMaxMemory",
              "description": "最长存储范围",
              "value": 32.0,
              "isSelected": false
            },
            {
              "name": "onMaxRecords",
              "description": "最长存储数量",
              "value": 32.0,
              "isSelected": false
            }
          ]
        }
      }
    }
    this.setState({
      pageData:data
    });
    const {accessControlRecordStrategy,visitorRecordStrategy} = data;
    const {accessControlRecord,unusualAccessRecord} = accessControlRecordStrategy;
    const {visitorRegisterRecord,visitorOrderRecord,visitorInviteRecord} = visitorRecordStrategy
    this.setState({
      accessControlRecordChecked:accessControlRecord.value.findIndex(item=>item.isSelected===true)+1,
      accessControlRecordType:accessControlRecord.value[0].value.findIndex(item=>item.isSelected===true)+1,
      accessControlRecordRange:accessControlRecord.value[1].value,
      accessControlRecordNum:accessControlRecord.value[2].value,
      unusualAccessRecordChecked:unusualAccessRecord.value.findIndex(item=>item.isSelected===true)+1,
      unusualAccessRecordType:unusualAccessRecord.value[0].value.findIndex(item=>item.isSelected===true)+1,
      unusualAccessRecordRange:unusualAccessRecord.value[1].value,
      unusualAccessRecordNum:unusualAccessRecord.value[2].value,
      visitorRegisterRecordCheck:visitorRegisterRecord.value.findIndex(item=>item.isSelected===true)+1,
      visitorRegisterRecordType:visitorRegisterRecord.value[0].value.findIndex(item=>item.isSelected===true)+1,
      visitorRegisterRecordRange:visitorRegisterRecord.value[1].value,
      visitorRegisterRecordNum:visitorRegisterRecord.value[2].value,
      visitorOrderRecordChecked:visitorOrderRecord.value.findIndex(item=>item.isSelected===true)+1,
      visitorOrderRecordType:visitorOrderRecord.value[0].value.findIndex(item=>item.isSelected===true)+1,
      visitorOrderRecordRange:visitorOrderRecord.value[1].value,
      visitorOrderRecordNum:visitorOrderRecord.value[2].value,
      visitorInviteRecordChecked:visitorInviteRecord.value.findIndex(item=>item.isSelected===true)+1,
      visitorInviteRecordType:visitorInviteRecord.value[0].value.findIndex(item=>item.isSelected===true)+1,
      visitorInviteRecordRange:visitorInviteRecord.value[1].value,
      visitorInviteRecordNum:visitorInviteRecord.value[2].value
    })
  }
  submit(){
    const{
      accessControlRecordChecked,
      accessControlRecordType,
      accessControlRecordRange,
      accessControlRecordNum,
      unusualAccessRecordChecked,
      unusualAccessRecordType,
      unusualAccessRecordRange,
      unusualAccessRecordNum,
      visitorRegisterRecordCheck,
      visitorRegisterRecordType,
      visitorRegisterRecordRange,
      visitorRegisterRecordNum,
      visitorOrderRecordChecked,
      visitorOrderRecordType,
      visitorOrderRecordRange,
      visitorOrderRecordNum,
      visitorInviteRecordChecked,
      visitorInviteRecordType,
      visitorInviteRecordRange,
      visitorInviteRecordNum
    } = this.state;
    let params = this.state.pageData;
    params.accessControlRecordStrategy.accessControlRecord.value.map((item,index)=>{
      item.isSelected = (accessControlRecordChecked===(index+1));
    })
    params.accessControlRecordStrategy.accessControlRecord.value[0].value.map((item,index)=>{
      item.isSelected = (accessControlRecordType === (index+1));
    })
    params.accessControlRecordStrategy.accessControlRecord.value[1].value=accessControlRecordRange;
    params.accessControlRecordStrategy.accessControlRecord.value[2].value=accessControlRecordNum;

    params.accessControlRecordStrategy.unusualAccessRecord.value.map((item,index)=>{
      item.isSelected = (unusualAccessRecordChecked===(index+1));
    })

    params.accessControlRecordStrategy.unusualAccessRecord.value[0].value.map((item,index)=>{
      item.isSelected = (unusualAccessRecordType === (index+1));
    })
    params.accessControlRecordStrategy.unusualAccessRecord.value[1].value=unusualAccessRecordRange;
    params.accessControlRecordStrategy.unusualAccessRecord.value[2].value=unusualAccessRecordNum;
 
    params.visitorRecordStrategy.visitorRegisterRecord.value.map((item,index)=>{
      item.isSelected = (visitorRegisterRecordCheck===(index+1));
    })
    params.visitorRecordStrategy.visitorRegisterRecord.value[0].value.map((item,index)=>{
      item.isSelected = (visitorRegisterRecordType === (index+1));
    })
   
    params.visitorRecordStrategy.visitorRegisterRecord.value[1].value=visitorRegisterRecordRange;
    params.visitorRecordStrategy.visitorRegisterRecord.value[2].value=visitorRegisterRecordNum;

    params.visitorRecordStrategy.visitorOrderRecord.value.map((item,index)=>{
      item.isSelected = (visitorOrderRecordChecked===(index+1));
    })
    params.visitorRecordStrategy.visitorOrderRecord.value[0].value.map((item,index)=>{
      item.isSelected = (visitorOrderRecordType === (index+1));
    })
    params.visitorRecordStrategy.visitorOrderRecord.value[1].value=visitorOrderRecordRange;
    params.visitorRecordStrategy.visitorOrderRecord.value[2].value=visitorOrderRecordNum;

    params.visitorRecordStrategy.visitorInviteRecord.value.map((item,index)=>{
      item.isSelected = (visitorInviteRecordChecked===(index+1));
    })
    params.visitorRecordStrategy.visitorInviteRecord.value[0].value.map((item,index)=>{
      item.isSelected = (visitorInviteRecordType === (index+1));
    })
    params.visitorRecordStrategy.visitorInviteRecord.value[1].value=visitorInviteRecordRange;
    params.visitorRecordStrategy.visitorInviteRecord.value[2].value=visitorInviteRecordNum;

    console.log(params);
    //这里的params是整理好的参数，在这里请求接口
  }
  setDefalutData(){
    this.setState({
      accessControlRecordChecked:1,
      accessControlRecordType:1,
      unusualAccessRecordChecked:1,
      unusualAccessRecordType:1,
      visitorRegisterRecordCheck:1,
      visitorRegisterRecordType:1,
      visitorOrderRecordChecked:1,
      visitorOrderRecordType:1,
      visitorInviteRecordChecked:1,
      visitorInviteRecordType:1,
    })
  }
  render(){
    const{
      accessControlRecordChecked,
      accessControlRecordType,
      accessControlRecordRange,
      accessControlRecordNum,
      unusualAccessRecordChecked,
      unusualAccessRecordType,
      unusualAccessRecordRange,
      unusualAccessRecordNum,
      visitorRegisterRecordCheck,
      visitorRegisterRecordType,
      visitorRegisterRecordRange,
      visitorRegisterRecordNum,
      visitorOrderRecordChecked,
      visitorOrderRecordType,
      visitorOrderRecordRange,
      visitorOrderRecordNum,
      visitorInviteRecordChecked,
      visitorInviteRecordType,
      visitorInviteRecordRange,
      visitorInviteRecordNum
    } = this.state;
    return (
      <div className='tab-two'>
        <Row style={{marginBottom:'20px'}}>
          <Col className='title-name' span={4}>门禁记录储存策略</Col>
          <Col style={{marginTop:'30px'}} span={20}>
            <Row>
              <Col span={3} style={{marginTop:'5px'}}>门禁通行记录</Col>
              <Col span={21}>
                <Radio.Group onChange={(e)=>{this.setState({accessControlRecordChecked:e.target.value})}} value={accessControlRecordChecked}>
                  <Radio style={radioStyle} value={1}>
                    <span className='select-title'>按策略</span>
                    <Select disabled={accessControlRecordChecked!==1} defaultValue={accessControlRecordType} style={{ width: 200 }} onChange={(e)=>{this.setState({accessControlRecordType:e})}}>
                      <Select.Option value={1}>满即停</Select.Option>
                      <Select.Option value={2}>满覆盖</Select.Option>
                    </Select>
                    
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                  <span className='select-title'> 最长储存范围</span>
                    <InputNumber disabled={accessControlRecordChecked!==2} type='number'
                     value={accessControlRecordChecked===2?accessControlRecordRange:undefined} 
                     onChange={(e)=>this.setState({accessControlRecordRange:e})} className='my-input' />
                    天
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                  <span className='select-title'>最长存储数量</span>
                   <InputNumber 
                   disabled={accessControlRecordChecked!==3} 
                   type='number' value={accessControlRecordChecked===3?accessControlRecordNum:undefined} 
                   onChange={(e)=>{this.setState({accessControlRecordNum:e})}} className='my-input' />
                   条
                  </Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row>
              <Col style={{marginTop:'5px'}} span={3}>异常通行记录</Col>
              <Col span={21}>
              <Radio.Group value={unusualAccessRecordChecked}
                onChange={(e)=>{this.setState({unusualAccessRecordChecked:e.target.value})}} >
                  <Radio style={radioStyle} value={1}>
                    <span  className='select-title'>按策略</span>
                    <Select disabled={unusualAccessRecordChecked!==1} defaultValue={unusualAccessRecordType} 
                    style={{ width: 200 }} onChange={(e)=>{this.setState({unusualAccessRecordType:e})}}>
                    <Select.Option value={1}>满即停</Select.Option>
                      <Select.Option value={2}>满覆盖</Select.Option>
                    </Select>
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                  <span className='select-title'> 最长储存范围</span>
                    <InputNumber
                    disabled={unusualAccessRecordChecked!==2}
                      onChange={(e)=>{this.setState({unusualAccessRecordRange:e})}}
                      value={unusualAccessRecordChecked===2?unusualAccessRecordRange:undefined} className='my-input' />
                    天
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                  <span  className='select-title'>最长存储数量</span>
                   <InputNumber value={unusualAccessRecordChecked===3?unusualAccessRecordNum:undefined}
                   disabled={unusualAccessRecordChecked!==3}
                      onChange={(e)=>{this.setState({unusualAccessRecordRange:e})}}
                    className='my-input' />
                   条
                  </Radio>
                </Radio.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className='title-name' span={4}>访客记录储存策略</Col>
          <Col span={20}>
          <Col style={{marginTop:'30px'}} span={20}>
            <Row>
              <Col span={3} style={{marginTop:'5px'}}>访客登记记录</Col>
              <Col span={21}>
                <Radio.Group onChange={(e)=>{this.setState({visitorRegisterRecordCheck:e.target.value})}} value={visitorRegisterRecordCheck}>
                  <Radio style={radioStyle} value={1}>
                    <span className='select-title'>按策略</span>
                    <Select disabled={visitorRegisterRecordCheck!==1} defaultValue={visitorRegisterRecordType} style={{ width: 200 }}
                     onChange={(e)=>{e=>{this.setState({visitorRegisterRecordType:e})}}}>
                      <Select.Option value={1}>满即停</Select.Option>
                      <Select.Option value={2}>满覆盖</Select.Option>
                    </Select>
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                  <span className='select-title'> 最长储存范围</span>
                    <InputNumber 
                    disabled={visitorRegisterRecordCheck!==2}
                    value={visitorRegisterRecordCheck===2?visitorRegisterRecordRange:undefined}
                    onChange={e=>{this.setState({visitorRegisterRecordRange:e})}} className='my-input' />
                    天
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                  <span className='select-title'>最长存储数量</span>
                   <InputNumber 
                   disabled={visitorRegisterRecordCheck!==3}
                   value={visitorRegisterRecordCheck===3?visitorRegisterRecordNum:undefined}
                   onChange={e=>{this.setState({visitorRegisterRecordNum:e})}} className='my-input' />
                   条
                  </Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row>
              <Col style={{marginTop:'5px'}} span={3}>访客预约记录</Col>
              <Col span={21}>
              <Radio.Group onChange={(e)=>{this.setState({visitorOrderRecordChecked:e.target.value})}}
               value={visitorOrderRecordChecked}>
                  <Radio style={radioStyle} value={1}>
                    <span  className='select-title'>按策略</span>
                    <Select disabled={visitorOrderRecordChecked!==1} defaultValue={visitorOrderRecordType} style={{ width: 200 }} onChange={(e)=>{this.setState({visitorOrderRecordType:e})}}>
                      <Select.Option value={1}>满即停</Select.Option>
                      <Select.Option value={2}>满覆盖</Select.Option>
                    </Select>
                    
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                  <span className='select-title'> 最长储存范围</span>
                    <InputNumber 
                    disabled={visitorOrderRecordChecked!==2}
                    value={visitorOrderRecordChecked===2?visitorOrderRecordRange:undefined}
                    onChange={(e)=>{this.setState({visitorOrderRecordRange:e})}} className='my-input' />
                    天
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                  <span  className='select-title'>最长存储数量</span>
                   <InputNumber 
                   disabled={visitorOrderRecordChecked!==3}
                   value={visitorOrderRecordChecked===3?visitorOrderRecordNum:undefined}
                   onChange={(e)=>{this.setState({visitorOrderRecordNum:e})}}
                   className='my-input' />
                   条
                  </Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Row>
              <Col style={{marginTop:'5px'}} span={3}>访客邀约记录</Col>
              <Col span={21}>
              <Radio.Group onChange={(e)=>{this.setState({visitorInviteRecordChecked:e.target.value})}} value={visitorInviteRecordChecked}>
                  <Radio style={radioStyle} value={1}>
                    <span  className='select-title'>按策略</span>
                    <Select disabled={visitorInviteRecordChecked!==1} defaultValue={visitorInviteRecordType} style={{ width: 200 }} onChange={(e)=>{this.setState({visitorInviteRecordType:e})}}>
                      <Select.Option value={1}>满即停</Select.Option>
                      <Select.Option value={2}>满覆盖</Select.Option>
                    </Select>
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                  <span className='select-title'> 最长储存范围</span>
                    <InputNumber value={visitorInviteRecordChecked===2?visitorInviteRecordRange:undefined} 
                     disabled={visitorInviteRecordChecked!==2}
                    onChange={(e)=>{this.setState({visitorInviteRecordRange:e})}}
                    className='my-input' />
                    天
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                  <span  className='select-title'>最长存储数量</span>
                   <InputNumber value={visitorInviteRecordChecked===3?visitorInviteRecordNum:undefined}
                    disabled={visitorInviteRecordChecked!==3}
                   onChange={(e)=>{this.setState({visitorInviteRecordNum:e})}}
                   className='my-input' />
                   条
                  </Radio>
                </Radio.Group>
              </Col>
            </Row>
          </Col>
          </Col>
        </Row>
        <Row style={{marginTop:'30px'}}>
          <Col span={8}></Col>
          <Col span={8}>
            <Button onClick={()=>{this.setDefalutData()}} style={{marginRight:'30px'}} type='ghost'>默认</Button>
            <Button onClick={()=>{this.submit()}} type='primary'>保存</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default TabTwo;

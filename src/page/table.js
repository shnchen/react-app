import React from 'react';
import {Button,Modal,Row,Col,Checkbox,Select,Radio,Input,DatePicker,message} from 'antd';
import './otherModalComponent.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
          pageData:{},
          showModal:true,
          outSelect:[],
          accessControlRecord:undefined,
          visitorRecord:undefined,
          presentRecord:undefined,
          accessControlRecordTime:undefined,
          visitorRecordTime:undefined,
          presentRecordTime:undefined
        }
    }
    componentDidMount(){
     this.initData()
    }
   
    initData(){
      // let data = this.props.data; 父组建传进来的接口数据，下面的data是模拟接口数据
      let data = {
        "accessControlRecord": {
          "name": "门禁记录",
          "value": [
            {
              "name": "allOfData",
              "description": "全部数据",
              "isSelected": false
            },
            {
              "name": "partOfData",
              "description": "时间选择",
              "value": [
                {
                  "name": "startTime",
                  "description": "开始时间",
                  "value": "2021-11-29 14:06:20"
                },
                {
                  "name": "endTime",
                  "description": "结束时间",
                  "value": "2021-11-29 14:06:20"
                }
              ],
              "isSelected": false
            }
          ],
          "isSelected": false
        },
        "visitorRecord": {
          "name": "访客记录",
          "value": [
            {
              "name": "allOfData",
              "description": "全部数据",
              "isSelected": false
            },
            {
              "name": "partOfData",
              "description": "时间选择",
              "value": [
                {
                  "name": "startTime",
                  "description": "开始时间",
                  "value": "2021-11-29 14:06:20"
                },
                {
                  "name": "endTime",
                  "description": "结束时间",
                  "value": "2021-11-29 14:06:20"
                }
              ],
              "isSelected": false
            }
          ],
          "isSelected": false
        },
        "presentRecord": {
          "name": "考勤记录",
          "value": [
            {
              "name": "allOfData",
              "description": "全部数据",
              "isSelected": false
            },
            {
              "name": "partOfData",
              "description": "时间选择",
              "value": [
                {
                  "name": "startTime",
                  "description": "开始时间",
                  "value": "2021-11-29 14:06:20"
                },
                {
                  "name": "endTime",
                  "description": "结束时间",
                  "value": "2021-11-29 14:06:20"
                }
              ],
              "isSelected": false
            }
          ],
          "isSelected": false
        },
        "isAgree": {
          "name": "我已知晓",
          "value": "删除相关记录可能会导致一些数据缺失",
          "isSelected": false
        }
      }
      this.setState({pageData:data});//this.setState({pageData:this.props.data})
      const outSelectFun = ()=>{
        let temp=[];
        for(let key in data){
          if(data[key].isSelected){
            temp.push(key)
          }
        }
        return temp;
      }
      this.setState({
        outSelect:outSelectFun(),
        accessControlRecord:data.accessControlRecord.value.findIndex(item=>item.isSelected === true)+1,
        visitorRecord:data.visitorRecord.value.findIndex(item=>item.isSelected===true)+1,
        presentRecord:data.presentRecord.value.findIndex(item=>item.isSelected===true)+1,
        accessControlRecordTime:[moment(data.accessControlRecord.value[1].value[0].value),moment(data.accessControlRecord.value[1].value[1].value)],
        visitorRecordTime:[moment(data.visitorRecord.value[1].value[0].value),moment(data.visitorRecord.value[1].value[1].value)],
        presentRecordTime:[moment(data.presentRecord.value[1].value[0].value),moment(data.presentRecord.value[1].value[1].value)],
      })
    }
    formatF(s){
      return moment(s).format('YYYY-MM-DD HH:mm:ss')
    }
    submit(){
        const {outSelect,accessControlRecord,visitorRecord,presentRecord,accessControlRecordTime,visitorRecordTime,presentRecordTime} = this.state;
        if(!outSelect.includes('isAgree')){
          return message.warn('请勾选确认清除！');
        }
        const accessControlRecordTimeS = this.formatF(accessControlRecordTime[0]),
        accessControlRecordTimeE = this.formatF(accessControlRecordTime[1]),
        visitorRecordTimeS = this.formatF(visitorRecordTime[0]),
        visitorRecordTimeE = this.formatF(accessControlRecordTime[1]),
        presentRecordTimeS = this.formatF(presentRecordTime[0]),
        presentRecordTimeE = this.formatF(presentRecordTime[1]);
        let params =this.state.pageData;
        params.accessControlRecord.isSelected = outSelect.includes('accessControlRecord')
        params.visitorRecord.isSelected= outSelect.includes('visitorRecord');
        params.presentRecord.isSelected= outSelect.includes('presentRecord');
        params.isAgree.isSelect = outSelect.includes('isAgree');
        params.accessControlRecord.value[0].isSelected = (accessControlRecord===1);
        params.accessControlRecord.value[1].isSelected = (accessControlRecord===2);
        params.accessControlRecord.value[1].value[0].value =accessControlRecordTimeS ;
        params.accessControlRecord.value[1].value[1].value =accessControlRecordTimeE ;
        params.visitorRecord.value[0].isSelected = (visitorRecord===1);
        params.visitorRecord.value[1].isSelected = (visitorRecord===2);
        params.visitorRecord.value[1].value[0].value = visitorRecordTimeS;
        params.visitorRecord.value[1].value[1] = visitorRecordTimeE;
        params.presentRecord.value[0].isSelected = (presentRecord===1);
        params.presentRecord.value[1].isSelected = (presentRecord===2);
        params.presentRecord.value[1].value[0].value = presentRecordTimeS;
        params.presentRecord.value[1].value[1].value = presentRecordTimeE;
        
        console.log(params);
        // this.props.submit(params);
        //父组件传过来的方法接收参数，请求接口
      }
    render(){
          const {outSelect,accessControlRecord,
            visitorRecord,presentRecord,accessControlRecordTime,visitorRecordTime,presentRecordTime} = this.state;
            console.log(accessControlRecordTime,visitorRecordTime,presentRecordTime);
          console.log(outSelect);
      return (<div className="home">
        <Modal
            width={750}
            title={<span className='title-style'>警告消息设置</span>}
            visible={this.state.showModal}
            //改成this.props.isShow，是父组件传过来的变量
            onOk={()=>{this.submit();}}
            onCancel={()=>{
              //this.props.hideFun();
              //父组件传过来的方法
            }}
            bodyStyle={{overflowY:'scroll'}}
        >
          <Row>
            <Col span={4}>
            <Checkbox.Group 
              defaultValue={outSelect}
            style={{ width: '100%',marginBottom:'40px' }} options={[
                  {
                    label:'门禁记录',
                    value:'accessControlRecord'
                  }, {
                    label:'访客记录',
                    value:'visitorRecord'
                  }, {
                    label:'考勤记录',
                    value:'presentRecord'
                  }, {
                    label:'确认清除',
                    value:'isAgree'
                  }
            ]} onChange={(e)=>{this.setState({outSelect:e})}}></Checkbox.Group>
            </Col>
            <Col span={10}>
              <Row style={{marginBottom:'10px'}}>
              <Radio.Group onChange={(e)=>{this.setState({accessControlRecord:e.target.value})}} value={accessControlRecord}>
                    <Radio value={1}>全部数据</Radio>
                    <br/>
                    <Radio value={2}>
                    <span style={{marginRight:'15px'}}> 时间选择</span>
                    <DatePicker.RangePicker 
                      disabled={accessControlRecord!==2}
                      defaultValue={accessControlRecord===2?accessControlRecordTime:[]}
                      showTime
                      format="YYYY/MM/DD HH:mm:ss"
                      value={accessControlRecord===2?accessControlRecordTime?accessControlRecordTime:[]:[]}
                      onChange={(e)=>{ this.setState({accessControlRecordTime:e})}} />
                    </Radio>
                </Radio.Group>
              </Row>
              <Row style={{marginBottom:'10px'}}>
              <Radio.Group onChange={(e)=>{this.setState({visitorRecord:e.target.value})}} value={visitorRecord}>
                    <Radio value={1}>全部数据</Radio>
                    <br/>
                    <Radio value={2}>
                    <span style={{marginRight:'15px'}}> 日期范围</span>
                    <DatePicker.RangePicker 
                      defaultValue={visitorRecord===2?visitorRecordTime:[]}
                      value={visitorRecord===2?visitorRecordTime?visitorRecordTime:[]:[]}
                      disabled={visitorRecord!==2}
                      showTime
                      format="YYYY/MM/DD HH:mm:ss"
                      onChange={(e)=>{ this.setState({visitorRecordTime:e})}}/>
                    </Radio>
                </Radio.Group>
              </Row>
              <Row style={{marginBottom:'15px'}}>
              <Radio.Group onChange={(e)=>{this.setState({presentRecord:e.target.value})}} value={presentRecord}>
                    <Radio value={1}>全部数据</Radio>
                    <br/>
                    <Radio value={2}>
                    <span style={{marginRight:'15px'}}> 日期范围</span>
                    <DatePicker.RangePicker 
                      defaultValue={presentRecord===2?presentRecordTime:[]}
                      value={presentRecord===2?presentRecordTime?presentRecordTime:[]:[]}
                      disabled={presentRecord!==2}
                      showTime
                      format="YYYY/MM/DD HH:mm:ss"
                      onChange={(e)=>{ this.setState({presentRecordTime:e})}} />
                    </Radio>
                </Radio.Group>
              </Row>
           <Row style={{color:'red'}}>删除相关记录可能会导致一些数据缺失</Row>
            </Col>
          </Row>
        </Modal>
        </div>)
    }
}
export default Home;
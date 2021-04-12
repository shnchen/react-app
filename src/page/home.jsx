import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFun} from '@/store/action';
import {Form, Input,Button,Checkbox} from 'antd';
import '@/assets/style/home.less';
import Img from '@/assets/images/timg1.jpeg'
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            layout : {
                labelCol: {
                  span: 8,
                },
                wrapperCol: {
                  span: 16,
                },
              },  
              tailLayout:{
                wrapperCol: {
                  offset: 8,
                  span: 16,
                },
              }
        }
    }
    goList(){
        this.props.history.push('/list');
        this.props.setFun('34');
    };
      
    
    onFinish(values){
          console.log('Success:', values);
        };
      
     onFinishFailed(errorInfo){
          console.log('Failed:', errorInfo);
        };
    render(){
        const {layout,tailLayout} = this.state;
        return (
            <div className="home">
                <img src={Img} className="logo" alt="logo"/>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={()=>{this.onFinish}}
              onFinishFailed={()=>{this.onFinishFailed()}}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
        
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
        
              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
        
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            </div>
          );
    }
}
const mapStateToProps=(state)=>{
    return{
        state
    }
}
const mapDispathcToProps = (dispatch) =>{
    return{
        setFun:bindActionCreators(setFun,dispatch)
    }
}
export default connect(mapStateToProps,mapDispathcToProps)(Home);
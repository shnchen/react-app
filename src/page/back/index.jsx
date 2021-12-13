import React,{useState} from 'react';

import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';


class BackHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current: 'mail',
    };
  }
 

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu 
      theme='dark'
      onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" >
          Navigation One
        </Menu.Item>
        <Menu.Item key="app">
          Navigation Two
        </Menu.Item>
        <Menu.Item key="alipay">
            Navigation Four - Link
        </Menu.Item>
      </Menu>
    );
  }
}

export default BackHome;
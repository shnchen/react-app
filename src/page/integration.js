import React, { Component } from 'react'
import { Form, Switch } from 'antd'
import { withRouter } from 'react-router'
// import './integration.scss'
import DDBMG from '../assets/images/1.jpeg'
import WXBMG from '../assets/images/1.jpeg'
import FSBMG from '../assets/images/1.jpeg'
import DDLOGO from '../assets/images/1.jpeg'
import WXLOGO from '../assets/images/1.jpeg'
import FSLOGO from '../assets/images/1.jpeg'
import EDITIMG from '../assets/images/1.jpeg'
const inlineStyle = {
  background: '#E5F0FF',
  color: '#2261FF'
}
const outlineStyle = {
  background: '#FAF1EE',
  color: '#FB6500'
}
class Enterprise extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fsswitch: true,
      ddswitch: true,
      wxswitch: true
    }
    this.handlehide = this.handlehide.bind(this)
  }
  handlehide = (e) => {
    if (e === 3) {
      if (this.state.fsswitch === true) {
        this.setState({
          fsswitch: false
        })
      } else {
        this.setState({
          fsswitch: true
        })
      }
    }
    if (e === 2) {
      if (this.state.wxswitch === true) {
        this.setState({
          wxswitch: false
        })
      } else {
        this.setState({
          wxswitch: true
        })
      }
    }
    if (e === 1) {
      if (this.state.ddswitch === true) {
        this.setState({
          ddswitch: false
        })
      } else {
        this.setState({
          ddswitch: true
        })
      }
    }
  }
  render() {
    const { fsswitch, wxswitch, ddswitch } = this.state
    return (
      <div className="enterprise">
        <div className="query-panel query-panel-flex">
          <p className="sub-title">第三方集成</p>
        </div>
        <ul style={{ marginTop: 30 }} className="three_box">
          <li style={{ backgroundImage: `url(${DDBMG})` }}>
            {ddswitch ? (
              <div style={inlineStyle} className="state_box">
                已连接
              </div>
            ) : (
              <div style={outlineStyle} className="state_box">
                未连接
              </div>
            )}
            <img style={{display:'inline-block',width:'100px'}} src={DDLOGO} className="logo_box"></img>
            <div className="title_box" style={{ left: 90 }}>
              钉钉
            </div>
            <div className="line_box"></div>
            <a
             onClick={() => {
              console.log('钉钉编辑')
            }}>
              <img style={{display:'inline-block',width:'100px'}} className="edit_box" src={EDITIMG}></img>
            </a>
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
              className="switch_box"
              checked={ddswitch}
              onClick={() => {
                this.handlehide(1)
              }}
            />
          </li>
          <li style={{ backgroundImage: `url(${WXBMG})`, marginLeft: 36 }}>
            {wxswitch ? (
              <div style={inlineStyle} className="state_box">
                已连接
              </div>
            ) : (
              <div style={outlineStyle} className="state_box">
                未连接
              </div>
            )}
            <img style={{display:'inline-block',width:'100px'}} src={WXLOGO} className="logo_box"></img>
            <div className="title_box">企业微信</div>
            <div className="line_box"></div>
            <a
              onClick={() => {
                console.log('企业微信编辑')
              }}
            >
              <img  style={{display:'inline-block',width:'100px'}} className="edit_box" src={EDITIMG}></img>
            </a>
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
              className="switch_box"
              checked={wxswitch}
              onClick={() => {
                this.handlehide(2)
              }}
            />
          </li>
          <li style={{ backgroundImage: `url(${FSBMG})`, marginLeft: 36 }}>
            {fsswitch ? (
              <div style={inlineStyle} className="state_box">
                已连接
              </div>
            ) : (
              <div style={outlineStyle} className="state_box">
                未连接
              </div>
            )}
            <img style={{display:'inline-block',width:'100px'}} src={FSLOGO} className="logo_box"></img>
            <div className="title_box" style={{ left: 90 }}>
              飞书
            </div>
            <div className="line_box"></div>
            <a
             onClick={() => {
              console.log('飞书编辑')
            }}>
              <img  style={{display:'inline-block',width:'100px'}} className="edit_box" src={EDITIMG}></img>
            </a>
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
              className="switch_box"
              checked={fsswitch}
              onClick={() => {
                this.handlehide(3)
              }}
            />
          </li>
        </ul>
      </div>
    )
  }
}
export default withRouter(Form.create()(Enterprise))

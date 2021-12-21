import React, {Component} from 'react';
import MapCoord from './map-coord.js'
import {Modal, Form, Row, Col, Input, InputNumber, Select} from 'antd';
import 'antd/lib/modal/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/input-number/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';

/**
 * 点编辑表单。
 */
class WaypointForm extends Component{
	constructor(props){
		super(props);
		this.setFormRef = ref => {
			this.formRef = ref;
		};
		this.state={
			recoverVisible: false,  //回收表单可见状态
			hoverVisible: false,    //悬停表单可见状态。
			circleVisible: false,   //盘旋表单可见状态。
			cutinVisible: false,    //航线切入表单可见状态。
		};
	}
	//模式改变表单结构。
	onModeChange = (value) =>{
		this.setState({recoverVisible: value == "1"});
		this.setState({hoverVisible: value == "2"});
		this.setState({circleVisible: value == "3"});
		this.setState({cutinVisible: value == "4"});
	};
	
	//提交数据，并计算WBS84坐标。
	onSubmit = (values) => {
		//如果BD09坐标改变，则提交前更改WGS84坐标。
		if(Math.abs(values['jdBD09']-this.props.data['jdBD09']) >= 0.0000001 || Math.abs(values['wdBD09']-this.props.data['wdBD09']) >= 0.0000001){
			let wgs84 = MapCoord.bd09ToWgs84(values['jdBD09'], values['wdBD09']);
			values['jdWGS84'] = wgs84[0];
			values['wdWGS84'] = wgs84[1];
		}
		this.props.submitWaypointForm(values);
		this.props.hideWaypointForm();
	};
	
	UNSAFE_componentWillReceiveProps(nextProps){
		if(this.props.visible != nextProps.visible && nextProps.visible){
			if(this.formRef && nextProps.data){
				this.formRef.setFieldsValue(nextProps.data);
				this.onModeChange(nextProps.data['模式']);
			}
		}
	}
	
	render(){
		const {data} = this.props;
		const title = data ? ("点"+data['点号']+"编辑") : "点编辑";
		
		return(
			<Modal title={title} visible={this.props.visible} forceRender={true} onCancel={this.props.hideWaypointForm} okButtonProps={{htmlType:'submit', form:'waypoint-form'}}>
				<Form id="waypoint-form" ref={this.setFormRef} labelCol={{span: 10}} wrapperCol={{span: 14}} onFinish={this.onSubmit}> 
					<Form.Item name="点号" hidden><InputNumber /></Form.Item>
					<Form.Item name="线号" hidden><InputNumber /></Form.Item>
					<Row gutter={5}> 
						<Col span={12}>
							<Form.Item name="jdBD09" label="jd" rules={[{required: true, type: 'number', min: -180, max: 180}]} >
								<InputNumber style={{width: '100%'}} placeholder="请输入百度地图坐标"/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="wdBD09" label="wd" rules={[{required: true, type: 'number', min: -90, max: 90}]}>
								<InputNumber style={{width: '100%'}} placeholder="请输入百度地图坐标"/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={5}>
						<Col span={12}>
							<Form.Item name="1" label="1" rules={[{required: true, type: 'number', min: -300, max: 8300}]}>
								<InputNumber style={{width: '100%'}}/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="2">
								<Input.Group compact>
									<Form.Item name='2' rules={[{required: true, type: 'number', min: 0, max: 40}]} noStyle>
										<InputNumber style={{width: '40%'}}/>
									</Form.Item>
									<Form.Item name='模式' noStyle>
										<Select>
											<Select.Option value="3">3</Select.Option>
											<Select.Option value="4">4</Select.Option>
										</Select>
									</Form.Item>
								</Input.Group>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={5}>
						<Col span={12}>
							<Form.Item name="模式" label="模式">
								<Select>
									<Select.Option value="1">1</Select.Option>
									<Select.Option value="2">2</Select.Option>
									<Select.Option value="3">3</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="模式" label="模式">
								<Select onChange={this.onModeChange}>
									<Select.Option value="1">1</Select.Option>
									<Select.Option value="2">2</Select.Option>
									<Select.Option value="3">3</Select.Option>
									<Select.Option value="4">4</Select.Option>
									<Select.Option value="5">5</Select.Option>
									<Select.Option value="6">6</Select.Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					{this.state.recoverVisible ? 
						<Row gutter={5}>
							<Col span={12}>
								<Form.Item name="类型" label="类型">
									<Select>
										<Select.Option value="1">1</Select.Option>
										<Select.Option value="2">2</Select.Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
					: ""}
					{this.state.hoverVisible ? 
						<Row gutter={5}>
							<Col span={12}>
								<Form.Item name="时间" label="时间">
									<InputNumber style={{width: '100%'}}/>
								</Form.Item>
							</Col>
						</Row>
					: ""}
					{this.state.circleVisible ? 
						<Row gutter={5}>
							<Col span={12}>
								<Form.Item name="1" label="1">
									<InputNumber style={{width: '100%'}}/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="2">
									<Input.Group compact>
										<Form.Item name="1" rules={[{required: true, type: 'number', min: 0, max: 40}]} noStyle>
											<InputNumber style={{width: '40%'}}/>
										</Form.Item>
										<Form.Item name="模式" noStyle>
											<Select>
												<Select.Option value="1">1</Select.Option>
												<Select.Option value="2">2</Select.Option>
											</Select>
										</Form.Item>
									</Input.Group>
								</Form.Item>
							</Col>
						</Row>
					: ""}
					{this.state.cutinVisible ? 
						<Row gutter={5}>
							<Col span={12}>
								<Form.Item name="目标线号" label="目标线号">
									<InputNumber style={{width: '100%'}}/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name="目标点号" label="目标点号">
									<InputNumber style={{width: '100%'}}/>
								</Form.Item>
							</Col>
						</Row>
					: ""}
				</Form>
			</Modal>
		);
	}
}

export default WaypointForm;


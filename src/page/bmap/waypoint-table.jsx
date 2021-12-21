import React, {Component} from 'react';
import {Modal, Table, Space, Typography} from 'antd';
import 'antd/lib/space/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/table/style/css';

class WaypointTable extends Component{
	constructor(props){
		super(props);
		this.setColumns(props.edited);
	}
	//设置表头。
	setColumns = (edited) =>{
		this.columns = [{dataIndex:'点号', title:'点号', fixed:'left', width:60},
			{dataIndex:'jdBD09', title:'jd', width:110, render:(text)=>text.toFixed(7)},
			{dataIndex:'wdBD09', title:'wd', width:110, render:(text)=>text.toFixed(7)},
			{dataIndex:'目标线号',title: '目标线号', width:100},
			{dataIndex:'目标点号',title: '目标点号', width:100}];
		if(edited){
			this.columns.push({title: '操作', width: 100, fixed: 'right', 
				render:(text, record)=>
					this.props.data.length >= 1 ?(
						<Space size="middle">
							<Typography.Link onClick={this.editRow.bind(this, record)}>编辑</Typography.Link>
							<a>删除</a>
						</Space>
					) : null,
			
			});
		}
	};
	//编辑行
	editRow = (record) =>{
		this.props.editWaypointTable(record);
	};
	
	UNSAFE_componentWillReceiveProps(nextProps){
		if(this.props.edited != nextProps.edited && nextProps.visible){
			this.setColumns(nextProps.edited);
		}
	}
	render(){
		const title = this.props.title ? this.props.title : "未命名线";
		
		return (
			<Modal title={title} visible={this.props.visible} forceRender={true} width={800} onCancel={this.props.hideWaypointTable} onOk={this.props.hideWaypointTable} okText="确定">
				<Table rowKey={record=>record['点号']} columns={this.columns} dataSource={this.props.data} scroll={{x:800, y:300}} size="middle" pagination={false}/>
			</Modal>
		);
	}
}

export default WaypointTable;
import React, {Component} from 'react';
import {Menu} from 'antd';
import 'antd/lib/menu/style/css';

/**
 * 点编辑菜单。
 */
class WaypointMenu extends Component{
	constructor(props){
		super(props);
		this.state={
			visible: (props.pixel != undefined), //菜单可见状态。
		};
	}
	
	//响应菜单项点击事件的逻辑。
	onItemClick = (item) =>{
		this.props.clickRightMenu(item.key,this.props.point);
		this.setState({visible: false});   //隐藏菜单项。
	};
	
	
	UNSAFE_componentWillReceiveProps(nextProps){
		let visible = (nextProps.pixel != undefined);
		if(this.state.visible != visible){
			this.setState({visible: visible});
		}
	}
	
	render(){
		const {items, pixel} = this.props;
		let px = pixel ? pixel.x : 0;
		let py = pixel ? pixel.y : 0;

		return (
			<div style={{position:'absolute', top:'0', left:'0', width:'100%', display:this.state.visible?'block':'none', }}>
				<div>
					<div style={{position:'absolute', left:px, top:py}}>
						<Menu onClick={this.onItemClick}>
						{items.map((item)=> 
							<Menu.Item key={item.key}>{item.text}</Menu.Item>
						)}
						</Menu>
					</div>
				</div>
			</div>		
		);
	}
}

export default WaypointMenu;
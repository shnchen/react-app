import React, {Component} from 'react';
import WaypointForm from './waypoint-form.jsx';
import WaypointTable from './waypoint-table.jsx';
import WaypointMenu from './waypoint-menu.jsx';
import MapModel from './map-model.js';
import MapCoord from './map-coord.js';
import {getDisance} from './map-model.js';
class CruiseMap extends Component{
	constructor(props){
		super(props);
		this.setMapRef = ref => {
			this.mapRef = ref;
		};
		this.state={
			waypointMenuItems: [],  //菜单项。
			waypointMenuPixel: undefined,  //菜单弹出像素。
			waypointMenuPoint: undefined,  //菜单弹出坐标。
			waypointFormData: undefined,
			waypointFormVisible: false,
			waypointTableName: undefined,
			waypointTableData: undefined,
			waypointTableVisible: false,
			waypointTableEdited: true,
			jValue:undefined,
			wValue:undefined
		};
		this.editFlag = false;  //可编辑标志。
		this.routes = [];  //记录当前地图上的线。
		this.curRouteId = undefined;  //当前选中线的线号。
		this.tracePoints = [];   //
		this.traceMarker = undefined;
		this.traceFollow = false;  //开关。
		this.uavMarker = undefined;  //创建覆盖物。
		this.uavLabel = this.createUavLabel();
	}
	//初始Qt通信渠道。
	initQtChannel = () =>{
		if(typeof qt != 'undefined'){  //window.qt 对象存在。
			new QWebChannel(qt.webChannelTransport, function(channel){
				this.mapWebModel = channel.objects.mapWebModel;  //mapWebModel为QT中注册对象的名称(this == window)。
			}.bind(this));  
		}
	};
	//初始化QT外部接口调用。
	initQtInterface = ()=>{
		//设置地图可编辑。
		window.setEdited = function(edited){
			this.editFlag = edited?true:false;
			let route = this.getRoute(this.curRouteId);
			if(route){
				route.setEdited(edited); //当前选中路径设置可编辑。
			}
		}.bind(this);
		//设置跟随开关。
		window.setFollow = function(follow){	
			this.traceFollow = follow?true:false;
		}.bind(this);
		//绘制线(routeId为线号，onloadId为线加载号)。
		window.paintRoute = function(routeId, onloadId, routeName, routeJson){
			let route = onloadId ? this.getRouteByOnloadId(onloadId) : this.getRoute(routeId);
			if(route){   //线存在则移除该线重新绘制。
				this.removeRoute(route);
				route = undefined;
			}
			if(!route){ //重新绘制新线。
				route = new MapModel.Route(routeId, onloadId, routeName, this);
				let waypoints = JSON.parse(routeJson);
				for(let i = 0; i < waypoints.length; i++){
					route.appendWaypoint(new MapModel.Waypoint(waypoints[i]));  //在线中追加新点。
				}
				route.repaintPath();  //渲染线。
				this.routes.push(route);
			}
			route.focus();  //在地图上聚焦到该线。
			this.selectRoute(route.routeId); //选中线。
		}.bind(this);
		//擦除线(routeId为航线号，onloadId为线加载号)。
		window.eraseRoute = function(routeId, onloadId){
			let route = onloadId ? this.getRouteByOnloadId(onloadId) : this.getRoute(routeId);
			if(route){
				this.removeRoute(route);
			}
		}.bind(this);
		//更新迹。
		window.updateTrace = function(wgs84Lng, wgs84Lat, heading){
			if(!this.traceMarker){  //创建覆盖物。
				this.traceMarker = new BMap.Polyline([], {strokeColor:"black", strokeWeight:2, strokeOpacity:1});   //线覆盖物。
				this.map.addOverlay(this.traceMarker);
			}
			if(!this.uavMarker){  //创建图标覆盖物。
				let icon = new BMap.Icon("bmap/images/marker_uav.png", new BMap.Size(30, 30), {imageSize: new BMap.Size(30, 30)});  //图标。
				this.uavMarker = new BMap.Marker(new BMap.Point(0, 0), {icon: icon});  //自定义覆盖物。
				this.uavMarker.setLabel(this.uavLabel);
				this.map.addOverlay(this.uavMarker);
			}
			if(Math.abs(heading - this.uavMarker.getRotation()) > 0.0000001){  //设置方向。
				this.uavMarker.setRotation(heading);      
			}
			let bd09 = MapCoord.wgs84ToBd09(wgs84Lng, wgs84Lat);  //wgs84转百度坐标系。
			let point = new BMap.Point(bd09[0], bd09[1]);  //地图的点对象。
			if(this.tracePoints.length > 0){
				let lastPoint = this.tracePoints[this.tracePoints.length-1];
				if(Math.abs(point.lng-lastPoint.lng) < 0.0000001 && Math.abs(point.lat-lastPoint.lat) < 0.0000001){ 
					return;
				}
			}
			this.uavMarker.setPosition(point);  	//设置位置。
			this.tracePoints.push(point);
			this.traceMarker.setPath(this.tracePoints);
			if(this.traceFollow){
				this.map.panTo(point);			//自动跟随
			}
		}.bind(this);
		//更新消息提醒。
		window.updateTip = function(tip, visible){
			if(!visible){
				this.uavLabel.hide();
			}else{
				let tipArr = JSON.parse(tip);
				let tipHtml = "";
				for(let i = 0; i < tipArr.length; i++){
					if(i > 0){
						tipHtml += "</br>";  //多条消息换行显示。
					}
					tipHtml += "<span class='tip'>"+tipArr[i]+"</span>";		
				}
				this.uavLabel.setContent(tipHtml);
				this.uavLabel.show();
			}
		}.bind(this);
		//清除迹。
		window.clearTrace = function(){
			this.tracePoints = [];
			if(this.traceMarker){
				this.traceMarker.setPath(this.tracePoints);
			}
		}.bind(this);
		//保存当前选中的线。
		window.saveRoute = function(){
			let route = this.getRoute(this.curRouteId);
			if(route && this.mapWebModel){
				let waypoints = route.getWaypoints();
				this.mapWebModel.onWebRouteSaved(route.name, JSON.stringify(waypoints)); //向QT发送保存的线信息。
			}else{
				this.mapWebModel.onWebRouteSaved("", JSON.stringify([])); //向QT发送线未选中
			}
		}.bind(this);
		//上传当前选中的线。
		window.uploadRoute = function(){
			let route = this.getRoute(this.curRouteId);
			if(route && this.mapWebModel){
				let waypoints = route.getWaypoints();
				this.mapWebModel.onWebRouteUpload(JSON.stringify(waypoints)); //向QT发送保存的线信息。
			}else{
				this.mapWebModel.onWebRouteUpload(JSON.stringify([]));  //向QT发送保存的线信息。
			}
		}.bind(this);
	};
	
	//创建百度地图。
	initMap = () =>{
		
		this.map = new BMap.Map(this.mapRef, {minZoom:1, maxZoom: 17});   // 创建百度地图实例。
		this.map.centerAndZoom(new BMap.Point(108.453050, 35.978067), 8);  // 初始化地图中心显示位置（包括中心点坐标和地图级别）。
		this.map.addControl(new BMap.MapTypeControl({mapTypes:[BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));	//添加电子图源和混合卫星图源（卫星+矢量街道标注）。 
		this.map.addControl(new BMap.NavigationControl());  //添加地图平移缩放控件。
		this.map.addControl(new BMap.ScaleControl());   //添加地图比例尺控件。
		this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放。
		this.map.disableDoubleClickZoom();  //禁止地图双击放大。
		this.map.addEventListener('rightclick', function(ev){
			if(this.editFlag){
				let items = [{key: 'waypoint-add', text: '新增点'},{key: 'route-ok', text: '线完成'}, {key:'route-remove', text: '擦除线'}, {key: 'route-edit', text: '编辑线'}];
				this.showRightMenu(items, ev.pixel, ev.point);
			}
		}.bind(this));
		this.map.addEventListener('click', function(){
			if(this.editFlag){
				this.hideRightMenu();
			}
		}.bind(this));
		this.map.addEventListener("mousemove", function(target){   //鼠标在地图移动
			if(this.editFlag){
				let wgs84 = MapCoord.bd09ToWgs84(target.point.lng, target.point.lat);  //百度坐标转wgs84。
				if(this.mapWebModel){ //与QT通信渠道上下文存在。
					this.mapWebModel.onWebLocated(wgs84[0], wgs84[1]); //向QT发送当前鼠标移动的坐标。
				}
			}
		}.bind(this));
		this.map.addEventListener("zoomend", ()=>{ 
			let dom = document.querySelector('.myo');
			var doms = document.querySelectorAll('.BMap_Marker.BMap_noprint');
			if(dom){
				let lnLeft = parseInt(doms[doms.length-1].style.left);
				let lnTop = parseInt(doms[doms.length-1].style.top);
				let l0Left = parseInt(doms[0].style.left);
				let l0Top = parseInt(doms[0].style.top);
				dom.style.transition='unset';
				dom.style.left=lnLeft-l0Left+'px';
				dom.style.top=lnTop-l0Top+'px';
				setTimeout(() => {
					if(window.point2){
						dom.style.transition=`left ${getDisance(window.point1,window.point2)/200000}s ease 500ms, top ${getDisance(window.point1,window.point2)/200000}s ease 500ms, transform 500ms ease 0ms`;
					}else{
						dom.style.transition=`left 3s ease 500ms, top 3s ease 500ms`;
					}
				}, 0);
			}
			});
	};
	
	//增加点(在地图pixel位置上)。
	addWaypoint = (point) =>{
		if(!window.point1){
			window.point1=point;
			window.point2=undefined
		}else{
			window.point2=window.point1;
			window.point1=point;
			
		}
		let route = this.getRoute(this.curRouteId); //当前选中的线。
		if(!route){ //增加新线。
			route = new MapModel.Route(undefined, undefined, undefined, this);
			this.routes.push(route);  //创建新线对象。
		}
		route.appendWaypoint(new MapModel.Waypoint({'jdBD09': point.lng, 'wdBD09': point.lat}));  //在线中追加新点。
		route.repaintPath();  //渲染线。
		this.selectRoute(route.routeId); //选中新创建的线。
	};
	//删除点。
	delWaypoint = (point) =>{
		let route = this.getRoute(this.curRouteId);
		if(route){
			let marker = route.getMarkerByPoint(point.lng, point.lat);
			if(route.deletePointMarker(marker)){ //删除点覆盖物上的所有点。
				route.repaintPath();
			}
		}
		if(route.getWaypointTotal() == 0){ //当前路径的所有点均被删除，则当前路径删除。
			this.removeRoute(route);
		}
	};
	//拆分点。
	splitWaypoint = (point) =>{
		let route = this.getRoute(this.curRouteId);
		if(route){
			let marker = route.getMarkerByPoint(point.lng, point.lat);
			route.splitPointMarker(marker);
		}
	};
	//编辑点。
	editWaypoint = (point) =>{
		let route = this.getRoute(this.curRouteId);
		if(route){
			let marker = route.getMarkerByPoint(point.lng, point.lat);
			if(marker.waypoints.length == 1){  //只有一个点直接编辑。
				this.showWaypointForm(marker.waypoints[0]);
			}else{ //多个点需要编辑。
				this.showWaypointTable(route.name, marker.waypoints, true);
			}
		}
	};
	//编辑线。
	editRoute = (route) =>{
		if(route){
			let waypoints = route.getWaypoints();
			this.showWaypointTable(route.name, waypoints, true);
		}
	};
	//移除线。
	removeRoute = (route) =>{
		if(route){
			route.remove();
			for(let i = 0; i < this.routes.length; i++){ //移除整条线。
				if(this.routes[i] == route){
					this.routes.splice(i, 1);
					break;
				}
			}
			this.curRouteId = undefined;
		}
	};
	//根据线号获取线对象。
	getRoute = (routeId) =>{
		for(let i = 0; i < this.routes.length; i++){
			if(this.routes[i].routeId == routeId){
				return this.routes[i];
			}
		}
	};
	getRouteByOnloadId = (onloadId) =>{
		for(let i = 0; i < this.routes.length; i++){
			if(this.routes[i].onloadId == onloadId){
				return this.routes[i];
			}
		}
	};
	
	//选中线。
	selectRoute = (routeId) =>{
		this.curRouteId = routeId;
		for(let i = 0; i < this.routes.length; i++){
			if(this.routes[i].routeId == routeId){ //选中的线高亮。
				this.routes[i].setEdited(this.editFlag); //选中线在地图可编辑状态下可编辑。
				this.routes[i].lineMarker.setStrokeColor("rgba(30, 74, 253, 255)");
				this.routes[i].lineMarker.setStrokeWeight(2);
			}else{ //其他线低亮。
				this.routes[i].setEdited(false);  //未选中线不可编辑。
				this.routes[i].lineMarker.setStrokeColor("rgba(51, 51, 51, 255)");
				this.routes[i].lineMarker.setStrokeWeight(2);
			}
		}
	};
	//显示右键菜单。
	showRightMenu = (items, pixel, point) =>{
		this.setState({waypointMenuPixel: pixel, waypointMenuItems: items, waypointMenuPoint: point});
	};
	//隐藏右键菜单。
	hideRightMenu = () =>{
		this.setState({waypointMenuPixel: undefined});  //菜单不可见。
	};
	//点击右键菜单。
	clickRightMenu = (key, point) =>{
		if(key == "waypoint-add" || key == "waypoint-copy"){ //新增或复制点。
			this.addWaypoint(point);
		}
		if(key == "waypoint-del"){  //删除点。
			this.delWaypoint(point);
		}
		if(key == "waypoint-split"){ //拆分点。
			this.splitWaypoint(point);
		}
		if(key == "waypoint-edit"){  //编辑点。
			this.editWaypoint(point);
		}
		if(key == "route-ok"){  //线完成。
			window.isFinish=true;
			let dom = document.querySelector('.myo');
			if(dom){
				dom.remove();
			}
			this.selectRoute(undefined); //所有线放弃选中。
		}
		if(key == "route-remove"){  //移除线。
			this.removeRoute(this.getRoute(this.curRouteId));
		}
		if(key == "route-edit"){  //编辑线。
			this.editRoute(this.getRoute(this.curRouteId));
		}
		this.hideRightMenu();
	};
	//显示点编辑菜单。
	showWaypointForm = (waypoint) =>{
		this.setState({waypointFormVisible: true, waypointFormData: waypoint});
	};
	//隐藏点编辑表单。
	hideWaypointForm = () =>{
		this.setState({waypointFormVisible: false});
	};
	//提交点编辑表单。
	submitWaypointForm = (waypoint) =>{
		let route = this.getRoute(waypoint['线号']);
		if(route){
			route.setWaypoint(waypoint);
			if(this.state.waypointTableVisible){ //点列表可见刷新内容。
				let marker = route.getMarkerByPointId(waypoint['点号']);
				if(marker){
					this.showWaypointTable(route.name, marker.waypoints, true);
				}
			}
		}
	};
	//显示点编辑列表。
	showWaypointTable = (name, waypoints, edited) =>{
		let wps = []; //浅拷贝数组改变数组引用使得Table会重新刷新数据。
		for(let i = 0; i < waypoints.length; i++){
			wps[i] = waypoints[i];
		}
		this.setState({waypointTableVisible: true, waypointTableName: name, waypointTableData: wps, waypointTableEdited: edited});
	};
	//隐藏点编辑列表。
	hideWaypointTable = () =>{
		this.setState({waypointTableVisible: false});
	};
	//编辑点列表中的点。
	editWaypointTable = (waypoint) =>{
		this.showWaypointForm(waypoint);
	};
	//创建消息标签。
	createUavLabel = () =>{
		let label = new BMap.Label("", {offset: new BMap.Size(0, -40)});  // 创建消息标签实例，offset表示显示在上方的偏移量。。
		label.setStyle({    //设置标签样式。
			color: "rgba(255, 255, 255, 255)",
			backgroundColor: "rgba(0, 0, 0, 255)",
			border: "0",
			fontWeight: "bold",
			fontFamily: "Microsoft Yahei",
			padding: "5px 10px",
			lineHeight: "25px"
		});
		label.hide();   //初始隐藏。
		return label;
	}
	
	componentDidMount(){
		this.initQtChannel();
		this.initMap();
		this.initQtInterface();
		window.setEdited(true);
	}
	render(){
		const {width='100%', height='100vh', style} = this.props;
		const {jValue,wValue} = this.state;
		return(
			<div style={{width, height, ...style}}>
				<div ref={this.setMapRef} style={{width, height, ...style}}></div>
				<WaypointMenu pixel={this.state.waypointMenuPixel} point={this.state.waypointMenuPoint} items = {this.state.waypointMenuItems} clickRightMenu={this.clickRightMenu}/>
				<WaypointTable title={this.state.waypointTableName} data={this.state.waypointTableData} edited={this.state.waypointTableEdited} visible={this.state.waypointTableVisible} hideWaypointTable={this.hideWaypointTable} editWaypointTable={this.editWaypointTable}/>
				<WaypointForm data={this.state.waypointFormData} visible={this.state.waypointFormVisible} hideWaypointForm={this.hideWaypointForm} submitWaypointForm={this.submitWaypointForm}/>
				<div style={{position:'fixed',bottom:0,right:'100px'}}>
				<input type="text" onChange={(e)=>{this.setState({jValue:e.target.value})}} value={jValue} />
				<input type="text" onChange={(e)=>{this.setState({wValue:e.target.value})}} value={wValue} />
				<button onClick={()=>{
					this.addWaypoint({lng:+jValue,lat:+wValue});
					this.setState({jValue:'',wValue:''})
					
				}}>点击</button>
				</div>
			</div>
		);
	}
}

export default CruiseMap;

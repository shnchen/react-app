import React from 'react';
import MapCoord from './map-coord.js'
 import ICon from '../../assets/images/fly.jpeg'
/*
 * 点类。
 */
let dom = document.createElement('div');
function toRad(d) {  return d * Math.PI / 180; }
export function getDisance(point1,point2) {
		var dis = 0;
		var radLat1 = toRad(point1.lat);
		var radLat2 = toRad(point2.lat);
		var deltaLat = radLat1 - radLat2;
		var deltaLng = toRad(point1.lng) - toRad(point2.lng);
		var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
		return dis * 6378137;
}
class Waypoint
{
	//构造器。
	constructor(props){
		this['线号'] = props['线号'] ? props['线号'] : undefined;
		this['点号'] = props['点号'] ? props['点号'] : undefined;
		//设置WGS坐标。
		this['jdWGS84'] = props['jdWGS84'];
		this['wdWGS84'] = props['wdWGS84'];
		if((!this['jdWGS84'] || !this['wdWGS84']) && props['jdBD09'] && props['wdBD09']){
			let wgs84 = MapCoord.bd09ToWgs84(props['jdBD09'], props['wdBD09']);
			this['jdWGS84'] = wgs84[0];
			this['wdWGS84'] = wgs84[1];
		}
		//设置BD09坐标。
		this['jdBD09'] = props['jdBD09'];
		this['wdBD09'] = props['wdBD09'];
		if((!this['jdBD09'] || !this['wdBD09']) && props['jdWGS84'] && props['wdWGS84']){
			let bd09 = MapCoord.wgs84ToBd09(props['jdWGS84'], props['wdWGS84']);
			this['jdBD09'] =  bd09[0];
			this['wdBD09'] =  bd09[1];
		}
	}
}

/*
 * 线类。
 */
class Route
{
	//构造器(routeId 线唯一标识，name 线名称，cruise CruiseMap对象)。
	constructor(routeId, onloadId, name, cruise){
		this.routeId = routeId ? routeId : this.createUuid();
		this.onloadId = onloadId,
		this.name = name;
		this.cruise = cruise;
		this.pointMarkers = [];  //点覆盖物列表。
		this.lineMarker = this.createLineMarker(); //线覆盖物。
		this.editFlag = false;
	}
	
	
	//设置线可编辑状态。
	setEdited = (edited) =>{
		for(let i = 0; i < this.pointMarkers.length; i++){
			if(edited){
				this.pointMarkers[i].enableDragging();   //启用拖拽。
			}else{
				this.pointMarkers[i].disableDragging();  //禁止拖拽。
			}
		}
		this.editFlag = edited;
	};
	
	//移除线所有的点覆盖物。
	remove = () =>{
		for(let i = 0; i < this.pointMarkers.length; i++){
			this.cruise.map.removeOverlay(this.pointMarkers[i]);
		}
		this.cruise.map.removeOverlay(this.lineMarker);
	};
	//聚焦线。
	focus = () =>{
		if(this.pointMarkers.length > 0){
			this.cruise.map.panTo(this.pointMarkers[0].getPosition());  //定位线首点。
		}
	};
	//显示线。
	show = () =>{
		for(let i = 0; i < this.pointMarkers.length; i++){ //显示所有点覆盖物。
			this.pointMarkers[i].show();
		}
		this.lineMarker.show();  //显示折线覆盖物。
	};
	//隐藏线。
	hide = () =>{
		for(let i = 0; i < this.pointMarkers.length; i++){  //隐藏所有点覆盖物。
			this.pointMarkers[i].hide();
		}
		this.lineMarker.hide(); //隐藏折线覆盖物。
	};
	
	//追加新点。
	appendWaypoint = (waypoint) =>{
		waypoint['线号'] = this.routeId;
		waypoint['点号'] = this.getWaypointTotal() + 1;
		let marker = this.getMarkerByPoint(waypoint['jdBD09'], waypoint['wdBD09']);
		if(marker == undefined){ //为新点增加新点覆盖物
			marker = this.createPointMarker(waypoint); 
			this.pointMarkers.push(marker);
		}else{  //将新点合并到原点覆盖物中。
			this.mergeWaypoint(marker, waypoint);
			this.updatePointLabel(marker);
		}
		var doms = document.querySelectorAll('.BMap_Marker.BMap_noprint');
		
		if(doms.length){
			let l0Left = parseInt(doms[0].style.left);
			let l0Top = parseInt(doms[0].style.top);
			let lnLeft = parseInt(doms[doms.length-1].style.left);
			let lnTop = parseInt(doms[doms.length-1].style.top);
			function dealStyle(dom){
				dom.style.width = '30px';
				dom.style.height = '30px'
				dom.style.backgroundImage=`url(${ICon})`;
				dom.style.backgroundSize='100%';
				dom.style.transition=`left 3s ease 500ms, top 3s ease 500ms`;
				dom.style.zIndex='999999';
				dom.style.borderRadius='50%';
				dom.style.position='absolute';
				dom.className='myo';
			}
			window.isAppend = false;
			if(doms.length===1&&!window.isFinish && !window.isAppend){
				window.isAppend = true
				new Promise(function(resolve){
					dealStyle(dom);
					dom.style.transform='rotate(0deg)'
					setTimeout(() => {
						resolve(true);
					}, 300);
				}).then(function(res){
					if(res){
						dom.style.left=0+'px';
						dom.style.top=0+'px';
						doms[0].append(dom);
					}
				})
			}
			if(doms.length>1&&!window.isFinish){
				new Promise(function(resolve){
					dom.style.transition=`left ${getDisance(window.point1,window.point2)/200000}s ease 500ms, top ${getDisance(window.point1,window.point2)/200000}s ease 500ms, transform 500ms ease 0ms`;
					let b = 180+Math.atan2(window.point2.lng-window.point1.lng,window.point2.lat-window.point1.lat)*180/Math.PI;
					dom.style.transform=`rotate(${b}deg)`;
					resolve(true);
				}).then(function(res){
					if(res){
						dom.style.left=lnLeft-l0Left+'px';
						dom.style.top=lnTop-l0Top+'px';
					}
				})
			}
			if(doms.length>1&&window.isFinish){
				dealStyle(dom);
				dom.className='myo';
				doms[0].append(dom);
				dom.style.left=lnLeft-l0Left+'px';
				dom.style.top=lnTop-l0Top+'px';
				window.isFinish = undefined;
			}
		}
	};
	//将点有序合并到点覆盖物中。
	mergeWaypoint = (marker, waypoints) =>{
		waypoints = Array.isArray(waypoints) ? waypoints : [waypoints];
		for(let i = 0; i < waypoints.length; i++){ //将点有序插入到点覆盖物中。
			let pid = waypoints[i]['点号'];
			for(let j = 0; j < marker.waypoints.length; j++){
				if(marker.waypoints[j]['点号'] > pid){
					marker.waypoints.splice(j, 0, waypoints[i]); //插入到指定位置。
					break;
				}
				if(j == marker.waypoints.length -1){ //插入到末尾。
					marker.waypoints.push(waypoints[i]);
					break;
				}
			}
		}
	};
	//设置指定点。
	setWaypoint = (waypoint) =>{
		waypoint = new Waypoint(waypoint);
		let pointId = waypoint['点号'];
		for(let i = 0; i < this.pointMarkers.length; i++){  //遍历点覆盖物。
			let marker = this.pointMarkers[i];
			for(let j = 0; j < marker.waypoints.length; j++){ //遍历点。
				if(marker.waypoints[j]['点号'] == pointId){
					marker.waypoints[j] = waypoint;
					let newLng = waypoint['jdBD09'], newLat = waypoint['wdBD09'];
					if(Math.abs(marker.getPosition().lng-newLng) >= 0.0000001 || Math.abs(marker.getPosition().lat-newLat) >= 0.0000001){ //坐标发生变化
						let otherMarker = this.getMarkerByPoint(newLng, newLat); //新位置与路径的其他点覆盖物重合。
						if(marker.waypoints.length == 1){ //点覆盖物只有一个点。
							if(otherMarker){  //与其他点覆盖物合并。
								this.mergeWaypoint(otherMarker, waypoint);
								this.updatePointLabel(otherMarker);
								this.cruise.map.removeOverlay(marker);
								this.pointMarkers.splice(i, 1);
							}else{ //不需要合并时直接修改点覆盖物位置。
								marker.setPosition(new BMap.Point(newLng, newLat));
							}
						}else{ //点覆盖物有多个点则将新点拆分出。
							if(otherMarker){ //与其他点覆盖物合并。
								this.mergeWaypoint(otherMarker, waypoint);
								this.updatePointLabel(otherMarker);
							}else{ //不需要合并时直接拆分出新点覆盖物。
								let newMarker = this.createPointMarker(waypoint);
								this.pointMarkers.push(newMarker);
							}
							marker.waypoints.splice(j, 1); //将点从点覆盖物上移除。
							this.updatePointLabel(marker);
						}
						this.repaintPath();
					}
					return;
				}
			}
		}
	};
	//删除点覆盖物上的所有点
	deletePointMarker = (marker) =>{
		for(let i = 0; i < this.pointMarkers.length; i++){
			if(marker == this.pointMarkers[i]){
				this.cruise.map.removeOverlay(marker); //地图上移除点覆盖物。
				this.pointMarkers.splice(i, 1);
				this.updatePointIds();
				return true;
			}
		}
		return false;
	};
	//拆分点覆盖物上的所有点。
	splitPointMarker = (marker) =>{
		if(marker){ 
			while(marker.waypoints.length > 1){  //覆盖物上有多个点。
				let waypoint = marker.waypoints[marker.waypoints.length-1];
				let newMarker = this.createPointMarker(waypoint);
				this.pointMarkers.push(newMarker);
				marker.waypoints.splice(marker.waypoints.length-1, 1);  //移除最后一个点。
			}
			this.updatePointLabel(marker);
		}
	};
	
	//重绘(点改变后需要重新绘制线覆盖物)。
	repaintPath = () =>{
		let waypoints = this.getWaypoints();
		let path = [];
		for(let i = 0; i < waypoints.length; i++){
			path.push(new BMap.Point(waypoints[i]['jdBD09'], waypoints[i]['wdBD09'])); //设置线覆盖物的折点。
		}
		this.lineMarker.setPath(path);  //重新设置线覆盖物的路径。
	};
	//获取线上的点总数。
	getWaypointTotal = () =>{
		let total = 0;
		for(let i = 0; i < this.pointMarkers.length; i++){
			total += this.pointMarkers[i].waypoints.length;
		}
		return total;
	};
	//获取线上的所有点(按点号排序的点列表)。
	getWaypoints = () =>{
		let wps = [];
		for(let i = 0; i < this.pointMarkers.length; i++){ //根据当前点号将点对象放置到数组对应位置上。
			let waypoints = this.pointMarkers[i].waypoints;
			for(let j = 0; j < waypoints.length; j++){
				let index = waypoints[j]['点号'];
				wps[index-1] = waypoints[j];
			}
		}
		return wps;
	};
	//根据坐标获取点覆盖物(bd09Lng和bd09Lat要求是bd09坐标。)。
	getMarkerByPoint = (bd09Lng, bd09Lat) =>{
		for(let i = 0; i < this.pointMarkers.length; i++){ //遍历出第一个坐标相同的点覆盖物。
			let point = this.pointMarkers[i].getPosition();
			if(Math.abs(point.lng-bd09Lng) < 0.0000001 && Math.abs(point.lat-bd09Lat) < 0.0000001){  //浮点型相等比较。
				return this.pointMarkers[i];
			}
		}
		return undefined; //遍历失败返回无定义值。
	};
	//根据点号获取点覆盖物。
	getMarkerByPointId = (pointId) =>{
		for(let i = 0; i < this.pointMarkers.length; i++){ //遍历出第一个坐标相同的点覆盖物。
			for(let j = 0; j < this.pointMarkers[i].waypoints.length; j++){
				if(this.pointMarkers[i].waypoints[j]['航点号'] == pointId){  //浮点型相等比较。
					return this.pointMarkers[i];
				}
			}
		}
		return undefined;
	};
	//寻找离目标点距离小于阈值的最近的点覆盖物。
	findMarkerByPixel = (px, py, self) =>{
		let nextMarker = undefined, nextDist = 20; //记录离坐标点距离最近的点覆盖物。
		for(let i = 0; i < this.pointMarkers.length; i++){ //遍历出第一个坐标相同的点覆盖物。
			if(this.pointMarkers[i] != self){
				let pixel = this.cruise.map.pointToPixel(this.pointMarkers[i].getPosition());
				let dist = Math.sqrt((px-pixel.x)*(px-pixel.x)+(py-pixel.y)*(py-pixel.y));
				if(dist < nextDist){
					nextMarker = this.pointMarkers[i];
					nextDist = dist;  //记录最小距离。
				}
			}
		}
		return nextMarker;
	};
	//更新所有点号。
	updatePointIds = () =>{
		let wps = this.getWaypoints();
		for(let i = 0; i < wps.length; i++){ 
			if(wps[i] == undefined){ //移除数组中没有点的位置。
				wps.splice(i, 1);
				i -= 1;
			}else{ 
				wps[i]['点号'] = i+1;
			}
		}
		for(let j = 0; j < this.pointMarkers.length; j++){
			this.updatePointLabel(this.pointMarkers[j]);
		}
	};
	//更新点覆盖物的点号标签。
	updatePointLabel = (marker) =>{
		let ids = [];
		for(let i = 0; i < marker.waypoints.length; i++){
			ids.push(marker.waypoints[i]['点号']);
		}
		marker.getLabel().setContent(ids.join(','));
	};
	//创建点覆盖物并显示在地图上。
	createPointMarker = (waypoint) =>{
		let marker = new BMap.Marker(new BMap.Point(waypoint['jdBD09'], waypoint['wdBD09'])); //创建点覆盖物。
		marker.setLabel(this.createPointLabel(waypoint['点号'])); //设置点号标签。
		marker.waypoints = [waypoint];  //新点加入到点覆盖物中。
		marker.addEventListener('click', this.clickPointMarker);   //监听点覆盖物点击事件。
		marker.addEventListener('dblclick', this.dblclickPointMarker);  //监听点覆盖物双击事件。
		marker.addEventListener('rightclick', this.rightPointMarker);  //监听点覆盖物右键事件。
		marker.addEventListener('dragging' , this.dragPointMarker);    //监听点覆盖物拖拽事件。
		marker.addEventListener('dragend', this.dragendPointMarker);   //监听点覆盖物拖拽结束事件。
		this.cruise.map.addOverlay(marker);  //将新点覆盖物显示到地图上。
		return marker;
	};
	//创建线覆盖物。
	createLineMarker = () =>{
		let marker = new BMap.Polyline([], {strokeColor: "blue", strokeWeight:2, strokeOpacity:1}); //线覆盖物。
		marker.addEventListener('click', this.clickLineMarker); //监听线覆盖物点击事件。
		marker.addEventListener('dblclick', this.dblclickLineMarker);  //监听线覆盖物双击事件。
		marker.addEventListener('mouseover', this.lightLineMarker.bind(this, marker, true)); //监听线覆盖物鼠标移进事件。
		marker.addEventListener('mouseout', this.lightLineMarker.bind(this, marker, false)); //监听线覆盖物鼠标移出事件。
		this.cruise.map.addOverlay(marker);
		return marker;
	};
	//创建点号标签。
	createPointLabel = (id) =>{
		let label = new BMap.Label(id, {offset: new BMap.Size(20, -20)}); 
		label.setStyle({    //设置标签样式。
			color: "rgba(255, 255, 255, 255)",
			backgroundColor: "rgba(0, 0, 0, 255)",
			border: "none",
			fontSize: "18px",
			fontWeight: "bold",
			fontFamily: "Microsoft Yahei",
			padding: "0 6px",
			textAlign: "center",
			lineHeight: "25px"
		});
		return label;
	};
	//点击点覆盖物。
	clickPointMarker = () =>{
		this.cruise.selectRoute(this.routeId);  //选中线。
	};
	dblclickPointMarker = () =>{
		this.cruise.showWaypointTable(this.name, this.getWaypoints(), false);
	};
	//右键点覆盖物。
	rightPointMarker = (ev) =>{
		if(this.editFlag){
			let items = [{key: 'waypoint-copy', text: '复制点'},{key: 'waypoint-edit', text: '编辑点'},{key: 'waypoint-split', text: '拆分点'},{key: 'waypoint-del', text: '删除点'}];
			let pixel = this.cruise.map.pointToPixel(ev.target.getPosition());
			this.cruise.showRightMenu(items, pixel, ev.target.getPosition());
			ev.domEvent.stopPropagation(); //阻止冒泡（地图上的右键事件）
			ev.domEvent.preventDefault(); //阻止浏览器的默认右键事件。
		}
	};
	//拖拽点覆盖物。
	dragPointMarker = (ev) =>{
		if(this.editFlag){
			let marker = ev.target;   //拖拽的点覆盖物。
			marker.setPosition(new BMap.Point(ev.point.lng, ev.point.lat)); //重新设置点覆盖物位置。
			for(let i = 0; i < marker.waypoints.length; i++){
				let wgs84 = MapCoord.bd09ToWgs84(ev.point.lng, ev.point.lat);
				marker.waypoints[i]['jdWGS84'] = wgs84[0];
				marker.waypoints[i]['wdWGS84'] = wgs84[1];
				marker.waypoints[i]['jdBD09'] = ev.point.lng;
				marker.waypoints[i]['wdBD09'] = ev.point.lat;
			}
			this.repaintPath();
		}
	};
	//结束拖拽点覆盖物。
	dragendPointMarker = (ev) =>{1
		
		let marker = this.findMarkerByPixel(ev.pixel.x, ev.pixel.y, ev.target);
		if(this.editFlag && marker){
			let waypoints = ev.target.waypoints; //被合并覆盖物的所有点
			for(let j = 0; j < waypoints.length; j++){
				waypoints[j]['jdWGS84'] = marker.waypoints[0]['jdWGS84'];
				waypoints[j]['wdWGS84'] = marker.waypoints[0]['wdWGS84'];
				waypoints[j]['jdBD09'] = marker.waypoints[0]['jdBD09'];
				waypoints[j]['wdBD09'] = marker.waypoints[0]['wdBD09'];
			}
			this.mergeWaypoint(marker, waypoints);
			for(let i = 0; i < this.pointMarkers.length; i++){ //删除点覆盖物。
				if(this.pointMarkers[i] == ev.target){
					this.pointMarkers.splice(i, 1);
					break;
				}
			}
			this.cruise.map.removeOverlay(ev.target);
			this.updatePointLabel(marker);
			this.repaintPath();
		}
	};
	//高亮线覆盖物(high是否高亮)。
	lightLineMarker = (marker, high) =>{
		marker.setStrokeWeight(high?20:2);
		marker.setStrokeOpacity(high?0.5:1);
	};
	//点击线覆盖物。
	clickLineMarker = () =>{
		this.cruise.selectRoute(this.routeId);
	};
	//双击线覆盖物。
	dblclickLineMarker = () =>{
		this.cruise.showWaypointTable(this.name, this.getWaypoints(), false);
	};
	//创建UUID。
	createUuid = () =>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
			let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x03 | 0x08);
			return v.toString(16);
		});
	};
}

export default {Route: Route, Waypoint: Waypoint};
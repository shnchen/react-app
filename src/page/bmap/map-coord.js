   /**
     * Created by Wandergis on 2015/7/8.
     * 提供了百度坐标（BD09）、国测局坐标/火星坐标（GCJ02）、和世界坐标（WGS84）之间的转换
     */
class MapCoord
{
	static x_PI = 3.14159265358979324 * 3000.0 / 180.0;
	static PI = 3.1415926535897932384626;
	static a = 6378245.0;
	static ee = 0.00669342162296594323;
        
		/**
         * 百度坐标系(BD-09)转换为火星坐标系(GCJ-02)
         * 即百度转谷歌、高德
         */
    static bd09ToGcj02(bd_lon, bd_lat) {
		var bd_lon = +bd_lon;
		var bd_lat = +bd_lat;
		var x = bd_lon - 0.0065;
		var y = bd_lat - 0.006;
		var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * MapCoord.x_PI);
		var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * MapCoord.x_PI);
		var gg_lng = z * Math.cos(theta);
		var gg_lat = z * Math.sin(theta);
		return [gg_lng, gg_lat]
	}
 
	/**
	 * 火星坐标系(GCJ-02)转换为百度坐标系(BD-09)
	 * 即谷歌、高德转百度
	 */
	static gcj02ToBd09(lng, lat) {
		var lat = +lat;
		var lng = +lng;
		var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * MapCoord.x_PI);
		var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * MapCoord.x_PI);
		var bd_lng = z * Math.cos(theta) + 0.0065;
		var bd_lat = z * Math.sin(theta) + 0.006;
		return [bd_lng, bd_lat]
	}
 
	/**
	 * 世界坐标系(WGS84)转换为火星坐标系(GCj02)
	 */
	static wgs84ToGcj02(lng, lat) {
		var lat = +lat;
		var lng = +lng;
		if (MapCoord.out_of_china(lng, lat)) {
			return [lng, lat]
		} else {
			var dlat = MapCoord.transformlat(lng - 105.0, lat - 35.0);
			var dlng = MapCoord.transformlng(lng - 105.0, lat - 35.0);
			var radlat = lat / 180.0 * MapCoord.PI;
			var magic = Math.sin(radlat);
			magic = 1 - MapCoord.ee * magic * magic;
			var sqrtmagic = Math.sqrt(magic);
			dlat = (dlat * 180.0) / ((MapCoord.a * (1 - MapCoord.ee)) / (magic * sqrtmagic) * MapCoord.PI);
			dlng = (dlng * 180.0) / (MapCoord.a / sqrtmagic * Math.cos(radlat) * MapCoord.PI);
			var mglat = lat + dlat;
			var mglng = lng + dlng;
			return [mglng, mglat]
		}
	}
 
	/**
	 * 火星坐标系(GCj02)转换为世界坐标系(WGS84)
	 */
	static gcj02ToWgs84(lng, lat) {
		var lat = +lat;
		var lng = +lng;
		if (MapCoord.out_of_china(lng, lat)) {
			return [lng, lat]
		} else {
			var dlat = MapCoord.transformlat(lng - 105.0, lat - 35.0);
			var dlng = MapCoord.transformlng(lng - 105.0, lat - 35.0);
			var radlat = lat / 180.0 * MapCoord.PI;
			var magic = Math.sin(radlat);
			magic = 1 - MapCoord.ee * magic * magic;
			var sqrtmagic = Math.sqrt(magic);
			dlat = (dlat * 180.0) / ((MapCoord.a * (1 - MapCoord.ee)) / (magic * sqrtmagic) * MapCoord.PI);
			dlng = (dlng * 180.0) / (MapCoord.a / sqrtmagic * Math.cos(radlat) * MapCoord.PI);
			var mglat = lat + dlat;
			var mglng = lng + dlng;
			return [lng * 2 - mglng, lat * 2 - mglat]
		}
	}
	
	/**
	 * 世界坐标系(WGS84)转换为百度坐标系(BD-09)
	 */
	static wgs84ToBd09(lng, lat){
		var gcj02 = MapCoord.wgs84ToGcj02(lng,lat);       //wgs84转gcj02。
		return MapCoord.gcj02ToBd09(gcj02[0], gcj02[1]);  //gcj02转bd09。
	}
	
	/**
	 * 百度坐标系(BD-09)转换为世界坐标系(WGS84)
	 */
	static bd09ToWgs84(lng, lat){    
		var gcj02 = MapCoord.bd09ToGcj02(lng, lat);        //bd09转gcj02。
		return MapCoord.gcj02ToWgs84(gcj02[0], gcj02[1]);  //gcj02转wgs84。
	}
	
	
	static transformlat(lng, lat) {
		var lat = +lat;
		var lng = +lng;
		var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
		ret += (20.0 * Math.sin(6.0 * lng * MapCoord.PI) + 20.0 * Math.sin(2.0 * lng * MapCoord.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(lat * MapCoord.PI) + 40.0 * Math.sin(lat / 3.0 * MapCoord.PI)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(lat / 12.0 * MapCoord.PI) + 320 * Math.sin(lat * MapCoord.PI / 30.0)) * 2.0 / 3.0;
		return ret
	}
 
	static transformlng(lng, lat) {
		var lat = +lat;
		var lng = +lng;
		var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
		ret += (20.0 * Math.sin(6.0 * lng * MapCoord.PI) + 20.0 * Math.sin(2.0 * lng * MapCoord.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(lng * MapCoord.PI) + 40.0 * Math.sin(lng / 3.0 * MapCoord.PI)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(lng / 12.0 * MapCoord.PI) + 300.0 * Math.sin(lng / 30.0 * MapCoord.PI)) * 2.0 / 3.0;
		return ret
	}
 
	/**
	 * 判断是否在国内，不在国内则不做偏移
	 *
	 * 纬度3.86~53.55,经度73.66~135.05 
	 */
	static out_of_china(lng, lat) {
		var lat = +lat;
		var lng = +lng;
		return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
	}
}
	
export default MapCoord

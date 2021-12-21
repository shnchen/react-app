import Home from '../page/home.jsx';
import List from '../page/list.jsx';
import BMap from '../page/bmap/cruise-map.jsx'
const routers = [
    {path:'/home', exact:true, component:Home},
    {path:'/list', exact:true, component:List},
    {path:'/map', exact:true,component:BMap}
];
export default routers;
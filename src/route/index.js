import Home from '../page/home.jsx';
import List from '../page/list.jsx';

const routers = [
    {path:'/home', exact:true, component:Home},
    {path:'/list', exact:true, component:List},
];
export default routers;
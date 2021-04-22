// import Home from '../page/home.jsx';
// import List from '../page/list.jsx';
import lazyComponent from '../component/common/lazyComponent.jsx';
const routers = [
    {path:'/home', exact:true, component:lazyComponent(()=>import('../page/home.jsx'))},
    {path:'/list', exact:true, component:lazyComponent(()=>import('../page/list.jsx'))},
    // {path:'/home', exact:true, component:Home},
    // {path:'/list', exact:true, component:List},
];
export default routers;
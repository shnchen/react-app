import Home from '../page/home.jsx';
import List from '../page/list.jsx';
import Tables from '../page/table';
import Sb from '../page/integration';
import Test from '../page/text.js';
import TabTwo from '../page/tab2.js';
import ModalComponent from '../page/ModalComponent1.js';
import Drag from '../page/drag.jsx';
import BackHome from '../page/back/index.jsx';
import FormPage from '../page/fromPage/index.jsx';
import DateComponent from '../page/dateComponent.jsx'
const routers = [
    {path:'/', exact:true, component:Home},
    {path:'/home', exact:true, component:Home},
    {path:'/list', exact:true, component:List},
    {path:'/table', exact:true, component:Tables},
    {path:'/sb',exact:true, component:Sb},
    {path:'/test',exact:true, component:Test},
    {path:'/tab2',exact:true, component:TabTwo},
    {path:'/modal',exact:true, component:ModalComponent},
    {path:'/drag',exact:true,component:Drag},
    {path:'/back-home',exact:true,component:BackHome},
    {path:'/form-page',component:FormPage},
    {path:'/date',component:DateComponent}
];
export default routers;
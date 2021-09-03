import  {createStore} from 'redux';
import fun from './reduces';
const stroe = createStore(fun);
export default stroe;
import  {createStore,combineReducers} from 'redux';
import frist from './reduces/frist';
import sec from './reduces/sec'
const a = combineReducers({
    frist,
    sec
});
const stroe = createStore(a);
export default stroe;
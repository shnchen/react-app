let defaultState='Home'
const fun = (state = defaultState,action)=>{
    if(action.type==='SET'){
        return state=action.data
    }else{
        return state
    }
}
export default fun;
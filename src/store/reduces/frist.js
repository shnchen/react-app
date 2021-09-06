let defaultState= {
    num:0
}
const frist = (state = defaultState,action)=>{
    if(action.type==='SET'){
        return state.num=action.data
    }else if(action.type === 'GET'){
        console.log(action.type)
        return state.num = action.data
    }else{
        return state
    }
}
export default frist;
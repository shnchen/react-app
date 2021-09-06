let defaultState={
    secState:50
}
const sec = (state = defaultState,action)=>{
    if(action.type==='SEC'){
        return state.secState=action.data
    }else{
        return state
    }
}
export default sec;
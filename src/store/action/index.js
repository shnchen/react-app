export const setFun = (data) =>{
    return{
        type:"SET",
        data:data
    }
}
export const getFun = (data)=>{
    return {
        type :'GET',
        data
    }
}
export const setSec = (data) =>{
    return{
        type:'SEC',
        data
    }
}
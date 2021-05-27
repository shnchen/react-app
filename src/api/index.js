import Axios from 'axios';

const http = Axios.create({
    baseURL:'https://t-apigateway.gaodun.com',
    timeout:10000,
});
http.defaults.headers.common['Authentication'] ="Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoielo2d1FCbm5KQkZkWFhZOVBDalpGUWFRdXFSdGZYQitpdVJUMGJuZEE4SmkwZHZLczhFbFNwYVVCQWpkRHNHTFJqV1dxSHJpdE1aZ2hUZ0V1cFdDY1FPTjJXNGJMME81czNWQituOXorVmd2ZWJhZW1mTjdyVWFDd3ZDbHo3MjZHZjV1UDBTaEo5alBQemI3L1ZqODZ2N1QvSm9aUEZqVDQ2TEtSQWNSaURzS1hOYXphcTcrb3l5TXRSdUEyQStQMzNVRTZGSkJNWTlFeUtnQzJwK3dYelY2RkdzT2VZSE9ZekhudC9OTTF3Mm9iWVZTNmlsQnVOQTdoSnVablJIcmRKRU1xclVocDVvMmxxNU1hMVVORlE9PSIsImV4cCI6MTYxOTM0MzE4MSwianRpIjoiYTJkOTBiYTgtYmU5My00OTljLWFhZGMtY2Q3NmI0YjNiNTZlIiwiaWF0IjoxNjE5MDgzOTgxLCJpc3MiOiIxODAzMDIifQ.6DYyzs8FQVtilQ0vPT_I3LarPas7hypH-PWdPjZAZYE";

http.interceptors.request.use(config=>{
    console.log(config)
    return config
},error=>{
    return Promise.reject(error)
})
http.interceptors.response.use(response=>{
    return response
},error=>{
    return Promise.reject(error)
})

export const test =()=>http.get('teaching-workbench/ask/condition-count')
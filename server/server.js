let express=require('express');
let app=express();
// import React from 'react';
// import {renderToString,renderToStaticMarkup} from 'react-dom/server';
// import HomePage from '../src/page/home';

var server=app.listen(9000,()=>{
  var host=server.address().address;
  var port=server.address().port;
  console.log('server is start at',host,port);
});
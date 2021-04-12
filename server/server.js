const express = require('express');
const fs  = require('fs');
const cookieParser = require('cookie-parser');
const React  = require('react');
const ReactDomServer  = require('react-dom/server');
const path = require('path');
const App  = require('../src/index');
const app = express();
const router = express.Router();
const serverRenderer = (req,res,next)=>{
    fs.readFile(path.resolve('./dist/index.html'),'utf8',(err,data)=>{
        console.log(err)
        if(err){
            return res.status(500).send('an error occurred!');
        }
        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${ReactDomServer.renderToString(<App />)}</div>`
            )
        )
    })
}
router.use('^/$',serverRenderer);
router.use(
    express.static(path.resolve(__dirname,'..','dist'),{maxAge:'30d'})
)
app.use(router);
app.listen('9000',()=>{
    console.log('listen 9000')
})
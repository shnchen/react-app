import React from 'react';


class Canvas extends React.PureComponent{
    constructor(props){
        super(props)
        this.state={}
    }
    componentDidMount(){
        let myCanvas = document.querySelector('#my-canvas');
        // myCanvas.width = 360;
        // myCanvas.height = 400;
        // if(myCanvas.getContext){
            
        //     let ctx = myCanvas.getContext('2d');
            
            // ctx.strokeRect(10,10,50,50);

            // ctx.beginPath();
            // ctx.arc(110,35,25,0,Math.PI*2);
            // ctx.closePath();
            // ctx.stroke();
            // ctx.beginPath();
            // ctx.moveTo(170,25)
            // ctx.lineTo(300,25);
            // ctx.closePath();
            // ctx.stroke()

            // ctx.fill()
            // ctx.arc(150,150,100,0,Math.PI*2);
            // ctx.closePath();
            // ctx.stroke();
            // ctx.beginPath();
            // ctx.arc(150,150,50,0,Math.PI*2);
            // ctx.closePath();
            // ctx.stroke();
            // ctx.beginPath();
            // ctx.lineTo(Math.cos(18/180*Math.PI)*100,Math.sin(18/180*Math.PI)*100)
            // ctx.lineTo(Math.cos(54/180*Math.PI)*50,Math.sin(54/180*Math.PI)*50);
            // ctx.closePath();
            // ctx.stroke()
            let canvas = document.getElementById("my-canvas");
            canvas.width = 800;
            canvas.height = 800;
            let context = canvas.getContext("2d");
            context.lineWidth = 10;
            drawStar(context, 150, 300, 400, 400, 0);
        
     
        function drawStar(cxt, r, R, x, y, rot){
     
            cxt.beginPath();
            for(let i = 0; i < 5; i++){
     
                cxt.lineTo(Math.cos((18 + i * 72 - rot) / 180 * Math.PI) * R + x,
                -Math.sin((18 + i * 72- rot) / 180 * Math.PI) * R + y);
     
                cxt.lineTo(Math.cos((54 + i * 72 - rot) / 180 * Math.PI) * r + x,
                -Math.sin((54 + i * 72 - rot) / 180 * Math.PI) * r + y);
            }
     
            cxt.closePath();
            cxt.stroke();
        }
        
    }
    render(){
        return (
            <div>
                <canvas id='my-canvas'>
                    您的浏览器不知canvas
                </canvas>
            </div>
            )
    }
    
};


export default Canvas
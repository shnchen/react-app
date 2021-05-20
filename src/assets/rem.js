const BaseSize = 24;
function setRem(){
    const html = document.documentElement;
    const scale = html.clientWidth/750;
    console.log(scale)
    html.style.fontSize = `${BaseSize*Math.min(scale,2)}px`
}
setRem();


// (function (doc, win) {
//     /*初始化 默认宽度、字体、最小最大比例*/
//     var init_w = 640,
//     init_fs = 10,
//     max_scale = 1,
//     min_scale = 0.5;
//     var docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = function () {
//     var clientWidth = docEl.clientWidth;
//     if (!clientWidth) return;
//     var percentage = clientWidth / init_w;
//     percentage = percentage > max_scale?max_scale: percentage <min_scale?min_scale: percentage ;
    
//     docEl.style.fontSize = init_fs * percentage + 'px';
//     };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
//     })(document, window);
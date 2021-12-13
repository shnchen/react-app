class Drag {
  constructor(options){
      this.dom = typeof options.selector === 'object'? options.selector : this.selectorer(options.selector);
      this.startY = 0;
      this.sourceX = 0;
      this.sourceY = 0;
      this.w = this.dom.offsetWidth;
      this.h = this.dom.offsetHeight;
      this.maxWidth = document.body.clientWidth;
      this.maxHeight = document.body.clientHeight;
      this.n = 1;
      this.r = 1;
      this.transform = this.getTransform();
  }
  init(){
      this.setDrag();
  }
  getStyle(property){
      return document.defaultView.getComputedStyle? document.defaultView.getComputedStyle(this.dom,false)[property]:this.dom.currentStyle[property];
  
  }
  getTargetPos(){
      let pos = { x:0, y:0 };
      if(this.transform){
          let transformValue = this.getStyle(this.transform);
          if(transformValue == 'none'){
              this.dom.style[this.transform] = 'translate(0,0)';
              return pos;
          }else{
              let tem = transformValue.match(/-?\d+/g);
              return pos = {
                   x:parseInt(tem[4].trim()),
                   y:parseInt(tem[5].trim())
              }
          }
      }else{
          if(this.getStyle('position') == 'static'){
              this.dom.style.position = 'relative';
              return pos;
          }else{
              return pos = {
                  x: this.getStyle('left') ? this.getStyle('left') : 0,
                  y: this.getStyle('top') ? this.getStyle('top') : 0
              }
          }
      }
  }
  setTargetPos(pos){
      let transform = this.getTransform();
      if(transform){
          this.dom.style[transform] = 'translate(' + pos.x +'px' + ',' + pos.y + 'px)';
      }else{
          this.dom.style.left = pos.x +'px';
          this.dom.style.top = pos.y + 'px';
      }
  }
  setDrag(){
      let that = this;
      this.dom.addEventListener('mousedown', start, false);
      function start(e){
          that.startX = e.pageX;
          that.startY = e.pageY;
          let pos = that.getTargetPos();
          that.sourceX = pos.x;
          that.sourceY = pos.y;
          document.addEventListener('mousemove',move,false);
          document.addEventListener('mouseup',end,false);
      
      }
      function move(e){
          e.stopPropagation();
          e.preventDefault()
          let currentX = e.pageX;
          let currentY = e.pageY;
          let distanceX = currentX - that.startX,
          distanceY = currentY - that.startY;
          if(typeof that.sourceX === 'string'){
              that.sourceX = +that.sourceX.replace('px','');
              that.sourceY = +that.sourceY.replace('px','');
          }
          let x = (that.sourceX+distanceX).toFixed();
          let y = (that.sourceY+distanceY).toFixed();
          x < 0 && (x = 0);
          x > that.maxWidth - that.w && (x = that.maxWidth - that.w)
          y <0 && (y = 0);
          y > that.maxHeight - that.h && (y = that.maxHeight - that.h);
          that.setTargetPos({x,y});
      }
      function end(){
          document.removeEventListener('mousemove',move);
          document.removeEventListener('mouseup',end);
      }
  }
  selectorer(dom){
      return document.querySelector(dom);
  }
  getTransform(){
      let transform ='',
      divStyle = document.createElement('div').style,
      transformArr = ['transform','webkitTransform','MozTransform','OTransform'],
      len = transformArr.length;
      for(let i=0;i < len; i++) {
          if(transformArr[i] in divStyle){
              transform = transformArr[i];
          }
          return transform
      }
      return transform;
  }
}
export default Drag;
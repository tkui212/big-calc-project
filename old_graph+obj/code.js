
window.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
  const { x, y } = mouse
  cons
  if(mDown){
  clearall()
  let a=text(`(${x},${y})`, x + 10, y, 50)
  console.log("a")
  draw()
  }
});
window.addEventListener('mousedown', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  mDown=true
})
window.addEventListener("click", event => {
  //make new point with y=mouse.y
  //Ograph.points.push(new point(Ograph.getMaxX()+1,Math.round((h_2-event.y+mY)/HTY*100)/100))
  Ograph.points.push(new point((Math.round((event.x-mX)/WTX*100)/100),Math.round((h_2-event.y+mY)/HTY*100)/100))
  //  this.dy = mY + Math.abs(h_2 - this.y * HTY);
  // event.y=
  // this.y
  Ograph.update()
  corTimesDataUpdate()
  Ograph.update()
  animation();
  line([mX,mY],[getMaxDX(Ograph.points),mY],5)
  line([mX,mY],[mX,getMaxDY(Ograph.points)],5)
  mDown=false
  // console.log("x:"+mouse.x+" y:"+mouse.y)
});
function graph(points) {
  this.points = points;
  this.getMaxX = function () {
    let max = this.points[0].x;
    for (let i = 1; i < this.points.length; i++) {
      if (max < this.points[i].x) {
        max = this.points[i].x;
      }
    }
    return max;
  };
  this.getMaxY = function () {
    let max = this.points[0].y;
    for (let i = 1; i < this.points.length; i++) {
      if (max < this.points[i].y) {
        max = this.points[i].y;
      }
    }
    return max;
  };
  this.getMinX = function () {
    let max = this.points[0].x;
    for (let i = 1; i < this.points.length; i++) {
      if (max > this.points[i].x) {
        max = this.points[i].x;
      }
    }
    return max;
  };
  this.getMinY = function () {
    let max = this.points[0].y;
    for (let i = 1; i < this.points.length; i++) {
      if (max > this.points[i].y) {
        max = this.points[i].y;
      }
    }
    return max;
  };
  this.getXzero = function () {
    for (let i = 0; i < this.points.length; i++) {
      if (this.points[i].x == 0) {
        return this.points[i].y
      }
    }
  }
  this.getM = function (p1, p2) {
    return (p1.y - p2.y) / (p1.x - p2.x);
  };
  this.getPoint = function (t) {
    return this.points[t];
  };
  this.fillPoints = function () {
    let p = [];
    let Xnum = this.points[0].x;
    for (let i = 0; i < this.points.length - 1; i++) {
      let Xa = 0
      for (let j = 0; j < this.points[i + 1].x - this.points[i].x; j++) {
        let leng = p.length;
        if (this.points[i].x == Xnum) {
          //if the time match the time of the point
          p.push(this.points[i]);
        } else {
          let m = this.getM(this.points[i + 1], this.points[i]);
          p.push(new point(Xnum, m * Xa + this.getXzero()));//(x, y=xm+b)
        }
        Xa++
        Xnum++;


      }
    }
    if (this.points[this.points.length - 1].x == Xnum) {
      //if the time match the time of the point
      p.push(this.points[this.points.length - 1]);
    }
    this.points = p;
    this.update()
  };
  this.draw = function () {
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i]
      let p2 = this.points[i + 1]
      p1.draw();
      p2.draw();
      graphPointLinesDraw(p1,p2)
    }
    let p1=this.points[this.points.length - 1]
    let p2=new point(0,0)
    graphPointLinesDraw(p1)
    c.setLineDash([])
    // line(p1.dx, h_2+mY, p1.dx,h_2+mY*2)
    line([getMinDX(this.points), h_2 + mY], [getMaxDX(this.points), h_2 + mY], 5);//sides 00
    line([mX,getMinDY(this.points)],[mX,getMaxDY(this.points)],5)//up down 00
    // c.setLineDash([5.dx, h_2+mY, 1)//up/down
    // text(p1.x,p1.dx,h_2+mY*2, 5]);
    // line(p1.dx, p1.dy, p1+18,20)
    // line(p1.dx, p1.dy, 0+mX, p1.dy, 1)//sides
    //   line(0+mX, p1.dy, mX-10, p1.dy, 3)
    //   text(p1.y,mX-50,p1.dy+8,20)
  };
  this.update=()=>this.points.forEach(value=>value.updait())

}

function point(x, y) {
  this.x = x;
  this.y = y;
  /**draw x posisen */

  this.dx=mX + this.x * WTX
  /**draw y posisen */
  this.dy=mY + Math.abs(h_2 - this.y * HTY)
  this.tauch = new Path2D()
  this.draw = function () {
    this.updait()
    this.tauch = circle(this.dx, this.dy, 5);
  };
  this.updait=function(){
        /**draw x posisen */
        this.dx = this.dx? mX + this.x * WTX -Ograph.getMinDX():mX + this.x * WTX;

          /**draw y posisen */
        this.dy = this.dy? mY + Math.abs(h_2 - this.y * HTY)-getMinDY(Opoints):mY + Math.abs(h_2 - this.y * HTY);
        this.helpY=(this.dy!=undefined) ? h_2+mY-this.dy:null
  }
}








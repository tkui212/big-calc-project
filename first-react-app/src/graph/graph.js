let c=null;
export function setC(C){
  c=C 
}
export function line(p1, p2, width) {
  let x1 = p1.dx || p1[0] || 0;
  let y1 = p1.dy || p1[1] || 0;
  let x2 = p2.dx || p2[0] || 0;
  let y2 = p2.dy || p2[1] || 0;
  let lin = new Path2D();
  // console.log(c)
  c.lineWidth = width;
  c.beginPath();
  lin.moveTo(x1, y1);
  lin.lineTo(x2, y2);
  c.stroke(lin);
  c.fill(lin);
  return lin;
}

export function clearall() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
}
export function text(txt, x, y, size) {
  c.font = size + "px Arial";
  c.fillText(txt, x, y);
  let h = y - size / 4;
  let w = c.measureText(txt).width;
  return { h, w };
}

export function circle(x, y, radius) {
  let circ = new Path2D();
  c.beginPath();
  circ.arc(x, y, radius, 0, 2 * Math.PI);
  c.fillStyle = "black";
  c.fill(circ);
  return circ;
}

export var getM = (p1, p2) => (p1.y - p2.y) / (p1.x - p2.x);

export function Vg(points, posX, posY,sizeX,sizeY) {
  /** push every thing right */
  this.mX = posX
  /** push every thing down */
  this.mY = posY
  this.points=points
  this.p0 = new point(0, 0);
  this.points = this.points.sort((a, b) => a.x - b.x)//sort point by x
  let p = []
  this.points.forEach(value => value.parent=this)
  for (let item in this.points) {
    p.push(this.points[item].x)
    p.sort((a, b) => a - b)
  }
  this.WTX = sizeX / (p[0] - p.lastIndexOf());
  for (let item in this.points) {
    p.push(this.points[item].y)
    p.sort((a, b) => a - b)
  }
  this.HTY = sizeY / ((p[0] - p.lastIndexOf())||1);
  //**used for calcs */

  this.GetM=(i)=>(this.points[i+1]?(this.points[i+1].y-this.points[i].y)/(this.points[i+1].x-this.points[i].x):((this.points[i-1].y-this.points[i].y)/(this.points[i-1].x-this.points[i].x)))
  
  this.fillPoints = function () {
    if(this.points[0].isDraw&&this.points[1].isDraw){
    let me =this
    let p = [];
    let Xnum = this.points[0].x;
    
    for (let i = 0; i < this.points.length - 1; i++) {
      
      for (let j = 0; j < (this.points[i + 1].x - this.points[i].x); j++) {
        if (this.points[i].x == Xnum||!this.points[i].isDraw) {
          //if the time match the time of the point
          p.push(this.points[i]);
        } else {
          let m = this.GetM(i);
          m = m.toFixed(2)
          p.push(new point(Xnum, m * (Xnum - this.points[i].x) + this.points[i].y,me)); //(x, y=xm+b)
          // console.table(p[p.length - 1])
        }
        
        p[p.length-1].parent=this
        Xnum++;


      }
      
        if(this.points[i+1].x ==this.points[i].x){
          p.push(this.points[i]);
          p[p.length-1].parent=this        }
    }
    if (this.points.last().x == Xnum) {
      //if the time match the time of the point
      p.push(this.points[this.points.length - 1]);
    }
    this.points = p;
    // console.table(this.points)
  }
    this.update()

    // console.table(this.points)
  };


  this.draw = function () {

    this.p0.updait()
    let p1 = this.points[this.points.length - 1]
    this.graphPointLinesDraw(p1)
    c.setLineDash([])
    line([this.maxDX(), this.p0.dy], [this.minDX(), this.p0.dy], 5); //sides 00
    line([this.p0.dx, this.maxDY()], [this.p0.dx, this.minDY()], 5) //up down 00
    this.p0.draw()
    for (let i = 0; i < this.points.length - 1; i++) {

      let p1 = this.points[i]
      let p2 = this.points[i + 1]
      p1.draw();
      p2.draw();
      this.graphPointLinesDraw(p1, p2)
    }


  };
  this.update = () => {
    this.WTX = sizeX / (Math.abs(this.maxX() - this.minX())||1);
    this.HTY = sizeY / (Math.abs(this.maxY() - this.minY())||1);
    this.p0.parent=this
    this.p0.updait()
    // console.table(this.points)
    // console.log(this.points.length)
    for(let i=0;i<this.points.length;i++){
      this.points[i]=this.points[i]
      this.points[i].parent=this;
      this.points[i].m=this.getmm(i)
      this.points[i].updait();
    }
  }
  this.getmm=(i)=>{
    try{
      return (this.points[i+1].y-this.points[i-1].y)/(this.points[i+1].x-this.points[i-1].x)
      }
      catch{
        try{
          return (this.points[i+1].y-this.points[i].y)/(this.points[i+1].x-this.points[i].x)
        }
        catch{
          try{
            return ((this.points[i-1].y-this.points[i].y)/(this.points[i-1].x-this.points[i].x))
          }
          catch{}
        }
      }
  }
  this.graphPointLinesDraw=function(p1,p2){
    c.setLineDash([5, 5]);
    c.strokeStyle = "gray";
    if(p1.isDraw){
      line(p1,[this.p0.dx, p1.dy], 2)//sides = x
      line(p1, [p1.dx, this.p0.dy], 2)//up/down = y
      text(p1.x,p1.dx-5,this.p0.dy+28,20)
      c.setLineDash([])
      c.strokeStyle = "black";
      line([this.p0.dx, p1.dy], [this.p0.dx-10, p1.dy], 3)//the little extra
      text( p1.y%1!==0?p1.y.toFixed(2):p1.y,this.p0.dx-20-c.measureText(p1.y%1!==0?p1.y.toFixed(2):p1.y).width,p1.dy+8,20)
      line([p1.dx, this.p0.dy], [p1.dx,this.p0.dy+10,3])//the little extra
    }
    c.setLineDash([])
      // console.log(p1)
      // console.log(p2)
      // console.log(p2!=undefined ? line(p1,p2, 5):0)
      c.strokeStyle = "orange";
      p2!==undefined ? line(p1,p2, 5)://betwin points
      c.strokeStyle = "black";

  }
  {
    this.maxDX = () => this.mX + this.maxX() * this.WTX - this.minX() * this.WTX;
    this.maxDY = () => this.mY + this.maxY() * this.HTY - this.minY() * this.HTY;
    this.minDX = () => this.mX + this.minX() * this.WTX - this.minX() * this.WTX;
    this.minDY = () => this.mY + this.minY() * this.HTY - this.minY() * this.HTY;
    this.maxX = () => this.getMaxX()
    this.maxY = () => this.getMaxY()
    this.minX = () => this.getMinX()
    this.minY = () => this.getMinY()
    this.getMaxX = function () {
      let max = this.points[0].x
      for (let i = 1; i < this.points.length; i++) {
        if (max < this.points[i].x) {
          max = this.points[i].x
        }
      }
      return max;
    };
    this.getMaxY = function () {
      let max = this.points[0].y
      for (let i = 1; i < this.points.length; i++) {
        if (max < this.points[i].y) {
          max = this.points[i].y
        }
      }
      return max;
    };
    this.getMinX = function () {
      let max = this.points[0].x
      for (let i = 1; i < this.points.length; i++) {
        if (max > this.points[i].x) {
          max = this.points[i].x
        }
      }
      max=max>this.p0.x?this.p0.x:max
      return max;
    };
    this.getMinY = function () {
      let max = this.points[0].y
      for (let i = 1; i < this.points.length; i++) {
        if (max > this.points[i].y) {
          max = this.points[i].y
        }
      }
      max=max>this.p0.y?this.p0.y:max
      return max;
    };
  }
  // this.start()
}
export function point(x, y) {
  this.parent=undefined
  this.x = x;
  this.y = y;
  this.isDraw=true
  this.m=0
  /**draw x posisen */
  try {
    this.updait()
  } catch {
    this.dx = this.x
    this.dy = this.y
  }
  /**draw y posisen */
  this.tauch = new Path2D()
  this.draw = function () {
    this.updait()
    if(this.isDraw){
      this.tauch = circle(this.dx, this.dy, 5);
      // let p1=new point(this.x+1,this.m+this.y)
      // let p2=new point(this.x-1,this.y-this.m)
      // p1.parent=this.parent
      // p2.parent=this.parent
      // p1.updait()
      // p2.updait()
      // line(p1,p2,2)
      text(this.m,this.dx+10,this.dy+30,10)
    }
  };
  this.updait = function () {
    this.WTX=this.parent.WTX
  this.HTY=this.parent.HTY
  this.mX=this.parent.mX
  this.mY=this.parent.mY
    /**draw x posisen */
    this.dx = this.mX + this.x * this.WTX - this.parent.minX() * this.WTX;
    /**draw y posisen */
    this.dy = this.mY + this.parent.maxY() * this.HTY - this.y * this.HTY;
    this.helpY = (this.dy != undefined) ? this.mY - this.dy : null
  }
}

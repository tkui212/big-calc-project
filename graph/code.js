function Vg(points, posX, posY,sizeX,sizeY) {
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
  this.HTY = sizeY / (p[0] - p.lastIndexOf());

  //**used for calcs */

  this.getM =(p1,p2)=>((p1.y - p2.y) / (p1.x - p2.x))
  this.fillPoints = function () {
    let me =this
    let p = [];
    let Xnum = this.points[0].x;
    for (let i = 0; i < this.points.length - 1; i++) {

      for (let j = 0; j < (this.points[i + 1].x - this.points[i].x); j++) {

        if (this.points[i].x == Xnum) {
          //if the time match the time of the point
          p.push(this.points[i]);
        } else {
          let m = this.getM(this.points[i + 1], this.points[i]);
          m = m.toFixed(2)
          p.push(new point(Xnum, m * (Xnum - this.points[i].x) + this.points[i].y,me)); //(x, y=xm+b)
          // console.table(p[p.length - 1])
        }
        p[p.length-1].parent=this
        Xnum++;


      }
    }
    if (this.points[this.points.length - 1].x == Xnum) {
      //if the time match the time of the point
      p.push(this.points[this.points.length - 1]);
    }
    this.points = p;
    // console.table(this.points)
    this.update()
  };


  this.draw = function () {
    this.p0.updait()
    for (let i = 0; i < this.points.length - 1; i++) {
      let p1 = this.points[i]
      let p2 = this.points[i + 1]
      p1.draw();
      p2.draw();
      this.graphPointLinesDraw(p1, p2)
    }
    let p1 = this.points[this.points.length - 1]
    this.graphPointLinesDraw(p1)
    c.setLineDash([])
    line([this.maxDX(), this.p0.dy], [this.minDX(), this.p0.dy], 5); //sides 00
    line([this.p0.dx, this.maxDY()], [this.p0.dx, this.minDY()], 5) //up down 00
    this.p0.draw()
  };
  this.update = () => {
    this.WTX = sizeX / Math.abs(this.maxX() - this.minX());
    this.HTY = sizeY / Math.abs(this.maxY() - this.minY());
    this.p0.parent=this
    this.p0.updait()
    // console.table(this.points)
    // console.log(this.points.length)
    this.points.forEach(value => {value.parent=this; value.updait(); })
  }
  this.graphPointLinesDraw=function(p1,p2){
    c.setLineDash([5, 5]);

      line(p1,[this.p0.dx, p1.dy], 1)//sides = x
      line(p1, [p1.dx, this.p0.dy], 1)//up/down = y
      text(p1.x,p1.dx-5,this.p0.dy+28,20)
      c.setLineDash([])

      line([this.p0.dx, p1.dy], [this.p0.dx-10, p1.dy], 3)//the little extra
      text( p1.y%1!==0?p1.y.toFixed(2):p1.y,this.p0.dx-20-c.measureText(p1.y%1!==0?p1.y.toFixed(2):p1.y).width,p1.dy+8,20)
      line([p1.dx, this.p0.dy], [p1.dx,this.p0.dy+10,3])//the little extra
      // console.log(p1)
      // console.log(p2)
      // console.log(p2!=undefined ? line(p1,p2, 5):0)
      p2!=undefined ? line(p1,p2, 5):0//betwin points

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
      return max;
    };
    this.getMinY = function () {
      let max = this.points[0].y
      for (let i = 1; i < this.points.length; i++) {
        if (max > this.points[i].y) {
          max = this.points[i].y
        }
      }
      return max;
    };
  }
  // this.start()
}
function point(x, y) {
  this.parent
  // this.parent=parent//remembers old !!!!!!!!!!!!!!!!!!!!!!!!!!!! problem here
  this.x = x;
  this.y = y;
  
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
    this.tauch = circle(this.dx, this.dy, 5);
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

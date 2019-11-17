
function draw() {

  obj.draw()
  Ograph.draw()
  line([mX,mY],[getMaxDX(Ograph.points),mY],5)
  line([mX,mY],[mX,getMaxDY(Ograph.points)],5)
  text(`(${mX}, ${mY})`,mX-10,mY-10,20)
}


function line(p1,p2, width) {
  this.x1=p1.dx||p1[0]
  this.y1=p1.dy||p1[1]
  this.x2=p2.dx||p2[0]
  this.y2=p2.dy||p2[1]
  let lin=new Path2D()
  c.style = "black";
  c.lineWidth = width;
  c.beginPath();
  lin.moveTo(x1, y1);
  lin.lineTo(x2, y2);
  c.stroke(lin);
  c.fill(lin);
  return lin
}

//**update for the proporsens of the graph */
function corTimesDataUpdate(){
  WTX = width * 0.5 / Math.abs(Ograph.getMaxX()-Ograph.getMinX());
  HTY = height * 0.5 / Math.abs(Ograph.getMaxY()-Ograph.getMinY());
  Ograph.update()
  mX=50-getMinDX(Opoints)
  console.log(-getMinDX(Opoints))
  mY=50-getMinDY(Opoints)/HTY

  Ograph.update()
}

  //draw the neccessery lines of a point(one or two) in the graph
  function graphPointLinesDraw(p1,p2){
    c.setLineDash([5, 5]);

      line(p1,[mX, p1.dy], 1)//sides = x
      line(p1, [p1.dx, h_2+mY], 1)//up/down = y
      text(p1.x,p1.dx-5,h_2+mY+28,20)
      c.setLineDash([])

      line([mX, p1.dy], [mX-10, p1.dy], 3)//the little extra
      text(p1.y,mX-20,p1.dy+8,20)
      line([p1.dx, h_2+mY], [p1.dx,h_2+mY+10,3])//the little extra

      p2!=undefined ? line(p1,p2, 5):0//betwin points
  }
  function Create(x, y, radius, graph) {
    this.graph = graph;
    Ograph=this.graph
    Opoints=this.graph.points
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.t = 0;
    this.draw = function () {
      circle(this.x, this.y, this.radius);
    };
    this.update = function () {
      if (this.t < this.graph.points.length) {
        this.x = this.graph.points[this.t].dx;
        this.t++;
      }
      this.draw();
    };
  }

  let mouse = {
    x: null,
    y: null
  };
    //**used for calcs */
  function getMaxDY(points) {
    let max = points[0].y;
    let MdY=points[0].dy
    for (let i = 1; i < points.length; i++) {
      if (max > points[i].y) {
        max = points[i].y;
        MdY=points[i].dy
      }
    }
    return MdY;
  };
  //**used for calcs */
  function getMinDY(points) {
    let max = points[0].y;
    let MdY=points[0].dy
    for (let i = 1; i < points.length; i++) {
      if (max < points[i].y) {
        max = points[i].y;
        MdY=points[i].dy
      }
    }
    return MdY;
  };
  function getMaxDX(points) {
    let max = points[0].x;
    let MdY=points[0].dx
    for (let i = 1; i < points.length; i++) {
      if (max < points[i].x) {
        max = points[i].x;
        MdY=points[i].dx
      }
    }
    return MdY;
  };
  //**used for calcs */
  function getMinDX() {
    let max = Opoints[0].x;
    let MdY=Opoints[0].dx
    let a=Opoints[0]
    for (let i = 0; i < Opoints.length; i++) {
      if (max > Opoints[i].x) {
        max = Opoints[i].x;
        MdY=Opoints[i].dx
        a=Opoints[i]
      }
    }
    console.log(a)
    return MdY;
  };

function clearall() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
}
function text(txt, x, y, size) {
  c.font = (size + "px Arial")
  c.fillText(txt, x, y)
  let h=y-size/4;
  let w=c.measureText(txt).width
  return {h,w}
}
function animation() {
  clearall()
  // requestAnimationFrame(animation)
  obj.update();
  draw()
  console.table(Ograph.points);
}
function circle(x, y, radius) {
  let circ=new Path2D()
  c.beginPath();
  circ.arc(x, y, radius, 0, 2 * Math.PI);
  c.fillStyle = "black";
  c.fill(circ);
  return circ
}
function update(){
  obj.update()
  Ograph.update()
  corTimesDataUpdate()
}
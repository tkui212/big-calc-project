
// window.addEventListener("click", event => {
//   update()
//   // console.log(Ograph.getMinDX()!=undefined? 50-Ograph.getMinDX():50)
// });
function draw() {
  clearall()
  Ograph.draw()
  // line([mX(),mY()],[Ograph.getMaxDX(),mY()],5)
  // // console.log(`${mX()} ${mY()}`)
  // line([mX(),mY()],[mX(),Ograph.getMaxDY()],5)
  // text(`(${mX()}, ${mY()})`,mX()-10,mY()-10,20)
}


function line(p1,p2, width) {
  this.x1=p1.dx||p1[0]||0
  this.y1=p1.dy||p1[1]||0
  this.x2=p2.dx||p2[0]||0
  this.y2=p2.dy||p2[1]||0
  let lin=new Path2D()
  c.lineWidth = width;
  c.beginPath();
  lin.moveTo(x1, y1);
  lin.lineTo(x2, y2);
  c.stroke(lin);
  c.fill(lin);
  return lin
}

//**update for the proporsens of the graph */
// function corTimesDataUpdate(){
//   WTX = width * 0.5 / Math.abs(Ograph.maxX()-Ograph.minX());
//   HTY = height * 0.5 / Math.abs(Ograph.maxY()-Ograph.minY());

//   // console.log(WTX)
//   Ograph.update()
// }

  //draw the neccessery lines of a point(one or two) in the graph
 

  let mouse = {
    x: null,
    y: null
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
  Ograph.update()
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
  Ograph.update()
  draw()
}
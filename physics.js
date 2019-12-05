//get v(m/s), starting point, ending point
//for physics you need a,v,x,v0,x0
let x0 = 0,
  v0,
  a,
  t;
function GV(m,v0, St, Et) {
Et=parseInt(Et) 
St=parseInt(St)
  v0 = parseInt(v0);
  a = parseInt(m);
  t = parseInt(Et) - parseInt(St);
  let points = [Et - St];
  for (let i = 0; i <= Et - St; i++) {
    points[i] = new point(i + St, i * a + v0);
  }
  c = c0;
  clearall()
  phyGV = new graph(points, 100, 100, 1000, 500);
  c = c2;
  clearall()
  phyGA = new graph(VtoA(points), 0, 0, 150, 150);
  c = c1;
  clearall()
  phyGX = new graph(VtoX(points), 0, 0, 150, 150);
  console.trace("wizard")
  pointsWB.innerHTML='<p>points data</p>'
for(const po of phyGV.vg.points){
    pointsWB.innerHTML=pointsWB.innerHTML+`<div id="point${po.x}" class="dataPoints" title="item" name="drag">point${po.x} data
        <p style="width: max-content;">
          x:<input class="dataX" style="width: 54px;" value=${po.x} onkeypress='pointDataEdit("x",this.value,phyGV.vg.points[${po.x}])' >
        </p>

        <p style="width: max-content;">
          y:<input class="dataY" style="width: 54px;" value=${po.y} onkeypress='pointDataEdit("y",this.value,phyGV.vg.points[${po.x}])' >
        </p></div>`

}
  datapoints=$(".dataPoints")
for(const poin of datapoints){
    let parBo=poin.getBoundingClientRect()
    let parentBo=poin.parentElement.getBoundingClientRect()
        poin.style.left =parBo.left-parentBo.left
        poin.style.top =parBo.top-parentBo.top

}
for(const poin of datapoints){
        poin.style.position="absolute"
        poin.style.float="none"
}
$(".dataPoints").draggable({
    snap: `snapTo`,
    snapTolerance: 10,
    start: function (event, ui) {
      WB=this.parentElement
      dis(this)
    },
  
    stop: function (event, ui) {
     
      /* Get the possible snap targets: */
      var snapped = $(this).data("ui-draggable").snapElements;
      var snappedTo = null;
      snapper = $(this)[0];
  
      for (let i = 0; i < snapped.length; i++) {
        if (snapped[i].snapping) {
          //if chainge to true
          snappedTo = snapped[i].item;
        }
      }
  
      if (snappedTo != null) {
        snapped = snappedTo;
  
        onSnap(snapper, snapped); //if more than one snaped!!!!!!!!
      }
  }
  });
  

  return points;
}
v0 = 0;
x0 = 0;
let tpp = [
  new point(0, -2),
  new point(2, 2),
  new point(4, -2),
  new point(6, 3)
];
c = c0;
let phyGV = new graph(tpp, 100, 100, 1000, 500);
pointsWB.innerHTML='<p>points data</p>'
for(const po of phyGV.vg.points){
    pointsWB.innerHTML=pointsWB.innerHTML+`<div id="point${po.x}" class="dataPoints" title="item" name="drag">point${po.x} data
        <p style="width: max-content;">
          x:<input class="dataX" style="width: 54px;" value=${po.x} onkeypress='pointDataEdit("x",this.value,phyGV.vg.points[${po.x}])' >
        </p>

        <p style="width: max-content;">
          y:<input class="dataY" style="width: 54px;" value=${po.y} onkeypress='pointDataEdit("y",this.value,phyGV.vg.points[${po.x}])' >
        </p></div>`

}
datapoints=$(".dataPoints")
for(const poin of datapoints){
  let parBo=poin.getBoundingClientRect()
  let parentBo=poin.parentElement.getBoundingClientRect()
      poin.style.left =parBo.left-parentBo.left
      poin.style.top =parBo.top-parentBo.top

}
for(const poin of datapoints){
      poin.style.position="absolute"
      poin.style.float="none"
}
$(".dataPoints").draggable({
  snap: `snapTo`,
  snapTolerance: 10,
  start: function (event, ui) {
    WB=this.parentElement
    dis(this)
  },

  stop: function (event, ui) {
   
    /* Get the possible snap targets: */
    var snapped = $(this).data("ui-draggable").snapElements;
    var snappedTo = null;
    snapper = $(this)[0];

    for (let i = 0; i < snapped.length; i++) {
      if (snapped[i].snapping) {
        //if chainge to true
        snappedTo = snapped[i].item;
      }
    }

    if (snappedTo != null) {
      snapped = snappedTo;

      onSnap(snapper, snapped); //if more than one snaped!!!!!!!!
    }
}
});

c = c2;
let phyGA = new graph(VtoA(phyGV.vg.points), 0, 0, 150, 150);
c = c1;

let phyGX = new graph(VtoX(phyGV.vg.points), 0, 0, 150, 150);

// let pVs=GV(0,1,0,5)
// D=()=>{
//     c=c0
//     phyGV.vg.draw()
//     phyGA.vg.draw()
//     console.log(c)
//     c=c1

//     phyGX.vg.draw()
//     console.log(c)
// }
// new graph(VtoA(setV(1,-1,1,5)),350,50,250,250)
function AtoV(Ps) {}
function VtoX(Ps) {
  v0 = Ps[0].y;
  let ps = [];
  let mi = 0;
  let y;
  a = getM(Ps[0], Ps[1]);
  for (let l = 0; l < Ps.length - 0.5; l += 0.25) {
    y = x0 + v0 * (l - mi) + 0.5 * a * (l - mi) ** 2;
    let x = l;
    ps.push(new point(x, y));
    l != l.toFixed(0) ? (ps[ps.length - 1].isDraw = false) : 0;
    try {
      if (a != undefined && a != getM(Ps[l], Ps[l + 1])) {
        x0 = ps.last().y; // acsualy calcolate to find what need to be put
        v0 = Ps[l].y;
        mi = l;
      }
      a = getM(Ps[l], Ps[l + 1]);
    } catch (error) {}
  }
  return ps;
}
function VtoA(Ps) {
  let ps = [];
  let m = getM(Ps[0], Ps[1]);
  for (let i = 0; i < Ps.length - 1; i++) {
    let mo = m;
    try {
      m = getM(Ps[i - 1], Ps[i + 1]);
    } catch (error) {
      m = getM(Ps[i], Ps[i + 1]);
    }
    if (m != mo) {
      ps.push(new point(Ps[i].x, mo));
    }

    ps.push(new point(Ps[i].x, m));
    try {
      m = getM(Ps[i], Ps[i + 1]);
    } catch (error) {}
    if (mo != m) {
      ps.push(new point(Ps[i].x, m));
    }
  }
  ps.push(
    new point(
      Ps.last().x,
      (Ps.last().y - Ps[Ps.length - 2].y) / (Ps.last().x - Ps[Ps.length - 2].x)
    )
  );
  return ps;
}
function XtoV(Ps) {}
// GV(1,0,0,5)

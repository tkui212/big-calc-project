import React from 'react';
import ContextMenu from '../Ops_menu';
import Slider from '../Slider.js';
import $ from  "jquery";
import "jquery-ui/ui/widgets/draggable";
import {dis,con,updateCon,onSnap} from '../functions';
import './Graphs.css';
import {Vg, point,clearall,getM,setC} from "./graph"
export default class Graphs extends React.Component {

  componentDidMount(){
    
    let pointsWB = document.getElementById("points");
    const canvas = document.querySelector(`#canvas_plate`);
canvas.width = window.innerWidth-4;
canvas.height = window.innerHeight-4;
const width = canvas.width;
const height = canvas.height;
let c0=canvas.getContext(`2d`);

let c = c0
setC(c)
const canvas1 = document.querySelector(`#can1`);
canvas1.width = 150
canvas1.height = 150
let c1 = canvas1.getContext(`2d`);

const canvas2 = document.querySelector(`#can2`);
canvas2.width = 150
canvas2.height = 150
let c2 = canvas2.getContext(`2d`);
function graph(ps,x,y,w,h){
  this.vg=new Vg(ps,x,y,w,h)
  // console.log(vg)
  this.vg.fillPoints()
  this.vg.draw()
}
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
    setC(c)
    clearall()
    phyGV = new graph(points, 100, 100, 1000, 500);
    c = c2;
    setC(c)
    clearall()
    phyGA = new graph(VtoA(points), 0, 0, 150, 150);
    c = c1;
    setC(c)
    clearall()
    phyGX = new graph(VtoX(points), 0, 0, 150, 150);
    console.trace("wizard")
    pointsWB.innerHTML='<p>points data</p>'
  for(const po of phyGV.vg.points){
      pointsWB.innerHTML=pointsWB.innerHTML+`
      <div id="point${po.x}" class="dataPoints" title="item" name="drag" style="position: relative;">point${po.x} data
          <p style="width: max-content;">
            x:<input class="dataX" style="width: 54px;" value=${po.x} onkeypress='pointDataEdit("x",this.value,phyGV.vg.points[${po.x}])' >
          </p>
  
          <p style="width: max-content;">
            y:<input class="dataY" style="width: 54px;" value=${po.y} onkeypress='pointDataEdit("y",this.value,phyGV.vg.points[${po.x}])' >
          </p></div>`
  
  }
    let datapoints=$(".dataPoints")
  for(const poin of datapoints){
      let parBo=poin.getBoundingClientRect()
      let parentBo=poin.parentElement.getBoundingClientRect()
          poin.style.left =parBo.left-parentBo.left
          poin.style.top =parBo.top-parentBo.top
  
  }
  for(const poin of datapoints){
          poin.style.position="relative"
          poin.style.float="left"
  }
  $(".dataPoints").draggable({
      snap: `snapTo`,
      snapTolerance: 10,
      start: function (event, ui) {
        dis(this,this.parentElement)
      },
    
      stop: function (event, ui) {
       
        /* Get the possible snap targets: */
        var snapped = $(this).data("ui-draggable").snapElements;
        var snappedTo = null;
        let snapper = $(this)[0];
    
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
setC(c)
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
let datapoints=$(".dataPoints")
for(const poin of datapoints){
  let parBo=poin.getBoundingClientRect()
  let parentBo=poin.parentElement.getBoundingClientRect()
      poin.style.left =parBo.left-parentBo.left
      poin.style.top =parBo.top-parentBo.top

}
for(const poin of datapoints){
      poin.style.position="relative"
      poin.style.float="left"
}
$(".dataPoints").draggable({
  snap: `snapTo`,
  snapTolerance: 10,
  start: function (event, ui) {
    dis(this)
  },

  stop: function (event, ui) {
   
    /* Get the possible snap targets: */
    var snapped = $(this).data("ui-draggable").snapElements;
    var snappedTo = null;
    let snapper = $(this)[0];

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
setC(c)
let phyGA = new graph(VtoA(phyGV.vg.points), 0, 0, 150, 150);
c = c1;
setC(c)
let phyGX = new graph(VtoX(phyGV.vg.points), 0, 0, 150, 150);
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
    if(l != l.toFixed(0)){
     ps[ps.length - 1].isDraw = false
    }
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

    let inpv0 = document.getElementById("inputV0");
let inpv = document.getElementById("inputV");
let inpt0 = document.getElementById("inputt0");
let inpt = document.getElementById("inputt");
inpv0.addEventListener("keypress",(ev)=>{
  if(ev.key=="Enter"&&inpv0.value!=""&&inpv.value!=""&&inpt0.value!=""&&inpt.value!=""){
    GV(inpv.value,inpv0.value,inpt0.value,inpt.value)}})
    inpv.addEventListener("keypress",(ev)=>{
  if(ev.key=="Enter"&&inpv0.value!=""&&inpv.value!=""&&inpt0.value!=""&&inpt.value!=""){
    GV(inpv.value,inpv0.value,inpt0.value,inpt.value)}})
    inpt0.addEventListener("keypress",(ev)=>{
  if(ev.key=="Enter"&&inpv0.value!=""&&inpv.value!=""&&inpt0.value!=""&&inpt.value!=""){
    GV(inpv.value,inpv0.value,inpt0.value,inpt.value)}})
    inpt.addEventListener("keypress",(ev)=>{
  if(ev.key=="Enter"&&inpv0.value!=""&&inpv.value!=""&&inpt0.value!=""&&inpt.value!=""){
    GV(inpv.value,inpv0.value,inpt0.value,inpt.value)}})
  }
  render(){
  return (
    <div className="App">
    <header className="App-header">
    <snapto id="sliders">
      <Slider id={"tools"} side={"left"} left= {0} top= {26} width= {26} height= {351} text={" t o o l s"}/>

      <Slider id={"graths"} side={"right"} top={"90px"} width={150} height={382} text={"related graphs"} conText={"graphs"}
      >
        <canvas
          id="can1"
          style={{width: "150", height: "150"}}
        ></canvas>
        <canvas
          id="can2"
          style={{width: "150", height: "150"}}
        ></canvas>
      </Slider>

      <Slider id={"calc"} left={"700px"} top={"0px"} height={300} width={200} text={"calcolator"}>
        <Slider id={"calc_history"} left={"-154px"} top={"30px"} text={"calc's history"} conText={"calc"}/>
      <div>
        calcolator here
      </div>
      </Slider>

      <Slider
        id={"grath_wizard"}
        side={"bottom"}
        left={"940.906px"} z-index={"10"} width={215} height={215} text={"grath builder wizard"} conText={"wizard"}
      >
        <p>v0:<input id="inputV0"/></p>
        <p>v:<input id="inputV"/></p>
        <p>t0:<input id="inputt0"/></p>
        <p>t:<input id="inputt"/></p>
      </Slider>


      <Slider
        id="points"
        side={"bottom"} width= {823} height= {200}
        text={"points data"}
      >
        <div id="point1" className="dataPoints" title="item" name="drag">
          point1 data:
          <p style={{width:" max-content"}}>
            x:<input className="dataX" style={{width:" 54px"}} defaultValue="1" />
          </p>

          <p style={{width:" max-content"}}>
            y:<input className="dataY" style={{width:" 54px"}} />
          </p>
        </div>
        <div id="point2" className="dataPoints" title="item" name="drag">
          point2 data
          <p style={{width:" max-content"}}>
            x:<input className="dataX" style={{width:" 54px"}} defaultValue="1" />
          </p>

          <p style={{width:" max-content"}}>
            y:<input className="dataY" style={{width:" 54px"}} />
          </p>
        </div>
        <div id="point3" className="dataPoints" title="item" name="drag">
          point3 data
          <p style={{width:" max-content"}}>
            x:<input className="dataX" style={{width:" 54px"}} defaultValue="1" />
          </p>

          <p style={{width:" max-content"}}>
            y:<input className="dataY" style={{width:" 54px"}} />
          </p>
        </div>
        <div id="point4" className="dataPoints" title="item" name="drag">
          point4 data
          <p style={{width:" max-content"}}>
            x:<input className="dataX" style={{width:" 54px"}} defaultValue="1" />
          </p>

          <p style={{width:" max-content"}}>
            y:<input className="dataY" style={{width:" 54px"}} />
          </p>
        </div>
      </Slider>

      <Slider
        id="grath_history"
        
        text={"graph history"}
        left={"159.985px"} side={"top"} height={200} width={100}
      >
      </Slider>


      <Slider
        id="menuopse"
        
        text={"menu opsens"}
        left={"358.981px"} side={"top"} width={110} height={100}
      >
        
      </Slider>
      <div id="end of boards"></div>

      <canvas id="canvas_plate" style={{backgroundColor: "green"}}></canvas>


      
      <div id="end"></div>
    </snapto>
</header>
<ContextMenu id={"MainMenu"}/>
</div>
);
}
}



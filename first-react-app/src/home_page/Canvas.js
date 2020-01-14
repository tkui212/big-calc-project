import React, { Component } from "react";
import {exactMath,queue,timeComponent,c1,animation} from "../objects/queue.js";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <svg
        version="1.1"
        id="svg"
        x="0px"
        y="0px"
        width="100%"
        height="82%"
      ></svg>
    );
  }
  componentDidMount() {

    // console.log(exactMath.formula('4**2'))
    Array.prototype.filterDup = function() {
        let arra = [this[0]];
        for (let i = 0; i < this.length; i++) {
          let is = true;
          for (let j = 0; j < arra.length; j++) {
            if (arra[j] == this[i]) {
              is = false;
              break;
            }
          }
          if (is) {
            arra.push(this[i]);
          }
        }
        // this=arra
        return arra;
      };
    var stringify = require("json-stringify-safe");

    function log(text) {
      return JSON.parse(stringify(text));
    }
    var svg = document.querySelector("#svg");
    var innerWidth = svg.clientWidth;
    var innerHeight = svg.clientHeight;

    function create(color, name) {
      //creating the menu arcs
      this.name = name;
      this.color = color;
    if(this.name=="0"){
        this.color="red"
        this.x =250
        this.y =300
        this.vx =0
        this.vy =0
    }
    else if(this.name=="1"){
        this.color="blue"
        this.x =149
        this.y =300
        this.vx =10
        this.vy =0
    }
    else if(this.name=="2"){
        this.color="green"
        this.x =354
        this.y =300
        this.vx =-10
        this.vy =0
    }
    else if(this.name=="3"){
        this.color="yellow"
        this.x =250
        this.y =415
        this.vx =0
        this.vy =-10
    }
    else if(this.name=="4"){
      this.color="red"
      this.x =400
      this.y =200
      this.vx =0
      this.vy =0
  }
  else if(this.name=="5"){
      this.color="blue"
      this.x =149
      this.y =400
      this.vx =10
      this.vy =0
  }
  else if(this.name=="6"){
      this.color="green"
      this.x =354
      this.y =100
      this.vx =-10
      this.vy =0
  }
  else{
      this.color="yellow"
      this.x =600
      this.y =413
      this.vx =0
      this.vy =-10
  }
      svg.innerHTML += ` <circle id="${this.name}" cx="${this.x}" cy="${
        this.y
      }" r="${50}" stroke="${this.color}" stroke-width="${0}" fill="${
        this.color
      }" style="" />`;
      svg.innerHTML += ` <line id="${this.name}V" x1="${this.x}" y1="${
        this.y
      }" x2="${this.x + this.vx}" y2="${this.y +
        this.vy}" style="stroke:black;stroke-width:2" />`;
      svg.innerHTML += ` <line id="${this.name}ColliP" x1="${this.x}" y1="${
        this.y
      }" x2="${this.x + this.vx * 0}" y2="${this.y +
        this.vy * 0}" style="stroke:white;stroke-width:2" />`;
      //   console.log(c1[0])
      return this;
    }
    let c1=[]
    for (let i = 0; i < 2; i++) {
        c1[i]=new create("red", i)
      }
      c1.forEach(element => {
        queue.setElements(element);
      });
      document.c1=c1
      document.queue=queue
      document.canvas=this
      console.log(document.canvas)
    // let c2=[]
    // for (let i = 4; i < 8; i++) {
    //     c2[i-4]=new create("red", i)
    //   }
    //   c2.forEach(element => {
    //     queue.setElements(element);
    //   });
    this.stopTimeOut=false
    this.timeOuts=[]
    console.log(this.timeOuts)
    console.log(document.canvas)
      let Tspeed=1
      // var RL=queue.futher(c2,60,0)
    let result=queue.futher(c1,5,0)
    runTimeLine(result,0)
    // fastRun(RL)
    
function fastRun(Ar){
  for(let i=0;i<Ar.length;i++){
    this.timeOuts.push(setTimeout(()=>{Ar[i].run(0.5)
      console.log(Ar[i])
  },exactMath.formula(`(${i}*500)`)))
  }
}

var timeLine=[]
var resultLine=[]
let time=0
this.internal=(setInterval(()=>{time+=1000; console.log(time)
  if(document.canvas.stopTimeOut){
    document.canvas.timeOuts.forEach(element => {
      clearInterval(element)
    });
    clearInterval(document.canvas.internal)
  }
},1000))
    function runTimeLine(Ar,before){
      if(!document.canvas.stopTimeOut){
      Ar[0].run(exactMath.formula(`(${Ar[0].T}-${before})/${Tspeed}`))
      // timeLine.push({T:exactMath.formula(`(${before}*1000)`),result:Ar[0]})
      // resultLine.push(Ar[0])

      for(let i=1;i<Ar.length;i++){
        document.canvas.timeOuts.push(setTimeout(()=>{Ar[i].run(exactMath.formula(`(${Ar[i].T}-${Ar[i-1].T})/${Tspeed}`))
        timeLine.push({T:exactMath.formula(`(${Ar[i-1].T}*1000)`),result:Ar[i]})
        resultLine.push(Ar[i])
        console.log(i)
        // console.log(timeLine)
        // console.log(resultLine)
      },exactMath.formula(`((${Ar[i-1].T}-${before})*1000)/${Tspeed}`)))
      }
      let result2
      if(typeof Ar[Ar.length-1].C!="string"){
        result2=queue.futher(Ar[Ar.length-1].C1,20,Ar[Ar.length-1].T)

      }
      else{
        result2=queue.futher(Ar[Ar.length-1].C1,20,Ar[Ar.length-1].T)

      }
      document.canvas.timeOuts.push(setTimeout(()=>{
        runTimeLine(result2,Ar[Ar.length-1].T)

      },exactMath.formula(`((${Ar[Ar.length-1].T}-${before})*1000)/${Tspeed}`)))
    }}

//       throw("end")
//     async function startup() {
//       for (let i = 0; i < 1; i++) {
//         c1[i] = new create("red", i);
//       }
//       c1.forEach(element => {
//         element.setElements();
//       });
//       for (let i = 0; i < c1.length; i++) {
//         queue.TC = queue.TC.concat(await c1[i].collisens());
//       }
//       await queue.sort();
//       setTimeout(async function() {
//         animation();
//       }, 1000);
//     }
//     // setTimeout(() => {
//     //   startup();
//     // }, 100);
//     var anil;

  }
}
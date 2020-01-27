import React, { Component } from "react";
import {exactMath,queue,timeComponent,c1,animation} from "../objects/queue.js";
import {Circle} from "../phy/Body.js"

export default class ColiSim extends Component {
  constructor(props) {
    super(props);
    this.bodys=[]
    if(props.width!=undefined){this.width=props.width}else{this.width="100%"}
    if(props.height!=undefined){this.height=props.height}else{this.height="100%"}
  }
  render() {
    return (
      <svg version="1.1" id="svg" x="0px" y="0px" width={`${this.width}`} height={`${this.height}`}>
        <Circle x="250" y="300" radius="50" vx={0} vy={0} id="0" color="red"/>
        <Circle x="149" y="300" radius="50" vx={10} vy={0} id="1" color="blue"/>
        <Circle x="354" y="300" radius="50" vx={-10} vy={1} id="2" color="green"/>
        <Circle x="250" y="415" radius="50" vx={0} vy={-10} id="3" color="yellow"/>
      </svg>
    );
  }
  componentDidMount() {
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
    let c1=[]
    for(let i=0;i<4;i++){
      c1[i]=document.getElementById(`${i}`).me.toSimple()
    }
    document["canvas"]=this
    console.log(c1)
    this.stopTimeOut=false
    this.timeOuts=[]
    let Tspeed=5
    
var timeLine=[]
var resultLine=[]
let time=0
let step=0
    let result
setTimeout(()=>{result=queue.futher(c1,10,0);    runTimeLine(result,0)
},2000)
    document.addEventListener("keydown",(e)=>{
      if(e.key=="ArrowRight"){
        step++
      }
      else if(e.key=="ArrowLeft"){
        step--
      }
      result[step].run((result[step+1].T-result[step].T)/2)

      console.log(result[step])
      console.log(step)
        })

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


    // function fastRun(Ar){
    //   for(let i=0;i<Ar.length;i++){
    //     this.timeOuts.push(setTimeout(()=>{Ar[i].run(0.5)
    //       console.log(Ar[i])
    //   },exactMath.formula(`(${i}*500)`)))
    //   }
    // }
    
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
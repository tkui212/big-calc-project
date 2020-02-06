
import React, { Component } from "react";
import {data} from "../dataBase";
import ReactDOM from 'react-dom';
import {queue,timeComponent,c1,animation} from "../objects/queue.js";
import {Console,Value} from "../data";
import {toDegrees,toRadians,createElement,mouseElem,effShow,collapse,hideAll,showAll, runEffect} from '../functions.js'
import $ from  "jquery";
import "jquery-ui/ui/effects/effect-slide";
import "jquery-ui/ui/widgets/draggable";
import F from "./F.png"
import {cNum,define} from "../objects/obj"
import {Meth} from "../math/Math"
// import "./jquery-ui-1.12.1/jquery-ui.js";

export class Data extends Component {
    /**
     * @param {string} id 
     * 
     * @param {Data} copy 
     * or
     * @param x x position
     * @param y y position
     */
  constructor(props){//{x,y,id}
    super(props)
    // console.log(typeof props)
    if(props.constructor.name=="Data"){
      throw("make me")
    }
    else{
    this.id=props.id+"Data"
    if(props.x==undefined){
      throw("x sappose to be defined")
    }
    cNum(this,this.id,"x",props.x)
    cNum(this,this.id,"y",props.y)
    this.unpdatindgsTimeOut=true
    // this.transSpeed=0.5
    this.cx=`var(--${this.id}-x)`
    this.cy=`var(--${this.id}-y)`
    this.forces=props.Fs?props.Fs:[];
    this.cons=props.cons?props.cons:[];
    this.Listeners=[]
    this.registerListener= function(listener) {
      this.Listeners.push(listener)
    }
  }
  data.add(this.id,this)
  }
  event(){
    if(this.unpdatindgsTimeOut){
      this.Listeners.forEach(Fun => {
        Fun.call()
      });
      this.unpdatindgsTimeOut=false
      setTimeout(()=>{this.unpdatindgsTimeOut=true},1)
    }
  }
  removeListener(id){
    this.Listeners=this.Listeners.filter((value)=>value.id!=id)
  }
  removeCon(id){
    this.cons=this.cons.filter((value)=>value.id!=id)
  }
  seperateLine(t,tP){
    t.data.removeCon(t.id)
    data.Data[t.id+"Data"].x=t.data.x
    data.Data[t.id+"Data"].y=t.data.y
    t.data=data.Data[t.id+"Data"]
    if(t.parent!=undefined&&t.parent.constructor.name=="Line"){
    if(tP.point1.id==t.id){
      tP.data=t.data
    }
    else if(tP.point2.id==t.id){
      tP.data2=t.data
    }
    else{
      throw("this sulld not happen")
    }
  }
  else if(t.parent!=undefined&&t.parent.constructor.name=="Circle"){
    tP.data=t.data
  }
    
  }
  bringToFront(elem){
    for(let i=0;i<this.cons.length;i++){
      if(this.cons[i].id==elem.id){
        this.cons[i].elem.style.zIndex="5"
      }
      else{
        this.cons[i].elem.style.zIndex="0"
      }
    }
  }
}



export class Body extends Component {
  constructor(props){
    super(props)
    this.id=props.id
    this.color = props.color?props.color:"black";
    this.dragging=false
    this.mouse={x:0,y:0}
    this.Listeners=[]
    data.add(this.id,this)
  }
  render() {return (<div id={this.id}></div>);}
  componentDidMount() {}
  
  registerListener(listener) {
    this.Listeners.push(listener)
  }
  event(){
    if(this.unpdatindgsTimeOut){
      this.Listeners.forEach(Fun => {
        Fun.call()
      });
      this.unpdatindgsTimeOut=false
      setTimeout(()=>{this.unpdatindgsTimeOut=true},1)
    }
  }
  removeListener(id){
    this.Listeners=this.Listeners.filter((value)=>value.id!=id)
  }
  update = (op) => {for (let key in op) {if (this.hasOwnProperty(key)){this[key]= op[key];}}};
  getCons=()=>{
    return this.data.cons
  }
  isConnectTo=(other)=>{
    for(let bodys of this.data.cons){
      if(bodys==other){
        return true
      }
    }
    return false
  }
}
export class Cir extends Body {
  constructor(props){
    super(props)
    this.radius=props.radius
    this.DataHolder=new Data({x:props.x,y:props.y,id:this.id})
    
    Object.defineProperty(this,"data",{
      get(){return this.DataHolder},
      set(num){ 
          this.DataHolder.removeListener(this.id)
          this.DataHolder.removeCon(this.id)
          
        this.DataHolder=num;
        this.DataHolder.registerListener(()=>this.event())
        this.DataHolder.cons.push(this)
        if(this.parent!=undefined&&this.parent.constructor.name=="Line"){
          if(this.parent.point1.id==this.id){
            this.parent.data=this.DataHolder
          }
          else{
            this.parent.data2=this.DataHolder
          }
          
        }
        else if(this.parent!=undefined&&this.parent.constructor.name=="Circle"){
          this.parent.data=this.DataHolder
        }
        if(this.elem!=undefined){
          // this.transSpeed=0
          // console.log(this.transSpeed)
        this.elem.style.cy=`calc(${this.DataHolder.cy}*1px)`
        this.elem.style.cx=`calc(${this.DataHolder.cx}*1px)`
        // this.elem.style.transition=`var(--${this.DataHolder.id}-transSpeed)`
        }
      }
    })
  define(this,`x`,()=>{return this.data.x},(num)=>{this.data.x=num})
  define(this,`y`,()=>{return this.data.y},(num)=>{this.data.y=num})
}
componentDidMount() {
  this.elem = document.getElementById(`${this.id}`);
  this.elem.me=this
  Object.defineProperty(this,"data",{
    get(){return this.DataHolder},
    set(num){ 
      this.DataHolder=num;
      this.DataHolder.cons.push(this)
      this.elem.style.cy=`calc(${this.DataHolder.cy}*1px)`
      this.elem.style.cx=`calc(${this.DataHolder.cx}*1px)`
      // this.elem.style.transition=`var(--${this.DataHolder.id}-transSpeed)`
    }
  })
}
toConsole(copy){
  let obj={id:this.id+"console",text:this.id+" data",values:{x:this,y:this,id:this},parent:this,left:parseInt(this.x)+50,top:parseInt(this.y)+50,dataSource:this}
  if(document.getElementById(this.id+"console")==null){
  if(typeof copy=="object"&&copy.constructor.name=="Console"){
    
    for(let key in copy){
      if(copy[key]==undefined){
        copy[key]=obj[key]
      }
    }
    console.log(copy)
    this.console=copy
  this.console.create()
  }
  else{
  this.console=new Console(obj)
  this.console.create()
  }}
  // this.data.registerListener(()=>{})
}
render(){
  return(<circle id={this.id} 
    cx={this.cx} 
    cy={this.cy} 
    r={this.radius} 
    stroke={this.color} 
    strokeWidth={0} 
    fill={this.color} 
    style={{cx:`${this.data.cx}`,cy:`${this.data.cy}`}}
     />)
}
toSimple(){
  return {x:parseInt(this.x),y:parseInt(this.y),vx:this.vx,vy:this.vy,id:this.id,me:this}
}
}
export class Line extends Body{
  constructor(props){
    super(props)
    this.point1=new Point({x:0,y:0,id:`${this.id}P1`})
    this.point2=new Point({x:0,y:0,id:`${this.id}P2`})
    this.point1.parent=this
    this.point2.parent=this
    this.DataHolder={data:this.point1.data,data2:this.point2.data}
    this.valueChange=()=>{
      this.path=`path("M ${this.x1} ${this.y1} L ${this.x2} ${this.y2}")`
      }
      Object.defineProperty(this,"data",{
        get(){return this.DataHolder.data},
        set(num){ 
          if(this.DataHolder.data!=null){
          this.DataHolder.data.removeListener(this.id)
          this.DataHolder.data.removeCon(this.id)
          }
          this.DataHolder.data=num;
          this.DataHolder.data.registerListener(this.valueChange)
          this.DataHolder.data.cons.push(this)
          this.valueChange()
        }
        
      })
      Object.defineProperty(this,"data2",{
        get(){return this.DataHolder.data2},
        set(num){ 
          if(this.DataHolder.data2!=null){
          this.DataHolder.data2.removeListener(this.id)
          this.DataHolder.data2.removeCon(this.id)
          }
          this.DataHolder.data2=num;
          this.DataHolder.data2.registerListener(this.valueChange)
          this.DataHolder.data2.cons.push(this)

          this.valueChange()
          }
      })
      define(this,"y1",
      ()=>{return parseInt(this.data.y)},
      (num)=>{ this.data.y=num;})

      define(this,"x1",
        ()=>{return parseInt(this.data.x)},
        (num)=>{ this.data.x=num;})

      define(this,"y2",
        ()=>{return parseInt(this.data2.y)},
        (num)=>{ this.data2.y=num;})

      define(this,"x2",
        ()=>{return parseInt(this.data2.x)},
        (num)=>{ this.data2.x=num;})


        // define(this,"length",
        // ()=>{return Math.sqrt(exactMath.formula(``))},
        // ()=>{console.log("no")})

      define(this,"path",
      ()=>{return `var(--${this.id}-path)`},
      (num)=>{document.getElementById("all").style.setProperty(`--${this.id}-path`,`${num}`)})

    if(typeof props.x=="number"&&typeof props.y=="number"){
      this.point1.x=props.x
      this.point1.y=props.y
      this.data=this.point1.data
    }
    else if(props.P1!=undefined){
      this.data=data.Body[props.P1].data
    }
    this.point1.data=this.data

  if(typeof props.x=="number"&&typeof props.y=="number"){
    this.point2.x=exactMath.formula(`${this.x1}+${Math.sin(toRadians(this.angle))}*${this.F}`)
    this.point2.y=exactMath.formula(`${this.y1}-${Math.cos(toRadians(this.angle))}*${this.F}`)
     this.data2=this.point2.data
  }
  else if(props.P2!=undefined){
    this.data2=data.Body[props.P2].data
  }
  this.point2.data=this.data2
  console.log(Meth.StringCalc("(1+(1+2)+1)"))
  console.log(Meth.StringCalc(
    `((${this.x1}-${this.x2})^2+(${this.y1}-${this.y2})^2)^0.5`
  ))
  }
  
  componentDidMount(){
    this.point1.componentDidMount()
    this.point2.componentDidMount()
    this.valueChange()
    this.elem = document.getElementById(`${this.id}`);
    this.elem.me=this
    this.elem.addEventListener("mousedown",this.mouseDown)
    this.elem.addEventListener("mouseover",this.over)
  }
  over=(e)=>{
    this.elem.addEventListener("mousemove",this.moveOver)
    this.elem.addEventListener("mouseout",this.out)
    let obj={id:this.id+"console",text:this.id+"C",values:{length:this,angle:this},parent:this,left:e.x,top:e.y,dataSource:this}
    this.console=new Console(obj)
    this.console.create()
  }
  moveOver=(e)=>{
    this.console.elem.style.top=e.y+10+"px"
    this.console.elem.style.left=e.x+10+"px"
  }
  out=(e)=>{
    this.console.delete()
  }
  mouseDown = (ev,ui) => {
    console.log(this.id)
    document.getElementById("Svg").appendChild(this.point1.elem)
    document.getElementById("Svg").appendChild(this.point2.elem)
  }
  render(){
      let p1=this.point1.render()
      let p2=this.point2.render()
      return ([<path id={this.id} d={`M 0 0 L 0 0`} stroke={"white"} strokeWidth={5} fill={"white"} className={"line"} style={{d:`${this.path}`}} key={this.id}/>,p1,p2])
  }
}
export class Circle extends Cir {
  /**
     * @param x x position
     * @param y y position
     * @param radius the radius
     * @param {string} id
     * @param {number} radius
     * @param {number} vx
     * @param {number} vy
     */
  constructor(props){
    super(props)
    this.width = props.width?props.width:100;
    this.height = props.height?props.height:100;
    this.radius = props.radius;
    this.port=new Point({x:this.x,y:this.y,id:`${this.id}P`});
    this.port.parent=this
    this.data=this.port.data
    this.vx=props.vx?props.vx:0;
    this.vy=props.vy?props.vy:0;
    // this.forces.push(new Force({x:this.x,y:this.y,ops:{id:`${this.id}F`,F:100,angle:180,P:this.port, parent:this}}));
  }
  componentDidMount() {
    this.elem = document.getElementById(`${this.id}`);
    this.elem.me=this
    this.port.componentDidMount()
    this.dragQueue=true
    this.elem.addEventListener("mousedown",this.mouseDown)
  }
  mouseDown = (ev,ui) => {
    console.log(this.id)
    document.addEventListener("mousemove",this.drag)
    document.addEventListener("mouseup",this.mouseUp)
    this.dragging=true
    this.mouse={x:this.x-ev.clientX,y:this.y-ev.clientY}
    // this.transSpeed = 0;
  }
  mouseUp=(ev,ui)=>{
    document.removeEventListener("mousemove",this.drag)
    document.removeEventListener("mouseup",this.mouseUp)
    this.dragQueue=1
    this.dragging=false
    setTimeout(()=>{this.x=ev.clientX+this.mouse.x
      this.y=ev.clientY+this.mouse.y},2)
  }
  drag=(ev)=>{
    this.dragQueue++
    if(this.dragging){
      this.dragging=false
      while(this.dragQueue>0){
      this.x=ev.clientX+this.mouse.x
      this.y=ev.clientY+this.mouse.y
      this.dragQueue--
      }
      this.dragging=true
    }
    }

  
  render(){
    let meP=this.port.render()
    return([
        <circle id={this.id} cx={this.x} cy={this.y} r={this.radius} stroke={this.color} strokeWidth={0} fill={this.color} style={{cx:`${this.data.cx}`,cy:`${this.data.cy}`}} key={this.id}/>
        ,meP])
  }

}
export class Point extends Cir{
  /**
     * @param {number} x x position
     * @param {number} y y position
     * @param {string} id - that can contain:
     * @param {Force[]} Fs array of forces that go throw the Point
     * @param {body[]} cons array of bodys that are connectedto the Point
     */
  constructor(props){
    super(props)
    this.pind=props.pind
  }
  componentDidMount() {
    this.elem =document.getElementById(`${this.id}`);
    this.elem.me=this
    this.elem.ops={"cosnole this":()=>{console.log(this.id); this.toConsole()},
      "pin this":()=>{this.pind=true},
      "unpin this":()=>this.pind=false,
      "elems here":()=>{console.log(document.elementsFromPoint(parseInt(window.mouseX), parseInt(window.mouseY)))}}
    this.dragQueue=0
    this.elem.addEventListener("mousedown",this.mouseDown)
  }

  mouseDown = (ev,ui) => {
    if(!this.pind){
    document.addEventListener("mousemove",this.drag)
    document.addEventListener("mouseup",this.mouseUp)
    this.data.seperateLine(this,this.parent)
    this.dragging=true
    this.mouse={x:this.x-ev.clientX,y:this.y-ev.clientY}
    this.dragQueue++
    // this.transSpeed = 0;
    }
  }
  mouseUp=(ev,ui)=>{
    document.removeEventListener("mousemove",this.drag)
    document.removeEventListener("mouseup",this.mouseUp)
    this.dragging=false
    if(this.parent!=undefined){
    let points=data.Point
    for(let key in points){
      if(50>this.getDistancePtoP(this,points[key])){
        if(this.parent.constructor.name=="Line"){
        this.data=points[key].data
        }
        else{
          this.data.x=points[key].data.x
          this.data.y=points[key].data.y
          points[key].data=this.data
        }

        }
      }
    }
      // this.transSpeed = 0.5;
      this.dragQueue=1
  }
  drag=(ev,ui)=>{
    this.dragQueue++
    if(this.dragging){
      this.dragging=false
      while(this.dragQueue>0){
      this.x=ev.clientX+this.mouse.x
      this.y=ev.clientY+this.mouse.y
      this.dragQueue--
      this.focuseClose()
      }
      this.dragging=true
    }
    }
  
  getDistancePtoP=(p1,p2)=>{
    let x=p2.x-p1.x
      let y=p2.y-p1.y
      return Math.sqrt(
        exactMath.formula(
          `${Math.abs(exactMath.pow(x, 2))} + ${Math.abs(
            exactMath.pow(y, 2)
          )}`
        )
      )
  }
  focuseClose=()=>{
    let points=data.Point
    for(let key in points){
      if(50>this.getDistancePtoP(this,points[key])){
        points[key].elem.style.fill="green"
      }
      else{
        points[key].elem.style.fill="white"
      }
    }
  }
  render(){
    return(<circle id={this.id} cx={this.x} cy={this.y} r={10} stroke={"white"} strokeWidth={5} fill={"white"} className={"point"} style={{cx:`${this.data.cx}`,cy:`${this.data.cy}`}} key={this.id} />)
    }
}
export class Force extends Line {
  constructor(props){
    super(props)
    // this.Fdata=new forceData({angle:props.angle,F:props.f,id:this.id})
    Object.defineProperty(this,"angle",{
      get(){return this.Fdata.angle},
      set(num){
      document.getElementById("all").style.setProperty(`--${this.id}-deg`,`rotate(${num}deg)`)
      this.Fdata.angle=num;
      this.event(this.Listeners);
    },
    enumerable:true
    })
    this.angle=props.angle
    this.F=props.f

  }
  componentDidMount(){
    console.log(this.id)
    this.point1.componentDidMount()
    this.point2.componentDidMount()
    this.elem = document.getElementById(`${this.id}`);
    this.elem.me=this
    this.elem.addEventListener("mouseover",this.over)
  }
  over=(e)=>{
    this.elem.addEventListener("mousemove",this.moveOver)
    this.elem.addEventListener("mouseout",this.out)
    let obj={id:this.id+"console",text:this.id+"C",values:{F:this,angle:this},parent:this,left:e.x,top:e.y,dataSource:this}
    this.console=new Console(obj)
    this.console.create()
    // console.log(this)
  }
  moveOver=(e)=>{
    this.console.elem.style.top=e.y+10+"px"
    this.console.elem.style.left=e.x+10+"px"
  }
  out=(e)=>{
    $(this.console.elem).remove()
    let id=this.console.id
    console.log(data.get(id))
    delete this.console
    console.log(data.get(id))


  }
  toConsole(){
    let obj={id:this.id+"console",text:this.id+"C",values:{x:this,y:this,id:this},parent:this,left:parseInt(this.x)+50,top:parseInt(this.y)+50,dataSource:this}
    this.console=new Console(obj)
    this.console.create()
    // this.data.registerListener(()=>{})
  }
  render(){
        let p1=this.point1.render()
        let p2=this.point2.render()
        return ([<img id={this.id} src={F} className={"line"} style={{top:`calc(${this.data.cy}*1px)`,left:`calc(${this.data.cx}*1px)`,width:`${this.F}px`,position:` absolute`,height:` 20px`,zIndex:` 99`,transformOrigin:` left`,transform:`var(--${this.id}-deg)`, mixBlendMode: "multiply"}} key={this.id}/>,p1,p2])
      }
}

// export class Graph extends Component{
//   constructor(p1,p2,ops){
//   this.point1=p1
//   this.point2=p2
//   this.id=ops.id?ops.id:bodys(plate).length
//   this.forces=ops.Fs?ops.Fs:[];
//   this.connections=ops.cons?ops.cons:[];
//   }
//   draw = () => {};
//   update = () => {};
// }
// function resister() {
//   this.draw = () => {};
//   this.update = () => {};
// }

// function Wire(parts,ops) {
//   this.id=ops.id?ops.id:bodys(plate).length
//   this.parts=parts
//   this.draw = () => {};
//   this.update = () => {};
// }
const exactMath = require("exact-math");

// export class Weight extends Body {
//   /**
//      * @param x x position
//      * @param y y position
//      * @param {object} ops settings
//      * @param {string} ops.id
//      * @param {number} ops.width 
//      * @param {number} ops.height 
//      * @param {number} ops.weight 
//      */
//   constructor(x,y,weight,ops){
//     super(x,y,ops)
//     this.width = ops.width?ops.width:100;
//     this.height = ops.height?ops.height:100;
//     this.weight = weight;
//     this.gridX=[this.y-this.height/2,this.y,this.y+this.height/2]
//     this.gridY=[this.x-this.width/2,this.x,this.x+this.width/2]  
//     this.ports=new Array(3);
//   for(let i=0;i<3;i++){
//     this.ports[i]=new Array(3)
//     for(let j=0;j<3;j++){
//         this.ports[i][j]=new Point(this.gridY[i],this.gridX[j],{id:`[${i}][${j}]`,cons:[this],parent:this})
//         this.ports[i][j].draw()
//     }
//   }
  
//   this.forces.push(new Force(this.x,this.y,{F:this.weight,angle:180}));
//   createRec(this.x-this.width/2,this.y-this.height/2,this.weight,this.height,svg,{id:this.id})
//     createText(this.x,this.y,svg,this.weight,{color:"white",id:this.id})
//     setTimeout(()=>{
//     this.meElement = document.getElementById(`${this.id}`);
//     this.meText = document.getElementById(`${this.id}text`);
//     this.meElement[`class`]=this
    
//     Draggable.create(`${this.id}`
//     , {
//       type:"x,y",
//       overshootTolerance:0,
//       inertia:true
//     })
//     console.log(this)
//   },100)

  
//   }
//   draw = () => {
    
    
//   };

//   update=(op)=>{
//     for (let key in op) {
//       if (obj.hasOwnProperty(key)){
//          this[key] = op[key];
//       }
//     }
//     this.gridX=[this.y-this.height/2,this.y,this.y+this.height/2]
//     this.gridY=[this.x-this.width/2,this.x,this.x+this.width/2]  
//     this.ports=new Array(3);
//   for(let i=0;i<3;i++){
//     this.ports[i]=new Array(3)
//     for(let j=0;j<3;j++){
//         this.ports[i][j]=new Point(this.gridY[i],this.gridX[j],{id:`[${i}][${j}]`,cons:[this],parent:this})
//         this.ports[i][j].draw()
//     }
//   }
//   this.forces=[]
//   this.forces.push(new Force(this.x,this.y,{F:this.weight,angle:180}));
//   this.meElement
//   }
  
// } 

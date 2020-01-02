
import React, { Component } from "react";
import {queue,timeComponent,c1,animation} from "./objects/queue.js";
import "./home_page.css";
import ReactDOM from 'react-dom';
import {toDegrees,toRadians,log} from './functions.js';

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
    if(typeof props=="Data"){
      throw("make me")
    }
    else{
    this.id=props.id
    if(props.x==undefined){
      throw("x sappose to be defined")
    }
    document.getElementById("all").style.setProperty(`--${this.id}-x`,`${props.x}`)
    document.getElementById("all").style.setProperty(`--${this.id}-y`,`${props.y}`)
    Object.defineProperty(this,"x",{
      get(){return document.getElementById("all").style.getPropertyValue(`--${this.id}-x`)},
      set(num){document.getElementById("all").style.setProperty(`--${this.id}-x`,`${num}`)
      this.Listeners.forEach(Fun => {
        Fun.call()
      });}
    })
    Object.defineProperty(this,"y",{
      get(){return document.getElementById("all").style.getPropertyValue(`--${this.id}-y`)},
      set(num){document.getElementById("all").style.setProperty(`--${this.id}-y`,`${num}`)
      this.Listeners.forEach(Fun => {
        Fun.call()
      });}
    })
    this.cx=`var(--${this.id}-x)`
    this.cy=`var(--${this.id}-y)`
    this.forces=props.Fs?props.Fs:[];
    this.cons=props.cons?props.cons:[];

    this.Listeners=[]
    this.registerListener= function(listener) {
      this.Listeners.push(listener)
    }
  }
  }
  // setCssProperty(name,value)
}

export class Body extends Component {
  constructor(props){
    super(props)
    this.id=props.id
    this.color = props.color?props.color:"black";
    this.svg=props.svg?props.svg:null;
    this.renderType=props.renderType?props.renderType:"normal"
  }
  render() {return (<div id={this.id}></div>);}
  componentDidMount() {}
  update = (op) => {for (let key in op) {if (this.hasOwnProperty(key)){this[key]= op[key];}}};
}

export class Cir extends Body {
  constructor(props){
    super(props)
    this.data=new Data({x:props.x,y:props.y,id:this.id})
  Object.defineProperty(this,"y",{
    get(){return this.data.y},
    set(num){ this.data.y=num;}
  })
  Object.defineProperty(this,"x",{
    get(){return this.data.x},
    set(num){ this.data.x=num;}
  })
}
componentDidMount() {
  queue.setElements(this)
  // queue.draw(this,0,"white")
  this.elem.me=this
}
render(){
  return(<circle id={this.id} cx={this.x} cy={this.y} r={10} stroke={"white"} strokeWidth={0} fill={"white"} style={{cx:`${this.data.cx}`,cy:`${this.data.cy}`}} />)
}
}

export class Line extends Body{
  constructor(props){
    super(props)
    if(props.after!=undefined&&props.after==true){
      this.later=log(props)
      delete this.later.after
      this.later.renderType="normal"
    }
    else{
    this.F=props.F
    this.angle=props.angle
  if(props.P1!=undefined){
    if(props.P1.constructor.name=="Point"){
      this.point1=props.P1
    }
    else if(typeof props.P1=="string"){
      this.point1=document.getElementById(`${props.P1}`).me
    }
    else{
      console.log(props.P1.constructor.name)
      console.log(props.P1)
      throw("sold not happen")
    }
  }
  else{
  this.point1=new Point({x:props.x,y:props.y,id:`${this.id}P1`})
  }
  console.log(this.point1)
  this.data=this.point1.data
  
  Object.defineProperty(this,"y1",{
    get(){return parseInt(this.data.y)},
    set(num){ this.data.y=num;}
  })
  Object.defineProperty(this,"x1",{
    get(){return parseInt(this.data.x)},
    set(num){ this.data.x=num;}
  })
  if(props.P2!=undefined){
    if(props.P2.constructor.name=="Point"){
      this.point2=props.P2
    }
    else if(typeof props.P2=="string"){
      console.log(document)
      this.point2=document.getElementById(`${props.P2}`).me
    }
    else{
      console.log(props.P2.constructor.name)
      console.log(props.P2)
      throw("sold not happen")
    }
  }
  else{
  this.point2=new Point({x:exactMath.formula(`${this.x}+${Math.sin(toRadians(this.angle))}*${this.F}`),y:exactMath.formula(`${this.y}-${Math.cos(toRadians(this.angle))}*${this.F}`),id:`${this.id}P2`})
  }
  this.data2=this.point2.data
  Object.defineProperty(this,"y2",{
    get(){return parseInt(this.data2.y)},
    set(num){ this.data2.y=num;}
  })
  Object.defineProperty(this,"x2",{
    get(){return parseInt(this.data2.x)},
    set(num){ this.data2.x=num;}
  })
  this.valueChange=()=>{
    let xLength=exactMath.formula(`(${this.x1}-${this.x2})`)
    let yLength=exactMath.formula(`(${this.y1}-${this.y2})`)
    let length=Math.sqrt(Math.pow(Math.abs(xLength),2)+Math.pow(Math.abs(yLength),2))
    document.getElementById("all").style.setProperty(`--${this.id}-length`,`${length}`)
let angle
    if(xLength<0&&yLength<0){
      angle=Math.asin(exactMath.formula(`${xLength}/${length}`))* (180 / Math.PI)+90
    }
    else if(xLength<0&&yLength>0){
    angle=-(Math.asin(exactMath.formula(`${xLength}/${length}`))* (180 / Math.PI)+90)
    }
    else if(xLength>0&&yLength>0){
      angle=Math.acos(exactMath.formula(`${xLength}/${length}`))* (180 / Math.PI)+180
    }
    else if(xLength>0&&yLength<0){
      angle=Math.asin(exactMath.formula(`${xLength}/${length}`))* (180 / Math.PI)+90
    }
    console.log(this.data)
    console.log(angle)
    if(xLength==0||yLength==0){
      angle=0
      if(xLength<0){
        angle=0
      }
      if(xLength>0){
        angle=180
      }
      if(yLength<0){
        angle=90
      }
      if(yLength>0){
        angle=270
      }
    }
    else{
    if(xLength<0){
      angle=angle-90
    }
    if(yLength<0){
      angle=angle+90
    }
  }
  if(yLength>=0&&xLength>=0){
    angle=angle+180
  }
    console.log(xLength+" "+yLength)
    console.log(angle)
    document.getElementById("all").style.setProperty(`--${this.id}-deg`,`rotate(${angle}deg)`)
  }
  this.data.registerListener(this.valueChange)
  this.data2.registerListener(this.valueChange)
  this.valueChange()
}
  }
  componentDidMount(){
    if(this.later!=undefined){
      console.log("re rendering")
      let postline=new Line(this.later)
      postline.render()
      postline.componentDidMount()
    }
    else{
    queue.setElements(this)
    this.elem.me=this
    }
  }
  render(){
    let el=document.createElement('div');
    el.id=this.id
    el.className="line"
    let style
    if(this.renderType=="react"){
      if(this.later!=undefined){
        style={position:" absolute",height:" 2px",zIndex:" 99",transformOrigin:" left",backgroundColor:"green"}
      }
      else{
        style={top:` calc(${this.data.cy}*1px);`,left:` calc(${this.data.cx}*1px);`,width:` calc(var(--${this.id}-length)*1px);`,position:` absolute`,height:` 2px`,zIndex:` 99`,transformOrigin:` left`,transform:` var(--${this.id}-deg)`, backgroundOolor:`green`}
      }
      return(
        <div id={this.id+"delete"} className={"line"} style={style}/>
      )
    }
    else{
      console.log("normal render")
      if(this.later!=undefined){
        style=`position: absolute;height: 2px;z-index: 99;transform-origin: left;background-color:green;`
        el.id="delete"
      }
      else{
        style=`top: calc(${this.data.cy}*1px);left: calc(${this.data.cx}*1px);width: calc(var(--${this.id}-length)*1px);position: absolute;height: 2px;z-index: 99;transform-origin: left;transform: var(--${this.id}-deg); background-color:green;`
      }
      el.style=style
      document.getElementById("Lines").append(el)
    }
    // throw("a")
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
    this.data=this.port.data
    this.vx=props.vx?props.vx:0;
    this.vy=props.vy?props.vy:0;
    // this.forces.push(new Force({x:this.x,y:this.y,ops:{id:`${this.id}F`,F:100,angle:180,P:this.port, parent:this}}));

  }
  componentDidMount() {
    queue.setElements(this)
    // queue.draw(this,0,"blue")
    this.elem.me=this
    this.port.componentDidMount()
    // this.forces[0].componentDidMount()
    console.log("didmout")

  }
  update=(op)=>{
    for (let key in op) {
      if (this.hasOwnProperty(key)){
         this[key] = op[key];
      }
    }
  }
  render(){
    let meP=this.port.render()
    // this.forces[0].render()
    console.log("render")
    return([<circle id={this.id} cx={this.x} cy={this.y} r={this.radius} stroke={this.color} strokeWidth={0} fill={this.color} style={{cx:`${this.data.cx}`,cy:`${this.data.cy}`}} />,meP])
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
    // this.x=this.x
    // this.y=this.y
  }
  componentDidMount() {
    queue.setElements(this)
    // queue.draw(this,0,"white")
    this.elem.me=this
    console.log(this)
  }
  render(){
    return(<circle id={this.id} cx={this.x} cy={this.y} r={10} stroke={"white"} strokeWidth={0} fill={"white"} style={{cx:`${this.data.cx}`,cy:`${this.data.cy}`}} />)
  }
}
export class Force extends Line {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    queue.setElements(this)
    // queue.draw(this,0,"green")
    this.elem.me=this
  }
  render(){
    let el=document.createElement('img');
    el.src="./F.png"
    el.id=this.id
    el.className="line"
    el.style=`top: calc(${this.value.cy}*1px);left: calc(${this.value.cx}*1px);width: 100px;position: absolute;height: 20px;z-index: 99;transform-origin: left;transform: rotate(90deg);mix-blend-mode: multiply;`
    document.getElementById("Lines").append(el)
    // throw("a")
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

{/* <img src="./F.png" style="
top: calc(var(--b2P-y)*1px);
left: calc(var(--b2P-x)*1px);
width: 100px;
position: absolute;
height: 20px;
z-index: 99;
transform-origin: left;
transform: rotate(90deg);
mix-blend-mode: multiply;
"></img> */}
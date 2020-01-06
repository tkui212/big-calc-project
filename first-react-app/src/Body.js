
import React, { Component } from "react";
import {queue,timeComponent,c1,animation} from "./objects/queue.js";
import "./home_page.css";
import {toDegrees,toRadians,log,cpuAverage} from './functions.js'
import $ from  "jquery";
import "jquery-ui/ui/widgets/draggable";
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
      this.event(this.Listeners)
    }
    })
    Object.defineProperty(this,"y",{
      get(){return document.getElementById("all").style.getPropertyValue(`--${this.id}-y`)},
      set(num){document.getElementById("all").style.setProperty(`--${this.id}-y`,`${num}`)
      this.event(this.Listeners)
    }
    })
    Object.defineProperty(this,"transSpeed",{
      get(){return document.getElementById("all").style.getPropertyValue(`--${this.id}-transSpeed`)},
      set(num){document.getElementById("all").style.setProperty(`--${this.id}-transSpeed`,`${num}s linear`)
    }})
    this.unpdatindgsTimeOut=true
    this.transSpeed=0.5
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
  event(ar){
    if(this.unpdatindgsTimeOut){
      ar.forEach(Fun => {
        Fun.call()
      });
      this.unpdatindgsTimeOut=false
      setTimeout(()=>{this.unpdatindgsTimeOut=true},1)
    }
  }
  removeListener(id){
    console.log(this)
    this.Listeners.filter((value)=>value.id!=id)
  }
  seperateLine(t,tP){
    let newData=new Data({x:t.x,y:t.y,id:t.id})
    t.data=newData;
    t.elem.style.cx=newData.cx
    t.elem.style.cy=newData.cy
    t.elem.style.transition=`var(--${t.data.id}-transSpeed)`
    console.log(t)
    console.log(tP)
    if(tP.point1.id==t.id){
      tP.data=t.data
      // tP.elem.style.top=`calc(${newData.cy}*1px)`
      // tP.elem.style.left=`calc(${newData.cx}*1px)`
      // tP.elem.style.transition=`calc(var(--${tP.data2.id}-transSpeed)*var(--${tP.data.id}-transSpeed)/var(--${tP.data2.id}-transSpeed))`
      // t.data.registerListener(tP.valueChange)
    }
    else if(tP.point2.id==t.id){
      tP.data2=t.data
      // tP.elem.style.transition=`calc(var(--${tP.data2.id}-transSpeed)*var(--${tP.data.id}-transSpeed)/var(--${tP.data2.id}-transSpeed))`
      // t.data.registerListener(tP.valueChange)
    }
    else{
      throw("this sulld not happen")
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
    this.dragging=false
    this.mouse={x:0,y:0}
  }
  render() {return (<div id={this.id}></div>);}
  componentDidMount() {}
  update = (op) => {for (let key in op) {if (this.hasOwnProperty(key)){this[key]= op[key];}}};
}

export class Cir extends Body {
  constructor(props){
    super(props)
    this.DataHolder=new Data({x:props.x,y:props.y,id:this.id})
    Object.defineProperty(this,"data",{
      get(){return this.DataHolder},
      set(num){ 
        this.DataHolder=num;
        this.DataHolder.cons.push(this)
      }
    })
  Object.defineProperty(this,"y",{
    get(){return this.data.y},
    set(num){ this.data.y=num;}
  })
  Object.defineProperty(this,"x",{
    get(){return this.data.x},
    set(num){ this.data.x=num;}
  })
  Object.defineProperty(this,"transSpeed",{
    set(num){document.getElementById("all").style.setProperty(`--${this.data.id}-transSpeed`,`${num}s linear`)
  }})
}
componentDidMount() {
  queue.setElements(this)
  // queue.draw(this,0,"white")
  this.elem.me=this
  Object.defineProperty(this,"data",{
    get(){return this.DataHolder},
    set(num){ 
      this.DataHolder=num;
      this.DataHolder.cons.push(this)
      this.elem.style.cy=`calc(${this.DataHolder.cy}*1px)`
      this.elem.style.cx=`calc(${this.DataHolder.cx}*1px)`
      this.elem.style.transition=`var(--${this.DataHolder.id}-transSpeed)`
    }
  })
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
    this.DataHolder={data:null,data2:null}
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
      document.getElementById("all").style.setProperty(`--${this.id}-deg`,`rotate(${angle}deg)`)
    }
    Object.defineProperty(this,"data",{
      get(){return this.DataHolder.data},
      set(num){ 
        if(this.DataHolder.data!=null){
        this.DataHolder.data.removeListener(this.id)
        }
        this.DataHolder.data=num;
        this.DataHolder.data.registerListener(this.valueChange) 
        if(this.elem!=undefined){
        this.elem.style.top=`calc(${this.DataHolder.data.cy}*1px)`
        this.elem.style.left=`calc(${this.DataHolder.data.cx}*1px)`
        this.elem.style.transition=`calc(var(--${this.DataHolder.data2.id}-transSpeed)*var(--${this.DataHolder.data.id}-transSpeed)/var(--${this.DataHolder.data2.id}-transSpeed))`
        }
      }
    })
    Object.defineProperty(this,"data2",{
      get(){return this.DataHolder.data2},
      set(num){ 
        if(this.DataHolder.data2!=null){
        this.DataHolder.data2.removeListener(this.id)
        }
        this.DataHolder.data2=num;
        this.DataHolder.data2.registerListener(this.valueChange)
        if(this.elem!=undefined){
        this.elem.style.transition=`calc(var(--${this.DataHolder.data2.id}-transSpeed)*var(--${this.DataHolder.data.id}-transSpeed)/var(--${this.DataHolder.data2.id}-transSpeed))`
        }
        }
    })
    if(typeof props.x=="number"&&typeof props.y=="number"){
      this.point1=new Point({x:props.x,y:props.y,id:`${this.id}P1`})
      this.data=this.point1.data
    }else{
    this.point1=new Point({x:0,y:0,id:`${this.id}P1`})
    
  if(props.P1!=undefined){
    if(props.P1.constructor.name=="Point"){
      this.data=props.P1.data
    }
    else if(typeof props.P1=="string"){
      this.data=document.getElementById(`${props.P1}`).me.data
    }
    else{
      console.log(props.P1.constructor.name)
      console.log(props.P1)
      throw("sold not happen")
    }
  }
}
  this.point1.data=this.data
  this.point1.parent=this
  this.data.cons.push(this)
  Object.defineProperty(this,"y1",{
    get(){return parseInt(this.data.y)},
    set(num){ this.data.y=num;}
  })
  Object.defineProperty(this,"x1",{
    get(){return parseInt(this.data.x)},
    set(num){ this.data.x=num;}
  })
  if(typeof props.x=="number"&&typeof props.y=="number"){
    this.point2=new Point({x:exactMath.formula(`${this.x1}+${Math.sin(toRadians(this.angle))}*${this.F}`),y:exactMath.formula(`${this.y1}-${Math.cos(toRadians(this.angle))}*${this.F}`),id:`${this.id}P2`})
  }else{
  this.point2=new Point({x:0,y:0,id:`${this.id}P2`})
  if(props.P2!=undefined){
    if(props.P2.constructor.name=="Point"){
      this.data2=props.P2.data
    }
    else if(typeof props.P2=="string"){
      this.data2=document.getElementById(`${props.P2}`).me.data
    }
    else{
      console.log(props.P2.constructor.name)
      console.log(props.P2)
      throw("sold not happen")
    }
  }
}

  this.point2.data=this.data2
  this.point2.parent=this
  this.data2.cons.push(this)
  Object.defineProperty(this,"y2",{
    get(){return parseInt(this.data2.y)},
    set(num){ this.data2.y=num;}
  })
  Object.defineProperty(this,"x2",{
    get(){return parseInt(this.data2.x)},
    set(num){ this.data2.x=num;}
  })
//   this.valueChange=()=>{
//     let xLength=exactMath.formula(`(${this.x1}-${this.x2})`)
//     let yLength=exactMath.formula(`(${this.y1}-${this.y2})`)
//     let length=Math.sqrt(Math.pow(Math.abs(xLength),2)+Math.pow(Math.abs(yLength),2))
//     document.getElementById("all").style.setProperty(`--${this.id}-length`,`${length}`)
// let angle
//     if(xLength<0&&yLength<0){
//       angle=Math.asin(exactMath.formula(`${xLength}/${length}`))* (180 / Math.PI)+90
//     }
//     else if(xLength<0&&yLength>0){
//     angle=-(Math.asin(exactMath.formula(`${xLength}/${length}`))* (180 / Math.PI)+90)
//     }
//     else if(xLength>0&&yLength>0){
//       angle=Math.acos(exactMath.formula(`${xLength}/${length}`))* (180 / Math.PI)+180
//     }
//     else if(xLength>0&&yLength<0){
//       angle=Math.asin(exactMath.formula(`${xLength}/${length}`))* (180 / Math.PI)+90
//     }
//     if(xLength==0||yLength==0){
//       angle=0
//       if(xLength<0){
//         angle=0
//       }
//       if(xLength>0){
//         angle=180
//       }
//       if(yLength<0){
//         angle=90
//       }
//       if(yLength>0){
//         angle=270
//       }
//     }
//     document.getElementById("all").style.setProperty(`--${this.id}-deg`,`rotate(${angle}deg)`)
//   }
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
        style={top:` calc(${this.data.cy}*1px);`,left:` calc(${this.data.cx}*1px);`,width:` calc(var(--${this.id}-length)*1px);`,position:` absolute`,height:` 2px`,zIndex:` 99`,transformOrigin:` left`,transform:` var(--${this.id}-deg)`, backgroundOolor:`green`,transition:`calc(var(--${this.data2.id}-transSpeed)*var(--${this.data.id}-transSpeed)/var(--${this.data2.id}-transSpeed))`}
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
        style=`top: calc(${this.data.cy}*1px);left: calc(${this.data.cx}*1px);width: calc(var(--${this.id}-length)*1px);position: absolute;height: 2px;z-index: 99;transform-origin: left;transform: var(--${this.id}-deg); background-color:green; transition:calc(var(--${this.data2.id}-transSpeed)*var(--${this.data.id}-transSpeed)/var(--${this.data2.id}-transSpeed));`
        this.point1.renderType="append"
        this.point2.renderType="append"
        this.point1.render()
        this.point2.render()
        this.point1.componentDidMount()
        this.point2.componentDidMount()
      
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
    this.port.parent=this
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
    this.dragQueue=true
    document.addEventListener("mouseup",this.mouseUp)
    this.elem.addEventListener("mousedown",this.mouseDown)
  }
  update=(op)=>{
    for (let key in op) {
      if (this.hasOwnProperty(key)){
         this[key] = op[key];
      }
    }
  }
  mouseDown = (ev,ui) => {
    document.addEventListener("mousemove",this.drag)
    this.dragging=true
    this.mouse={x:this.x-ev.clientX,y:this.y-ev.clientY}
    this.transSpeed = 0;
  }
  mouseUp=(ev,ui)=>{
    document.removeEventListener("mousemove",this.drag)
    this.dragging=false
    this.dragQueue=1
    this.transSpeed = 0.5;
  }
  drag=(ev,ui)=>{
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
    // this.forces[0].render()
    console.log("render")
    return([
        <circle id={this.id} cx={this.x} cy={this.y} r={this.radius} stroke={this.color} strokeWidth={0} fill={this.color} style={{cx:`${this.data.cx}`,cy:`${this.data.cy}`,transition:`var(--${this.data.id}-transSpeed)`}} />
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
    // this.x=this.x
    // this.y=this.y
  }
  componentDidMount() {
    queue.setElements(this)
    // queue.draw(this,0,"white")
    this.elem.me=this
    
    this.dragQueue=true
    $(`#${this.id}`).draggable({
      grid: [200, 200],
      drag: this.drag,
      start:this.mouseDown,
      stop:this.mouseUp
    });
  }

  mouseDown = (ev,ui) => {
    this.data.seperateLine(this,this.parent)
    console.log(this)
    this.dragging=true
    this.mouse={x:this.x-ev.clientX,y:this.y-ev.clientY}
    this.transSpeed = 0;
  }
  mouseUp=(ev,ui)=>{
    this.dragging=false
    this.transSpeed = 0.5;
  }
  drag=(ev,ui)=>{
    if(this.dragQueue){
      this.x=ev.clientX+this.mouse.x
      this.y=ev.clientY+this.mouse.y
      this.dragQueue=false
      setTimeout(()=>{this.dragQueue=true},30)
    }

  }
  render(){
    if(this.renderType=="append"){
      let elem=document.createElementNS("http://www.w3.org/2000/svg","circle")
      elem.id=this.id
      elem.setAttribute("cx",this.x)
      elem.setAttribute("cy",this.y)
      elem.setAttribute("r",10)
      elem.setAttribute("stroke","white")
      elem.setAttribute("stroke-width",0)
      elem.setAttribute("fill","white")
      elem.style=`cx:${this.data.cx}; cy:${this.data.cy};transition:var(--${this.data.id}-transSpeed);`
      document.getElementById("Svg").append(elem)
    }
    else{
    return(<circle id={this.id} cx={this.x} cy={this.y} r={10} stroke={"white"} strokeWidth={0} fill={"white"} style={{cx:`${this.data.cx}`,cy:`${this.data.cy}`,transition:`var(--${this.data.id}-transSpeed)`}} />)
    }
  }
}
export class Force extends Line {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    if(this.later!=undefined){
      console.log("re rendering")
      let postline=new Force(this.later)
      postline.render()
      postline.componentDidMount()
    }
    else{
    queue.setElements(this)
    this.elem.me=this
    }
  }
  render(){
    let el=document.createElement('img');
    el.src="./F.png"
    el.id=this.id
    el.className="line"
    // el.style=`top: calc(${this.value.cy}*1px);left: calc(${this.value.cx}*1px);width: 100px;position: absolute;height: 20px;z-index: 99;transform-origin: left;transform: rotate(90deg);mix-blend-mode: multiply;`
    // document.getElementById("Lines").append(el)
    let style
    if(this.renderType=="react"){
      if(this.later!=undefined){
        style={position:" absolute",height:" 20px",zIndex:" 99",transformOrigin:" left",mixBlendMode: "multiply"}
      }
      else{
        style={top:` calc(${this.data.cy}*1px);`,left:` calc(${this.data.cx}*1px);`,width:` calc(var(--${this.id}-length)*1px);`,position:` absolute`,height:` 20px`,zIndex:` 99`,transformOrigin:` left`,transform:` var(--${this.id}-deg)`, mixBlendMode: "multiply"}
      }
      return(
        <div id={this.id+"delete"} className={"line"} style={style}/>
      )
    }
    else{
      console.log("normal render")
      if(this.later!=undefined){
        style=`position: absolute;height: 20px;z-index: 99;transform-origin: left;mix-blend-mode: multiply;`
        el.id="delete"
      }
      else{
        style=`top: calc(${this.data.cy}*1px);left: calc(${this.data.cx}*1px);width: calc(var(--${this.id}-length)*1px);position: absolute;height: 20px;z-index: 99;transform-origin: left;transform: var(--${this.id}-deg); mix-blend-mode: multiply;`
      }
      el.style=style
      document.getElementById("Lines").append(el)
    }
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

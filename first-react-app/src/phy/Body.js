
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {queue,timeComponent,c1,animation} from "../objects/queue.js";
import {toDegrees,toRadians,log,cpuAverage} from '../functions.js'
import $ from  "jquery";
import "jquery-ui/ui/effects/effect-slide";
import "jquery-ui/ui/widgets/draggable";
// import "./jquery-ui-1.12.1/jquery-ui.js";
export class Console extends Component {
  constructor(props) {
      super(props)
      this.id=props.id
      this.side=props.side
      this.width=props.width
      this.height=props.height
      this.children=props.children
      this.dataSource=props.dataSource
      this.values=props.values
      this.parent=props.parent
      if(props.text==undefined){
        this.text=this.id
      }
      else{
        this.text=props.text
      }
      if(props.left!=undefined){
        if(typeof props.left=="string"){
          this.left=props.left
        }
        else{
          this.left=`${props.left}px`
        }
      }
      if(props.top!=undefined){
        if(typeof props.top=="string"){
          this.top=props.top
        }
        else{
          this.top=`${props.top}px`
        }
      }
      else if(this.parent!=undefined){
        this.left=this.parent.x+"px"
        this.top=this.parent.y+"px"
      }
  }
  componentDidMount(){
    this.element=document.getElementById(this.id)
    $(`#${this.id}`).resizable();
      $(`#${this.id}`).draggable({
snap: `snapTo:not(#${this.id}):not(#${this.id}>snapTo)`,
snapTolerance: 10
});

if(this.dataSource!=undefined&&this.dataSource.id!=undefined){
  this.data=document.getElementById(this.dataSource.id).me.data
  console.log(this.data)
}

  }
  render() {
          let element = <div
          id={this.id}
          className={"dataPoints"}
          name={"drag"}
          title={"item"}
          style={{left: this.left, top: this.top, zIndex: `201`, width: this.width, height: this.height}}
          key={this.id}
        >
            {this.text}
          <Value name="x" value="1"/>
          <Value name="y" value="2"/>
          <Value name="id" value="2"/>
      </div>
           return (element)  
}
  create(){
      let el=document.createElement("div")
      el.id=this.id
      el.className="dataPoints"
      el.name="drag"
      el.title="item"
      console.log(this.left)
      el.style=`left: ${this.left}; top: ${this.top}; z-index: 201; width: 15%; height: ${this.height}; overflow:hidden;`
      el.append(this.text)
      for (let key in this.values) {
        let child=new Value({id:this.id+key,name:key,value:this.values[key],dataSource:this.dataSource})
        el.append(child.create())
        this.parent.registerListener(()=>child.update())
        // let val=document.getElementById(this.id+key)
      }
      console.log(this.values)
      document.getElementById("sliders").append(el)
      this.componentDidMount()
  }
}

export class Value extends Component {
  constructor(props) {
      super(props)
      this.id=props.id
      this.dataSource=props.dataSource
      this.name=props.name
      this.value=props.value
  }
  render() {
           return (
          <p>
              {this.name}:<input className={"dataInput"} style={{width:" 54px",fontSide:"25px"}} defaultValue={this.value}/>
          </p>)  
}
create(){
          let el=document.createElement("input")
          el.id=this.id
          el.className="dataInput"
          el.style=`fontSide:25px;`
          if(typeof this.value=="object"){
            el.defaultValue=this.value[this.name]
          }
          else{
            el.defaultValue=this.value
          }
          let p=document.createElement("p")
          p.style="      height: max-content;"
          p.append(this.name)
          p.append(el)
          return p
}
update(value){
  this.elem=document.getElementById(this.id)
  if(value!=undefined){
    this.elem.value=value
  }
  else{
    this.elem.value=this.value[this.name]
  }
}
}


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
    this.Listeners=this.Listeners.filter((value)=>value.id!=id)
  }
  removeCon(id){
    this.cons=this.cons.filter((value)=>value.id!=id)
  }
  seperateLine(t,tP){
    let newData=new Data({x:t.x,y:t.y,id:t.id})
    t.data=newData;
    // t.elem.style.cx=newData.cx
    // t.elem.style.cy=newData.cy
    // t.elem.style.transition=`var(--${t.data.id}-transSpeed)`
    console.log(t)
    console.log(tP)
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
    this.svg=props.svg?props.svg:null;
    this.renderType=props.renderType?props.renderType:"normal"
    this.dragging=false
    this.mouse={x:0,y:0}
    this.Listeners=[]
  }
  render() {return (<div id={this.id}></div>);}
  componentDidMount() {}
  
  registerListener(listener) {
    this.Listeners.push(listener)
  }
  event(){
    this.Listeners.forEach(Fun => {
        Fun.call()
      });
  }
  removeListener(id){
    this.Listeners=this.Listeners.filter((value)=>value.id!=id)
  }
  update = (op) => {for (let key in op) {if (this.hasOwnProperty(key)){this[key]= op[key];}}};
}
export class Cir extends Body {
  constructor(props){
    super(props)
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
    // Object.defineProperty(this,"data",{
    //   get(){return this.DataHolder.data},
    //   set(num){ 
        
    //     this.DataHolder.data=num;
    //     this.DataHolder.data.registerListener(this.valueChange) 
        
    //   }
    // })
  Object.defineProperty(this,"y",{
    get(){return this.data.y},
    set(num){ this.data.y=num;}
  })
  Object.defineProperty(this,"x",{
    get(){return this.data.x},
    set(num){ this.data.x=num;}
  })
  // Object.defineProperty(this,"transSpeed",{
  //   get(){return document.getElementById("all").style.getPropertyValue(`--${this.DataHolder.id}-transSpeed`)},
  //   set(num){document.getElementById("all").style.setProperty(`--${this.DataHolder.id}-transSpeed`,`${num}s linear`)
  // }})
}
componentDidMount() {
  this.elem = document.getElementById(`${this.id}`);
  // queue.draw(this,0,"white")
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
toConsole(){
  this.console=new Console({id:this.id+"console",text:this.id+" data",values:{x:this,y:this,id:this},parent:this,left:parseInt(this.x)+50,top:parseInt(this.y)+50})
  this.console.create()
  // this.data.registerListener(()=>{})
}
render(){
  return(<circle id={this.id} cx={this.x} cy={this.y} r={10} stroke={"white"} strokeWidth={0} fill={"white"} style={{cx:`${this.data.cx}`,cy:`${this.data.cy}`}} />)
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
      Object.defineProperty(this,"y1",{
        get(){return parseInt(this.data.y)},
        set(num){ this.data.y=num;}
      })
      Object.defineProperty(this,"x1",{
        get(){return parseInt(this.data.x)},
        set(num){ this.data.x=num;}
      })
      Object.defineProperty(this,"y2",{
        get(){return parseInt(this.data2.y)},
        set(num){ this.data2.y=num;}
      })
      Object.defineProperty(this,"x2",{
        get(){return parseInt(this.data2.x)},
        set(num){ this.data2.x=num;}
      })
    Object.defineProperty(this,"path",{
      get(){return `var(--${this.id}-path)`},
      set(num){ document.getElementById("all").style.setProperty(`--${this.id}-path`,`${num}`)}
    })

    if(props.after!=undefined&&props.after==true){
      this.later=props
      this.F=props.F
    this.angle=props.angle
    }
    else{
    

    
    if(typeof props.x=="number"&&typeof props.y=="number"){
      this.point1.x=props.x
      this.point1.y=props.y
      this.data=this.point1.data
    }else if(props.P1!=undefined){
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
  this.point1.data=this.data

  if(typeof props.x=="number"&&typeof props.y=="number"){
    this.point2.x=exactMath.formula(`${this.x1}+${Math.sin(toRadians(this.angle))}*${this.F}`)
    this.point2.y=exactMath.formula(`${this.y1}-${Math.cos(toRadians(this.angle))}*${this.F}`)
     this.data2=this.point2.data
  }else if(props.P2!=undefined){
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
  this.point2.data=this.data2


}
  }
  
  componentDidMount(){
    this.point1.componentDidMount()
    this.point2.componentDidMount()
    if(this.later!=undefined&&this.later.after==true){
      if(typeof this.later.P1=="string"&&typeof this.later.P2=="string"){
        this.data=document.getElementById(`${this.later.P1}`).me.data
        this.data2=document.getElementById(`${this.later.P2}`).me.data
        this.point1.data=this.data
        this.point2.data=this.data2
      }
      else{
        console.log(this.later.P1.constructor.name)
        console.log(this.later.P1)
        throw("sold not happen")
      }
    }
    this.valueChange()
    this.elem = document.getElementById(`${this.id}`);
    this.elem.me=this
    this.elem.addEventListener("mousedown",this.mouseDown)
  }
  mouseDown = (ev,ui) => {
    console.log(this.id)
    document.getElementById("Svg").appendChild(this.point1.elem)
    document.getElementById("Svg").appendChild(this.point2.elem)
  }
  render(){
    // let el=document.createElement('div');
    // el.id=this.id
    // el.className="line"
    // let style
    // if(this.renderType=="react"){
    //   if(this.later!=undefined){
    //     style={position:" absolute",height:" 2px",zIndex:" 99",transformOrigin:" left",backgroundColor:"green"}
    //   }
    //   else{
    //     style={top:` calc(${this.data.cy}*1px);`,left:` calc(${this.data.cx}*1px);`,width:` calc(var(--${this.id}-length)*1px);`,position:` absolute`,height:` 2px`,zIndex:` 99`,transformOrigin:` left`,transform:` var(--${this.id}-deg)`, backgroundOolor:`green`}
    //   }
    //   return(
    //     <div id={this.id+"delete"} className={"line"} style={style}/>
    //   )
    // }
    // else{
    //   console.log("normal render")
    //   if(this.later!=undefined){
    //     style=`position: absolute;height: 2px;z-index: 99;transform-origin: left;background-color:green;`
    //     el.id="delete"
    //     el.style=style
    //   document.getElementById("Lines").append(el)
    //   }
      // else{
        let p1=this.point1.render()
        let p2=this.point2.render()
      return ([<path id={this.id} d={`M 0 0 L 0 0`} stroke={"white"} strokeWidth={5} fill={"white"} className={"line"} style={{d:`${this.path}`}} key={this.id}/>,p1,p2])
    //   }
      
    // }
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
    this.elem = document.getElementById(`${this.id}`);
    // queue.draw(this,0,"blue")
    this.elem.me=this
    this.port.componentDidMount()
    // this.forces[0].componentDidMount()
    this.dragQueue=true
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
    // this.forces[0].render()
    console.log("render")
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
    // this.x=this.x
    // this.y=this.y
  }
  componentDidMount() {
    this.elem = document.getElementById(`${this.id}`);
    // queue.draw(this,0,"white")
    this.elem.me=this
    
    this.dragQueue=0
    this.elem.addEventListener("mousedown",this.mouseDown)
  }

  mouseDown = (ev,ui) => {
    document.addEventListener("mousemove",this.drag)
    document.addEventListener("mouseup",this.mouseUp)
    this.data.seperateLine(this,this.parent)
    this.dragging=true
    this.mouse={x:this.x-ev.clientX,y:this.y-ev.clientY}
    this.dragQueue++
    // this.transSpeed = 0;
  }
  mouseUp=(ev,ui)=>{
    document.removeEventListener("mousemove",this.drag)
    document.removeEventListener("mouseup",this.mouseUp)
    this.dragging=false
    let points=$(".point")
    for(let i=0;i<points.length;i++){
      if(50>this.getDistancePtoP(this,points[i].me)){
        if(this.parent.constructor.name=="Line"){
        this.data=points[i].me.data
        }
        else{
          this.data.x=points[i].me.data.x
          this.data.y=points[i].me.data.y
          points[i].me.data=this.data
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
    let points=$(".point")
    for(let i=0;i<points.length;i++){
      if(50>this.getDistancePtoP(this,points[i].me)){
        points[i].style.fill="green"
      }
      else{
        points[i].style.fill="white"
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
  }
  componentDidMount(){
    if(this.later!=undefined){
      console.log("re rendering")
      let postline=new Force(this.later)
      postline.render()
      postline.componentDidMount()
    }
    else{
      this.elem = document.getElementById(`${this.id}`);
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

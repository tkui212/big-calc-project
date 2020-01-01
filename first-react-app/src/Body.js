
import React, { Component } from "react";
import {queue,timeComponent,c1,animation} from "./objects/queue.js";
import "./home_page.css";
import ReactDOM from 'react-dom';
import {toDegrees,toRadians,log} from './functions.js';

export class Body extends Component {
  constructor(props){
    super(props)
    this.id=props.ops.id
    this.value={x:props.x,y:props.y,id:this.id,cx:`var(--${this.id}-x)`,cy:`var(--${this.id}-y)`}
    this.color = props.ops.color?props.ops.color:"black";
    this.forces=props.ops.Fs?props.ops.Fs:[];
    this.cons=props.ops.cons?props.ops.cons:[];
    this.children=[]
    if(props.ops.parent!=undefined){
      this.parent=props.ops.parent
    }
    else{
      this.parent=null;
    }
    // this.parent=props.ops.parent?props.ops.parent:null;
    this.svg=props.ops.svg?props.ops.svg:null;
  }
  render() {
    return (
      <div></div>
    );
  }
  componentDidMount() {
  }
  update = (op) => {
    for (let key in op) {
      if (this.hasOwnProperty(key)){
         this[key] = op[key];
      }
    }

  };
}
export class Cir extends Body {
  constructor(props){
    super(props)
  Object.defineProperty(this,"y",{
    get(){return this.value.y},
    set(num){ this.value.y=num;
      document.getElementById("all").style.setProperty(`--${this.value.id}-y`,`${num}`)
    }
  })
  Object.defineProperty(this,"x",{
    get(){return this.value.x},
    set(num){ this.value.x=num;
      document.getElementById("all").style.setProperty(`--${this.value.id}-x`,`${num}`)
      console.log(this)
    }
  })
}
}

export class Line extends Body{
  constructor(props){
    super(props)
    let ops=props.ops
    this.F=ops.F
    this.angle=ops.angle
  if(props.P!=undefined){
    this.point1=props.P
  }
  else{
  this.point1=new Point({x:props.x,y:props.y,ops:{id:`${this.id}P1`}})
  }
  this.value=this.point1.value
  Object.defineProperty(this,"y",{
    get(){return this.value.y},
    set(num){ this.value.y=num;
      document.getElementById("all").style.setProperty(`--${this.value.id}-y`,`${num}`)

    }
  })
  Object.defineProperty(this,"x",{
    get(){return this.value.x},
    set(num){ this.value.x=num;
      document.getElementById("all").style.setProperty(`--${this.value.id}-x`,`${num}`)

      console.log(this)
    }
  })
  this.point2=new Point({x:exactMath.formula(`${this.x}+${Math.sin(toRadians(this.angle))}*${this.F}`),y:exactMath.formula(`${this.y}-${Math.cos(toRadians(this.angle))}*${this.F}`),ops:{id:`${this.id}P2`}})
  this.value2=this.point2.value
  Object.defineProperty(this,"y2",{
    get(){return this.value2.y},
    set(num){ this.value2.y=num;
      document.getElementById("all").style.setProperty(`--${this.value2.id}-y`,`${num}`)

    }
  })
  Object.defineProperty(this,"x2",{
    get(){return this.value2.x},
    set(num){ this.value2.x=num;
      document.getElementById("all").style.setProperty(`--${this.value2.id}-x`,`${num}`)

      console.log(this)
    }
  })
  }
}
export class Circle extends Cir {
  /**
     * @param x x position
     * @param y y position
     * @param radius the radius
     * @param {object} ops settings
     * @param {string} ops.id 
     * @param {number} ops.radius
     * @param {number} ops.vx
     * @param {number} ops.vy
     */
  constructor(props){
    super(props)
    let ops=props.ops
    this.width = ops.width?ops.width:100;
    this.height = ops.height?ops.height:100;
    this.radius = props.radius;
    this.port=new Point({x:this.x,y:this.y,ops:{id:`${this.id}P`,parent:this}});
    this.value=this.port.value
    this.vx=ops.vx?ops.vx:0;
    this.vy=ops.vy?ops.vy:0;
    this.forces.push(new Force({x:this.x,y:this.y,ops:{id:`${this.id}F`,F:100,angle:180,P:this.port, parent:this}}));
    // this.port.value=this.value
    this.forces[0].value=this.value
  }
  componentDidMount() {
    queue.setElements(this)
    // queue.draw(this,0,"blue")
    this.elem.me=this
    this.port.componentDidMount()
    this.forces[0].componentDidMount()
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
    this.forces[0].render()
    return([<circle id={this.id} cx={this.x} cy={this.y} r={this.radius} stroke={this.color} strokeWidth={0} fill={this.color} style={{cx:`${this.value.cx}`,cy:`${this.value.cy}`}} />,meP])
  }

}
export class Point extends Cir{
  /**
     * @param {number} x x position
     * @param {number} y y position
     * @param {object} ops settings
     * @param {string} ops.id - that can contain:
     * @param {Force[]} ops.Fs array of forces that go throw the Point
     * @param {body[]} ops.cons array of bodys that are connectedto the Point
     */
  constructor(props){
    super(props)
    this.x=this.x
    this.y=this.y
  }
  componentDidMount() {
    queue.setElements(this)
    // queue.draw(this,0,"white")
    this.elem.me=this
    console.log(this)
  }
  render(){
    return(<circle id={this.id} cx={this.x} cy={this.y} r={10} stroke={"white"} strokeWidth={0} fill={"white"} style={{cx:`${this.value.cx}`,cy:`${this.value.cy}`}} />)
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
    this.x=this.x
    this.y=this.y
    this.x2=this.x2
    this.y2=this.y2
  }
  render(){
    let el=document.createElement('img');
    el.src="./F.png"
    el.id=this.id
    el.style=`top: calc(${this.value.cy}*1px);left: calc(${this.value.cx}*1px);width: 100px;position: absolute;height: 20px;z-index: 99;transform-origin: left;transform: rotate(90deg);mix-blend-mode: multiply;`
    document.getElementById("Lines").append(el)
    // throw("a")
  }
  // this.meElement = document.getElementById("1");
  // this.meText = document.getElementById("1text");
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
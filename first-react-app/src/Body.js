
import React, { Component } from "react";
import {queue,timeComponent,c1,animation} from "./objects/queue.js";
import "./home_page.css";
import ReactDOM from 'react-dom';

export class Body extends Component {
  constructor(props){
    console.log(props)
    super(props)
    this.x=props.x
    this.y=props.y
    this.color = props.ops.color?props.ops.color:"black";
    this.id=props.ops.id
    this.forces=props.ops.Fs?props.ops.Fs:[];
    this.connections=props.ops.cons?props.ops.cons:[];
    this.parent=props.ops.parent?props.ops.parent:null;
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
export class Circle extends Body {
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
    this.vx=ops.vx?ops.vx:0;
    this.vy=ops.vy?ops.vy:0;
    // this.forces.push(new Force(this.x,this.y,{F:this.weight,angle:180}));
  //   createCircle(this.x,this.y,this.weight,this.height,svg,{id:this.id})
  //   createText(this.x,this.y,this.svg,this.radius*2,{color:"white",id:this.id})
  //   setTimeout(()=>{
  //   this.meElement = document.getElementById(`${this.id}`);
  //   this.meText = document.getElementById(`${this.id}text`);
  //   this.meElement[`class`]=this
    
  //   // Draggable.create(`${this.id}`
  //   // , {
  //   //   type:"x,y",
  //   //   overshootTolerance:0,
  //   //   inertia:true
  //   // })
  //   console.log(this)
  // },100)
  }
  componentDidMount() {
    console.log(this)
    queue.draw(this,0,"blue")
  }
  update=(op)=>{
    for (let key in op) {
      if (this.hasOwnProperty(key)){
         this[key] = op[key];
      }
    }
    this.gridX=[this.y-this.height/2,this.y,this.y+this.height/2]
    this.gridY=[this.x-this.width/2,this.x,this.x+this.width/2]  
    this.ports=new Array(3);
  for(let i=0;i<3;i++){
    this.ports[i]=new Array(3)
    for(let j=0;j<3;j++){
        this.ports[i][j]=new Point(this.gridY[i],this.gridX[j],{id:`[${i}][${j}]`,cons:[this],parent:this})
        this.ports[i][j].draw()
    }
  }
  this.forces=[]
  this.meElement=undefined
  }
  render(){
    let meP=this.port.render()
    return([<circle id={this.id} cx={this.x} cy={this.y} r={this.radius} stroke={this.color} strokeWidth={0} fill={this.color} />,meP])
  }
  
}
export class Force extends Body {
  constructor(x,y,ops){
    super(x,y,ops)
    this.F=ops.F
    this.angle=ops.angle
    this.point1=new Point(this.x,this.y,{})
    this.point2=new Point(this.x+Math.sin(toRadians(this.angle))*this.F,this.y-Math.cos(toRadians(this.angle))*this.F,{})
    createArrow([this.point1.x,this.point2.x],[this.point1.y,this.point2.y],svg,{id:this.id})
    this.meElement=document.getElementById(`${this.id}`)
  }

  // this.meElement = document.getElementById("1");
  // this.meText = document.getElementById("1text");

  draw = () => {
  

  };
  update = () => {};
}
export class Point extends Body{
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
  }
  componentDidMount() {
    console.log(this)
    queue.draw(this,0,"white")
  }
  render(){
    return(<circle id={this.id} cx={this.x} cy={this.y} r={10} stroke={"white"} strokeWidth={0} fill={"white"} />)
  }
  update = () => {};
}
export class Line extends Component{
  constructor(p1,p2,ops){
  this.point1=p1
  this.point2=p2
  this.id=ops.id
  this.forces=ops.Fs?ops.Fs:[];
  this.connections=ops.cons?ops.cons:[];
  }
  update = () => {};
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
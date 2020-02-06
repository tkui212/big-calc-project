import {O,rO, cNum} from "../objects/obj"
import Forces from "../math/Force"
import {phyVar} from "../math/Math"
import React, { Component } from "react";



/**visual data */
export class ViD extends rO{
    constructor(props){
        super(props)
        /**position in the screen */
        this.screenPos={x,y}
        /**position inside of the parent */
        this.parentPos={x:props.x,y:props.y}
        /** */
        this.color="white"
        /** */
        this.elem
        let all=document.getElementById("all")
        all.style.setProperty(`--${this.id}-x`,`${props.x}`)
        all.style.setProperty(`--${this.id}-y`,`${props.y}`)
        Object.defineProperty(this,"x",{
          get(){return all.style.getPropertyValue(`--${this.id}-x`)},
          set(num){all.style.setProperty(`--${this.id}-x`,`${num}`)
          this.event()
        },
        enumerable:true
        })
        Object.defineProperty(this,"y",{
          get(){return all.style.getPropertyValue(`--${this.id}-y`)},
          set(num){all.style.setProperty(`--${this.id}-y`,`${num}`)
          this.event()
        },
        enumerable:true
        })
        this.cx=`var(--${this.id}-x)`
        this.cy=`var(--${this.id}-y)`
        }
    render(){}
}

/**physic data */
class PBody extends O{
    constructor(props){
        super(props)
        this.add
      //forces
      this.forces=new Forces()
      //mass
      this.m=new phyVar("m",1)
    }
    updateForces=()=>{}
    init(){}
  }
  class D extends O{
      constructor(props){
          super(props)
          //id

      }
  }
/**basics for every body */
export class Body extends O{
    constructor(props){
        super(props)
        this.id=props.id
        this.pData=new PBody()
        this.vData=new ViD()
    }
    render(){

    }
}



/** visual circle */
export class VC extends ViD{
    constructor(props){
        super(props)
        this.radius
    }
    render(){
        return(
            <circle id={this.id} 
            cx={this.cx} 
            cy={this.cy} 
            r={this.radius} 
            stroke={this.color} 
            strokeWidth={0} 
            fill={this.color} 
            />)
    }
}
/** point data */
export class PD extends O{
    constructor(props){
        /**id */
        super(props)
        this.cons=[]
        this.pind=false
    }
    removeCon(id){
        this.cons=this.cons.filter((value)=>value.id!=id)
    }
}

class PhyD extends O{

}






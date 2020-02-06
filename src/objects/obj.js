import {data} from "../dataBase";
import React, { Component } from "react";
/**smart object that can have events and know where he is stored and manupolate his conteiner */
export class O{
    constructor(props){
        this.id=props.id
        this.props=props
        this.Listeners=[]
        this.Ochilds=[]
        this.ParentsO=[]
        this.unpdatindgsTimeOut=true
        data.add(this.id,this)
    }
    add(id,value){
        this[id]=value
        value.addParentO(this)
        this.addChildO(value)
    }
    remove(id){
        delete this[id]
    }
    addListener(l){
        this.Listeners.push(l)
    }
    removeListener(id){
        this.Listeners=this.Listeners.filter((value)=>value.id!=id)
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
    addChildO(){}
    removeChildO(){}
    addParentO(){}
    removeParentO(){}
    stringfy(){}
}
export class rO extends Component{
    constructor(props){
        super(props)
        this.id=props.id
        this.props=props
        this.Listeners=[]
        this.Ochilds=[]
        this.ParentsO=[]
        this.unpdatindgsTimeOut=true
        data.add(this.id,this)
    }
    add(id,value){
        this[id]=value
        value.addParentO(this)
        this.addChildO(value)
    }
    remove(id){
        delete this[id]
    }
    addListener(l){
        this.Listeners.push(l)
    }
    removeListener(id){
        this.Listeners=this.Listeners.filter((value)=>value.id!=id)
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
    addChildO(){}
    removeChildO(){}
    addParentO(){}
    removeParentO(){}
    stringfy(){}
}

export function cNum(This,id,Vname,value){
    let all=document.getElementById("all").style
    all.setProperty(`--${id}-${Vname}`,`${value}`)
    Object.defineProperty(This,Vname,{

        get(){return all.getPropertyValue(`--${id}-${Vname}`)},
        set(a){all.setProperty(`--${id}-${Vname}`,`${a}`)
        This.event()},
        enumerable:true
    })    
}
export function define(This,id,get,set){
        Object.defineProperty(This,id,{
        get:get,
        set:set,
        enumerable:true
    }) 
}

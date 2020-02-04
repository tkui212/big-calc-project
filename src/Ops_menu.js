import React, {Component} from 'react';
import {mouseElem,effShow,collapse,hideAll,showAll, runEffect} from './functions';
import $ from  "jquery";
import "jquery-ui/ui/effects/effect-slide";
export default class ContextMenu extends Component {
    constructor(props){
        super(props)
        this.id=props.id
    }
    opMenu(Mo){
        this.menu.style.left = Mo.clientX+"px";
        this.menu.style.top = Mo.clientY+"px";
        let allBo=$("#all")[0].getBoundingClientRect()
        let menuBo=this.menu.getBoundingClientRect()
        if(menuBo.top>allBo.height-220){
            this.menu.style.top=menuBo.top-220
        }
        if(menuBo.left>allBo.width-100){
            this.menu.style.left=menuBo.left-100
        }

        let elem=mouseElem(Mo)[0]
        this.menut.textContent = elem.id
        if(elem.ops!=undefined){
            let i=0
            for(let key in elem.ops){
                this.menuops[i].setButton(key,elem.ops[key])
                i++;
            }
        }
    else{
        this.menuops[0].setButton("cosnole this",()=>{console.dir(elem);})
        this.menuops[1].setButton("elems here",()=>console.log(document.elementsFromPoint(parseInt(window.mouseX), parseInt(window.mouseY))))
        this.menuops[2].setButton("ne",()=>{})
        this.menuops[3].setButton("ne",()=>{})
        this.menuops[4].setButton("hide all",()=>hideAll())
        this.menuops[5].setButton("show all",()=>showAll())
        console.error("defualt")
    }
}
    componentDidMount(){

        
this.menu = document.getElementById(this.id)
this.menu.me=this
this.menut = document.getElementById(this.id+"t")
this.menuops = document.getElementsByClassName("menuButton")

        window.oncontextmenu = (s)=>{
            document.getElementsByClassName("ContextMenu")[0].me.opMenu(s)
            return false
        }
          document.addEventListener("mouseup",(ev)=>{let menu=document.getElementsByClassName("ContextMenu")[0]
          menu.style.left = "-1000px";
          menu.style.top = "-1000px";})
    }
    render(){
        return(
        <div id={this.id}opacity={"0.5"}className={"ContextMenu"}style={{left: "-1000px", top: "-1000px", zIndex:900}}>
        <div id={this.id+"t"}>movecon</div>
        <MenuButton id={this.id+"but1"} className={"menuButton"} onclick={()=>console.log(document.elementsFromPoint(943, 229))} name={"cosnole this"}/>
        <MenuButton id={this.id+"but2"} className={"menuButton"} onclick={()=>collapse(document.elementsFromPoint(943, 229)[0])} name={"collapse"}/>
        <MenuButton id={this.id+"but3"} className={"menuButton"} onclick={()=>effShow(document.elementsFromPoint(943, 229)[0])} name={"show"}/>
        <MenuButton id={this.id+"but4"} className={"menuButton"} onclick={()=>console.log(document.elementsFromPoint(943, 229))} name={"elems here"}/>
        <MenuButton id={this.id+"but5"} className={"menuButton"} onclick={()=>console.log(document.elementsFromPoint(943, 229))} name={"collapse all"}/>
        <MenuButton id={this.id+"but6"} className={"menuButton"} onclick={()=>console.log(document.elementsFromPoint(943, 229))} name={"show all"}/>
        <MenuButton id={this.id+"but7"} className={"menuButton"} onclick={()=>console.log(document.elementsFromPoint(943, 229))} name={"manage"}/>
      </div>
        )
    }

}
class MenuButton extends Component {
    constructor(props){
        super(props)
    this.id=props.id
    this.className=props.className
    this.onclick=props.onclick
    this.name=props.name
    }
    componentDidMount(){
        this.element=document.getElementById(this.id)
        this.element.me=this
        this.element.setButton=(text,fun)=>{
            this.element.textContent=text
            this.onclick=fun
        }
    }
    render(){
        return(
        <p>
          <button id={this.id} className={this.className} onClick={(e)=>this.onclick(e)} key={this.id}>
            {this.name}
          </button>
        </p>
        )
    }

}
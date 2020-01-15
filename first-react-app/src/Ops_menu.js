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
        let elem=mouseElem(Mo)[0]
        console.log(elem.constructor.name)
        if(elem.constructor.name=="HTMLDivElement"&&elem.title=="item"){
           
        }
        else if(elem.constructor.name=="SVGCircleElement"){
        
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
        
        let id=elem.id
        this.menut.textContent = id
    
        this.menuops[0].textContent="cosnole this"
        // this.menuops[0].setAttribute("onclick",()=>console.log(id))
        this.menuops[0].me.onclick=()=>{console.log(id); elem.me.toConsole()}
        if(elem.getAttribute("title")=="control"){
            this.menuops[1].me.onclick=()=>runEffect(`#${id.slice(0,id.length-3)}`)
            this.menuops[2].textContent="show"
            this.menuops[2].me.onclick=()=>effShow(`#${id.slice(0,id.length-3)}`)
        }
        else{
            this.menuops[1].me.onclick=()=>{console.log(id); runEffect(`#${id}`)}
            this.menuops[2].textContent="no show for you"
            this.menuops[2].me.onclick=()=>console.log("i said no!")
        }
        this.menuops[3].textContent="elems here"
        this.menuops[3].me.onclick=()=>console.log(document.elementsFromPoint(parseInt(menuBo.left), parseInt(menuBo.top)))
        this.menuops[4].me.onclick=()=>hideAll()
        this.menuops[5].me.onclick=()=>showAll()
        return false
    }
    else if(elem.constructor.name=="HTMLDivElement"&&elem.class=="controller"){
        
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
        
        let id=elem.id
        this.menut.textContent = id
    
        this.menuops[0].textContent="cosnole this"
        // this.menuops[0].setAttribute("onclick",()=>console.log(id))
        this.menuops[0].me.onclick=()=>{console.log(id);}
        if(elem.getAttribute("title")=="control"){
            this.menuops[1].me.onclick=()=>runEffect(`#${id.slice(0,id.length-3)}`)
            this.menuops[2].textContent="show"
            this.menuops[2].me.onclick=()=>effShow(`#${id.slice(0,id.length-3)}`)
        }
        else{
            this.menuops[1].me.onclick=()=>{console.log(id); runEffect(`#${id}`)}
            this.menuops[2].textContent="no show for you"
            this.menuops[2].me.onclick=()=>console.log("i said no!")
        }
        this.menuops[3].textContent="elems here"
        this.menuops[3].me.onclick=()=>console.log(document.elementsFromPoint(parseInt(menuBo.left), parseInt(menuBo.top)))
        this.menuops[4].me.onclick=()=>hideAll()
        this.menuops[5].me.onclick=()=>showAll()
        return false
    }
    else{
        
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
        
        let id=elem.id
        this.menut.textContent = id
    
        this.menuops[0].textContent="cosnole this"
        // this.menuops[0].setAttribute("onclick",()=>console.log(id))
        this.menuops[0].me.onclick=()=>{console.log(id);}
        if(elem.getAttribute("title")=="control"){
            this.menuops[1].me.onclick=()=>runEffect(`#${id.slice(0,id.length-3)}`)
            this.menuops[2].textContent="show"
            this.menuops[2].me.onclick=()=>effShow(`#${id.slice(0,id.length-3)}`)
        }
        else{
            this.menuops[1].me.onclick=()=>{console.log(id); runEffect(`#${id}`)}
            this.menuops[2].textContent="no show for you"
            this.menuops[2].me.onclick=()=>console.log("i said no!")
        }
        this.menuops[3].textContent="elems here"
        this.menuops[3].me.onclick=()=>console.log(document.elementsFromPoint(parseInt(menuBo.left), parseInt(menuBo.top)))
        this.menuops[4].me.onclick=()=>hideAll()
        this.menuops[5].me.onclick=()=>showAll()
        return false
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
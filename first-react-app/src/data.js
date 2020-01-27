import React, { Component } from "react";
import {createElement,mouseElem,log} from './functions.js'
import $ from  "jquery";
import "jquery-ui/ui/effects/effect-slide";
import "jquery-ui/ui/widgets/draggable";
// import "./jquery-ui-1.12.1/jquery-ui.js";
var con = (child,parent) => {
  if(child.parentElement!=parent){
    console.log("con")

      let parBo=parent.getBoundingClientRect()
      let chiBo=child.getBoundingClientRect()
      child.style.left =chiBo.left - parBo.left+"px"
      child.style.top = chiBo.top - parBo.top-2+"px"
      parent.appendChild(child)
  }
}
var dis = (child) => {
  if(child.parentElement!=document.getElementById("sliders")){
    console.log("dis")

      let parBo=child.getBoundingClientRect()
      console.log(log(parBo))
      child.style.left =parBo.left+"px"
      child.style.top =parBo.top+"px"
      $("#sliders")[0].appendChild(child)
  }
}
export class Console extends Component {
  constructor(props) {
      super(props)
      this.id=props.id
      this.side=props.side
      this.children=[]
      this.dataSource=props.dataSource
      this.values=props.values
      this.width=props.width
      this.height=props.height
      if(this.width==undefined){
        this.width="auto"
      }
      if(this.height==undefined){
        this.height="auto"
      }
      
      this.parent=props.parent
      this.Vparent=props.Vparent
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
      else if(this.Vparent!=undefined){
        this.left=this.Vparent.x+"px"
        this.top=this.Vparent.y+"px"
      }
  }
  render() {this.onMountCreateMe=true;return (null)}
  componentDidMount(){
    console.log("comps start")
    for(let el of this.children){
      el.componentDidMount()
    }
    if(this.onMountCreateMe){
      console.log("comps bad")

      this.onMountCreateMe=false
      this.parent=this.parent()
      this.parent.toConsole(this)
    }
    else{
      console.log("comps good")
    this.element=document.getElementById(this.id)
    console.log($(`#${this.id}`))
    console.log($(`${this.id}`))
    console.log(this.element)
    console.log(this.id)
    $(`#${this.id}`).resizable();
      $(`#${this.id}`).draggable({
snap: `snapTo:not(#${this.id}):not(#${this.id}>snapTo)`,
snapTolerance: 10
}).click(function() {
  $(this).draggable({ disabled: false });
}).dblclick(function() {
  $(this).draggable({ disabled: true });
});;
    }
  }

  create(ops){
    let el=createElement("div",{id:this.id,className:"dataPoints",name:"drag",title:"item",style:`left: ${this.left}; top: ${this.top}; z-index: 201; width: ${this.width};height: ${this.height}; max-width:300px;overflow:scroll;`})
    this.element=el
      el.append(this.text)
if(this.values==undefined){
  for (let key in this.parent) {
    let child=new
    Value({id:this.id+key,name:key,value:this.parent[key],dataSource:this.dataSource})
    this.children.push(child) 
    el.append(child.create())
    this.parent.registerListener(()=>child.update())
    // let val=document.getElementById(this.id+key)
  }
}else{
      for (let key in this.values) {
        let child=new 
        Value({id:this.id+key,name:key,value:this.values[key],dataSource:this.dataSource})
        this.children.push(child) 
        el.append(child.create())
        this.parent.registerListener(()=>child.update())
        // let val=document.getElementById(this.id+key)
      }
    }

let ms=createElement("div",{id:this.id+"S",style:`z-index:202;height:auto;position:absolute;background-color:green;width:min-content;left:-100%;top:0px;text-align:center;`})
el.append(ms)
let buttons=[]
for(let i=0;i<5;i++){
  buttons[i]=createElement("button",{id:this.id+"SB"+i,style:`width:90%;height:auto;margin-bottom: 10%;`})
  buttons[i].func=function(){console.log(this.func)}
  buttons[i].addEventListener("click",buttons[i].func)
  ms.append(buttons[i])
  buttons[i]["setB"]=function(text,func){
    this.textContent=text
    this.removeEventListener("click",this.func)
    this.func=func
    this.addEventListener("click",this.func)
  }
}
buttons[0].setB("add",()=>{let key=null;let child=new Value({id:this.id+key,name:"null",value:this.dataSource});this.children.push(child);el.append(child.create());this.values["null"]=this.dataSource;this.parent.registerListener(()=>child.update());});
buttons[1].setB("update",()=>{for(let value of this.children){value.update()}})
  buttons[2].setB("console this",()=>{console.log(this)});
  buttons[3].setB("delete this",()=>{this.element.remove()});
  dis(ms)
document.addEventListener("mouseup",()=>{
    ms.style.visibility="hidden"
  });

el.addEventListener("mouseup",(e)=>{
if(e.button==2&&mouseElem(e)[0].constructor.name=="HTMLDivElement"){
    setTimeout(()=>{
      let bor=ms.getBoundingClientRect()
      let ber=el.getBoundingClientRect()
      console.log()
      ms.style.left=ber.left-bor.width+"px"
      ms.style.top=ber.top+"px"
      ms.style.visibility="visible"
      $(`#${ms.id}`).show(
      "slide", {direction: "right"},
      200
      );},1)
  }})
    if(ops=="return"){
      return el
    }
      document.getElementById("sliders").append(el)
      this.componentDidMount()
      console.log("comp")
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
  componentDidMount(){
    this.elem=document.getElementById(this.id)
  }
  render() {
           return (
          <p>
              {this.name}:<input className={"dataInput"} style={{width:" 54px",fontSide:"25px"}} defaultValue={this.value}/>
          </p>)  
}
create(){
  let p=createElement("p",{id:this.id,style:"height: max-content; left:10%;"})
  this.elem=p

  let sl =createElement("div",{id:this.id+"SS",className:"side",style:`z-index:201;height:20%;position:absolute;background-color:green;width:100%;right:100%;display:none;`})
  p.append(sl)

let value=createElement("span",{id:this.id+"value",textContent:"null",contenteditable:"true",style:"white-space: pre-line"})
let separetor=createElement("span",{id:this.id+"sper",textContent:": "})
this.valueElem=value
let key=createElement("span",{id:this.id+"key",textContent:this.name,contenteditable:"true"})
// text.textContent=
key.addEventListener("keyup",()=>{this.name=key.textContent; this.update()})
$(key).attr('contenteditable',"true")
$(value).attr('contenteditable',"true")
p.append(key)
p.append(separetor)
p.append(value)

  this.valueElem=value
  this.valueElem.addEventListener("keypress",(ev)=>{
    if(ev.key=="Enter"&&this.valueElem.value!=""&&typeof this.dataSource[this.name]!="object"){
      this.dataSource[this.name]=this.valueElem.value}})

let buttons=[]
for(let i=0;i<5;i++){
  buttons[i]=createElement("button",{id:this.id+"SB"+i,className:"side",style:`width:50px;height:90%;`})
  buttons[i].func=function(){console.log(this.func)}
  buttons[i].addEventListener("click",buttons[i].func)
  sl.append(buttons[i])
  buttons[i]["setB"]=function(text,func){
    this.textContent=text
    this.removeEventListener("click",this.func)
    this.func=func
    this.addEventListener("click",this.func)
  }
}
buttons[0].setB("delete",()=>{p.parentElement.removeChild(p)})
buttons[0].setB("console this",()=>{new Console({parent:this.dataSource[this.name],id:`${this.id}${this.name}n`,dataSource:this.dataSource}).create()})



document.addEventListener("mouseup",()=>{sl.style.display="none"});
  p.addEventListener("mouseup",(e)=>{
    if(e.button==2&&mouseElem(e)[0].constructor.name=="HTMLParagraphElement"){
      setTimeout(()=>{$(`#${sl.id}`).show("slide", {direction: "right"},200);},1)}
    else{sl.style.display="none"}})
  
  this.update()
  return p

}
update(value){
  console.log(this)
  if(value!=undefined){
    this.valueElem.textContent=value
  }
  else if(this.dataSource[this.name]==undefined){
    this.valueElem.textContent=stringfy(this.dataSource[this.name],300)
  }
  else{
    console.log(this.dataSource[this.name])
    this.valueElem.textContent=stringfy(this.dataSource[this.name],300)
  }
}

}
function stringfy(obj,max_width){
  let text=""
  if(typeof obj=="object"){
    text=simpleStringfy(obj)+"{"
    for (let key in obj) {
      console.log(key)
      let newText=""
        newText=`${key}: ${simpleStringfy(obj[key])}, `
        text=text+newText
      console.log(newText)
      if(newText!=undefined){
      console.log(newText.length)
    }
  }
  if(text!=undefined&&text.length>max_width/10){
    text=`${text.slice(0,25)}...`
  }
  return text+"}"
  }
  else{
    text=`${obj}`
  }

  return text
}
function simpleStringfy(obj){
  let text=""

    if (typeof obj=="object")
      {
        text=obj.constructor.name
      }
      else if(typeof obj=="function"){
        text="function"
      }
      else{
        text=obj
      }
  return text
}
function displayTextWidth(text, font) {
  var myCanvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement("canvas"));
  var context = myCanvas.getContext("2d");
  context.font = font;
  
  var metrics = context.measureText(text);
  return Number(metrics.width);
};
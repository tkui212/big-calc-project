import React, { Component } from "react";
import {toDegrees,toRadians,createElement,mouseElem} from './functions.js'
import $ from  "jquery";
import "jquery-ui/ui/effects/effect-slide";
import "jquery-ui/ui/widgets/draggable";
// import "./jquery-ui-1.12.1/jquery-ui.js";
var stringify = require("json-stringify-safe");

    function log(text) {
      return JSON.parse(stringify(text));
    }
export class Console extends Component {
  constructor(props) {
      super(props)
      this.id=props.id
      this.side=props.side
      this.width=props.width
      if(this.width==undefined){
        this.width="max-content"
      }
      this.height=props.height
      this.children=[]
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
  render() {this.onMountCreateMe=true;return (null)}
  componentDidMount(){
    for(let el of this.children){
      el.componentDidMount()
    }
    if(this.onMountCreateMe){
      this.onMountCreateMe=false
      this.parent=this.parent()
      this.parent.toConsole(this)
    }
    else{
    this.element=document.getElementById(this.id)
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
      let el=createElement("div",{id:this.id,className:"dataPoints",name:"drag",title:"item",
        style:`left: ${this.left}; top: ${this.top}; z-index: 201; width: auto; height: auto; max-width:300px;`})
      el.append(this.text)

      for (let key in this.values) {
        let child=new 
        Value({id:this.id+key,name:key,value:this.values[key],dataSource:this.dataSource})
        this.children.push(child) 
        el.append(child.create())
        this.parent.registerListener(()=>child.update())
        // let val=document.getElementById(this.id+key)
      }

let sl =createElement("div",{id:this.id+"SS",style:`z-index:201;height:10%;position:absolute;background-color:green;width:100%;left:-100%;top:0%;display:none;`})
el.append(sl)
let ms=createElement("div",{id:this.id+"S",style:`z-index:202;height:auto;position:absolute;background-color:green;width:100%;left:-100%;top:0px;display:none;`})
el.append(ms)
let buttons=[]
for(let i=0;i<5;i++){
  buttons[i]=createElement("button",{id:this.id+"SB"+i,style:`width:90%;height:auto;margin-bottom: 10%;`})
  buttons[i].func=function(){console.log(this.func)}
  buttons[i].addEventListener("click",buttons[i].func)
  ms.append(buttons[i])
}
buttons[0].textContent="add"
buttons[0].removeEventListener("click",buttons[1].func)
buttons[0].func=()=>{
  let key=null
  let child=new 
  Value({id:this.id+key,name:"null",value:this.dataSource})
  this.children.push(child)
  el.append(child.create())
  this.values["null"]=this.dataSource
  this.parent.registerListener(()=>child.update())
}

  buttons[0].addEventListener("click",buttons[0].func)
  

  buttons[1].textContent="update"
  buttons[1].removeEventListener("click",buttons[1].func)
  buttons[1].func=()=>{
    for(let value of this.children){
      value.update()
    }
  }
  
    buttons[1].addEventListener("click",buttons[1].func)
  

    
  buttons[2].textContent="console this"
  buttons[2].removeEventListener("click",buttons[2].func)
  buttons[2].func=()=>{
    console.log(this)
  }
  
    buttons[2].addEventListener("click",buttons[2].func)
  
    buttons[3].textContent="delete this"
    buttons[3].removeEventListener("click",buttons[3].func)
    buttons[3].func=()=>{
      this.element.remove()
    }
    
      buttons[3].addEventListener("click",buttons[3].func)
    



document.addEventListener("mouseup",()=>{
    sl.style.display="none"
    ms.style.display="none"
  });

el.addEventListener("mouseup",(e)=>{
if(e.button==2&&mouseElem(e)[0].constructor.name=="HTMLDivElement"){
  setTimeout(()=>{$(`#${sl.id}`).show(
  "slide", {direction: "right"},
  200
  );},1)
  setTimeout(()=>{$(`#${ms.id}`).show(
      "slide", {direction: "up"},
      200
      );},200)
    }
    else{
      sl.style.display="none"
      ms.style.display="none"
    }
    })
    if(ops=="return"){
      return el
    }
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
  let p=createElement("p",{id:this.id,style:"height: max-content;"})
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
    if(ev.key=="Enter"&&this.valueElem.value!=""&&typeof this.value[this.name]!="object"){
      this.value[this.name]=this.valueElem.value}})

let buttons=[]
for(let i=0;i<5;i++){
  buttons[i]=createElement("button",{id:this.id+"SB"+i,className:"side",style:`width:50px;height:90%;`})
  buttons[i].func=function(){console.log(this.func)}
  buttons[i].addEventListener("click",buttons[i].func)
  sl.append(buttons[i])
}
buttons[0].textContent="delete"
buttons[0].removeEventListener("click",buttons[0].func)
buttons[0].func=()=>{p.parentElement.removeChild(p)}
  
buttons[0].addEventListener("click",buttons[0].func)





document.addEventListener("mouseup",()=>{sl.style.display="none"});
  p.addEventListener("mouseup",(e)=>{
    if(e.button==2&&mouseElem(e)[0].constructor.name=="HTMLParagraphElement"){
      setTimeout(()=>{$(`#${sl.id}`).show("slide", {direction: "right"},200);},1)}
    else{sl.style.display="none"}})
  
  this.update()
  return p

}
update(value){
  if(value!=undefined){
    this.valueElem.textContent=value
  }
  else{
    console.log(this.value[this.name])
    this.valueElem.textContent=stringfy(this.value[this.name],300)
  }
}

}
function stringfy(obj,max_width){
  let text=""
  if(typeof obj=="object"){
    console.log(Object.keys(obj))
    for (let key in obj) {
      
      console.log(key)
      let newText=""
      if (typeof obj[key]=="object"&&obj[key].constructor.name=="Array")
      {
        newText=`\n ${key}: [${simpleStringfy(obj[key][0])}`
        for(let i=1;i<obj[key].length;i++){
          newText=newText+", "+simpleStringfy(obj[key][i])
        }
        newText=newText+`]`
      }
      else if (typeof obj[key]=="object")
      {
        newText=`\n ${key}: ${obj[key].constructor.name}`
      }
      else if(typeof obj[key]=="function"){
        newText=`\n ${key}: function`
      }
      else{
        newText=`\n ${key}: ${obj[key]}`
      }
      if(newText!=undefined&&newText.length>max_width/10){
        text=text+`${newText.slice(0,30)}...`
      }
      else{
        text=text+newText
      }
      console.log(newText)
      if(newText!=undefined){
      console.log(newText.length)
    }
  }
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
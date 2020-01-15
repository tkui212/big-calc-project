import React, {Component} from 'react';
import $ from  "jquery";
import "../public/draggable";
import "jquery-ui/ui/effects/effect-slide";
import {dis,con,updateCon,onSnap} from './functions';
export default class Slider extends Component {
    constructor(props) {
        super(props)
        this.id=props.id
        this.side=props.side
        this.width=props.width
        this.height=props.height
        this.children=props.children
        if(props.text==undefined){
          this.text=this.id
        }
        else{
          this.text=props.text
        }
        if(this.side=="left"||this.side==undefined){
          this.left=`0px`
          this.top=`0px`
        }
        else if(this.side=="right"){
          this.left=`${window.innerWidth-this.width}px`
          this.top=`0px`
        }
        else if(this.side=="top"){
          this.left=`100px`
          this.top=`0px`
        }
        else if(this.side=="bottom"){
          this.left=`0px`
          this.top=`${window.innerHeight-this.height}px`
        }
        else if(this.side=="float"){
          this.left=`${window.innerWidth/2-this.width/2}px`
          this.top=`${window.innerHeight/2-this.height/2}px`
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
        
    }
    mouseDown(){
      dis(this);  
      this.connectCon()
    }
    mouseUp(){
      this.disconnectCon()
      let snap=this.getSnapings()
      if(snap.length>0){
      /* Get the possible snap targets: */
      onSnap(this,snap[0]);
      }
      updateCon(this);
    }
    componentDidMount(){
      this.element=document.getElementById(this.id)
      this.element.addEventListener("mousedown",this.mouseDown)
      this.element.addEventListener("mouseup",this.mouseUp)
      $(`#${this.id}`).resizable();
$(`#${this.id}`).draggable({
  snap: `snapTo:not(#${this.id}):not(#${this.id}>snapTo)`,
  snapTolerance: 10,
  start: function (event, ui) {
    console.log("start")
    console.dir(this)
    //add con() for the con's of WB children
  },

  stop: function (event, ui) {
    console.log("stop")
  }
});
      this.element[`istop`] = false;
  this.element[`isbottom`] = false;
  this.element[`isleft`] = false;
  this.element[`isright`] = false;
  this.element[`der`] = "down";
  this.element[`effDer`] = function () {
    let eleBo = this.getBoundingClientRect();
    let snaBo = this.parentElement.getBoundingClientRect();
    this.istop = false;
    this.isleft = false;
    this.isbottom = false;
    this.isright = false;
    if (this.parentElement == $("#sliders")[0]) {
      if (5>Math.abs(eleBo.top - snaBo.top) ){
        this.istop = true;
      } else if (5>Math.abs(eleBo.bottom - snaBo.bottom)) {
        this.isbottom = true;
      }
      if (5>Math.abs(eleBo.left - snaBo.left)) {
        this.isleft = true;
      } else if (5>Math.abs(eleBo.right - snaBo.right)) {
        this.isright = true;
      }
    } else {
      if (Math.abs(eleBo.top - snaBo.bottom) < 5) {
        //check the numbers of the eleBo and snaBo.. thay are not what
        this.istop = true;
      } else if (Math.abs(eleBo.bottom - snaBo.top) < 5) {
        this.isbottom = true;
      }
      if (Math.abs(eleBo.left - snaBo.right) < 5) {
        this.isleft = true;
      } else if (Math.abs(eleBo.right - snaBo.left) < 5) {
        this.isright = true;
      }
    }
    if ((this.istop || this.isbottom) && (this.isleft || this.isright)) {
      if (eleBo.width > eleBo.height) {
        this.der = this.istop ? "up" : "down";
        return this.istop ? "up" : "down";
      } else {
        this.der = this.isleft ? "left" : "right";
        return this.isleft ? "left" : "right";
      }
    } else {
      this.der = this.istop ?
        "up" :
        this.isleft ?
        "left" :
        this.isbottom ?
        "down" :
        this.isright ?
        "right" :
        false;
      return this.istop ?
        "up" :
        this.isleft ?
        "left" :
        this.isbottom ?
        "down" :
        this.isright ?
        "right" :
        false;
    }
  };
  this.element[`Hide`] = function (dir, dur) {
    // updateCon(this);
    let ops;
    if (dir == "up") {
      ops={top: `-=${$(`#${this.id}`).outerHeight()}`}
    } else if (dir == "down") {
      ops={top: `+=${$(`#${this.id}`).outerHeight()}`}
    } else if (dir == "left") {
      ops={left: `-=${$(`#${this.id}`).outerWidth()}`}
    } else if (dir == "right") {
      ops={left: `+=${$(`#${this.id}`).outerWidth()}`}
    } else {

    }
    $(`#${this.id}con`).animate(ops, dur)
    $(`#${this.id}`).hide(
      "slide", {
        direction: dir,

      },
      dur
    );
  };
  this.element[`Show`] = function (dir, dur) {
    // updateCon(this);
    let ops;
    if (dir == "down") {
      ops={top: `-=${$(`#${this.id}`).outerHeight()}`}
    } else if (dir == "up") {
      ops={top: `+=${$(`#${this.id}`).outerHeight()}`}
    } else if (dir == "right") {
      ops={left: `-=${$(`#${this.id}`).outerWidth()}`}
    } else if (dir == "left") {
      ops={left: `+=${$(`#${this.id}`).outerWidth()}`}
    } else {

    }
    $(`#${this.id}con`).animate(ops, dur)
    $(`#${this.id}`).show(
      "slide", {direction: dir},
      dur
      );
  };
  this.element[`connectCon`] = function () {
    let got
    if(this.style.display=="none"){
      got=this.parentElement
    }
    else{
      got = this;
    }
    con($(`#${this.id + "con"}`)[0],got);
    for(const elel of $(`#${this.id}>snapTo`)){
      elel.connectCon()
    }
  }
  this.element[`getSnapings`] = function (){
    let snapped = $(this).data("ui-draggable").snapElements;
    let snappedTo = [];
    if(snapped!=undefined){
    for (let i = 0; i < snapped.length; i++) {
      if (snapped[i].snapping) {
        snappedTo.push(snapped[i].item)
      }
    }
  }
    return snappedTo
}
  this.element[`disconnectCon`] = function () {
    dis($(`#${this.id + "con"}`)[0]);
    for(const elel of $(`#${this.id}>snapTo`)){
      elel.disconnectCon()
  }
}
  this.element.style.display="block"
  this.element.der = this.element.effDer()
  updateCon(this.element);
  this.element.connectCon()
  this.element.disconnectCon()
    }
    render() {
            let element = <snapto
            id={this.id}
            className={"slider"}
            name={"drag"}
            title={"WB"}
            style={{left: this.left, top: this.top, zIndex: `101`, width: this.width, height: this.height}}
            key={this.id}
          >
            {this.text}
            {this.children}
          </snapto>
          let con=<div
          id={this.id+"con"}
          className={"controller"}
          title={"control"}
          style={{top: "461.998px", left: "363.492px", zIndex: `101`, width: "100px", height: "50px"}}
          key={this.id+"con"}
        >
          {this.text}
        </div>
             return ([element,con])  }}


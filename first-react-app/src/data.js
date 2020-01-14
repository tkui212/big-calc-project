import React, {Component} from 'react';
import $ from  "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/effects/effect-slide";
import {dis,con,updateCon,onSnap} from './functions';
export default class Data extends Component {
    constructor(props) {
        super(props)
        this.id=props.id
        this.side=props.side
        this.width=props.width
        this.height=props.height
        this.children=props.children
        this.dataSource=props.dataSource
        this.values=props.values
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
    }
    componentDidMount(){
      this.element=document.getElementById(this.id)
      $(`#${this.id}`).resizable();
        $(`#${this.id}`).draggable({
  snap: `snapTo:not(#${this.id}):not(#${this.id}>snapTo)`,
  snapTolerance: 10
});

if(this.dataSource.id!=undefined){
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
}

export class Value extends Component {
    constructor(props) {
        super(props)
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
}

import React, {Component} from 'react';
export default class Slider extends Component {
    constructor(props) {
        super(props)
        this.id=props.id
        this.side=props.side
        this.width=props.width
        this.height=props.height
        if(this.side=="left"){
          this.left=`0px`
          this.top=`0px`
        }
        else if(this.side=="bottom"){
          this.left=`0px`
          this.top=`${window.innerHeight-this.height}px`
        }
    }
    render() {
            const element = <snapto
            id={this.id}
            class={"slider"}
            name={"drag"}
            title={"WB"}
            style={{left: this.left, top: this.top, zIndex: `9`, width: this.width, height: this.height}}
          >
            <p>
              points data
            </p>
          </snapto>
          let con=<div
          id={this.id+"con"}
          class={"controller"}
          title={"control"}
          style={{top: "461.998px", left: "363.492px", width: "100px", height: "50px"}}
        >
          points
        </div>
             return ([element,con])  }}


import React from 'react';
import './App.css';
import './home_page.css';
import Menu from './Menu';
import Slider from './Slider.js';
import Canvas from './Canvas';
import {Body,Weight,Circle,Force,Point,Line} from './Body';
import ReactDOM from 'react-dom';
import $ from  "jquery";
import "jquery-ui/ui/widgets/draggable";
export default class App extends React.Component {

  componentDidMount(){
    var dragers = require("./toReact.js");
    window.dragers=dragers
    dragers.ex()
  }
  render(){
  return (
    <div className="App">
    <header className="App-header">
      {/* <Menu id="home_menu"/>
      <Canvas id="can_plate"/> */}
      
      <svg version="1.1" id="Svg" x="0px" y="0px" width="100%" height="100%" style={{height: "inherit"}}>
      <defs>
          <marker
            id="arrow"
            markerUnits="strokeWidth"
            markerWidth="12"
            markerHeight="12"
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            orient="auto">
            <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style={{fill: "#f00"}}></path>
          </marker>
        </defs>
      {/* <Body id="can_plate"/> */}
        <Circle x="400" y="400" radius="50" id="main"/>
        <Circle x="200" y="600" radius="50" id="b1"/>
        <Circle x="600" y="600" radius="50" id="b2"/>
        <Circle x="600" y="200" radius="50" id="b3"/>
        <Line P1={"b1P"} P2={"mainP"} id="CsLine1" after={true} />
      {/* <Force P1={"b1P"} F={100} angle={90} id="Force" after={true} /> */}
      <Line P1={"b2P"} P2={"mainP"} id="CsLine2" after={true} />
      <Line P1={"b3P"} P2={"mainP"} id="CsLine3" after={true} />
      </svg>
      </header>
      <div id="sliders">
        <Slider id={"testData"} side={"left"} width={100} height={200}/>
        <Slider id={"testData2"} side={"bottom"} width={200} height={100}/>
      
      </div>
      <div id={"menu"}opacity={"0.5"}style={{left: "-100px", top: "-100px"}}>
        <div id={"menut"}>movecon</div>

        <button id={"menubut1"}class={"menuButton"}onclick={"console.log(movecon)"}>
          cosnole this
        </button>
        <p>
          <button id={"menubut2"}class={"menuButton"}onclick={"collapse(move)"}>
            collapse
          </button>
        </p>
        <p>
          <button id={"menubut3"}class={"menuButton"}onclick={"effShow(move)"}>
            show
          </button>
        </p>
        <p>
          <button
            id={"menubut4"}
            class={"menuButton"}
            onclick={"console.log(document.elementsFromPoint(943, 229))"}
          >
            elems here
          </button>
        </p>
        <p>
            <button
              id={"menubut5"}
              class={"menuButton"}
              onclick={"console.log(document.elementsFromPoint(943, 229))"}
            >
              collapse all
            </button>
          </p>
          <p>
              <button
                id={"menubut6"}
                class={"menuButton"}
                onclick={"console.log(document.elementsFromPoint(943, 229))"}
              >
                show all
              </button>
            </p>
        <p></p>
      </div>
    </div>);
}
}



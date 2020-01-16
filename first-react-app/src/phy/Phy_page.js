import React from 'react';
import './phy.css';
import {Menu,Menuos} from '../home_page/Home_Menu';
import ContextMenu from '../Ops_menu';
import Slider from '../slider.js';
// import Data from '../data.js';
import {Body,Weight,Circle,Force,Point,Line} from './Body';
import {Console} from '../data';
import ReactDOM from 'react-dom';
import $ from  "jquery";
import "jquery-ui/ui/widgets/draggable";
import {dis,con,containsTitle,returnTitle} from '../functions';
export default class Phy_page extends React.Component {
  render(){
  return (
    <div className="App">
    <header className="App-header">
      {/* <Menu id="home_menu"/>
      <Canvas id="can_plate"/> */}
      
      <svg version="1.1" id="Svg" x="0px" y="0px" width="100%" height="100%" style={{height: "inherit", zIndex:"10"}}>
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
      <snapto id="sliders">
        <Slider id={"testData"} side={"left"} width={100} height={200}/>
        <Slider id={"testData2"} side={"bottom"} width={200} height={100}/>
        {/* <Slider id={"tools"} side={"left"} left= {0} top= {26} width= {50} height= {400} text={" t o o l s"}/> */}
        <Console id={"d3Data"} text={"circle b3 data"} left={700} top={200} parent={()=>document.getElementById("b3").me}/>
      </snapto>
      <ContextMenu id={"MainMenu"}/>
    </div>);
}
}



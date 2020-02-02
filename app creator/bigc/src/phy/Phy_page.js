import React from 'react';
import './phy.css';
import {Menu,Menuos} from '../home_page/Home_Menu';
import ContextMenu from '../Ops_menu';
import Slider from '../slider.js';
import {Body,Weight,Circle,Force,Point,Line} from './Body';
import {Console} from '../data';
import {data} from '../dataBase';
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
        <Point x="400" y="50" id="H" pind={true}/>
        <Circle x="400" y="250" radius="50" id="x1"/>
        <Circle x="550" y="250" radius="50" id="x2"/>
        <Line P1={data.get("H")} P2={data.get("x1")} id="Tx1"/>
        <Line P1={data.get("H")} P2={data.get("x2")} id="Tx2"/>
      </svg>
      </header>
      <snapto id="sliders">
        <Slider id={"testData"} side={"left"} width={100} height={200}/>
        <Slider id={"testData2"} side={"bottom"} width={200} height={100}/>
        
        <Console id={"Hc2"} text={"point data"} left={300} top={500} parent={data.Body["H"]} dataSource={data.Body["H"].data} width={"250px"} values={{data:this}}/>
        <Console id={"Hconsole"} text={"pinner point"} left={470} top={20} parent={data.Body["H"]} values={{x:this,y:this,pind:this}}/>
      </snapto>
      <ContextMenu id={"MainMenu"}/>
    </div>);
}
}



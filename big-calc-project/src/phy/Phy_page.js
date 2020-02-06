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
        <Line P1={"H"} P2={"x1"} id="Tx1"/>
      </svg>
      </header>
      <snapto id="sliders">
        <Force id={"forceTest"} P1={"x1"} angle={90} f={100} />
        <Slider id={"datass"} side={"left"} width={250} height={parseInt(window.innerHeight)}/>
        {/* <Slider id={"maker"} side={"right"} width={250} height={parseInt(window.innerHeight)}
        content={[]}        /> */}

        <Console id={"dataConsoleTesMore"} side={"right"} width={250} height={parseInt(window.innerHeight)} dataSource={"H"} values={["id","x","y","data"]}/>
      </snapto>
      <ContextMenu id={"MainMenu"}/>
    </div>);
}
}



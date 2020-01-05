import React from 'react';
import './App.css';
import './home_page.css';
import Menu from './Menu';
import Canvas from './Canvas';
import {Body,Weight,Circle,Force,Point,Line} from './Body';

function App() {
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
        <Circle x="200" y="200" radius="50" id="b4"/>
        <Circle x="400" y="600" radius="50" id="b5"/>
        <Circle x="600" y="400" radius="50" id="b6"/>
        <Circle x="400" y="200" radius="50" id="b7"/>
        <Circle x="200" y="400" radius="50" id="b8"/>
      </svg>
      </header>
      <div id="Slines">
      <Line P1={"b1P"} P2={"mainP"} id="CsLine1" after={true} renderType="react"/>
      <Force P1={"b1P"} F={100} angle={90} id="Force" after={true} renderType="react"/>
      <Line P1={"b2P"} P2={"mainP"} id="CsLine2" after={true} renderType="react"/>
      <Line P1={"b3P"} P2={"mainP"} id="CsLine3" after={true} renderType="react"/>
      <Line P1={"b4P"} P2={"mainP"} id="CsLine4" after={true} renderType="react"/>
      <Line P1={"b5P"} P2={"mainP"} id="CsLine5" after={true} renderType="react"/>
      <Line P1={"b6P"} P2={"mainP"} id="CsLine6" after={true} renderType="react"/>
      <Line P1={"b7P"} P2={"mainP"} id="CsLine7" after={true} renderType="react"/>
      <Line P1={"b8P"} P2={"mainP"} id="CsLine8" after={true} renderType="react"/>
      </div>
    </div>);
}

export default App;

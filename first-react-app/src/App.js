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
        <Circle x="100" y="100" radius="50" ops={{id:"can_plate"}}/>
      </svg>
      </header>
    </div>
  );
}

export default App;

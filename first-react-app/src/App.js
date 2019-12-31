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
      {/* <Body id="can_plate"/> */}
        <Circle x="100" y="100" radius="50" ops={{id:"can_plate"}}/>
      </svg>
      </header>
    </div>
  );
}

export default App;

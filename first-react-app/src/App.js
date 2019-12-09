import React from 'react';
import logo from './logo.svg';
import './App.css';
import './home_page.css';
import Component1 from './Component1';
import Menuos from './Menuos';
import Menu from './Menu';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <Menu id="home_menu"/>
      <canvas id="can_plate" height="540" width="window.innerWidth" style={{border: "solid 1px;", padding: "0;"}}></canvas>
      </header>
    </div>
    
  );
}

export default App;

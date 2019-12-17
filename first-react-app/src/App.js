import React from 'react';
import './App.css';
import './home_page.css';
import Menu from './Menu';
import Canvas from './Canvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <Menu id="home_menu"/>
      <Canvas id="can_plate"/>
      
      </header>
    </div>
  );
}

export default App;

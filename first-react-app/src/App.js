import React from 'react';
import logo from './logo.svg';
import './App.css';
import './home_page.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <menu id="home_menu">
                <login id="login" className="menuos" onmouseover="this.enter()" onmouseout="this.exit()" style={{height: "113px;"}}>
                    Login
                    <div id="loginawd" className="contents" style={{display:"none"}}>
                            <input type="text" id="login_name" placeholder="username"/>
                            <input type="password" id="login_password" placeholder="password"/>
                          
                            <a>don't have one? Create new account for free!</a>
                            </div>
                    
                </login>
                <logo id="logo" className="menuos" onmouseover="this.enter()" onmouseout="this.exit()">
                    logo
                <div id="logoawd" className="contents" style={{display:"none"}}><p>1</p><p>2</p><p>3</p><p>4</p></div></logo>

                <physic id="physic" className="menuos" onmouseover="this.enter()" onmouseout="this.exit()" style={{height: "113px;"}}>
                    Physic
                <div id="physicawd" className="contents" style={{display:"none"}}><p>1</p><p>2</p><p>3</p><p>4</p></div></physic>
                <geometry id="geometry" className="menuos" onmouseover="this.enter()" onmouseout="this.exit()">
                    Geometry
                <div id="geometryawd" className="contents" style={{display:"none"}}><p>1</p><p>2</p><p>3</p><p>4</p></div></geometry>
                
            </menu>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reacta
        </a>
      </header>
    </div>
    
  );
}

export default App;

import React from 'react';
import './App.css';
import './home_page.css';
import {Menu,Menuos} from './Home_Menu';
import ContextMenu from './Ops_menu';
import Slider from './Slider.js';
import Canvas from './Canvas';
import {Body,Weight,Circle,Force,Point,Line} from './Body';
import ReactDOM from 'react-dom';
import $ from  "jquery";
import "jquery-ui/ui/widgets/draggable";
import {dis,con,containsTitle,returnTitle} from './functions';
export default class Home_page extends React.Component {
  render(){
  return (
    <div className="App">
    <header className="App-header">
      <Menu id="home_menu"/>
      <Canvas id="can_plate"/>

      </header>
    </div>);
}
}



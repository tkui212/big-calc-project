import React from 'react';
import './home_page.css';
import {Menu,Menuos} from './Home_Menu';
import ContextMenu from '../Ops_menu';
// import Slider from '../Slider.js';
import Data from '../data.js';
import Canvas from './Canvas';
import ReactDOM from 'react-dom';
import $ from  "jquery";
import "jquery-ui/ui/widgets/draggable";
export default class Home_page extends React.Component {
  render(){
  return (
    <div className="App">
    <header className="App-header">
      <Menu id="home_menu"/>
      <Canvas id="can_plate"/>

      </header>
      <snapto id="sliders">
      <Data id={"testData"} text={"circle 0 data"} left={300} top={300} width={100} height={200} dataSource={{id:"0"}}/>
      </snapto>
    </div>);
}
}



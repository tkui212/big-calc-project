import React, {Component} from 'react';
import './home_page.css';
import Menuos from './Menuos';
export default class Menu extends Component {
    // constructor(props) {
    //      super(props)
    //     }
    render() {
        return(
            <menu id="home_menu">
            <Menuos displaytext="Login" id="login" className="menuos"/>
            <Menuos displaytext="logo" id="logo" className="menuos"/>
            <Menuos displaytext="physic" id="physic" className="menuos" />
            <Menuos displaytext="geometry" id="geometry" className="menuos"/>
            </menu>
        )
        }}
import React, {Component} from 'react';
import './home_page.css';
import * as F from './functions.js';
export default class Menuos extends Component {
    // constructor(props) {
    //      super(props)
    //     }

//   document.querySelector(`#${this.props.id}awd`).Hide("up", 1);
    render() {
        if(this.props.id==="login"){
            return (
                <div id={this.props.id} className="menuos" >
            {this.props.displaytext}
            <div id="loginawd" className="contents" style={{marginTop: "30px"}}>
                            <input type="text" id="login_name" placeholder="username"/>
                            <input type="password" id="login_password" placeholder="password"/>
                            <a>don't have one? Create new account for free!</a>
                            </div>
            </div>
                )
        }else if(this.props.id==="physic"){
            return (
                <div id={this.props.id} className="menuos" >
            {this.props.displaytext}
            <div id={this.props.id+"awd"} className="contents">
                <a href="C:\Users\WIN10\Documents\2 drive\OneDrive\big calc project\index.html">graphs</a><a>2</a><a>3</a><a>4</a></div>
                </div>
                )
        }else if(this.props.id==="geometry"){
            return (
                <div id={this.props.id} className="menuos" >
            {this.props.displaytext}
            <div id={this.props.id+"awd"} className="contents">
                <a>1</a><a>2</a><a>3</a><a>4</a></div>
                </div>
                )
        }else if(this.props.id==="logo"){
            return (
                <div id={this.props.id} className="menuos" >
            {this.props.displaytext}
            <div id={this.props.id+"awd"} className="contents">
                <a>1</a><a>2</a><a>3</a><a>4</a></div>
                </div>
                )
        }
        }}


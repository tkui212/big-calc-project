import React, {Component} from 'react';
import './home_page.css';
import * as F from './functions.js';
export default class Menuos extends Component {
    // constructor(props) {
    //      super(props)
    //     }

//   document.querySelector(`#${this.props.id}awd`).Hide("up", 1);
    render() {
        F.hi()
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
        }else{
            return (
                <div id={this.props.id} className="menuos" >
            {this.props.displaytext}
            <div id={this.props.id+"awd"} className="contents">
                <p>1</p><p>2</p><p>3</p><p>4</p></div>
                </div>
                )
        }
        }}


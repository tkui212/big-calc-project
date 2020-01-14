import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Graphs from './Graphs';
import * as F from './functions.js';
export class Menu extends Component {
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
        export class Menuos extends Component {
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
                        {/* //onClick={()=>{document.canvas.stopTimeOut=true; ReactDOM.render(<Graphs />, document.getElementById('root')); }} */}
                        <p><a onClick={()=>{document.canvas.stopTimeOut=true; ReactDOM.render(<Graphs />, document.getElementById('root')); }}>graphs</a></p><p><a onClick={()=>{document.canvas.stopTimeOut=true; ReactDOM.render(<App />, document.getElementById('root')); }}>natrual</a></p><p><a>3</a></p><p><a>4</a></p></div>
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

import React, {Component} from 'react';
import './home_page.css';
export default class Canvas extends Component {
    constructor(props) {
         super(props)
         this.canvasRef = React.createRef();
        }
    render() {
        return(
            <canvas id="can_plate" height="82%" width="window.innerWidth" style={{padding: "0"}} ref={this.canvasRef} />
        )
        }
        componentDidMount() {
            
var canvas = document.querySelector("#can_plate");

canvas.width = window.innerWidth
canvas.height = window.innerHeight*0.82
const innerWidth = canvas.width
const innerHeight = canvas.height
let c = canvas.getContext("2d");
// c.strokeStyle = "red";
// c.fillStyle = "red"
// c.stroke();
// c.fill()
function create(color, name){ //creating the menu arcs
    this.color=color
    this.rnd_x =50+ Math.random()*(innerWidth-100); //setting random x set-up
    this.rnd_y =50+ Math.random()*innerHeight ; //setting random y set-up
    this.vx = 3;
    this.vy = 3;

    c.beginPath();
    c.strokeStyle = this.color;
    c.arc(this.rnd_x, this.rnd_y, 50, 0, 360);
    c.fill();
    this.update = function(){

        if (this.rnd_x+50>innerWidth || this.rnd_x-50<0){
            this.vx = -this.vx
            }
        if (this.rnd_y + 50>innerHeight || this.rnd_y-50<0){
            this.vy =-this.vy
        }
        this.rnd_x += this.vx;
        this.rnd_y += this.vy;
        c.beginPath()
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.arc(this.rnd_x, this.rnd_y, 50, 0, 360);
        
        c.fill();
    }
}
 let c1 = new create("red" ,"hi");
 let c2 = new create("blue" ,"hi2");


function animation(){
    c.clearRect(0,0,innerWidth,innerHeight);
    requestAnimationFrame(animation);
    c1.update();
    c2.update();
}
animation()

        }
    }

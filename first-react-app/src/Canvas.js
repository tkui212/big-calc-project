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
    this.name=name
    this.color=color
    // this.x =Math.random()*50+ Math.random()*(innerWidth-100); //setting random x set-up
    // this.y =Math.random()*50+ Math.random()*(innerHeight-100) ; //setting random y set-up
    // this.vx = Math.random()*5;
    // this.vy = Math.random()*5;
    if(this.name==="1"){
this.x=500
this.y=200
this.vx=4
this.vy=0

    }
    else{
        this.x=500
this.y=300
this.vx=-4
this.vy=0
    }

    c.beginPath();
    c.strokeStyle = this.color;
    c.arc(this.x, this.y, 50, 0, 360);
    c.fill();
    this.update = function(){
    for(let i=0;i<2;i++){

        var vCollision = {x: c1[i].x - this.x, y: c1[i].y - this.y};
        var distance = Math.sqrt((c1[i].x-this.x)*(c1[i].x-this.x) + (c1[i].y-this.y)*(c1[i].y-this.y));
        if(distance!==0&&distance<101&&distance>90){
            // console.log("work")
        var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
        var vRelativeVelocity = {x: this.vx - c1[i].vx, y: this.vy - c1[i].vy};
        var speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
        this.vx -= (speed * vCollisionNorm.x);
        this.vy -= (speed * vCollisionNorm.y);
        c1[i].vx += (speed * vCollisionNorm.x);
        c1[i].vy += (speed * vCollisionNorm.y);
        }
        // console.log(this)
}
        
        if (this.x+50>innerWidth || this.x-50<0){
            this.vx = -this.vx
            }
        if (this.y + 50>innerHeight || this.y-50<0){
            this.vy =-this.vy
        }
        this.x += this.vx;
        this.y += this.vy;
        c.beginPath()
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.arc(this.x, this.y, 50, 0, 360);
        c.fill();
        // let lin = new Path2D();
       
        // c.fillStyle = "blue";
        // c.strokeStyle =  "blue";
        // c.lineWidth = 2;
//   c.beginPath();
//   lin.moveTo(this.x,this.y );
//   lin.lineTo((this.x+this.vx*50),this.y );
//   c.stroke(lin);
//   c.fill(lin);
//   c.beginPath();
//   lin.moveTo(this.x,this.y );
//   lin.lineTo(this.x,(this.y +this.vy*50));
//   c.stroke(lin);
//   c.fill(lin);
    }
}
let c1 =[]
//  for(let i=0;i<10;i++){
//     c1[i]= new create("red" ,`hi${i}`);
//  }

c1[0]=new create("blue","1")
c1[1]=new create("red","2")

function animation(){
    c.clearRect(0,0,innerWidth,innerHeight);
    requestAnimationFrame(animation);
    c1.forEach((ele)=>{ele.update();})
    // obj1.update()
    // obj2.update()
}
animation()

        }
    }

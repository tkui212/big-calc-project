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
var c = canvas.getContext("2d");
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
this.x=200
this.y=250
this.vx=5
this.vy=0

    }
    else{
        this.x=308
this.y=300
this.vx=-5
this.vy=0
    }

    c.beginPath();
    c.strokeStyle = this.color;
    c.arc(this.x, this.y, 50, 0, 360);
    c.fill();
    this.update = function(){
    for(let i=0;i<2;i++){
        let c2=c1[i]
        let vCollision = {x: c1[i].x - this.x, y: c1[i].y - this.y};
        let distance = Math.sqrt((c1[i].x+c1[i].vx-this.x-this.vx)*(c1[i].x+c1[i].vx-this.x-this.vx) + (c1[i].y+c1[i].vy-this.y-this.vy)*(c1[i].y+c1[i].vy-this.y-this.vy));
        if(distance!==0&&distance<101){
            var a=c2.vx**2-2*c2.vx*this.x+this.x**2+c2.vy**2-2*c2.vy*this.y+this.y**2
            var b=2*c2.x*c2.vx-2*this.x*c2.vx-2*c2.x*this.vx+2*this.x*this.vx+2*c2.y*c2.vy-2*this.y*c2.vy-2*c2.y*this.vy+2*this.y*this.vy
            var C=this.x**2+c2.x**2-2*c2.x*this.x+this.y**2+c2.y**2-2*c2.y*this.y
            var conclosen1=(b+Math.sqrt(b**2-4*a*C))/2*a
            var conclosen2=(b-Math.sqrt(b**2-4*a*C))/2*a
            // console.log("work")
            console.log(`t1=`+conclosen1)
            console.log(`t2=`+conclosen2)
            console.log(`a=`+a)
            console.log(`c2.vx**2=${c2.vx**2}
            -2*c2.vx*this.x=${-2*c2.vx*this.x}
            +this.x**2=${this.x**2}
            +c2.vy**2=${c2.vy**2}
            -2*c2.vy*this.y=${-2*c2.vy*this.y}
            +this.y**2=${this.y**2}`)
            console.log(`b=`+b)
            console.log(`c=`+C)
            console.log(c2)
            console.log(this)
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
        console.log(`this before movemant`)
        console.log(this)
        this.x += this.vx;
        this.y += this.vy;
        console.log(`this after movemant`)
        console.log(this)
        c.beginPath()
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.arc(this.x, this.y, 50, 0, 360);
        c.fill();
   
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
    // requestAnimationFrame(animation);
    c1.forEach((ele)=>{ele.update();})

}
canvas["ani"]=function animation(){
    c.clearRect(0,0,innerWidth,innerHeight);
    // requestAnimationFrame(animation);
    c1.forEach((ele)=>{ele.update();})

}

        }
    }

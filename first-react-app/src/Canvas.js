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
            console.log(this)
            console.log("mount")
var canvass = document.querySelector("#can_plate");

canvass.width = window.innerWidth
canvass.height = window.innerHeight*0.82
const innerWidth = canvass.width
const innerHeight = canvass.height
var c = canvass.getContext("2d");
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
this.y=300
this.vx=5
this.vy=0

    }
    else{
        this.x=304
this.y=300
this.vx=-5
this.vy=0
    }
this.timer=0
    c.beginPath();
    c.strokeStyle = this.color;
    c.arc(this.x, this.y, 50, 0, 360);
    c.fill();

    this.update = function(){
        console.log(c1)
        if(this.timer<1){
    for(let i=0;i<2;i++){
        this.c2=c1[i]
        this.vCollision = {x: this.c2.x - this.x, y: this.c2.y - this.y};
        this.distance = Math.sqrt((this.c2.x+this.c2.vx-this.x-this.vx)**2 + (this.c2.y+this.c2.vy-this.y-this.vy)**2);
        console.log("futer distance="+this.distance)
        if(this.distance!==0){
            this.a=this.vx**2-2*this.vx*this.c2.vx+this.c2.vx**2+this.vy**2-2*this.vy*this.c2.vy+this.c2.vy**2

            this.b=2*this.x*this.vx-2*this.vx*this.c2.x-2*this.x*this.c2.vx+2*this.c2.x*this.c2.vx-2*this.c2.y*this.vy+2*this.c2.y*this.c2.vy+2*this.vy*this.y-2*this.c2.vy*this.y

            this.C=this.x**2-2*this.x*this.c2.x+this.c2.x**2+this.c2.y**2+this.y**2-2*this.c2.y*this.y-10000
            
            this.aT2=2*this.a
            this.con1=((-this.b)+Math.sqrt(this.b**2-(4*this.a*this.C)))/this.aT2
            this.con2=((-this.b)-Math.sqrt(this.b**2-(4*this.a*this.C)))/this.aT2
            this.con=null
            if(this.con1<this.con2&&this.con1>0){
                this.con=this.con1

            }else{
                this.con=this.con2

            }
            
            console.log(c1)
            this.x+=this.vx*this.con
            this.y+=this.vy*this.con
            this.c2.x+=this.c2.vx*this.con
            this.c2.y+=this.c2.vy*this.con
            this.c2.timer=0
            console.log(c1)
            this.distance = Math.sqrt((this.c2.x-this.x)**2 + (this.c2.y-this.y)**2);
        this.vCollisionNorm = {x: this.vCollision.x / this.distance, y: this.vCollision.y / this.distance};
        this.vRelativeVelocity = {x: this.vx - c1[i].vx, y: this.vy - c1[i].vy};
        this.speed = this.vRelativeVelocity.x * this.vCollisionNorm.x + this.vRelativeVelocity.y * this.vCollisionNorm.y;
        this.vx -= (this.speed * this.vCollisionNorm.x);
        this.vy -= (this.speed * this.vCollisionNorm.y);
        c1[i].vx += (this.speed * this.vCollisionNorm.x);
        c1[i].vy += (this.speed * this.vCollisionNorm.y);
        this.con=1-this.con
        this.x+=this.vx*this.con
        this.y+=this.vy*this.con
        this.c2.x+=this.c2.vx*this.con
        this.c2.y+=this.c2.vy*this.con
        console.log(c1)
        this.distance = Math.sqrt((this.c2.x+this.c2.vx-this.x-this.vx)**2 + (this.c2.y+this.c2.vy-this.y-this.vy)**2);
            this.a=this.vx**2-2*this.vx*this.c2.vx+this.c2.vx**2+this.vy**2-2*this.vy*this.c2.vy+this.c2.vy**2

            this.b=2*this.x*this.vx-2*this.vx*this.c2.x-2*this.x*this.c2.vx+2*this.c2.x*this.c2.vx-2*this.c2.y*this.vy+2*this.c2.y*this.c2.vy+2*this.vy*this.y-2*this.c2.vy*this.y

            this.C=this.x**2-2*this.x*this.c2.x+this.c2.x**2+this.c2.y**2+this.y**2-2*this.c2.y*this.y-10000
            
            this.aT2=2*this.a
            this.con1=((-this.b)+Math.sqrt(this.b**2-(4*this.a*this.C)))/this.aT2
            this.con2=((-this.b)-Math.sqrt(this.b**2-(4*this.a*this.C)))/this.aT2
            if(this.con1<this.con2&&this.con1>0){
                this.con=this.con1
            }else{
                if(this.con2>0){
                this.con=this.con2
                }
                else{
                    this.con=null
                }
            }
        this.timer=this.con<this.timer?this.con:this.timer
        this.timer=this.con==null?this.con:this.timer
        console.log(this.timer)
        }
        
        // console.log(this)
}
}else{
        if (this.x+50>innerWidth || this.x-50<0){
            this.vx = -this.vx
            this.timer=0
            }
        if (this.y + 50>innerHeight || this.y-50<0){
            this.vy =-this.vy
            this.timer=0
        }
        console.log(`this before movemant`)
        console.log(this)
        this.x += this.vx;
        this.y += this.vy;
        console.log(`this after movemant`)
        console.log(this)
    }
        c.beginPath()
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.arc(this.x, this.y, 50, 0, 360);
        c.fill();
        console.log(c1)
    }
}
var c1 =[]
//  for(let i=0;i<10;i++){
//     c1[i]= new create("red" ,`hi${i}`);
//  }

c1[0]=new create("blue","1")
c1[1]=new create("red","2")

function animation(){
    c1=canvass.c1
    c.clearRect(0,0,innerWidth,innerHeight);
    // requestAnimationFrame(animation);
    console.log(c1)
    // c1.forEach((ele)=>{ele.update();})
    c1[0].update()
    setTimeout(()=>{console.log(c1)},90)
    setTimeout(()=>{c1[1].update()},100)
    setTimeout(()=>{console.log(c1)},200)
    canvass.c1=c1
    console.log(this.c1)
    
}
canvass["ani"]=function awddd(){
    console.log(this.c1)
    console.debug(c1)
    animation()
}
canvass["con"]=function awddd(){
    console.log(c1)
}
canvass["c1"]=c1
console.log(this)
        }
    }

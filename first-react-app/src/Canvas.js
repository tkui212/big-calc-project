import React, { Component } from "react";
import "./home_page.css";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  render() {
    return (
      <canvas
        id="can_plate"
        height="82%"
        width="window.innerWidth"
        style={{ padding: "0" }}
        ref={this.canvasRef}
      />
    );
  }
  componentDidMount() {
    console.log(this);
    console.log("mount");
    var canvass = document.querySelector("#can_plate");

    canvass.width = window.innerWidth;
    canvass.height = window.innerHeight * 0.82;
    const innerWidth = canvass.width;
    const innerHeight = canvass.height;
    var c = canvass.getContext("2d");
    // c.strokeStyle = "red";
    // c.fillStyle = "red"
    // c.stroke();
    // c.fill()
    function create(color, name) {
      //creating the menu arcs
      this.name = name;
      this.color = color;
      this.x =Math.random()*50+ Math.random()*(innerWidth-100); //setting random x set-up
      this.y =Math.random()*50+ Math.random()*(innerHeight-100) ; //setting random y set-up
      this.vx = Math.random()*5;
      this.vy = Math.random()*5;
      if (this.name === "1") {
        this.x =Math.random()*(innerWidth-100); //setting random x set-up
        this.y =Math.random()*(innerHeight-100) ; //setting random y set-up
        this.vx = Math.random()*5;
        this.vy = Math.random()*5;
      } else {
        this.x =Math.random()*(innerWidth-100); //setting random x set-up
        this.y =Math.random()*(innerHeight-100) ; //setting random y set-up
        this.vx = Math.random()*5;
        this.vy = Math.random()*5;
      }
      console.log("create");
      this.timer = 0;
      this.draw = function() {
        c.beginPath();
        c.fillStyle = this.color;
        c.strokeStyle = this.color;
        c.arc(this.x, this.y, 50, 0, 360);
        c.fill();
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x+this.vx, this.y+this.vy);
        c.stroke();
        c.fill();
      };
      this.calcings = function() {
        this.a =
          this.vx ** 2 -
          2 * this.vx * this.c2.vx +
          this.c2.vx ** 2 +
          this.vy ** 2 -
          2 * this.vy * this.c2.vy +
          this.c2.vy ** 2;

        this.b =
          2 * this.x * this.vx -
          2 * this.vx * this.c2.x -
          2 * this.x * this.c2.vx +
          2 * this.c2.x * this.c2.vx -
          2 * this.c2.y * this.vy +
          2 * this.c2.y * this.c2.vy +
          2 * this.vy * this.y -
          2 * this.c2.vy * this.y;

        this.C =
          this.x ** 2 -
          2 * this.x * this.c2.x +
          this.c2.x ** 2 +
          this.c2.y ** 2 +
          this.y ** 2 -
          2 * this.c2.y * this.y -
          10000;
        this.aT2 = 2 * this.a;
      };
      this.wallQ=function(){
        if (this.x + 50 > innerWidth&&this.vx>0 ) {
            this.vx = -this.vx;
            this.timer = 0;
          }
          if(this.x - 50 < 0&&this.vx<0){
            this.vx = -this.vx;
            this.timer = 0;
          }
          if (this.y + 50 > innerHeight &&this.vy>0){
            this.vy = -this.vy;
            this.timer = 0;
          }
          if( this.y - 50 < 0&&this.vy<0){
            this.vy = -this.vy;
            this.timer = 0;
          }
      }
      this.collisen=function(){
        this.vCollision = { x: this.c2.x - this.x, y: this.c2.y - this.y };
        this.vCollisionNorm = {
            x: this.vCollision.x / this.distance,
            y: this.vCollision.y / this.distance
          };
          this.vRelativeVelocity = {
            x: this.vx - this.c2.vx,
            y: this.vy - this.c2.vy
          };
          this.speed =
            this.vRelativeVelocity.x * this.vCollisionNorm.x +
            this.vRelativeVelocity.y * this.vCollisionNorm.y;
          this.vx -= this.speed * this.vCollisionNorm.x;
          this.vy -= this.speed * this.vCollisionNorm.y;
          this.c2.vx += this.speed * this.vCollisionNorm.x;
          this.c2.vy += this.speed * this.vCollisionNorm.y;
          this.con = 1 - this.con;
          this.x += this.vx * this.con;
          this.y += this.vy * this.con;
          this.c2.x += this.c2.vx * this.con;
          this.c2.y += this.c2.vy * this.con;
      }
      this.draw();
      this.update = function() {
        if (this.name == "1") {
            this.c2 = c1[1];
          } else {
            this.c2 = c1[0];
          }
          this.wallQ()
          this.distance = Math.sqrt(
            (this.c2.x - this.x) ** 2 + (this.c2.y - this.y) ** 2
          );
          if(this.distance<101){
            this.collisen()
            console.log("collisen backup")
          }
        if (this.timer < 2&&this.timer!=null) {
            console.log("tests")
          //cullisen or check for next colissen
        //   console.log("timer<0, need to do calcs");
          // for(let i=0;i<2;i++){
          {
            
            this.c2.wallQ()
            this.vCollision = { x: this.c2.x - this.x, y: this.c2.y - this.y };
            this.distance = Math.sqrt(
              (this.c2.x + this.c2.vx - this.x - this.vx) ** 2 +
                (this.c2.y + this.c2.vy - this.y - this.vy) ** 2
            );
            console.log(this.distance)
            if (this.distance !== 0) {
              //if not me
              console.log("if not me")
              this.calcings();
              this.con1 =
                (-this.b + Math.sqrt(this.b ** 2 - 4 * this.a * this.C)) /
                this.aT2;
              this.con2 =
                (-this.b - Math.sqrt(this.b ** 2 - 4 * this.a * this.C)) /
                this.aT2;
              this.con = null;
              if (this.con1 < this.con2 && this.con1 > 0) {
                this.con = this.con1;
              } else {
                if (this.con2 > 0) {
                  this.con = this.con2;
                }
              }
              if (this.con < 1&&this.con!=null) {
                //if there is goning to be collisen now
                // console.log(this.con)
                // console.log("collisen will happen in less tahn a secend")
                console.log("making collisen")
                this.x += this.vx * this.con;
                this.y += this.vy * this.con;
                this.c2.x += this.c2.vx * this.con;
                this.c2.y += this.c2.vy * this.con;
                this.c2.timer = 0;
                this.distance = Math.sqrt(
                  (this.c2.x - this.x) ** 2 + (this.c2.y - this.y) ** 2
                );
                
                if (this.distance < 101) {//if acsawly collisen happend
                    // console.log("collisen did happen")
                    console.log("making the rest of the collisen")
                  this.collisen()
                }
              }
              else{
                this.x += this.vx;
                this.y += this.vy;
                if(this.timer!=null&&this.timer>0.9){
                    this.timer-=1
                }
              }
              this.distance = Math.sqrt(
                (this.c2.x + this.c2.vx - this.x - this.vx) ** 2 +
                  (this.c2.y + this.c2.vy - this.y - this.vy) ** 2
              );
              this.calcings();
              this.con1 =
                (-this.b + Math.sqrt(this.b ** 2 - 4 * this.a * this.C)) /
                this.aT2;
              this.con2 =
                (-this.b - Math.sqrt(this.b ** 2 - 4 * this.a * this.C)) /
                this.aT2;
              if (this.con1 < this.con2 && this.con1 > 0) {
                this.timer = this.con1;
              } else {
                if (this.con2 > 0) {
                  this.timer = this.con2;
                } else {
                  this.timer = null;
                }
              }
            //   console.log(this.timer);
            }
            // console.log(this)
          }
        } else {
            console.log("normal movemant")
          
        //   console.log(`this before movemant`);
        //   console.log(this);
          this.x += this.vx;
          this.y += this.vy;
          if(this.timer!=null&&this.timer>0.9){
              this.timer-=1
          }
        }
        this.draw();
        // console.log(this.timer);
        // console.log(c1);
        return new Promise(resolve =>{
            setTimeout(() => {
              resolve("a");
            }, 10);})
      };
    }
    let c1 = [new create("blue", "1"), new create("red", "2")];
    //  for(let i=0;i<10;i++){
    //     this.c2= new create("red" ,`hi${i}`);
    //  }

  async function animation() {
      c.clearRect(0, 0, innerWidth, innerHeight);
      // requestAnimationFrame(animation);
    //   console.log(c1[0]);
    //   console.log(c1[1]);
      // c1.forEach((ele)=>{ele.update();})
      await c1[0].update();
      await c1[1].update();
      console.log(c1);
    //   let distance = Math.sqrt(
    //     (c1[0].x - c1[1].x) ** 2 +
    //       (c1[0].y - c1[1].y) ** 2
    //   );
    //   console.log(distance)
    //   if(distance<100){
    //     clearInterval(anil)

    //   }

    }
    var anil=setInterval(() => {
        animation();
    }, 10);
    canvass["ani"] = function awfddd() {
        animation()
    };
    canvass["con"] = function awdddd() {
      console.log(c1);
    };
    
    canvass["anistart"] = function awfddd() {
        anil=setInterval(() => {
            animation();
        }, 10);
        
      };
      canvass["anistop"] = function awdddd() {
        clearInterval(anil)
      };
    canvass["c1"] = c1;
    console.log(this);
  }
}

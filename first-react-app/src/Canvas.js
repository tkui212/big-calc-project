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

        this.x =Math.random()*(innerWidth-100); //setting random x set-up
        this.y =Math.random()*(innerHeight-100) ; //setting random y set-up
        this.vx = Math.random()*10;
        this.vy = Math.random()*10;

      console.log(this);
    //   console.log(c1[0])
      this.timer = 0;
      this.collisenUpdate=async function(){

        for(let i=0;i<c1.length;i++)
        {
            if(c1[i]!=this){
                this.c2=c1[i]
              await this.calcings();
              this.con1 =
                (-this.b + Math.sqrt(this.b ** 2 - 4 * this.a * this.C)) /
                this.aT2;
              this.con2 =
                (-this.b - Math.sqrt(this.b ** 2 - 4 * this.a * this.C)) /
                this.aT2;
              if (this.con1 < this.con2 && this.con1 > 0) {
                if(this.timer!=null&&this.timer>=this.con1){
                this.timer = this.con1;
                }
              } else {
                if (this.con2 > 0) {
                  this.timer = this.con2;
                } else {
                  this.timer = null;
                }
              }
              if(this.timer<1&&this.timer!=null){
                  this.con=this.timer
              }
              if(this.timer!=null){
                  this.collider=this.c2
                  console.log("")
                  console.log(this)
                  console.log(this.collider)
                  console.log(this.timer)
                  console.log("")
                  if(this.collider.timer!=this.timer&&this.collider.timer>this.timer){
                      await this.collider.collisenUpdate();
                  }
              }
            }
        }
        return new Promise(resolve =>{resolve("collupdate")})
      }
      this.isCollisen=function(){
        return this.timer<1&&this.timer!=null
      }
      this.normalMove=async function(){
        this.x += this.vx;
          this.y += this.vy;
          if(this.timer!=null&&this.timer>=1){
              this.timer-=1
          }
      }
      this.collisenExe=async function(){
        this.x += this.vx * this.con;
                this.y += this.vy * this.con;
                this.collider.x += this.collider.vx * this.con;
                this.collider.y += this.collider.vy * this.con;
                this.collider.timer = 0;
                this.distance = Math.sqrt(
                  (this.collider.x - this.x) ** 2 + (this.collider.y - this.y) ** 2
                );
                if (this.distance < 101) {//if acsawly collisen happend
                    this.con=1-this.con
                    await this.collisen()
                }
                else{
                    console.error("collisen failed")
                    console.error(c1)
                    console.error(this)
                }
                this.collisenUpdate()
                this.collider.collisenUpdate()
      }
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
        c.strokeStyle = "white";
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x+this.vx*this.timer, this.y+this.vy*this.timer);
        c.stroke();
        c.fill();

        
        return new Promise(resolve =>{resolve("draw")})
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
        return new Promise(resolve =>{resolve("calcs")})
      };
      this.wallQ=function(){
          let is=false
        if (this.x + 50 > innerWidth&&this.vx>0 ) {
            this.vx = -this.vx;
            this.timer = 0;
            is=true
          }
          if(this.x - 50 < 0&&this.vx<0){
            this.vx = -this.vx;
            this.timer = 0;
            is=true
          }
          if (this.y + 50 > innerHeight &&this.vy>0){
            this.vy = -this.vy;
            this.timer = 0;
            is=true
          }
          if( this.y - 50 < 0&&this.vy<0){
            this.vy = -this.vy;
            this.timer = 0;
            is=true
          }
          return is
          
      }
      this.collisen=function(){
        this.distance = Math.sqrt(
            (this.collider.x - this.x) ** 2 + (this.collider.y - this.y) ** 2
          );
        this.vCollision = { x: this.collider.x - this.x, y: this.collider.y - this.y };
        this.vCollisionNorm = {
            x: this.vCollision.x / this.distance,
            y: this.vCollision.y / this.distance
          };
          this.vRelativeVelocity = {
            x: this.vx - this.collider.vx,
            y: this.vy - this.collider.vy
          };
          this.speed =
            this.vRelativeVelocity.x * this.vCollisionNorm.x +
            this.vRelativeVelocity.y * this.vCollisionNorm.y;
          this.vx -= this.speed * this.vCollisionNorm.x;
          this.vy -= this.speed * this.vCollisionNorm.y;
          this.collider.vx += this.speed * this.vCollisionNorm.x;
          this.collider.vy += this.speed * this.vCollisionNorm.y;
          this.con = 1 - this.con;
          this.x += this.vx * this.con;
          this.y += this.vy * this.con;
          this.collider.x += this.collider.vx * this.con;
          this.collider.y += this.collider.vy * this.con;
          return new Promise(resolve =>{resolve("colli")})
      }
      this.draw();
      this.update = async function() {
        if(this.wallQ()||this.timer<1){
            await this.collisenUpdate()
        }
        if(this.isCollisen()){
            this.collisenExe()
        }
        else{
            this.normalMove()
        }

        await this.draw();
        return new Promise(resolve =>{resolve("a");})
      };
      return this
    }
    var c1 = [new create("blue", "1"), new create("red", "2"),new create("green", "3"), new create("yellow", "4")];
    console.log(c1)
    //  for(let i=0;i<10;i++){
    //     this.c2= new create("red" ,`hi${i}`);
    //  }

  async function animation() {
      c.clearRect(0, 0, innerWidth, innerHeight);
      await c1[0].update();
      await c1[1].update();
      await c1[2].update();
      await c1[3].update();

    }
    var anil=setInterval(() => {
        animation();
    }, 100);
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

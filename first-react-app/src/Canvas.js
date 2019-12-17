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
      this.timer = [];
      this.collider = [];
        this.combine=[]
      this.collisenUpdate=async function(){
        this.timer=[]
        this.collider=[]
        let counter=0
        for(let i=0;i<c1.length;i++)
        {
            if(c1[i]!=this){
                this.c2=c1[i]
                
              await this.calcings();
              this.aT2 = 2 * this.a;
        this.con1 =
                (-this.b + Math.sqrt(this.b ** 2 - 4 * this.a * this.C)) /
                this.aT2;
              this.con2 =
                (-this.b - Math.sqrt(this.b ** 2 - 4 * this.a * this.C)) /
                this.aT2;
                let is=true
              if (this.con1 < this.con2 && this.con1 > 0) {
                this.timer[counter] = this.con1;
                this.collider[counter]=this.c2
              } else if (this.con2 > 0) {
                  this.timer[counter] = this.con2;
                  this.collider[counter]=this.c2
                }
                else{
                    is=false
                    counter--
                }
                counter++
              }
            //   if(this.timer==NaN){
            //     console.error("timer cant be nan")
            //   }
              
            }
          
          for(let i=0;i<this.timer.length;i++){
            //   if()
            for(let j=0;j<this.timer.length-1;j++){
              if(this.timer[j]>this.timer[j+1]){
                let help=this.timer[j]
                this.timer[j]=this.timer[j+1]
                this.timer[j+1]=help
                help=this.collider[j]
                this.collider[j]=this.collider[j+1]
                this.collider[j+1]=help
              }
            }
          }
              if(this.timer.length>0){
                  // this.collider=this.c2
                  console.log("")
                  console.log()
                  console.log(this.color+" new collider= "+this.collider[0].color)
                  // console.log("")
                  // console.log(this)
                  // console.log(this.collider)
                  // console.log(this.timer)
                  // console.log("")
                  console.log("this timer="+this.timer[0]+" collider timer="+this.collider[0].timer[0])
                  console.log("")
                  console.log("updatie to collider?="+this.collider[0].timer.length==0||this.collider[0].timer[0]!==this.timer[0]&&this.collider[0].timer[0]>this.timer[0])

                  if(this.collider[0].timer.length==0||this.collider[0].timer[0]!==this.timer[0]&&this.collider[0].timer[0]>this.timer[0]){
                      await this.collider[0].collisenUpdate();
                  }
                  if(this.collider[0].collider[0]!=this){
                      for(let item of this.timer){
                            item=-1
                        }

                  }
              }
        return new Promise(resolve =>{resolve("collupdate")})
      }
      this.sortC=function(){
          for(let i=0;i<this.timer.length;i++){
              this.combine[i]={T:this.timer[i],C:this.collider[i]}
          }
        this.combine=this.combine.filter((value)=>{return value.T!=0?true:false})
        this.combine=this.combine.sort((a,b)=>{return b.T>a.T?-1:1})
        for(let i=0;i<this.combine.length;i++){
            this.timer[i]=this.combine[i].T
            this.collider[i]=this.combine[i].C
        }
        return new Promise(resolve =>{resolve("end")})
      }
      this.isCollisen=function(){
        // console.log(this)
        return this.timer.length!=0&&this.timer[0]<1
      }
      this.normalMove=async function(){
        this.x += this.vx;
          this.y += this.vy;
          if(this.timer.length>0&&this.timer[0]>=1){
            for(let item of this.timer){
                item=-1
            }
          }
          return new Promise(resolve =>{resolve("end")})
      }
      this.moveTimesCon=function(){
        this.x += this.vx * this.con;
        this.y += this.vy * this.con;
        this.collider[0].x += this.collider[0].vx * this.con;
        this.collider[0].y += this.collider[0].vy * this.con;
        return new Promise(resolve =>{resolve("end")})
      }
      this.collisenExe=async function(){
          this.con=this.timer[0]
          console.log(this)
        await this.moveTimesCon()
        console.log(this)
        for(let i=0;i<this.timer.length;i++){
            this.timer[i]-=this.con
        }
        let M=this.collider[0]
        await this.sortC()
        console.log(this)
                this.distance = Math.sqrt(
                  (M.x - this.x) ** 2 + (M.y - this.y) ** 2
                );
                if (this.distance < 101) {//if acsawly collisen happend
                    this.con=1-this.con
                    if(this.timer.length>1){
                    while(this.timer.length>1&&this.con>this.timer[0]){
                        
                        let R=this.con
                        this.con=this.timer[0]
                        await this.collisen()
                        await this.moveTimesCon()
                        for(let i=0;i<this.timer.length;i++){
                            this.timer[i]-=this.con
                        }
                        await this.sortC()
                        this.com=R-this.con

                    }
                    }
                    await this.collisen()
                }
                else{
                    console.error("collisen failed")
                    console.error(c1)
                    console.error(this)
                }
                for(let item of this.timer){
                    item=-1
                }
                for(let item of this.collider[0].timer){
                    item=-1
                }
                return new Promise(resolve =>{resolve("colExe")})
                
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
        c.lineTo(this.x+this.vx*this.timer[0], this.y+this.vy*this.timer[0]);
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
        return new Promise(resolve =>{resolve("calcs")})
      };
      this.wallQ=function(){
          let is=false
        if (this.x + 50 > innerWidth&&this.vx>0 ) {
            this.vx = -this.vx;
            is=true
          }
          if(this.x - 50 < 0&&this.vx<0){
            this.vx = -this.vx;
            is=true
          }
          if (this.y + 50 > innerHeight &&this.vy>0){
            this.vy = -this.vy;
            is=true
          }
          if( this.y - 50 < 0&&this.vy<0){
            this.vy = -this.vy;
            is=true
          }
          // if(is){console.log("wall")}
          return is
      }
      this.collisen=function(){
        this.distance = Math.sqrt(
            (this.collider[0].x - this.x) ** 2 + (this.collider[0].y - this.y) ** 2
          );
        this.vCollision = { x: this.collider[0].x - this.x, y: this.collider[0].y - this.y };
        this.vCollisionNorm = {
            x: this.vCollision.x / this.distance,
            y: this.vCollision.y / this.distance
          };
          this.vRelativeVelocity = {
            x: this.vx - this.collider[0].vx,
            y: this.vy - this.collider[0].vy
          };
          this.speed =
            this.vRelativeVelocity.x * this.vCollisionNorm.x +
            this.vRelativeVelocity.y * this.vCollisionNorm.y;
          this.vx -= this.speed * this.vCollisionNorm.x;
          this.vy -= this.speed * this.vCollisionNorm.y;
          this.collider[0].vx += this.speed * this.vCollisionNorm.x;
          this.collider[0].vy += this.speed * this.vCollisionNorm.y;
          return new Promise(resolve =>{resolve("colli")})
      }
      this.draw();
      this.update = async function() {
        if(this.wallQ()||this.timer.length==0){
          // console.log(this.color+" update "+this.timer)
            await this.collisenUpdate()
        }
        if(this.isCollisen()){
          console.log(this.color+" executing on "+this.collider[0].color)

            await this.collisenExe()
        }
        else{
          // console.log(this.color+" normal")

            await this.normalMove()
        }

        await this.draw();
        return new Promise(resolve =>{resolve("a");})
      };
      return this
    }

    var c1 = []
    for(let i=0;i<10;i++){
      c1[i]=new create("red",i)
    }
    // [new create("blue", "1"), new create("red", "2"),new create("green", "3"), new create("yellow", "4")];
    console.log(c1)
    //  for(let i=0;i<10;i++){
    //     this.c2= new create("red" ,`hi${i}`);
    //  }

  async function animation() {
      c.clearRect(0, 0, innerWidth, innerHeight);
      for(let i=0;i<c1.length;i++){
        await c1[i].update();

      }
      // await c1[1].update();
      // await c1[2].update();
      // await c1[3].update();

    }
    var anil=setInterval(() => {
        animation();
    }, 50);
    canvass["ani"] = function awfddd() {
        animation()
    };
    canvass["con"] = function awdddd() {
      console.log(c1);
    };
    canvass["anistart"] = function awfddd() {
        anil=setInterval(() => {
            animation();
        }, 50);
      };
      canvass["anistop"] = function awdddd() {
        clearInterval(anil)
      };
    canvass["c1"] = c1;
    console.log(this);
  }
}

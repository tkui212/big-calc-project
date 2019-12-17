import React, { Component } from "react";
import "./home_page.css";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <canvas
      //   id=
      //   height=
      //   width=
      //   style={{ padding: "0" }}
      //   ref={this.canvasRef}
      // />
      <svg version="1.1" id="svg" x="0px" y="0px"
      width="100%" height="82%" >
    
  </svg>
      
    );
  }
  componentDidMount() {
    var stringify = require('json-stringify-safe');
    function log(text) {
      console.log(JSON.parse(stringify(text)))
      }
    var svg = document.querySelector("#svg");

    // svg.width = window.innerWidth;
    // svg.height = window.innerHeight * 0.82;
    const innerWidth = svg.clientWidth;
    const innerHeight = svg.clientHeight;
    // c.strokeStyle = "red";
    // c.fillStyle = "red"
    // c.stroke();
    // c.fill()
    function create(color, name) {
      //creating the menu arcs
      this.name = name;
      this.color = color;
      this.timer = [];
      this.collider = [];
        this.combine=[];
        this.block=false;
      // this.x =Math.random()*(innerWidth-100); //setting random x set-up
      //   this.y =Math.random()*(innerHeight-100) ; //setting random y set-up
      //   this.vx = Math.random()*10;
      //   this.vy = Math.random()*10;
      if(this.name=="0"){
        this.color="red"
        this.x =250
        this.y =300
        this.vx =0
        this.vy =0
      }
      else if(this.name=="1"){
        this.color="blue"

        this.x =131
        this.y =300
        this.vx =10
        this.vy =0
      }
      else if(this.name=="2"){
        this.color="green"

        this.x =362
        this.y =300
        this.vx =-10
        this.vy =0
      }
      else if(this.name=="3"){
        this.color="yellow"

        this.x =250
        this.y =413
        this.vx =0
        this.vy =-10
      }
      svg.innerHTML+= ` <circle id="${this.name}" cx="${this.x}" cy="${this.y}" r="${50}" stroke="${this.color}" stroke-width="${0}" fill="${this.color}" style="" />`
      svg.innerHTML+= ` <line id="${this.name}V" x1="${this.x}" y1="${this.y}" x2="${this.x+this.vx}" y2="${this.y+this.vy}" style="stroke:black;stroke-width:2" />`
      svg.innerHTML+= ` <line id="${this.name}ColliP" x1="${this.x}" y1="${this.y}" x2="${this.x+this.vx*0}" y2="${this.y+this.vy*0}" style="stroke:white;stroke-width:2" />`
    //   console.log(c1[0])
      this.setElements=function(){
        this.elem=document.getElementById(`${this.name}`)
        this.Vline=document.getElementById(`${this.name}V`)
        this.colliP=document.getElementById(`${this.name}ColliP`)
        return new Promise(resolve =>{resolve("collupdate")})

      }
      this.collisens=async function(){
        console.log(this.color+" collisens ")
        // this.timer=[]
        // this.collider=[]
        this.combine=[]
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
                this.combine[counter] = {T:this.con1,C:this.c2,This:this};
              } else if (this.con2 > 0) {
                this.combine[counter] = {T:this.con2,C:this.c2,This:this};
                }
                else{
                    is=false
                    counter--
                }
                counter++
              }
            }
            this.sortC()
            return this.combine
      }
      this.sortC=function(){
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
          // if(this.timer.length>0&&this.timer[0]>=1){
          //   for(let i=0;i<this.timer.length;i++){
          //       this.timer[i]-=1
          //   }
          // }
          return new Promise(resolve =>{resolve("end")})
      }
      this.moveTimesCon=function(con){
        this.x += this.vx * con;
        this.y += this.vy * con;
        // this.collider.x += this.collider.vx * con;
        // this.collider.y += this.collider.vy * con;
        return new Promise(resolve =>{resolve("end")})
      }
      this.collisenExe=async function(collider,timer){

          this.con=timer
          this.collider=collider
          console.log(this.color+" executing on "+this.collider.color)
          // log(this)
        // await this.moveTimesCon()
        // log(this)
        await queue.moveAll(this.con)
        await queue.removeTime(this.con)
        // timer-=this.con
        // let M=this.collider
        // await this.sortC()
        log(this)
                this.distance = Math.sqrt(
                  (this.collider.x - this.x) ** 2 + (this.collider.y - this.y) ** 2
                );
                if (this.distance < 101) {//if acsawly collisen happend
                    // this.con=1-this.con
                    // if(this.timer.length>1){
                    // while(this.timer.length>1&&this.con>this.timer[0]){
                    //     let R=this.con
                    //     this.con=this.timer[0]
                        await this.collisen()
                        await this.moveTimesCon(this.con)
                        await this.collider.moveTimesCon(this.con)
                        // for(let i=0;i<this.timer.length;i++){
                        //     this.timer[i]-=this.con
                        // }
                        // await this.sortC()
                        // this.com=R-this.con

                    // }
                    // }
                    // else{
                    // await this.collisen()
                    // }
                                                    }
                else{
                    console.error("collisen failed")
                    console.error(c1)
                    console.error(this)
                }
                queue.remove(this.collider.name)
                queue.remove(this.name)
                this.draw()
                this.collider.draw()
                return new Promise(resolve =>{resolve("colExe")})

      }
      this.draw = function() {
        this.elem.attributes[1].value=this.x
        this.elem.attributes[2].value=this.y
        this.Vline.attributes[1].value=this.x
        this.Vline.attributes[2].value=this.y
        this.Vline.attributes[3].value=this.x+this.vx
        this.Vline.attributes[4].value=this.y+this.vy
        let tt=this.timer[0]>0?this.timer[0]:0
        this.colliP.attributes[1].value=this.x
        this.colliP.attributes[2].value=this.y
        this.colliP.attributes[3].value=this.x+this.vx*tt
        this.colliP.attributes[4].value=this.y+this.vy*tt

        return new Promise(resolve =>{resolve("end")})
        // this.elem.cy=this.y
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
          return new Promise(resolve =>{resolve("colli")})
      }
      this.update = async function() {
        // console.log(this.color+" up ")
        if(this.wallQ()||this.timer.length==0){
            await this.collisenUpdate()
        }
        if(this.isCollisen()){

            await this.collisenExe()
        }
        else{
          console.log(this.color+" normal")
            await this.normalMove()
        }

        await this.draw();
        this.block=false
        return new Promise(resolve =>{resolve("a");})
      };
      return this
    }
    var c1 = []
    // var c1 = [new create("red","0"),new create("blue","1")]
    var queue={
      TC:[],
      arr:[],
      second:1,
      filter:function(){
        queue.TC=queue.TC.filter((value)=>{return value.T!=0?true:false})
        return new Promise(resolve =>{resolve("a");})
      },
      sort:function(){
        queue.TC=queue.TC.sort((a,b)=>{return parseInt(b.T)>parseInt(a.T)?-1:1})
        return new Promise(resolve =>{resolve("a");})
      },
        remove:function(a){
          queue.arr=queue.arr.filter((value)=>{return value.name==a?false:true})
          return new Promise(resolve =>{resolve("a");})
        },
        removeTime:function(num){
          for(let ele of queue.TC){
            ele.T-=num
          }
          queue.second-=num
          queue.TC=queue.TC.filter((value)=>{return value.name==num?false:true})
          return new Promise(resolve =>{resolve("a");})
        },
        getCsInSecond:function(){
          let i=0
          log(queue)
          while(queue.TC[i].T<1){
            if(queue.TC.length>i&&queue.TC[i+1].T<1){
              i++
            }
            else{
              return i
            }
          }
console.error("there is no Cs in this second")
          return null
        },
        length: function(){
          return queue.arr.length
        },
        set:async function(a){
          queue.arr=a
          await queue.sort()
          return new Promise(resolve =>{resolve("a");})
        },
        lastCollider:async function(){
          let i=0
          while(queue.CT[i].T<1){
            if(queue.CT.length<i&&queue.CT[i+1].T<1){
              i++
            }
            else{
              return queue.CT[i]
            }
          }
console.error("there is no timers that are <1")
          return null
        },
        runQueue:async function(){
          queue.second=1
          if(queue.TC.length==0){//if not set
            for(let i=0;i<queue.length();i++){
              queue.TC=queue.TC.concat(await queue.arr[i].collisens())
            }
            await queue.sort()

          }
          if(queue.TC[0].T<1){//there is collisen in this second
            let Css=queue.getCsInSecond()
            console.log(Css)
            for(let i=0;i<Css;i++){
              console.log(queue.TC[i])
              await queue.TC[i].This.collisenExe(queue.TC[i].C,queue.TC[i].T)
            }
            await queue.moveAll(queue.second)
          }
          for(let i=0;i<queue.length();){//all the others
            await queue.arr[i].normalMove()
            await queue.remove(queue.arr[i].name)

          }
          return new Promise(resolve =>{resolve("end");})
        },
        moveAll:async function(num){
          for(let i=0;i<c1.length;i++){
            await c1[i].moveTimesCon(num)
          }
          return new Promise(resolve =>{resolve("end");})
        }
    }
    for(let i=0;i<4;i++){
      c1[i]=new create("red",i)
    }
    c1.forEach(element => {
      element.setElements()
    });


  async function animation() {
       await queue.set(c1);
      await queue.runQueue()
    }
    var anil=setInterval(() => {
        animation();
    }, 1000);
    svg["ani"] = function awfddd() {
        animation()
    };
    svg["con"] = function awdddd() {
      console.log(c1);
    };
    svg["anistart"] = function awfddd() {
        anil=setInterval(() => {
            animation();
        }, 1000);
      };
      svg["anistop"] = function awdddd() {
        clearInterval(anil)
      };
    svg["c1"] = c1;
    console.log(this);
  }
}

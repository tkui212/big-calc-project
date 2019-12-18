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
    const Big = require('big.js');
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
      this.collisens=function(){
        console.log(this.color+" collisens ")
        // this.timer=[]
        // this.collider=[]
        this.combine=[]
        let counter=0
        for(let i=0;i<c1.length;i++)
        {
            if(c1[i]!=this){
                this.c2=c1[i];
                console.log(this.calcings())
                if(this.calcings()!=null){
                this.combine[counter] = {T:this.calcings(),C:this.c2,This:this};
                counter++
                }
                
              }
            }
            return this.sortC()
      }
      this.sortC=function(){
        this.combine=this.combine.filter((value)=>{return value.T!=0?true:false})
        this.combine=this.combine.sort((a,b)=>{return b.T>a.T?-1:1})
        for(let i=0;i<this.combine.length;i++){
            this.timer[i]=this.combine[i].T
            this.collider[i]=this.combine[i].C
        }
        return this.combine
      }
      this.isCollisen=function(){
        // console.log(this)
        return this.timer.length!=0&&this.timer[0]<1
      }
      this.normalMove=async function(){
        this.x = Big(this.vx).plus(this.x).toString();
        this.y = Big(this.vy).plus(this.y).toString();
        await this.draw()
          // if(this.timer.length>0&&this.timer[0]>=1){
          //   for(let i=0;i<this.timer.length;i++){
          //       this.timer[i]-=1
          //   }
          // }
          return new Promise(resolve =>{resolve("end")})
      }
      this.moveTimesCon= async function(con){
        // console.error(Big(this.vx).times(con).plus(this.x).toString())
        this.x = Big(this.vx).times(con).plus(this.x).toString();
        this.y = Big(this.vy).times(con).plus(this.y).toString();
        
        await this.draw()
        // this.collider.x += this.collider.vx * con;
        // this.collider.y += this.collider.vy * con;
        return new Promise(resolve =>{resolve("end")})
      }
      this.collisenExe=async function(collider,timer){

          this.con=timer
          this.collider=collider
          let collies=this.collisens()
          console.log(collies)
          if(collies[0].T==timer){
          console.log(this.color+" executing on "+this.collider.color)
          // log(this)
        // await this.moveTimesCon()
        // log(this)
        await queue.moveAll(this.con)
        await queue.removeTime(this.con)
        // timer-=this.con
        // let M=this.collider
        // await this.sortC()
        // log(this)
                this.distance = Math.sqrt(
                  Big(Big(this.collider.x).minus(this.x).pow(2).toString()).plus(Big(this.collider.y).minus(this.y).pow(2).toString()).toString()
                );
                if (this.distance < 101) {//if acsawly collisen happend
                    // this.con=1-this.con
                    // if(this.timer.length>1){
                    // while(this.timer.length>1&&this.con>this.timer[0]){
                    //     let R=this.con
                    //     this.con=this.timer[0]
                        await this.collisen()
                        await queue.getCsInSecond()[0].C.draw()
                        await queue.getCsInSecond()[0].This.draw() 
                        await queue.updateEl([this.name,this.collider.name])
                        // await this.moveTimesCon(this.con)
                        // await this.collider.moveTimesCon(this.con)
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
                    console.error(queue.TC)
                    console.error(this)
                }
                queue.remove(this.collider.name)
                queue.remove(this.name)
                this.draw()
                this.collider.draw()
            }
            else{
                console.error("collisen imposeble")
            }
                return new Promise(resolve =>{resolve("colExe")})

      }
      this.draw = function() {
        this.elem.attributes[1].value=this.x
        this.elem.attributes[2].value=this.y
        this.Vline.attributes[1].value=this.x
        this.Vline.attributes[2].value=this.y
        this.Vline.attributes[3].value=Big(this.x).plus(this.vx).toString()
        this.Vline.attributes[4].value=Big(this.y).plus(this.vy).toString()
        let tt=this.timer[0]>0?this.timer[0]:0
        this.colliP.attributes[1].value=this.x
        this.colliP.attributes[2].value=this.y
        this.colliP.attributes[3].value=Big(this.x).plus(this.vx).times(tt).toString()
        this.colliP.attributes[4].value=Big(this.y).plus(this.vy).times(tt).toString()

        return new Promise(resolve =>{resolve("end")})
        // this.elem.cy=this.y
      };
      this.calcings=function() {
        this.a =
          Big(this.vx).pow(2)
           .minus(Big(2).times(this.vx).times(this.c2.vx))
           .plus(Big(this.c2.vx).pow(2).toString())
           .plus(Big(this.vy).pow(2).toString())
           .minus(Big(2).times(this.vy).times(this.c2.vy).toString())
           .plus(Big(this.c2.vy).pow(2).toString())

        this.b =
          Big(2).times (this.x) .times (this.vx) 
          .minus(
          Big(2) .times (this.vx) .times (this.c2.x) )
          .minus(
          Big(2) .times (this.x) .times (this.c2.vx)) 
          .plus(
          Big(2) .times (this.c2.x) .times (this.c2.vx))
          .minus(
          Big(2) .times (this.c2.y) .times (this.vy)) 
          .plus(
          Big(2) .times (this.c2.y) .times (this.c2.vy)) 
          .plus(
          Big(2) .times (this.vy) .times (this.y)) 
          .minus(
          Big(2) .times (this.c2.vy) .times (this.y))

        this.C =
          (this.x) .pow( 2) .minus(
          (2) .times (this.x) .times (this.c2.x) .plus(
          (this.c2.x) .pow( 2) .plus(
          (this.c2.y) .pow( 2) .plus(
          (this.y) .pow( 2) .minus(
          (2) .times (this.c2.y) .times (this.y) .minus(
          10000;
          
          this.aT2 = (2) .times (this.a)

        this.con1 =
                ((-this.b) .plus( Math.sqrt((this.b) .pow( 2) .minus( 4 .times (this.a) .times (this.C)) /
                (this.aT2);
              this.con2 =
                ((-this.b) .minus( Math.sqrt((this.b) .pow( 2) .minus( 4 .times (this.a) .times (this.C)) /
                (this.aT2);
                if (this.con1 < this.con2 && this.con1 > 0) {
                    return this.con1
                  } else if (this.con2 > 0) {
                    return this.con2
                    }
                    else{
                        return null
                    }
      }
      this.wallQ=function(){
          let is=false
        if (this.x .plus( 50 > innerWidth&&this.vx>0 ) {
            this.vx = -this.vx;
            is=true
          }
          if(this.x .minus( 50 < 0&&this.vx<0){
            this.vx = -this.vx;
            is=true
          }
          if (this.y .plus( 50 > innerHeight &&this.vy>0){
            this.vy = -this.vy;
            is=true
          }
          if( this.y .minus( 50 < 0&&this.vy<0){
            this.vy = -this.vy;
            is=true
          }
          // if(is){console.log("wall")}
          return is
      }
      this.collisen=function(){
        this.distance = Math.sqrt(
            (this.collider.x .minus( this.x) .pow( 2) .plus( (this.collider.y .minus( this.y) .pow( 2)
          );
        this.vCollision = { x: this.collider.x .minus( this.x, y: this.collider.y .minus( this.y };
        this.vCollisionNorm = {
            x: this.vCollision.x / this.distance,
            y: this.vCollision.y / this.distance
          };
          this.vRelativeVelocity = {
            x: this.vx .minus( this.collider.vx,
            y: this.vy .minus( this.collider.vy
          };
          this.speed =
            this.vRelativeVelocity.x .times this.vCollisionNorm.x .plus(
            this.vRelativeVelocity.y .times this.vCollisionNorm.y;
          this.vx .minus(= this.speed .times this.vCollisionNorm.x;
          this.vy .minus(= this.speed .times this.vCollisionNorm.y;
          this.collider.vx .plus(= this.speed .times this.vCollisionNorm.x;
          this.collider.vy .plus(= this.speed .times this.vCollisionNorm.y;
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
      this.expendNums = async function() {
        
        return new Promise(resolve =>{resolve("a");})
      };
      return this
    }
    Array.prototype.filterDup=function(){
        let arra=[this[0]]
        for(let i=0;i<this.length;i++){
            let is=true
            for(let j=0;j<arra.length;j++){
                if(arra[j]==this[i]){
                    is=false
                    break;
                }
            }
            if(is){
                arra.push(this[i])
            }
        }
        // this=arra
        return arra
    }
    var c1 = []
    // var c1 = [new create("red","0"),new create("blue","1")]
    var queue={
      TC:[],
      arr:[],
      second:1,
      updateEl: async function(ar){

        let removed=[]
        for(let i=0;i<ar.length;i++){
            queue.TC=queue.TC.filter((value)=>{
                let is=false
                if(ar[i]==value.C.name||ar[i]==value.This.name){
                    removed.push(value.This)
                    removed.push(value.C)
                }
                else{
                    is=true
                }
                return is})

        }
        removed=removed.filterDup()
        if(removed[0]==undefined){
            removed=ar
        }
        for(let i=0;i<removed.length;i++){
            queue.TC=queue.TC.concat(await removed[i].collisens())
        }
        // await queue.filterDup(ar)
        await queue.sort()
        if(queue.TC[0]==undefined){
            queue.TC=[]
        }
        return new Promise(resolve =>{resolve("a");})
      },
      filter:function(){
        queue.TC=queue.TC.filter((value)=>{return value.T!=0?true:false})
        return new Promise(resolve =>{resolve("a");})
      },
      filterDup:function(){
          let arra=[queue.TC[0]]
          for(let i=0;i<queue.TC.length;i++){
              let is=true
              for(let j=0;j<arra.length;j++){
                  if(arra[j].T==queue.TC[i].T){
                      is=false
                      break;
                  }
              }
              if(is){
                  arra.push(queue.TC[i])
              }
          }
          queue.TC=arra
          return new Promise(resolve =>{resolve("a");})
      },
      sort: async function(){

        await queue.filterDup()
        queue.TC=queue.TC.sort((a,b)=>{return b.T>a.T?-1:1})
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
        //   log(queue)
        let ar=[]
          for(let i=0;i<queue.TC.length;i++){
              if(queue.TC[i].T<1){
                ar.push(queue.TC[i])
              }
              else{
                //   console.log(ar+" a")
                  return ar
              }
          }
        //   console.log(ar+" b")
          return ar
        },
        length: function(){
          return queue.arr.length
        },
        set:async function(a){
          queue.arr=a
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
        //   if(queue.TC.length==0||queue.TC==0){//if not set
        //     console.log("setting TC")
        //     for(let i=0;i<queue.length();i++){
        //       queue.TC=queue.TC.concat(await queue.arr[i].collisens())
        //     }
        //     await queue.sort()

        //   }
          if(queue.TC[0]==undefined){
            queue.TC=[]
        }
          if(queue.getCsInSecond().length>0){//there is collisen in this second
            log(queue.getCsInSecond().length)
            console.log("starting collisens")

            while(queue.getCsInSecond().length>0){
                let elle=queue.getCsInSecond()[0]
                await elle.This.collisenExe(elle.C,elle.T)
                if(queue.TC.length!=0||queue.TC!=0){
                await queue.filter()
                await queue.sort()
                }
                else{
                    await queue.moveAll(queue.second)
                }
            }
          }
          else{
            // console.log("normal for all")

            await queue.moveAll(queue.second)
            await queue.removeTime(queue.second)
            
          }
          log(queue.TC)
          return new Promise(resolve =>{resolve("end");})
        },
        moveAll:async function(num){
            let is=false
            for(let i=0;i<c1.length;i++){
                if(c1[i].wallQ()){
                    is=true
                    console.log("update cus wall collisen")
                    await queue.updateEl([c1[i]])
                }
            }
            if(is){
                console.log("runing new collisens becus wall")
                await queue.runCollisens()
            }
            else{
                for(let i=0;i<c1.length;i++){
                    await c1[i].moveTimesCon(num)
                }
            }
          
          return new Promise(resolve =>{resolve("end");})
        },
        runCollisens:async function(){
            if(queue.getCsInSecond().length>0){//there is collisen in this second
                log(queue.getCsInSecond().length)
                console.log("starting collisens after wall collisen")
    
                while(queue.getCsInSecond().length>0){
                    let elle=queue.getCsInSecond()[0]
                    await elle.This.collisenExe(elle.C,elle.T)
                    if(queue.TC.length!=0||queue.TC!=0){
                    await queue.filter()
                    await queue.sort()
                    }
                }
              }
          return new Promise(resolve =>{resolve("end");})
        }
    }
    
async function startup(){
    for(let i=0;i<4;i++){
        c1[i]=new create("red",i)
      }
      c1.forEach(element => {
        element.setElements()
      });
        console.log("setting TC")
        for(let i=0;i<c1.length;i++){
          queue.TC=queue.TC.concat(await c1[i].collisens())
        }
        await queue.sort()
        anil=setInterval(async function() {
            animation();
        }, 500);
        
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
    }
    setTimeout(()=>{startup()},100)

  async function animation() {
       await queue.set(c1);
      await queue.runQueue()
    }
    var anil
    
    console.log(this);
  }
}

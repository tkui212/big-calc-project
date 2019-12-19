import React, {
  Component
} from "react";
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
      <svg version = "1.1"
      id = "svg"
      x = "0px"
      y = "0px"
      width = "100%"
      height = "82%" >

      </svg>

    );
  }
  componentDidMount() {
    const exactMath = require('exact-math');
    // console.log(exactMath.formula('4**2'))

    var stringify = require('json-stringify-safe');

    function log(text) {
      return JSON.parse(stringify(text))
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
      this.timer = 0;
      this.collider = [];
      this.combine = [];
      this.block = false;
      // this.x =Math.random()*(innerWidth-100); //setting random x set-up
      //   this.y =Math.random()*(innerHeight-100) ; //setting random y set-up
      //   this.vx = Math.random()*10;
      //   this.vy = Math.random()*10;
      if (this.name == "0") {
        this.color = "red"
        this.x = 250
        this.y = 300
        this.vx = 0
        this.vy = 0
      } else if (this.name == "1") {
        this.color = "blue"

        this.x = 131
        this.y = 300
        this.vx = 10
        this.vy = 0
      } else if (this.name == "2") {
        this.color = "green"

        this.x = 362
        this.y = 300
        this.vx = -10
        this.vy = 0
      } else if (this.name == "3") {
        this.color = "yellow"

        this.x = 250
        this.y = 413
        this.vx = 0
        this.vy = -10
      }
      svg.innerHTML += ` <circle id="${this.name}" cx="${this.x}" cy="${this.y}" r="${50}" stroke="${this.color}" stroke-width="${0}" fill="${this.color}" style="" />`
      svg.innerHTML += ` <line id="${this.name}V" x1="${this.x}" y1="${this.y}" x2="${this.x+this.vx}" y2="${this.y+this.vy}" style="stroke:black;stroke-width:2" />`
      svg.innerHTML += ` <line id="${this.name}ColliP" x1="${this.x}" y1="${this.y}" x2="${this.x+this.vx*0}" y2="${this.y+this.vy*0}" style="stroke:white;stroke-width:2" />`
      //   console.log(c1[0])
      this.setElements = function () {
        this.elem = document.getElementById(`${this.name}`)
        this.Vline = document.getElementById(`${this.name}V`)
        this.colliP = document.getElementById(`${this.name}ColliP`)
        return new Promise(resolve => {
          resolve("collupdate")
        })

      }
      this.disTest=function(time,collider){
        let x=exactMath.formula(`${collider.x} + ${collider.vx} *${time} - ${this.x}  - ${this.vx}*${time}`)
        let y=exactMath.formula(`${collider.y} + ${collider.vy} *${time} - ${this.y}  - ${this.vy}*${time}`)
        x=Math.abs(x)
        y=Math.abs(y)
        return Math.sqrt(exactMath.formula(`${exactMath.pow(x,2)} + ${exactMath.pow(y,2)}`))
      }
      this.collisens = function () {
        console.log(this.color + " collisens ")
        this.combine = []
        let counter = 0
        for (let i = 0; i < c1.length; i++) {
          if (c1[i] != this) {
              
            this.c2 = c1[i];
            console.log(log(c1[i]))
            console.log(log(this.c2))
            // console.log(this.calcings())
            if (this.calcings() != null) {
              this.combine[counter] = {
                T: this.calcings(),
                C: this.c2,
                This: this
              };
              counter++
              console.log(log(this.combine))
            }

          }
        }
        return this.sortC()
      }
      this.sortC = function () {
        this.combine = this.combine.filter((value) => {
          return value.T != 0 ? true : false
        })
        console.log(log(this.combine))
        this.combine = this.combine.sort((a, b) => {
          return b.T > a.T ? -1 : 1
        })
        if(this.combine.length>0){
          this.timer = this.combine[0].T
          this.collider = this.combine[0].C
        }
        console.log(log(this.combine))
        return this.combine
      }
      this.moveTimesCon = async function (con) {
        this.x =exactMath.formula(`${this.x} +${this.vx} * ${con}`) 
        this.y =exactMath.formula(`${this.y} +${this.vy} * ${con}`) 

        await this.draw()
        // this.collider.x += this.collider.vx * con;
        // this.collider.y += this.collider.vy * con;
        return new Promise(resolve => {
          resolve("end")
        })
      }
      this.collisenExe = async function (collider, timer) {
        //   console.log(log(this.combine))
        //   console.log("")
        // //   for(let i=0;i<c1.length;i++){//current dta comper to every collider
        // //       if(c1[i].name!=this.name){
        // // console.log(log(this.disTest(this.combine[0].T,c1[i])))
        // // console.log(log(this.disTest(this.timer,c1[i])))
        // // console.log(log(this.disTest(this.calcings(),c1[i])))
        // // console.log(log(this.disTest(timer,c1[i])))
        // //       }
        // // }
        // // console.log("")
        // console.log(log(c1))
        // for(let i=0;i<c1.length;i++){//if data of collider is correct
        //     if(c1[i].name!=this.name){
        //         this.c2=c1[i]
                
        //         console.log(log(this.disTest(this.calcings(),c1[i])))
        //         console.log(log(this.c2))
        //         console.log(log(this))
        //     }
        // }
        //     console.log("")
        //     console.log(log(this.combine))
        //     for(let i=0;i<this.combine.length;i++){//if data of collider is correct
        //             console.log(log(this.combine[i]))
        //             console.log(log(this.disTest(this.combine[i].T,this.combine[i].C)))
        //         }
        this.timer=timer
        this.con = this.timer
        this.collider = collider

        console.log(log(this.disTest(this.timer,this.collider)))
        console.log(log(this))
        // let collies = this.collisens()
        // console.log(log(collies))
        // if (collies[0].T == timer) {
          console.log(this.color + " executing on " + this.collider.color)
          await queue.moveAll(this.con)
          await queue.removeTime(this.con)
          console.log(log(this.disTest(0,this.collider)))
          console.log(log(this.combine))
          console.log(log(queue.TC))
          // timer-=this.con
          // let M=this.collider
          // await this.sortC()
          // log(this)
          let x=exactMath.formula(`${this.collider.x} - ${this.x}`)
        let y=exactMath.formula(`${this.collider.y} - ${this.y}`)
        x=Math.abs(x)
        y=Math.abs(y)
        this.distance = Math.sqrt(exactMath.formula(`${exactMath.pow(x,2)} + ${exactMath.pow(y,2)}`))
        console.log(log(this.distance))
          if (this.distance < 101) { //if acsawly collisen happend

            await this.collisen()
            await queue.getCsInSecond()[0].C.draw()
            await queue.getCsInSecond()[0].This.draw()
            await queue.updateEl([this.name, this.collider.name])

          } else {
            console.error("collisen failed")
            console.error(log(queue.TC))
            console.error(log(this))
          }
          queue.remove(this.collider.name)
          queue.remove(this.name)
          this.draw()
          this.collider.draw()
        // } else {
        //   console.error("collisen imposeble")
        // }
        return new Promise(resolve => {
          resolve("colExe")
        })

      }
      this.draw = function () {
        this.elem.attributes[1].value = this.x
        this.elem.attributes[2].value = this.y
        this.Vline.attributes[1].value = this.x
        this.Vline.attributes[2].value = this.y
        this.Vline.attributes[3].value=exactMath.formula(`${this.x} +${this.vx}`)
        this.Vline.attributes[4].value=exactMath.formula(`${this.y} +${this.vy}`)
        let tt=this.timer>0?this.timer:0
        this.colliP.attributes[1].value=this.x
        this.colliP.attributes[2].value=this.y
        this.colliP.attributes[3].value=exactMath.formula(`${this.x} +${this.vx} * ${tt}`) 
        this.colliP.attributes[4].value=exactMath.formula(`${this.y} +${this.vy} * ${tt}`) 

        return new Promise(resolve => {
          resolve("end")
        })
        // this.elem.cy=this.y
      };
      this.calcings = function () {
        this.a =exactMath.formula(`
        ${exactMath.pow(this.vx, 2)}-
          2 * ${this.vx} * ${this.c2.vx} +
          ${exactMath.pow(this.c2.vx, 2)} +
          ${exactMath.pow(this.vy ** 2)} -
          2 * ${this.vy} * ${this.c2.vy} +
          ${exactMath.pow(this.c2.vy , 2)}`)


        this.b =exactMath.formula(`
          (2 * ${this.x} * ${this.vx}) -
          (2 * ${this.vx} * ${this.c2.x}) -
          (2 * ${this.x} * ${this.c2.vx}) +
          (2 * ${this.c2.x} * ${this.c2.vx}) -
          (2 * ${this.c2.y} * ${this.vy}) +
          (2 * ${this.c2.y} * ${this.c2.vy}) +
          (2 * ${this.vy} * ${this.y}) -
          (2 * ${this.c2.vy} * ${this.y})`);


        this.C =exactMath.formula(`
          ${exactMath.pow(this.x , 2)} -
          2 * ${this.x} * ${this.c2.x} +
          ${exactMath.pow(this.c2.x , 2)} +
          ${exactMath.pow(this.c2.y , 2)} +
          ${exactMath.pow(this.y , 2)} -
          2 * ${this.c2.y} * ${this.y} -
          10000`);

          this.aT2 = exactMath.formula(`2 * ${this.a}`)
          let sqrt=Math.sqrt(exactMath.formula(`${exactMath.pow(this.b, 2)} - 4 * ${this.a} * ${this.C}`))
          if(sqrt.toString()=="NaN"){return null}
          this.con1 =exactMath.formula(`(${-this.b}+${sqrt})/${this.aT2}`)

            this.con2 =exactMath.formula(`(${-this.b}-${sqrt}) /  ${this.aT2}`)
            if(this.con2>0){
                let intTime=exactMath.floor(this.con2,1)
                let T1=exactMath.formula(`
                ${exactMath.round(this.con2,-10)} -
                ${exactMath.floor(this.con2,1)}`)
                let T2=exactMath.formula(`
                ${exactMath.round(this.con1,-10)} -
                ${exactMath.floor(this.con1,1)}`)
                
                // console.log(intTime)
                // console.log(T1)
                // console.log(T2)
                if(T2>0){
                    // console.log(exactMath.formula(`${intTime}+${T1}`))
                    return  exactMath.formula(`${intTime}+${T1}`)
                }
                else if(T2<0){
                    // console.log(exactMath.formula(`${intTime}+(
                    //     ${Math.abs(exactMath.formula(`${T1}+${T2}`))}
                    // )/2`))
                    return  exactMath.formula(`${intTime}+(
                        ${Math.abs(exactMath.formula(`${T1}+${T2}`))}
                    )/2`)
                }
                else if(T2==0){
                    // console.log(intTime)
                    return intTime
                }
                else{
                    // console.log("null")
                    return null
                }
            }
            
      }
      this.wallQ = function () {
        let is = false
        if (exactMath.formula(`${this.x} + 50`) > innerWidth&&this.vx>0 ) {
          this.vx = -this.vx;
          is=true
        }
        if(exactMath.formula(`${this.x} - 50`) < 0&&this.vx<0){
          this.vx = -this.vx;
          is=true
        }
        if (exactMath.formula(`${this.y} + 50`) > innerHeight &&this.vy>0){
          this.vy = -this.vy;
          is=true
        }
        if( exactMath.formula(`${this.y} - 50`) < 0&&this.vy<0){
          this.vy = -this.vy;
          is = true
        }
        // if(is){console.log("wall")}
        return is
      }
      this.collisen = function () {
        let x=exactMath.formula(`${this.collider.x} - ${this.x}`)
        let y=exactMath.formula(`${this.collider.y} - ${this.y}`)
        x=Math.abs(x)
        y=Math.abs(y)
        this.distance = Math.sqrt(exactMath.formula(`${exactMath.pow(x,2)} + ${exactMath.pow(y,2)}`))
      this.vCollision = { x: x, y: y };
      this.vCollisionNorm = {
          x: exactMath.formula(`${this.vCollision.x} / ${this.distance}`),
          y: exactMath.formula(`${this.vCollision.y} / ${this.distance}`)
        };
        this.vRelativeVelocity = {
          x: exactMath.formula(`${this.vx} - ${this.collider.vx}`),
          y: exactMath.formula(`${this.vy} - ${this.collider.vy}`)
        };
        this.speed =exactMath.formula(`
          ${this.vRelativeVelocity.x} * ${this.vCollisionNorm.x} +
          ${this.vRelativeVelocity.y} * ${this.vCollisionNorm.y}`)
        this.vx =exactMath.formula(` ${this.vx}-${this.speed} * ${this.vCollisionNorm.x} `)
        this.vy =exactMath.formula(` ${this.vy}-${this.speed} * ${this.vCollisionNorm.y} `)
        this.collider.vx =exactMath.formula(` ${this.collider.vx} + ${this.speed} * ${this.vCollisionNorm.x} `)
        this.collider.vy =exactMath.formula(` ${this.collider.vy} + ${this.speed} * ${this.vCollisionNorm.y} `)
        return new Promise(resolve => {
          resolve("colli")
        })
      }
      return this
    }
    Array.prototype.filterDup = function () {
      let arra = [this[0]]
      for (let i = 0; i < this.length; i++) {
        let is = true
        for (let j = 0; j < arra.length; j++) {
          if (arra[j] == this[i]) {
            is = false
            break;
          }
        }
        if (is) {
          arra.push(this[i])
        }
      }
      // this=arra
      return arra
    }
    var c1 = []
    // var c1 = [new create("red","0"),new create("blue","1")]
    var queue = {
      TC: [],
      arr: [],
      second: 1,
      updateEl: async function (ar) {

        let removed = []
        for (let i = 0; i < ar.length; i++) {
          queue.TC = queue.TC.filter((value) => {
            let is = false
            if (ar[i] == value.C.name || ar[i] == value.This.name) {
              removed.push(value.This)
              removed.push(value.C)
            } else {
              is = true
            }
            return is
          })

        }
        removed = removed.filterDup()
        if (removed[0] == undefined) {
          removed = ar
        }
        for (let i = 0; i < removed.length; i++) {
          queue.TC = queue.TC.concat(await removed[i].collisens())
        }
        // await queue.filterDup(ar)
        await queue.sort()
        if (queue.TC[0] == undefined) {
          queue.TC = []
        }
        return new Promise(resolve => {
          resolve("a");
        })
      },
      filter: function () {
        queue.TC = queue.TC.filter((value) => {
          return value.T != 0 ? true : false
        })
        return new Promise(resolve => {
          resolve("a");
        })
      },
      filterDup: function () {
        let arra = [queue.TC[0]]
        for (let i = 0; i < queue.TC.length; i++) {
          let is = true
          for (let j = 0; j < arra.length; j++) {
            if (arra[j].T == queue.TC[i].T) {
              is = false
              break;
            }
          }
          if (is) {
            arra.push(queue.TC[i])
          }
        }
        queue.TC = arra
        return new Promise(resolve => {
          resolve("a");
        })
      },
      sort: async function () {

        await queue.filterDup()
        queue.TC = queue.TC.sort((a, b) => {
          return b.T > a.T ? -1 : 1
        })
        return new Promise(resolve => {
          resolve("a");
        })
      },
      remove: function (a) {
        queue.arr = queue.arr.filter((value) => {
          return value.name == a ? false : true
        })
        return new Promise(resolve => {
          resolve("a");
        })
      },
      removeTime: function (num) {
        for (let ele of queue.TC) {
          ele.T =exactMath.formula(`${ele.T}- ${num}`)
        }
        for(let ele of c1){
            ele.timer =exactMath.formula(`${ele.timer}- ${num}`)
        }
        queue.second= exactMath.formula(`${queue.second}- ${num}`)

        // queue.TC = queue.TC.filter((value) => {//is this needed?
        //   return value.name == num ? false : true
        // })
        return new Promise(resolve => {
          resolve("a");
        })
      },
      getCsInSecond: function () {
        //   log(queue)
        let ar = []
        for (let i = 0; i < queue.TC.length; i++) {
          if (queue.TC[i].T < 1) {
            ar.push(queue.TC[i])
          } else {
            //   console.log(ar+" a")
            return ar
          }
        }
        //   console.log(ar+" b")
        return ar
      },
      length: function () {
        return queue.arr.length
      },
      set: async function (a) {
        queue.arr = a
        return new Promise(resolve => {
          resolve("a");
        })
      },
      lastCollider: async function () {
        let i = 0
        while (queue.CT[i].T < 1) {
          if (queue.CT.length < i && queue.CT[i + 1].T < 1) {
            i++
          } else {
            return queue.CT[i]
          }
        }
        console.error("there is no timers that are <1")
        return null
      },
      runQueue: async function () {
        console.log("")
          console.log("run Queue")
          console.log(log(queue.TC))
        queue.second = 1
        if (queue.TC[0] == undefined) {
          queue.TC = []
        }
        if (queue.getCsInSecond().length > 0) { //there is collisen in this second
            console.log("runQueue runs collisens")
          await queue.runCollisens()
        } else {
          // console.log("normal for all")

          await queue.moveAll(queue.second)
          await queue.removeTime(queue.second)

        }
        
        return new Promise(resolve => {
          resolve("end");
        })
      },
      moveAll: async function (num) {//might not be fully currect
        let is = false
        for (let i = 0; i < c1.length; i++) {
          if (c1[i].wallQ()) {
            is = true
            console.log("")
            console.log("update cus wall collisen")
            await queue.updateEl([c1[i]])
          }
        }
        if (is) {
          console.log("moveAll runs collisens")
          await queue.runCollisens()
        } else {
          for (let i = 0; i < c1.length; i++) {
            await c1[i].moveTimesCon(num)
          }
        }

        return new Promise(resolve => {
          resolve("end");
        })
      },
      runCollisens: async function () {
          //making sure
          let colliders=[]
          let gcis=queue.getCsInSecond()
          for(let i=0;i<gcis.length;i++){
              colliders.push(gcis[i].This)
          }
          colliders=colliders.filterDup()
          console.log(log(colliders))
          await queue.updateEl(colliders)
        if (queue.getCsInSecond().length > 0) { //there is collisen in this second

            

          console.log(log(queue.getCsInSecond()))
          console.log("starting collisens")

          while (queue.getCsInSecond().length > 0) {
            let elle = queue.getCsInSecond()[0]
            await elle.This.collisenExe(elle.C, elle.T)
            if (queue.TC.length != 0 || queue.TC != 0) {
              await queue.filter()
              await queue.sort()
            }
          }
        }
        else{
            console.error("there are no true collisense now")
        }
        return new Promise(resolve => {
          resolve("end");
        })
      }
    }

    async function startup() {
      for (let i = 0; i < 4; i++) {
        c1[i] = new create("red", i)
      }
      c1.forEach(element => {
        element.setElements()
      });
      console.log("setting TC")
      for (let i = 0; i < c1.length; i++) {
        queue.TC = queue.TC.concat(await c1[i].collisens())
      }
      await queue.sort()
      anil = setInterval(async function () {
        animation();
      }, 500);

      svg["ani"] = function awfddd() {
        animation()
      };
      svg["con"] = function awdddd() {
        console.log(c1);
      };
      svg["anistart"] = function awfddd() {
        anil = setInterval(() => {
          animation();
        }, 1000);
      };
      svg["anistop"] = function awdddd() {
        clearInterval(anil)
      };
      svg["c1"] = c1;
    }
    setTimeout(() => {
      startup()
    }, 100)

    async function animation() {
      await queue.set(c1);
      await queue.runQueue()
    }
    var anil

    console.log(this);
  }
}
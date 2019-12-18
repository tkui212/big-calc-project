import React, {
  Component
} from "react";
import "./home_page.css";
import Big from './big.js'
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
      this.collisens = function () {
        console.log(this.color + " collisens ")
        // this.timer=[]
        // this.collider=[]
        this.combine = []
        let counter = 0
        for (let i = 0; i < c1.length; i++) {
          if (c1[i] != this) {
            this.c2 = c1[i];
            console.log(this.calcings())
            if (this.calcings() != null) {
              this.combine[counter] = {
                T: this.calcings(),
                C: this.c2,
                This: this
              };
              counter++
            }

          }
        }
        return this.sortC()
      }
      this.sortC = function () {
        this.combine = this.combine.filter((value) => {
          return value.T != 0 ? true : false
        })
        this.combine = this.combine.sort((a, b) => {
          return b.T > a.T ? -1 : 1
        })
        for (let i = 0; i < this.combine.length; i++) {
          this.timer[i] = this.combine[i].T
          this.collider[i] = this.combine[i].C
        }
        return this.combine
      }
      this.moveTimesCon = async function (con) {
        this.x += this.vx * con;
        this.y += this.vy * con;

        await this.draw()
        // this.collider.x += this.collider.vx * con;
        // this.collider.y += this.collider.vy * con;
        return new Promise(resolve => {
          resolve("end")
        })
      }
      this.collisenExe = async function (collider, timer) {

        this.con = timer
        this.collider = collider
        let collies = this.collisens()
        console.log(collies)
        if (collies[0].T == timer) {
          console.log(this.color + " executing on " + this.collider.color)
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
            Big(Big(this.collider.x).minus(this.x).pow(2).toNumber()).plus(Big(this.collider.y).minus(this.y).pow(2).toNumber()).toNumber()
          );
          if (this.distance < 101) { //if acsawly collisen happend
            // this.con=1-this.con
            // if(this.timer.length>1){
            // while(this.timer.length>1&&this.con>this.timer[0]){
            //     let R=this.con
            //     this.con=this.timer[0]
            await this.collisen()
            await queue.getCsInSecond()[0].C.draw()
            await queue.getCsInSecond()[0].This.draw()
            await queue.updateEl([this.name, this.collider.name])
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
          } else {
            console.error("collisen failed")
            console.error(queue.TC)
            console.error(this)
          }
          queue.remove(this.collider.name)
          queue.remove(this.name)
          this.draw()
          this.collider.draw()
        } else {
          console.error("collisen imposeble")
        }
        return new Promise(resolve => {
          resolve("colExe")
        })

      }
      this.draw = function () {
        this.elem.attributes[1].value = this.x
        this.elem.attributes[2].value = this.y
        this.Vline.attributes[1].value = this.x
        this.Vline.attributes[2].value = this.y
        this.Vline.attributes[3].value = Big(this.x).plus(this.vx).toNumber()
        this.Vline.attributes[4].value = Big(this.y).plus(this.vy).toNumber()
        let tt = this.timer[0] > 0 ? this.timer[0] : 0
        this.colliP.attributes[1].value = this.x
        this.colliP.attributes[2].value = this.y
        this.colliP.attributes[3].value = Big(this.x).plus(this.vx).times(tt).toNumber()
        this.colliP.attributes[4].value = Big(this.y).plus(this.vy).times(tt).toNumber()

        return new Promise(resolve => {
          resolve("end")
        })
        // this.elem.cy=this.y
      };
      this.calcings = function () {
        this.a =
          Big(this.vx).pow(2)
          .minus(Big(2).times(this.vx).times(this.c2.vx).toNumber())
          .plus(Big(this.c2.vx).pow(2).toNumber())
          .plus(Big(this.vy).pow(2).toNumber())
          .minus(Big(2).times(this.vy).times(this.c2.vy).toNumber())
          .plus(Big(this.c2.vy).pow(2).toNumber()).toNumber()
        this.b =
          Big(2).times(this.x).times(this.vx)
          .minus(Big(2).times(this.vx).times(this.c2.x).toNumber())
          .minus(Big(2).times(this.x).times(this.c2.vx).toNumber())
          .plus(Big(2).times(this.c2.x).times(this.c2.vx).toNumber())
          .minus(Big(2).times(this.c2.y).times(this.vy).toNumber())
          .plus(Big(2).times(this.c2.y).times(this.c2.vy).toNumber())
          .plus(Big(2).times(this.vy).times(this.y).toNumber())
          .minus(Big(2).times(this.c2.vy).times(this.y).toNumber()).toNumber()

        this.C =
          Big(this.x).pow(2)
          .minus(Big(2).times(this.x).times(this.c2.x).toNumber())
          .plus(Big(this.c2.x).pow(2).toNumber())
          .plus(Big(this.c2.y).pow(2).toNumber())
          .plus(Big(this.y).pow(2).toNumber())
          .minus(Big(2).times(this.c2.y).times(this.y).toNumber())
          .minus(10000).toNumber()

        this.aT2 = Big(2).times(this.a).toNumber()
        if(this.aT2!=0){
        this.con1 =
          Big(-this.b)
          .plus(Big(Big(this.b).pow(2)
            .minus(Big(4).times(this.a).times(this.C).toNumber()).toNumber()).sqrt().toNumber())
          .div(this.aT2).toNumber();
        this.con2 =
          Big(-this.b)
          .minus(Big(Big(this.b).pow(2)
          .minus(Big(4).times(this.a).times(this.C).toNumber()).toNumber()).sqrt().toNumber())
          .div(this.aT2).toNumber();
        }
        else{
          return 0
        }
        if (this.con1 < this.con2 && this.con1 > 0) {
          return this.con1
        } else if (this.con2 > 0) {
          return this.con2
        } else {
          return null
        }
      }
      this.wallQ = function () {
        let is = false
        if (Big(this.x).plus(50).toNumber() > innerWidth && this.vx > 0) {
          this.vx = -this.vx;
          is = true
          log("a")
        }
        if (Big(this.x).minus(50).toNumber() < 0 && this.vx < 0) {
          this.vx = -this.vx;
          is = true
        }
        if (Big(this.y).plus(50).toNumber() > innerHeight && this.vy > 0) {
          this.vy = -this.vy;
          is = true
        }
        if (Big(this.y).minus(50).toNumber() < 0 && this.vy < 0) {
          this.vy = -this.vy;
          is = true
        }
        // if(is){console.log("wall")}
        return is
      }
      this.collisen = function () {
        this.distance = Big(
          Big(Big(this.collider.x).minus(this.x).pow(2).toNumber()).plus(Big(this.collider.y).minus(this.y).pow(2).toNumber()).toNumber()
        ).sqrt().toNumber();
        this.vCollision = {
          x: Big(this.collider.x).minus(this.x).toNumber(),
          y: Big(this.collider.y).minus(this.y).toNumber()
        };
        this.vCollisionNorm = {
          x: Big(this.vCollision.x).div(this.distance).toNumber(),
          y: Big(this.vCollision.y).div(this.distance).toNumber()
        };
        this.vRelativeVelocity = {
          x: Big(this.vx).minus(this.collider.vx).toNumber(),
          y: Big(this.vy).minus(this.collider.vy).toNumber()
        };
        this.speed =
          Big(this.vRelativeVelocity.x).times(this.vCollisionNorm.x)
          .plus(Big(this.vRelativeVelocity.y).times(this.vCollisionNorm.y).toNumber()).toNumber();
        this.vx = Big(this.speed).times(this.vCollisionNorm.x).minus(this.vx).toNumber();
        this.vy = Big(this.speed).times(this.vCollisionNorm.y).minus(this.vy).toNumber();
        this.collider.vx = Big(this.speed).times(this.vCollisionNorm.x).plus(this.collider.vx).toNumber();
        this.collider.vy = Big(this.speed).times(this.vCollisionNorm.y).plus(this.collider.vy).toNumber();
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
          ele.T = Big(ele.T).minus(num).toNumber()
        }
        queue.second = Big(queue.second).minus(num).toNumber()
        queue.TC = queue.TC.filter((value) => {
          return value.name == num ? false : true
        })
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
        queue.second = 1
        if (queue.TC[0] == undefined) {
          queue.TC = []
        }
        if (queue.getCsInSecond().length > 0) { //there is collisen in this second
          log(queue.getCsInSecond().length)
          console.log("starting collisens")

          while (queue.getCsInSecond().length > 0) {
            let elle = queue.getCsInSecond()[0]
            await elle.This.collisenExe(elle.C, elle.T)
            if (queue.TC.length != 0 || queue.TC != 0) {
              await queue.filter()
              await queue.sort()
            } else {
              await queue.moveAll(queue.second)
            }
          }
        } else {
          // console.log("normal for all")

          await queue.moveAll(queue.second)
          await queue.removeTime(queue.second)

        }
        log(queue.TC)
        return new Promise(resolve => {
          resolve("end");
        })
      },
      moveAll: async function (num) {
        let is = false
        for (let i = 0; i < c1.length; i++) {
          if (c1[i].wallQ()) {
            is = true
            console.log("update cus wall collisen")
            await queue.updateEl([c1[i]])
          }
        }
        if (is) {
          console.log("runing new collisens becus wall")
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
        if (queue.getCsInSecond().length > 0) { //there is collisen in this second
          log(queue.getCsInSecond().length)
          console.log("starting collisens after wall collisen")

          while (queue.getCsInSecond().length > 0) {
            let elle = queue.getCsInSecond()[0]
            await elle.This.collisenExe(elle.C, elle.T)
            if (queue.TC.length != 0 || queue.TC != 0) {
              await queue.filter()
              await queue.sort()
            }
          }
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
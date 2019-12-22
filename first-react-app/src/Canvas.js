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
      <svg
        version="1.1"
        id="svg"
        x="0px"
        y="0px"
        width="100%"
        height="82%"
      ></svg>
    );
  }
  componentDidMount() {
    const exactMath = require("exact-math");
    // console.log(exactMath.formula('4**2'))

    var stringify = require("json-stringify-safe");

    function log(text) {
      return JSON.parse(stringify(text));
    }
    var svg = document.querySelector("#svg");
    const innerWidth = svg.clientWidth;
    const innerHeight = svg.clientHeight;

    function create(color, name) {
      //creating the menu arcs
      this.name = name;
      this.color = color;
      this.timer = 0;
      this.collider = [];
      this.combine = [];
      this.block = false;
      this.sqrt = 0;
      this.x = Math.random() * (innerWidth - 100); //setting random x set-up
      this.y = Math.random() * (innerHeight - 100); //setting random y set-up
      this.vx = Math.random() * 50;
      this.vy = Math.random() * 50;

      svg.innerHTML += ` <circle id="${this.name}" cx="${this.x}" cy="${
        this.y
      }" r="${50}" stroke="${this.color}" stroke-width="${0}" fill="${
        this.color
      }" style="" />`;
      svg.innerHTML += ` <line id="${this.name}V" x1="${this.x}" y1="${
        this.y
      }" x2="${this.x + this.vx}" y2="${this.y +
        this.vy}" style="stroke:black;stroke-width:2" />`;
      svg.innerHTML += ` <line id="${this.name}ColliP" x1="${this.x}" y1="${
        this.y
      }" x2="${this.x + this.vx * 0}" y2="${this.y +
        this.vy * 0}" style="stroke:white;stroke-width:2" />`;
      //   console.log(c1[0])
      this.setElements = function() {
        this.elem = document.getElementById(`${this.name}`);
        this.Vline = document.getElementById(`${this.name}V`);
        this.colliP = document.getElementById(`${this.name}ColliP`);
      };
      this.disTest = function(time, collider) {
        let x = exactMath.formula(
          `${collider.x} + ${collider.vx} *${time} - ${this.x}  - ${this.vx}*${time}`
        );
        let y = exactMath.formula(
          `${collider.y} + ${collider.vy} *${time} - ${this.y}  - ${this.vy}*${time}`
        );
        x = Math.abs(x);
        y = Math.abs(y);
        return exactMath.ceil(
          exactMath.floor(
            Math.sqrt(
              exactMath.formula(
                `${Math.abs(exactMath.pow(x, 2))} + ${Math.abs(
                  exactMath.pow(y, 2)
                )}`
              )
            ),
            -5
          ),
          -4
        );
      };
      this.collisens = async function() {
        console.log(this.color + " collisens ");
        this.combine = [];
        let counter = 0;
        for (let i = 0; i < c1.length; i++) {
          if (c1[i] != this) {
            this.c2 = c1[i];
            if (this.calcings() != null) {
              this.combine[counter] = {
                T: this.calcings(),
                C: this.c2,
                This: this
              };
              counter++;
            }
          }
        }
        await this.wallQ2();
        console.log(log(this.combine));
        return this.sortC();
      };
      this.sortC = function() {
        this.combine = this.combine.filter(value => {
          return value.T >= 0 ? true : false;
        });
        this.combine = this.combine.sort((a, b) => {
          return b.T > a.T ? -1 : 1;
        });
        if (this.combine.length > 0) {
          this.timer = this.combine[0].T;
          this.collider = this.combine[0].C;
        }
        return this.combine;
      };
      this.moveTimesCon = async function(con) {
        this.x = exactMath.formula(`${this.x} +${this.vx} * ${con}`);
        this.y = exactMath.formula(`${this.y} +${this.vy} * ${con}`);
        await this.draw(con);
        return new Promise(resolve => {
          resolve("end");
        });
      };
      this.collisenExe = async function(collider, timer) {
        this.timer = timer;
        this.con = this.timer;
        if (typeof collider == "string") {
          await queue.moveAll(this.con);
          await this.wallQ(collider);
          await queue.updateEl([this]);
          await queue.remove(this.name);
          return new Promise(resolve => {
            resolve("colWall");
          });
        }
        this.collider = collider;
        console.log(this.color + " executing on " + this.collider.color);
        await queue.moveAll(this.con);
        this.distance = await this.disTest(0, this.collider);
        await this.collisen();
        await queue.updateEl([this, this.collider]);
        queue.remove(this.collider.name);
        queue.remove(this.name);
        return new Promise(resolve => {
          resolve("colExe");
        });
      };
      this.draw = function(num) {
        this.elem.style.transition = `${num}s linear`;
        this.elem.attributes[1].value = this.x;
        this.elem.attributes[2].value = this.y;
        return new Promise(resolve => {
          resolve("end");
        });
      };

      this.calcings = function() {
        this.a = exactMath.formula(`
        ${Math.abs(exactMath.pow(this.vx, 2))}-
          (2 * ${this.vx} * ${this.c2.vx}) +
          ${Math.abs(exactMath.pow(this.c2.vx, 2))} +
          ${Math.abs(exactMath.pow(this.vy, 2))} -
          (2 * ${this.vy} * ${this.c2.vy}) +
          ${Math.abs(exactMath.pow(this.c2.vy, 2))}`);

        this.b = exactMath.formula(`
          (2 * ${this.x} * ${this.vx}) -
          (2 * ${this.vx} * ${this.c2.x}) -
          (2 * ${this.x} * ${this.c2.vx}) +
          (2 * ${this.c2.x} * ${this.c2.vx}) -
          (2 * ${this.c2.y} * ${this.vy}) +
          (2 * ${this.c2.y} * ${this.c2.vy}) +
          (2 * ${this.vy} * ${this.y}) -
          (2 * ${this.c2.vy} * ${this.y})`);

        this.C = exactMath.formula(`
          ${Math.abs(exactMath.pow(this.x, 2))} -
          (2 * ${this.x} * ${this.c2.x}) +
          ${Math.abs(exactMath.pow(this.c2.x, 2))} +
          ${Math.abs(exactMath.pow(this.c2.y, 2))} +
          ${Math.abs(exactMath.pow(this.y, 2))} -
          (2 * ${this.c2.y} * ${this.y}) -
          10000`);

        this.aT2 = exactMath.formula(`2 * ${this.a}`);
        this.sqrt = Math.sqrt(
          exactMath.formula(
            `${Math.abs(exactMath.pow(this.b, 2))} - 4 * ${this.a} * ${this.C}`
          )
        );
        if (this.sqrt.toString() == "NaN") {
          return null;
        }
        this.con1 = exactMath.formula(`(${-this.b}+${this.sqrt})/${this.aT2}`);

        this.con2 = exactMath.formula(
          `(${-this.b}-${this.sqrt}) /  ${this.aT2}`
        );
        if (this.con2 > 0) {
          let intTime = exactMath.floor(this.con2, 1);
          let T1 = exactMath.formula(`
                ${exactMath.round(this.con2, -10)} -
                ${exactMath.floor(this.con2, 1)}`);
          let T2 = exactMath.formula(`
                ${exactMath.round(this.con1, -10)} -
                ${exactMath.floor(this.con1, 1)}`);
          if (T2 > 0) {
            return exactMath.formula(`${intTime}+${T1}`);
          } else if (T2 < 0) {
            return exactMath.formula(`${intTime}+(
                        ${Math.abs(exactMath.formula(`${T1}+${T2}`))}
                    )/2`);
          } else if (T2 == 0) {
            return intTime;
          } else {
            return null;
          }
        } else {
          return null;
        }
      };
      this.wallQ = function(collider) {
        if (collider == "wallRight" || collider == "wallLeft") {
          this.vx = -this.vx;
        } else if (collider == "wallTop" || collider == "wallBottom") {
          this.vy = -this.vy;
        }
        return new Promise(resolve => {
          resolve("done");
        });
      };
      this.wallQ2 = function() {
        if (this.vx > 0) {
          let t = exactMath.formula(`(${innerWidth}-${this.x}-50)/${this.vx}`);
          let obj = { T: t, C: "wallRight", This: this };
          this.combine.push(obj);
        } else {
          let t = exactMath.formula(`(${this.x}-50)/${-this.vx}`);
          let obj = { T: t, C: "wallLeft", This: this };
          this.combine.push(obj);
        }
        if (this.vy > 0) {
          let t = exactMath.formula(`(${innerHeight}-${this.y}-50)/${this.vy}`);
          let obj = { T: t, C: "wallTop", This: this };
          this.combine.push(obj);
        } else {
          let t = exactMath.formula(`(${this.y}-50)/${-this.vy}`);
          let obj = { T: t, C: "wallBottom", This: this };
          this.combine.push(obj);
        }
        return new Promise(resolve => {
          resolve("done");
        });
      };
      this.collisen = async function() {
        let x = exactMath.formula(`${this.collider.x} - ${this.x}`);
        let y = exactMath.formula(`${this.collider.y} - ${this.y}`);
        this.distance = await this.disTest(0, this.collider);
        this.vCollision = { x: x, y: y };
        this.vCollisionNorm = {
          x: exactMath.formula(`${this.vCollision.x} / ${this.distance}`),
          y: exactMath.formula(`${this.vCollision.y} / ${this.distance}`)
        };
        this.vRelativeVelocity = {
          x: exactMath.formula(`${this.vx} - ${this.collider.vx}`),
          y: exactMath.formula(`${this.vy} - ${this.collider.vy}`)
        };
        this.speed = exactMath.formula(`
          ${this.vRelativeVelocity.x} * ${this.vCollisionNorm.x} +
          ${this.vRelativeVelocity.y} * ${this.vCollisionNorm.y}`);
        this.vx = exactMath.formula(
          ` ${this.vx}-${this.speed} * ${this.vCollisionNorm.x} `
        );
        this.vy = exactMath.formula(
          ` ${this.vy}-${this.speed} * ${this.vCollisionNorm.y} `
        );
        this.collider.vx = exactMath.formula(
          ` ${this.collider.vx} + ${this.speed} * ${this.vCollisionNorm.x} `
        );
        this.collider.vy = exactMath.formula(
          ` ${this.collider.vy} + ${this.speed} * ${this.vCollisionNorm.y} `
        );
        let promises = [this.draw(0), this.collider.draw(0)];
        await Promise.all(promises);
        return new Promise(resolve => {
          resolve("colli");
        });
      };
      this.collisen2 = async function(obj1,obj2) {
        let x = exactMath.formula(`${obj2.x} - ${obj1.x}`);
        let y = exactMath.formula(`${obj2.y} - ${obj1.y}`);
        obj1.distance = await obj1.disTest(0, obj2);
        obj1.vCollision = { x: x, y: y };
        obj1.vCollisionNorm = {
          x: exactMath.formula(`${obj1.vCollision.x} / ${obj1.distance}`),
          y: exactMath.formula(`${obj1.vCollision.y} / ${obj1.distance}`)
        };
        obj1.vRelativeVelocity = {
          x: exactMath.formula(`${obj1.vx} - ${obj2.vx}`),
          y: exactMath.formula(`${obj1.vy} - ${obj2.vy}`)
        };
        obj1.speed = exactMath.formula(`
          ${obj1.vRelativeVelocity.x} * ${obj1.vCollisionNorm.x} +
          ${obj1.vRelativeVelocity.y} * ${obj1.vCollisionNorm.y}`);
        obj1.vx = exactMath.formula(
          ` ${obj1.vx}-${obj1.speed} * ${obj1.vCollisionNorm.x} `
        );
        obj1.vy = exactMath.formula(
          ` ${obj1.vy}-${obj1.speed} * ${obj1.vCollisionNorm.y} `
        );
        obj2.vx = exactMath.formula(
          ` ${obj2.vx} + ${obj1.speed} * ${obj1.vCollisionNorm.x} `
        );
        obj2.vy = exactMath.formula(
          ` ${obj2.vy} + ${obj1.speed} * ${obj1.vCollisionNorm.y} `
        );
        return new Promise(resolve => {
          resolve("colli");
        });
      };
      this.calcings2 = function(obj1,obj2) {
        obj1.a = exactMath.formula(`
        ${Math.abs(exactMath.pow(obj1.vx, 2))}-
          (2 * ${obj1.vx} * ${obj2.vx}) +
          ${Math.abs(exactMath.pow(obj2.vx, 2))} +
          ${Math.abs(exactMath.pow(obj1.vy, 2))} -
          (2 * ${obj1.vy} * ${obj2.vy}) +
          ${Math.abs(exactMath.pow(obj2.vy, 2))}`);

        obj1.b = exactMath.formula(`
          (2 * ${obj1.x} * ${obj1.vx}) -
          (2 * ${obj1.vx} * ${obj2.x}) -
          (2 * ${obj1.x} * ${obj2.vx}) +
          (2 * ${obj2.x} * ${obj2.vx}) -
          (2 * ${obj2.y} * ${obj1.vy}) +
          (2 * ${obj2.y} * ${obj2.vy}) +
          (2 * ${obj1.vy} * ${obj1.y}) -
          (2 * ${obj2.vy} * ${obj1.y})`);

        obj1.C = exactMath.formula(`
          ${Math.abs(exactMath.pow(obj1.x, 2))} -
          (2 * ${obj1.x} * ${obj2.x}) +
          ${Math.abs(exactMath.pow(obj2.x, 2))} +
          ${Math.abs(exactMath.pow(obj2.y, 2))} +
          ${Math.abs(exactMath.pow(obj1.y, 2))} -
          (2 * ${obj2.y} * ${obj1.y}) -
          10000`);

        obj1.aT2 = exactMath.formula(`2 * ${obj1.a}`);
        obj1.sqrt = Math.sqrt(
          exactMath.formula(
            `${Math.abs(exactMath.pow(obj1.b, 2))} - 4 * ${obj1.a} * ${obj1.C}`
          )
        );
        if (obj1.sqrt.toString() == "NaN") {
          return null;
        }
        obj1.con1 = exactMath.formula(`(${-obj1.b}+${obj1.sqrt})/${obj1.aT2}`);

        obj1.con2 = exactMath.formula(
          `(${-obj1.b}-${obj1.sqrt}) /  ${obj1.aT2}`
        );
        if (obj1.con2 > 0) {
          let intTime = exactMath.floor(obj1.con2, 1);
          let T1 = exactMath.formula(`
                ${exactMath.round(obj1.con2, -10)} -
                ${exactMath.floor(obj1.con2, 1)}`);
          let T2 = exactMath.formula(`
                ${exactMath.round(obj1.con1, -10)} -
                ${exactMath.floor(obj1.con1, 1)}`);
          if (T2 > 0) {
            return exactMath.formula(`${intTime}+${T1}`);
          } else if (T2 < 0) {
            return exactMath.formula(`${intTime}+(
                        ${Math.abs(exactMath.formula(`${T1}+${T2}`))}
                    )/2`);
          } else if (T2 == 0) {
            return intTime;
          } else {
            return null;
          }
        } else {
          return null;
        }
      };
      return this;
    }
    Array.prototype.filterDup = function() {
      let arra = [this[0]];
      for (let i = 0; i < this.length; i++) {
        let is = true;
        for (let j = 0; j < arra.length; j++) {
          if (arra[j] == this[i]) {
            is = false;
            break;
          }
        }
        if (is) {
          arra.push(this[i]);
        }
      }
      // this=arra
      return arra;
    };
    var c1 = [];
    var queue = {
      TC: [],
      arr: [],
      updateEl: async function(ar) {
        if (ar.length == 0) {
          return new Promise(resolve => {
            resolve("no need");
          });
        }
        let removed = [];
        for (let i = 0; i < ar.length; i++) {
          queue.TC = queue.TC.filter(value => {
            let is = false;
            if (ar[i].name == value.C.name || ar[i].name == value.This.name) {
              removed.push(value.This);
              if (typeof value.C != "string") {
                removed.push(value.C);
              }
            } else {
              is = true;
            }
            return is;
          });
        }
        removed = removed.filterDup();
        if (removed[0] == undefined) {
          removed = ar;
        }
        for (let i = 0; i < removed.length; i++) {
          queue.TC = queue.TC.concat(await removed[i].collisens());
        }
        // await queue.filterDup(ar)
        await queue.sort();
        if (queue.TC[0] == undefined) {
          queue.TC = [];
        }
        return new Promise(resolve => {
          resolve("a");
        });
      },
      filter: function() {
        queue.TC = queue.TC.filter(value => {
          return value.T >= 0 ? true : false;
        });
        return new Promise(resolve => {
          resolve("a");
        });
      },
      filterDup: function() {
        let arra = [queue.TC[0]];
        for (let i = 0; i < queue.TC.length; i++) {
          let is = true;
          for (let j = 0; j < arra.length; j++) {
            if (arra[j].T == queue.TC[i].T) {
              is = false;
              break;
            }
          }
          if (is) {
            arra.push(queue.TC[i]);
          }
        }
        queue.TC = arra;
        return new Promise(resolve => {
          resolve("a");
        });
      },
      sort: async function() {
        await queue.filterDup();
        await queue.filter();
        queue.TC = queue.TC.sort((a, b) => {
          return b.T > a.T ? -1 : 1;
        });
        return new Promise(resolve => {
          resolve("a");
        });
      },
      remove: function(a) {
        queue.arr = queue.arr.filter(value => {
          return value.name == a ? false : true;
        });
        return new Promise(resolve => {
          resolve("a");
        });
      },
      removeTime: function(num) {
        for (let ele of queue.TC) {
          ele.T = exactMath.formula(`${ele.T} - ${num}`);
        }
        for (let ele of c1) {
          ele.timer = exactMath.formula(`${ele.timer} - ${num}`);
        }
        return new Promise(resolve => {
          resolve("a");
        });
      },
      getCsInSecond: function() {
        let ar = [];
        for (let i = 0; i < queue.TC.length; i++) {
          if (queue.TC[i].T < 1) {
            ar.push(queue.TC[i]);
          } else {
            return ar;
          }
        }
        return ar;
      },
      length: function() {
        return queue.arr.length;
      },
      set: async function(a) {
        queue.arr = a;
        return new Promise(resolve => {
          resolve("a");
        });
      },
      runQueue: async function() {
        if (queue.TC.length > 0 && queue.TC[0] == undefined) {
          if (queue.TC.length == 1) {
            queue.TC = [];
          } else {
            throw "add a if to fix this";
          }
        }
        if (queue.getCsInSecond().length > 0) {
          await queue.runCollisens();
        }
        await queue.filter();
        setTimeout(() => {animation();}, exactMath.formula(`${queue.TC[0].T}*1000`));
        await queue.moveAll(queue.TC[0].T);
        return new Promise(resolve => {
          resolve("end");
        });
      },
      moveAll: async function(num) {
        let movers = [];
        for (let i = 0; i < c1.length; i++) {
          movers.push(c1[i].moveTimesCon(num));
        }
        await Promise.all(movers);
        await queue.removeTime(num);
        return new Promise(resolve => {
          resolve("end");
        });
      },
      runCollisens: async function() {
        while (queue.getCsInSecond().length > 0) {
          let elle = queue.getCsInSecond()[0];
          await elle.This.collisenExe(elle.C, elle.T);
          if (queue.TC.length != 0 || queue.TC != 0) {
            await queue.filter();
            await queue.sort();
          }
        }
        return new Promise(resolve => {
          resolve("end");
        });
      }
    };

    async function startup() {
      for (let i = 0; i < 1; i++) {
        c1[i] = new create("red", i);
      }
      c1.forEach(element => {
        element.setElements();
      });
      for (let i = 0; i < c1.length; i++) {
        queue.TC = queue.TC.concat(await c1[i].collisens());
      }
      await queue.sort();
      setTimeout(async function() {
        animation();
      }, 1000);
    }
    setTimeout(() => {
      startup();
    }, 100);

    async function animation() {
      await queue.set(c1);
      await queue.runQueue();
    }
    var anil;

  }
}

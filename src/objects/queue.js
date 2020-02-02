// var stringify = require("json-stringify-safe");

function log(text,depth) {
  let ret=text
if(isNaN(depth)){
  depth=2
}
  if(depth<1){
    return ret
  }
  if(typeof text!=="object"||text==null){
    ret=text
  }
  else if(text.constructor.name=="Array"){
    ret=[...text]
    for(let i=0;i<text.length;i++){
      let obj=text[i]
      ret[i]=log(obj,depth-1)
    }
  }
  else if(typeof text=="object"){
    ret={...text}
    for(let key in ret){
      ret[key]=log(ret[key],depth-1)
    }
  }
  return ret;
}
export const exactMath = require("exact-math");
export var c1 = [];
var svg = document.querySelector("#svg");
    var innerWidth = 0
    var innerHeight = 0
export var queue = {
    TC: [],
    TC1: [],
    
    filter: function(Cn) {
      let CN=[...Cn]
      CN = CN.filter(value => {
        return value.T >= 0 ? true : false;
      });
      return CN
    },
    filterDup: function(Cn) {
      let CN=[...Cn]
      let arra = [CN[0]];
      for (let i = 0; i < CN.length; i++) {
        let is = true;
        for (let j = 0; j < arra.length; j++) {
          if (arra[j].T == CN[i].T) {
            is = false;
            break;
          }
        }
        if (is) {
          arra.push(CN[i]);
        }
      }
      return arra
    },
    sort: function(Cn) {
      let CN=[...Cn]
      CN= queue.filterDup(CN);
      CN= queue.filter(CN);
      CN = CN.sort((a, b) => {
        return b.T > a.T ? -1 : 1;
      });
      return CN
    },
    removeTime: function(num,Cn) {
      let CN=[...Cn]
      for (let ele of CN) {
        ele=ele.removeT(num)
      }
      return CN
    },
    getCsInSecond: function(Cn) {
      let CN=[...Cn]
      let ar = [];
      for (let i = 0; i < CN.length; i++) {
        if (CN[i].T < 1) {
          ar.push(CN[i]);
        } else {
          return ar;
        }
      }
      return ar;
    },
    length: function() {
      return queue.arr.length;
    },
    set: function(a) {
      queue.arr = a;
      return new Promise(resolve => {
        resolve("a");
      });
    },
    futher: function(c1,length,startTime) {
      let C1=log(c1,2)
      let col=queue.collisens(C1,C1)[0]
      let ar=[]
      let Time=startTime
        while (col.T<startTime+100&&ar.length<length+1) {
          Time=exactMath.formula(`${Time}+${col.T}`)
          C1=queue.moveAll(col.T,C1)
          if(typeof col.C!="string"){
            col.C=C1[col.C.id]
          }
          col.This=C1[col.This.id]
          C1=queue.collisenExe(col,C1);//checked
        ar.push(new timeComponent(Time,typeof col.C == "string"?col.C:log(col.C,2),log(col.This,2),log(C1,2)))//y
        col=queue.collisens(C1,C1)[0]
      }
    ar.pop()
    // console.log(ar)
      return ar
    },
    runQueue: async function() {
      if (queue.TC.length > 0 && queue.TC[0] == undefined) {
        if (queue.TC.length == 1) {
          queue.TC = [];
        } else {
          throw "add a if to fix this";
        }
      }
      if (queue.getCsInSecond(queue.TC).length > 0) {//worked
        await queue.runCollisens();
      }
      await queue.filter();
      setTimeout(() => {animation();}, exactMath.formula(`${queue.TC[0].T}*1000`));
      await queue.moveAll(queue.TC[0].T);
      return new Promise(resolve => {
        resolve("end");
      });
    },
    moveAll: function(num,C1) {
      for (let i = 0; i < C1.length; i++) {
        C1[i]=queue.moveTimesCon(num,C1[i])
      }
      return C1
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
    },
    setElements: function(This) {
      This.elem = document.getElementById(`${This.id}`);
    },
    disTest: function(time,collider,This ) {
      let x = exactMath.formula(
        `${collider.x} + ${collider.vx} *${time} - ${This.x}  - ${This.vx}*${time}`
      );
      let y = exactMath.formula(
        `${collider.y} + ${collider.vy} *${time} - ${This.y}  - ${This.vy}*${time}`
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
    },
    collisens: function(CN,c1) {
      // console.log(" collisens ");
      let ar = [];
      let counter = 0;
      let colliders=log(CN)
      let C1=log(c1)
      while(colliders.length>0){
        for (let i = 0; i < C1.length; i++) {
        if (colliders[0].id != C1[i].id) {
          let calc=queue.calcings(colliders[0],C1[i])
          if (calc != null) {
            ar[ar.length]=new timeComponent(calc,C1[i],colliders[0])
          }
        }
        else{
          C1.filter((v,index)=>{return index!=i})
        }
      }
      let wall=queue.wallCalc(colliders[0])
      if(wall.length>0){
        ar=ar.concat(wall)
      }
      colliders.splice(0,1)
    }
    return queue.sort(ar)
    },
    moveTimesCon : function(time, This) {
      This.x = exactMath.formula(`${This.x} +${This.vx} * ${time}`);
      This.y = exactMath.formula(`${This.y} +${This.vy} * ${time}`);
      return This
    },
    collisenExe : function(CN,C1) {
      if (typeof CN.C == "string") {
        // console.log(copy.color + " colliding with " + copyC);
        CN.This=queue.wallExe(CN.This, CN.C);
        C1[CN.This.id]=CN.This
        return C1;
      }
      else{
        // console.log(copy.color + " executing on " + copyC.color);
        let colliders=queue.collisen(CN.This,CN.C);
        C1[CN.This.id]=colliders.This
        C1[CN.C.id]=colliders.C
        return C1;
      }
    },
    draw : function(This,time,color) {
      // if(stringify(This.elem)=="{}"||stringify(This.elem)==undefined){
      //   This.elem = document.getElementById(`${This.id}`);
      // }
      if(!document.canvas.stopTimeOut){
      This.me.elem.style.transition = `${time}s linear`;
      This.me.elem.attributes.fill.value=color
      This.me.x = This.x;
      This.me.y = This.y;
      }
    },
    calcings : function(This,collider) {
      This.a = exactMath.formula(`
      ${Math.abs(exactMath.pow(This.vx, 2))}-
        (2 * ${This.vx} * ${collider.vx}) +
        ${Math.abs(exactMath.pow(collider.vx, 2))} +
        ${Math.abs(exactMath.pow(This.vy, 2))} -
        (2 * ${This.vy} * ${collider.vy}) +
        ${Math.abs(exactMath.pow(collider.vy, 2))}`);

      This.b = exactMath.formula(`
        (2 * ${This.x} * ${This.vx}) -
        (2 * ${This.vx} * ${collider.x}) -
        (2 * ${This.x} * ${collider.vx}) +
        (2 * ${collider.x} * ${collider.vx}) -
        (2 * ${collider.y} * ${This.vy}) +
        (2 * ${collider.y} * ${collider.vy}) +
        (2 * ${This.vy} * ${This.y}) -
        (2 * ${collider.vy} * ${This.y})`);

      This.c = exactMath.formula(`
        ${Math.abs(exactMath.pow(This.x, 2))} -
        (2 * ${This.x} * ${collider.x}) +
        ${Math.abs(exactMath.pow(collider.x, 2))} +
        ${Math.abs(exactMath.pow(collider.y, 2))} +
        ${Math.abs(exactMath.pow(This.y, 2))} -
        (2 * ${collider.y} * ${This.y}) -
        10000`);

      This.aT2 = exactMath.formula(`2 * ${This.a}`);
      This.sqrt = Math.sqrt(
        exactMath.formula(
          `${Math.abs(exactMath.pow(This.b, 2))} - 4 * ${This.a} * ${This.c}`
        )
      );
      if (This.sqrt.toString() == "NaN") {
        return null;
      }
      This.con1 = exactMath.formula(`(${-This.b}+${This.sqrt})/${This.aT2}`);

      This.con2 = exactMath.formula(
        `(${-This.b}-${This.sqrt}) /  ${This.aT2}`
      );
      if(This.con2==0&&This.con1!=0){
        return 0
      }
      if (This.con2 > 0) {
        let intTime = exactMath.floor(This.con2, 1);
        let T1 = exactMath.formula(`
              ${exactMath.round(This.con2, -10)} -
              ${exactMath.floor(This.con2, 1)}`);
        let T2 = exactMath.formula(`
              ${exactMath.round(This.con1, -10)} -
              ${exactMath.floor(This.con1, 1)}`);
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
    },
    wallExe : function(This,collider) {
      let copy=This
      if (collider == "wallRight" || collider == "wallLeft") {
        copy.vx = -copy.vx;
      } else if (collider == "wallTop" || collider == "wallBottom") {
        copy.vy = -copy.vy;
      }
      return copy
    },
    wallCalc : function(This) {
      if(innerWidth==null||svg==null){
       svg = document.querySelector("#svg");
     innerWidth = svg.clientWidth;
     innerHeight = svg.clientHeight;
      }
      let ar=[]
      if (This.vx > 0) {
        let t = exactMath.formula(`(${innerWidth}-${This.x}-50)/${This.vx}`);
        if(t.toString() != "NaN"){
        ar.push(new timeComponent(t,"wallRight",This));
        }
      } else {
        let t = exactMath.formula(`(${This.x}-50)/${-This.vx}`);
        if(t.toString() != "NaN"){
        ar.push(new timeComponent(t,"wallLeft",This));
        }
      }
      if (This.vy > 0) {
        let t = exactMath.formula(`(${innerHeight}-${This.y}-50)/${This.vy}`);
        if(t.toString() != "NaN"){
        ar.push(new timeComponent(t,"wallTop",This));
        }
      } else {
        let t = exactMath.formula(`(${This.y}-50)/${-This.vy}`);
        if(t.toString() != "NaN"){
        ar.push(new timeComponent(t,"wallBottom",This));
        }
      }
      return ar
    },
    collisen : function(This,collider) {
      let copy=This
      let copyC=collider
      let x = exactMath.formula(`${copyC.x} - ${copy.x}`);
      let y = exactMath.formula(`${copyC.y} - ${copy.y}`);
      copy.distance = queue.disTest(0, copyC, copy);
      copy.vCollision = { x: x, y: y };
      copy.vCollisionNorm = {
        x: exactMath.formula(`${copy.vCollision.x} / ${copy.distance}`),
        y: exactMath.formula(`${copy.vCollision.y} / ${copy.distance}`)
      };
      copy.vRelativeVelocity = {
        x: exactMath.formula(`${copy.vx} - ${copyC.vx}`),
        y: exactMath.formula(`${copy.vy} - ${copyC.vy}`)
      };
      copy.speed = exactMath.formula(`
        ${copy.vRelativeVelocity.x} * ${copy.vCollisionNorm.x} +
        ${copy.vRelativeVelocity.y} * ${copy.vCollisionNorm.y}`);
      copy.vx = exactMath.formula(
        ` ${copy.vx}-${copy.speed} * ${copy.vCollisionNorm.x} `
      );
      copy.vy = exactMath.formula(
        ` ${copy.vy}-${copy.speed} * ${copy.vCollisionNorm.y} `
      );
      copyC.vx = exactMath.formula(
        ` ${copyC.vx} + ${copy.speed} * ${copy.vCollisionNorm.x} `
      );
      copyC.vy = exactMath.formula(
        ` ${copyC.vy} + ${copy.speed} * ${copy.vCollisionNorm.y} `
      );
      return {This:copy, C:copyC};
    }
  };
export function timeComponent(T,C,This,C1){
      this.T=T
      this.C=C
      this.This=This
      this.C1=C1
      this.removeT=function(time){
        this.T=exactMath.formula(`${this.T}-${time}`)
      }
      this.containid=function(id){
        return (this.C.id==id||this.This.id==id)
      }
      this.run=function(Time){
        for(let ele of this.C1){
          if(ele.id==this.This.id){
            queue.draw(ele,Time,"white")
          }
          else if(ele.id==this.C.id){
            queue.draw(ele,Time,"white")
          }
          else{
          queue.draw(ele,Time,ele.me.color)
          }
        }

      }
}
// export function TC(CN,C1){
//   this.CN=CN
//   this.C1=C1
// }
export async function animation() {
      await queue.set(c1);
      await queue.runQueue();
    }
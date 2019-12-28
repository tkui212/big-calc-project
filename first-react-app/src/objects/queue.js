export const exactMath = require("exact-math");
export var c1 = [];
var svg = document.querySelector("#svg");
    var innerWidth = 0
    var innerHeight = 0
export var queue = {
    TC: [],
    TC1: [],
    updateEl: async function(ar,CN) {
      if (ar.length == 0) {
        return CN
      }
      let removed = [];
      for (let i = 0; i < ar.length; i++) {
        CN = CN.filter(value => {
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
        CN = CN.concat(await removed[i].collisens());
      }
      // await queue.filterDup(ar)
      CN= queue.sort(CN);
      if (CN[0] == undefined) {
        CN = [];
      }
      return CN
    },
    filter: function(CN) {
      CN = CN.filter(value => {
        return value.T >= 0 ? true : false;
      });
      return CN
    },
    filterDup: function(CN) {
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
    sort: async function(CN) {
      CN= queue.filterDup(CN);
      CN= queue.filter(CN);
      CN = CN.sort((a, b) => {
        return b.T > a.T ? -1 : 1;
      });
      return new Promise(resolve => {
        resolve("a");
      });
    },
    removeTime: function(num,CN) {
      for (let ele of CN) {
        ele=ele.removeT(num)
      }
      return CN
    },
    getCsInSecond: function(CN) {
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
    set: async function(a) {
      queue.arr = a;
      return new Promise(resolve => {
        resolve("a");
      });
    },
    futher: async function(CN) {
      let ar=[]
      let Time=0
      for(let i=0;i<10;i++){
        if(CN[0].T!==0){
          Time=exactMath.formula(`${Time}+${CN[0].T}`)
          CN=queue.moveAll(CN[0].T,CN)
        }
        while (CN[0]<1) {
        let elle = CN[0];
        ar.push(new timeComponent(Time,elle.C,elle.This))//ye
        CN=queue.collisenExe(elle.This,elle.C,CN);//checked
        if (CN.length != 0 || CN != 0) {//checked
          CN= queue.filter(CN);//checked
          CN= queue.sort(CN);//checkd
        }
        Time=exactMath.formula(`${Time}+${CN[0].T}`)
        CN=queue.moveAll(CN[0].T,CN)
      }
    }
    console.log(ar)
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
    moveAll: async function(num,CN) {
      for (let i = 0; i < CN.length; i++) {
        CN[i]=queue.moveTimesCon(num,CN[i])
      }
      CN=queue.removeTime(num,CN);
      return CN
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
      This.elem = document.getElementById(`${This.name}`);
      This.Vline = document.getElementById(`${This.name}V`);
      This.colliP = document.getElementById(`${This.name}ColliP`);
    },
    disTest: function(This, time, collider) {
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
    collisens: async function(CN,C1) {
      console.log(" collisens ");
      let ar = [];
      let counter = 0;
      
        let colliders=CN
      while(colliders.length>0){
        for (let i = 0; i < c1.length; i++) {
        if (colliders[0] != CN[i]) {
          colliders[i].c2 = colliders[0];
          let calc=queue.calcings(CN[i])
          if (calc != null) {
            CN[i].combine[counter] = new timeComponent(calc,CN[i].c2,CN[i])
            counter++;
          }
        }
      }
    }
      queue.wallQ2(This);
      for (let i = 0; i < colliders.length; i++) {
        if (colliders[i] != This) {
          This.c2 = colliders[i];
          let calc=queue.calcings(This)
          if (calc != null) {
            This.combine[counter] = new timeComponent(calc,This.c2,This)
            counter++;
          }
        }
      }
      return This.combine;
    },
    moveTimesCon : async function(time, This) {
      let copy=This
      copy.x = exactMath.formula(`${copy.x} +${copy.vx} * ${time}`);
      copy.y = exactMath.formula(`${copy.y} +${copy.vy} * ${time}`);
      return copy
    },
    collisenExe : async function(This,collider,CN) {
      let copy=This
      let copyC=collider
      let copyC1=CN
      if (typeof copyC == "string") {
        console.log(copy.color + " colliding with " + copyC);
        copy=queue.wallExe(copy, copyC);
        return queue.updateEl([copy],copyC1);
      }
      else{
        console.log(copy.color + " executing on " + copyC.color);
        let colliders=await queue.collisen(copy,copyC);
        copy=colliders.This
        copyC=colliders.C
        return queue.updateEl([copy,copyC],copyC1);
      }
    },
    draw : function(This,time) {
      This.elem.style.transition = `${time}s linear`;
      This.elem.attributes[1].value = This.x;
      This.elem.attributes[2].value = This.y;
      return new Promise(resolve => {
        resolve("end");
      });
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
      if(innerWidth==null){
       svg = document.querySelector("#svg");
     innerWidth = svg.clientWidth;
     innerHeight = svg.clientHeight;
      }
      let ar=[]
      if (This.vx > 0) {
        let t = exactMath.formula(`(${innerWidth}-${This.x}-50)/${This.vx}`);
        ar.push(new timeComponent(t,"wallRight",This));
      } else {
        let t = exactMath.formula(`(${This.x}-50)/${-This.vx}`);
        ar.push(new timeComponent(t,"wallLeft",This));
      }
      if (This.vy > 0) {
        let t = exactMath.formula(`(${innerHeight}-${This.y}-50)/${This.vy}`);
        ar.push(new timeComponent(t,"wallTop",This));
      } else {
        let t = exactMath.formula(`(${This.y}-50)/${-This.vy}`);
        ar.push(new timeComponent(t,"wallBottom",This));
      }
      return ar
    },
    collisen : async function(This,collider) {
      let copy=This
      let copyC=collider
      let x = exactMath.formula(`${copyC.x} - ${copy.x}`);
      let y = exactMath.formula(`${copyC.y} - ${copy.y}`);
      copy.distance = await queue.disTest(0, copyC, copy);
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
export function timeComponent(T,C,This){
      this.T=T
      this.C=C
      this.This=This
      this.removeT=function(time){
        this.T=exactMath.formula(`${this.T}-${time}`)
      }
      this.containName=function(name){
        return (this.C.name==name||this.This.name==name)
      }
}
export async function animation() {
      await queue.set(c1);
      await queue.runQueue();
    }
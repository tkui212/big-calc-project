const exactMath = require("exact-math");
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

function timeComponent(T,C,This){
      this.T=t
      this.C=C
      this.This=This
      removeT=function(time){
        this.T=exactMath.formula(`${this.T}-${time}`)
      }
}
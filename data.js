const canvas = document.querySelector(`#canvas_plate`);
canvas.width = window.innerWidth-4;
canvas.height = window.innerHeight-4;
const width = canvas.width;
const height = canvas.height;
let c0=canvas.getContext(`2d`);

let c = c0
const canvas1 = document.querySelector(`#can1`);
canvas1.width = 150
canvas1.height = 150
let c1 = canvas1.getContext(`2d`);

const canvas2 = document.querySelector(`#can2`);
canvas2.width = 150
canvas2.height = 150
let c2 = canvas2.getContext(`2d`);

let mouse = {
  x: null,
  y: null
};
/**is the mouse currently being clicked and hold */

let codeForAnyEvent;
let ANY = false;
var keyEnent;
var mouseEvent;
var inputs = "";

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

/**white board Title */
let WBT = "WB";
let move = document.getElementById("move");
let tmove = document.getElementById("tmove");
let grathH = document.getElementById("grath_history");
let tools = document.getElementById("tools");
let grathZ = document.getElementById("grath_wizard");
let menuWB = document.getElementById("menuopse");
let graths = document.getElementById("graths");
let pointsWB = document.getElementById("points");
let points1 = document.getElementById("point1");
let calc = document.getElementById("calc");
let calcH = document.getElementById("calc_history");
let cont = document.getElementById("movecon");

let all = document.getElementById("all");
let code = document.getElementById("code");
let inpv0 = document.getElementById("inputV0");
let inpv = document.getElementById("inputV");
let inpt0 = document.getElementById("inputt0");
let inpt = document.getElementById("inputt");

let WB = move;
let elems = document.getElementsByName("drag");
for (let i = 0; i < elems.length; i++) {
  elems[i].style.left = getComputedStyle(elems[i]).left;
  elems[i].style.top = getComputedStyle(elems[i]).top;
}

let allBo=all.getBoundingClientRect()
let graphsBo=graths.getBoundingClientRect()
let pointsBo=pointsWB.getBoundingClientRect()
let wizardBo=grathZ.getBoundingClientRect()
graths.style.left=parseInt(allBo.right)-graphsBo.width-4
pointsWB.style.top=allBo.bottom-pointsBo.height
grathZ.style.top=allBo.bottom-wizardBo.height

let lastTopParents=totalParents()[`${points1.id}`]

let lastTop = points1;
let isDown = false;
let isCodeOut = false;
/**the element that did the snap */
var snapper;
/**the element that got snaped to */
var snapped;


let snapers = $(`snapTo`);


for (const element of $(`snapTo`)) {//intilaiz the WBs
  //   let newCont = cont.cloneNode(true);
  //   newCont.id = `${element.id}con`;
  //   all.appendChild(newCont);
  element[`istop`] = false;
  element[`isbottom`] = false;
  element[`isleft`] = false;
  element[`isright`] = false;
  element[`der`] = "down";
  element[`effDer`] = function () {
    let eleBo = this.getBoundingClientRect();
    let snaBo = this.parentElement.getBoundingClientRect();
    istop = false;
    isleft = false;
    isbottom = false;
    isright = false;
    if (this.parentElement == $("#all")[0]) {
      if (5>Math.abs(eleBo.top - snaBo.top) ){
        istop = true;
      } else if (5>Math.abs(eleBo.bottom - snaBo.bottom)) {
        isbottom = true;
      }
      if (5>Math.abs(eleBo.left - snaBo.left)) {
        isleft = true;
      } else if (5>Math.abs(eleBo.right - snaBo.right)) {
        isright = true;
      }
    } else {
      if (Math.abs(eleBo.top - snaBo.bottom) < 5) {
        //check the numbers of the eleBo and snaBo.. thay are not what
        istop = true;
      } else if (Math.abs(eleBo.bottom - snaBo.top) < 5) {
        isbottom = true;
      }
      if (Math.abs(eleBo.left - snaBo.right) < 5) {
        isleft = true;
      } else if (Math.abs(eleBo.right - snaBo.left) < 5) {
        isright = true;
      }
    }
    if ((istop || isbottom) && (isleft || isright)) {
      if (eleBo.width > eleBo.height) {
        der = istop ? "up" : "down";
        return istop ? "up" : "down";
      } else {
        der = isleft ? "left" : "right";
        return isleft ? "left" : "right";
      }
    } else {
      der = istop ?
        "up" :
        isleft ?
        "left" :
        isbottom ?
        "down" :
        isright ?
        "right" :
        false;
      return istop ?
        "up" :
        isleft ?
        "left" :
        isbottom ?
        "down" :
        isright ?
        "right" :
        false;
    }
  };

  element[`Hide`] = function (dir, dur) {
    updateCon(this);
    let ops;
    if (dir == "up") {
      ops={top: `-=${$(`#${this.id}`).outerHeight()}`}
    } else if (dir == "down") {
      ops={top: `+=${$(`#${this.id}`).outerHeight()}`}
    } else if (dir == "left") {
      ops={left: `-=${$(`#${this.id}`).outerWidth()}`}
    } else if (dir == "right") {
      ops={left: `+=${$(`#${this.id}`).outerWidth()}`}
    } else {

    }
    $(`#${this.id}con`).animate(ops, dur)
    $(`#${this.id}`).hide(
      "slide", {
        direction: dir,

      },
      dur
    );
  };
  element[`Show`] = function (dir, dur) {
    updateCon(this);
    let ops;
    if (dir == "down") {
      ops={top: `-=${$(`#${this.id}`).outerHeight()}`}
    } else if (dir == "up") {
      ops={top: `+=${$(`#${this.id}`).outerHeight()}`}
    } else if (dir == "right") {
      ops={left: `-=${$(`#${this.id}`).outerWidth()}`}
    } else if (dir == "left") {
      ops={left: `+=${$(`#${this.id}`).outerWidth()}`}
    } else {

    }
    $(`#${this.id}con`).animate(ops, dur)
    $(`#${this.id}`).show(
      "slide", {direction: dir},
      dur
      );
  };
  element[`connectCon`] = function () {
    
    if(this.style.display=="none"){
      WB=this.parentElement
    }
    else{
      WB = this;
    }
    con($(`#${this.id + "con"}`)[0]);
    console.log($(`#${this.id}>snapTo`))
    for(const elel of $(`#${this.id}>snapTo`)){
      elel.connectCon()
    }
  }
  element[`getSnapings`] = function (){
    let snapped = $(this).data("ui-draggable").snapElements;
    let snappedTo = [];
    for (let i = 0; i < snapped.length; i++) {
      if (snapped[i].snapping) {
        snappedTo.push(snapped[i].item)
      }
    }
    return snappedTo
}
  element[`disconnectCon`] = function () {
    WB = this;
    dis($(`#${this.id + "con"}`)[0]);
    for(const elel of $(`#${this.id}>snapTo`)){
      elel.disconnectCon()
  }
}
  element.style.display="block"
  WB = element;
  element.der = element.effDer()
  updateCon(element);
  console.log($(`#${element.id}`))
}
var datapoints=$(".dataPoints")
for(const poin of datapoints){
    let parBo=poin.getBoundingClientRect()
    let parentBo=poin.parentElement.getBoundingClientRect()
        poin.style.left =parBo.left-parentBo.left
        poin.style.top =parBo.top-parentBo.top

}
for(const poin of datapoints){
        poin.style.position="absolute"
        poin.style.float="none"
}
for (const element of $(`snapTo`)) {
    updateCon(element)
}

let awff=[6,4,3,0,5]
awff=awff.filter((value)=>{return value!=0?true:false})
awff=awff.sort((a,b)=>{return b>a?-1:1})
awff=awff.sort
console.log(awff)

let ffff=[1]
console.log(ffff)
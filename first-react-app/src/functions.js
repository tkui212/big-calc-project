import $ from  "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/resizable";
import "jquery-ui/ui/effect";
import "jquery-ui/ui/effect";
import {Vg, point,c} from "./graph/graph"
// export function hi() {
//   console.log("hi");
// };
export function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

export function toRadians (angle) {
  return angle * (Math.PI / 180);
}
export function log(text) {
  return JSON.parse(stringify(text));
}
var stringify = require("json-stringify-safe");

export var mouseElem = (ev) => document.elementsFromPoint(ev.clientX, ev.clientY);
  
export var con = (child,parent) => {
  if (child.parentElement.getAttribute("title")!="WB"&&(parent.id!=child.id)&&!containsId(parent.children, child.id)) {
      // WB.parentElement.getAttribute("title")=="WB"
      let parBo=parent.getBoundingClientRect()
      let chiBo=child.getBoundingClientRect()
      child.style.left =parseInt(child.style.left) - parBo.left+"px"
      child.style.top = parseInt(child.style.top) - parBo.top-2+"px"
      parent.appendChild(child)
  }
}
export var dis = (child) => {
  if (child.parentElement.getAttribute("title")=="WB") {
      let parBo=child.getBoundingClientRect()
      child.style.left =parBo.left+"px"
      child.style.top =parBo.top+"px"
      child.style.position="absolute"
      child.style.float="none"
      $("#sliders")[0].appendChild(child)

  }
}

export function updateCon(el) {
  el.der=el.effDer()
  let con = $(`#${el.id + "con"}`)[0];
  let eleBo = el.getBoundingClientRect();
  if (el.style.display == "none"||el.id=="all") {
  } else if (el.der == "up") {
    con.style.top = eleBo.bottom+"px";
    con.style.left = eleBo.width / 2 - 50 + eleBo.left+"px";
    con.style.width = 100+"px";
    con.style.height = 50+"px";
  } else if (el.der == "down") {
    con.style.top = eleBo.top - 50+"px";
    con.style.left = eleBo.width / 2 - 50 + eleBo.left+"px";
    con.style.width = 100+"px";
    con.style.height = 50+"px";
  } else if (el.der == "left") {
    con.style.top = eleBo.height / 2 - 50 + eleBo.top+"px";
    con.style.left = eleBo.width + eleBo.left+"px";
    con.style.width = 50+"px";
    con.style.height = 100+"px";
  } else if (el.der == "right") {
    con.style.top = eleBo.height / 2 - 50 + eleBo.top+"px";
    con.style.left = eleBo.left - 50+"px";
    con.style.width = 50+"px";
    con.style.height = 100+"px";
  } else {
    try{
    con.style.top = eleBo.bottom+"px";
    con.style.left = eleBo.width / 2 - 50 + eleBo.left+"px";
    con.style.width = 100+"px";
    con.style.height = 50+"px";
    }catch(er){
      
    }
  }
  for(const elel of $(`#${el.id}>snapTo`)){
    updateCon(elel)
  }
}

export var containsId = (a, n) => {
  let ar = a;
  for (let i = 0; i < ar.length; i++) {
    if (ar[i].id == n) {
      return true;
    }
  }
  return false;
};
export var containsTitle = (a, n) => {
  let ar = a;
  for (let i = 0; i < ar.length; i++) {
    if (ar[i].getAttribute("title") == n) {
      return true;
    }
  }
  return false;
};
export var returnId = (a, n) => {
  let ar = a;
  for (let i = 0; i < ar.length; i++) {
    if (ar[i].id == n) {
      return ar[i];
    }
  }
  return false;
};
export var returnTitle = (a, n) => {
  let ar = a;
  for (let i = 0; i < ar.length; i++) {
    if (ar[i].getAttribute("title") == n) {
      return ar[i];
    }
  }
  return false;
};

export async function runEffect(el,ops) {
  // get effect type from
  let me = $(el)[0];
  if(me.style.display=="block"){
  me.der = me.effDer();

let times=ops?ops+0.2:1
  let childtocollapse = $(`#${me.id}>snapTo`);
  if (childtocollapse.length > 0) {
    let promisArr=[]
  for (let i = 0; i < childtocollapse.length; i++) {
    if(childtocollapse[i].style.display!="none"){
    promisArr[i]=runEffect(childtocollapse[i],times);
    setTimeout(() => { $(`#${childtocollapse[i].id}con`)[0].style.display="none" }, 1000/times);
    }
    else{
      $(`#${childtocollapse[i].id}con`)[0].style.display="none"
    }
  }
  let a=await Promise.all(promisArr)
  me.Hide(me.der, 1000/times);
}

  else  {
    me.Hide(me.der, 1000/times);
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(el);
    }, 1000/times);
  });
}
}
export function effShow(el) {
  let me = $(el)[0];
  if(me.style.display=="none"){
  let childtocollapse = $(`#${me.id}>snapTo`);
  me.Show(me.der, 1000);
  $(`#${me.id}con`)[0].style.display="block"
  for (const elem of childtocollapse) {
    setTimeout(function() {
      effShow(elem);
    }, 1000);
  }
}
}


export function showAll(){
  let elems=$(`#sliders>snapTo`)
  for(const elem of elems){
    effShow(elem)
  }
}
export function hideAll(){
  let elems=$(`#sliders>snapTo`)
  for(const elem of elems){
    runEffect(elem)
  }
}

export var totalParents = () => {
  let ar = document.getElementsByName("drag");
  let totar = {};
  for (let i = 0; i < ar.length; i++) {
    if (ar[i].parentElement.getAttribute("title") == "WB") {
      totar[`${ar[i].id}`] = [ar[i].parentElement];
      let current = ar[i].parentElement;
      while (current.parentElement.getAttribute("title") == "WB") {
        current = current.parentElement;
        // console.log("")
        // console.log(current)
        totar[`${ar[i].id}`].push(current);
        // console.log(totar[`${ar[i].id}`])
        // console.log("")
      }
    }
  }
  return totar;
};

export function collapse(elem) {
  runEffect(`#${elem.id}`);
}
if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

export var onSnap = (did, got) => {
  // console.log(did)
  // console.log(got)
  if (did.getAttribute("name") == "drag"&&got!=undefined) {
    if (
      did.getAttribute("title") == "WB" &&
      !containsId(did.children, got.id)
    ) {
      console.log("con");
      dis(did);
      con(did,got);
    } else {
      console.log("dis");
      dis(did);
    }
  }
};




//graphs partsV
















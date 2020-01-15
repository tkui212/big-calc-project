var Export=()=>{
  containsId = (a, n) => {
    let ar = a;
    for (let i = 0; i < ar.length; i++) {
      if (ar[i].id == n) {
        return true;
      }
    }
    return false;
  };
  containsTitle = (a, n) => {
    let ar = a;
    for (let i = 0; i < ar.length; i++) {
      if (ar[i].getAttribute("title") == n) {
        return true;
      }
    }
    return false;
  };
  returnId = (a, n) => {
    let ar = a;
    for (let i = 0; i < ar.length; i++) {
      if (ar[i].id == n) {
        return ar[i];
      }
    }
    return false;
  };
  returnTitle = (a, n) => {
    let ar = a;
    for (let i = 0; i < ar.length; i++) {
      if (ar[i].getAttribute("title") == n) {
        return ar[i];
      }
    }
    return false;
  };
  
  hi = () => {
    console.log("hi");
  };
  mouseElem = () => document.elementsFromPoint(mouse.x, mouse.y);
  
  async function runEffect(el,ops) {
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
  
  function effShow(el) {
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
  // Callback function to bring a hidden box back
  
  function updateCon(el) {
    let con = $(`#${el.id + "con"}`)[0];
    let eleBo = el.getBoundingClientRect();
    if (el.style.display == "none"||el.id=="all") {
    } else if (el.der == "up") {
      con.style.top = eleBo.bottom;
      con.style.left = eleBo.width / 2 - 50 + eleBo.left;
      con.style.width = 100;
      con.style.height = 50;
    } else if (el.der == "down") {
      con.style.top = eleBo.top - 50;
      con.style.left = eleBo.width / 2 - 50 + eleBo.left;
      con.style.width = 100;
      con.style.height = 50;
    } else if (el.der == "left") {
      con.style.top = eleBo.height / 2 - 50 + eleBo.top;
      con.style.left = eleBo.width + eleBo.left;
      con.style.width = 50;
      con.style.height = 100;
    } else if (el.der == "right") {
      con.style.top = eleBo.height / 2 - 50 + eleBo.top;
      con.style.left = eleBo.left - 50;
      con.style.width = 50;
      con.style.height = 100;
    } else {
      try{
      con.style.top = eleBo.bottom;
      con.style.left = eleBo.width / 2 - 50 + eleBo.left;
      con.style.width = 100;
      con.style.height = 50;
      }catch(er){
        
      }
    }
    for(const elel of $(`#${el.id}>snapTo`)){
      updateCon(elel)
    }
  }
  
  function showAll(){
    let elems=$(`#all>snapTo`)
    for(const elem of elems){
      effShow(elem)
    }
  }
  function hideAll(){
    let elems=$(`#all>snapTo`)
    for(const elem of elems){
      runEffect(elem)
    }
  }
  
  var totalParents = () => {
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
  
  function collapse(elem) {
    runEffect(`#${elem.id}`);
  }
  //functions^
  //data v
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

// var bigDecimal = require('js-big-decimal');
// let aaaaw=0.00324
// console.log(aaaaw)
// let aw2=aaaaw
// console.log(aw2)
// aw2=-aaaaw
// console.log(aw2)


//data^
//drag and drop v

con = (child) => {
    if (child.parentElement.getAttribute("title")!="WB"&&(WB.id!=child.id)&&!containsId(WB.children, child.id)) {
        // WB.parentElement.getAttribute("title")=="WB"
        let parBo=WB.getBoundingClientRect()
        let chiBo=child.getBoundingClientRect()
        child.style.left =parseInt(child.style.left) - parBo.left
        child.style.top = parseInt(child.style.top) - parBo.top-2
        WB.appendChild(child)
    }
}
dis = (child) => {
    if (child.parentElement.getAttribute("title")=="WB") {
        let parBo=child.getBoundingClientRect()
        child.style.left =parBo.left
        child.style.top =parBo.top
        child.style.position="absolute"
        child.style.float="none"
        all.insertBefore(child, document.getElementById("end of boards"))

    }
}


$(".ui-widget-content").resizable();
$("#tmove").draggable({
  grid: [2, 2]
});
$(".ui-widget-content").draggable({
  snap: `snapTo:not(#${this.id}):not(#${this.id}>snapTo)`,
  snapTolerance: 10,
  start: function (event, ui) {
    dis(this)

    this.connectCon()
    
    //add con() for the con's of WB children
  },

  stop: function (event, ui) {

    this.disconnectCon()
    
    /* Get the possible snap targets: */
    onSnap(this, this.getSnapings()[0]);
    
    updateCon(this);
  }
});
$(".dataPoints").draggable({
  snap: `snapTo`,
  snapTolerance: 10,
  start: function (event, ui) {
    WB=this.parentElement
    dis(this)
  },

  stop: function (event, ui) {
   
      onSnap(this, this.getSnapings()[0]);
    
}
});


//drag and drop^
//menu V

var menu = document.getElementById("menu")
var menut = document.getElementById("menut")
var menuops = document.getElementsByClassName("menuButton")

function opMenu(Mo) {
    let elem=mouseElem()[0]
    menu.style.left = mouse.x;
    menu.style.top = mouse.y;
    let allBo=all.getBoundingClientRect()
    let menuBo=menu.getBoundingClientRect()
    if(menuBo.top>allBo.height-220){
        menu.style.top=menuBo.top-220
    }
    if(menuBo.left>allBo.width-100){
        menu.style.left=menuBo.left-100
    }
    
    let id=elem.id
    menut.textContent = id

    menuops[0].textContent="cosnole this"
    menuops[0].setAttribute("onclick",`console.log(${id})`)
    if(elem.getAttribute("title")=="control"){
        menuops[1].setAttribute("onclick",`collapse(${id.slice(0,id.length-3)})`)
        menuops[2].textContent="show"
        menuops[2].setAttribute("onclick",`effShow(${id.slice(0,id.length-3)})`)
    }
    else{
        menuops[1].setAttribute("onclick",`collapse(${id})`)
        menuops[2].textContent="no show for you"
        menuops[2].setAttribute("onclick",`console.log("i said no!")`)
    }
    menuops[3].textContent="elems here"
    menuops[3].setAttribute("onclick",`console.log(document.elementsFromPoint(${parseInt(menuBo.left)}, ${parseInt(menuBo.top)}))`)   
    menuops[4].setAttribute("onclick",`hideAll()`)   
    menuops[5].setAttribute("onclick",`showAll()`)   
}

//menu^
//event V

// vscode-fold=1
// $("*").on(
//   "blur change click dblclick error focus focusin focusout hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select submit",
//   function(ev) {
//     if (ANY) {
//       if (codeForAnyEvent) {
//         try {
//           eval(codeForAnyEvent);
//         } catch (er) {
//           console.log(er);
//         }
//       }
//     }
//   }
// );


onSnap = (did, got) => {
    // console.log(did)
    // console.log(got)
    if (did.getAttribute("name") == "drag") {
      if (
        did.getAttribute("title") == "WB" &&
        !containsId(did.children, got.id)
      ) {
        console.log("con");
        dis(did);
        WB = got;
        con(did);
      } else {
        console.log("dis");
        dis(did);
      }
    }
  };
  
  function input(a) {
    var key = keyEnent.key;
    if (key == "Enter" && keyEnent.shiftKey) {
      console.log("");
      console.log("entered code: \n" + a);
      try {
        console.log("data of: " + a);
        eval(`console.log(${a})`);
      } catch (Error) {
        console.log(Error);
      }
      console.log("");
    } else {
      if (key == "Enter") {
        console.log("");
        console.log("entered code: \n" + a);
        try {
          eval(a);
        } catch (Error) {
          console.log(Error);
        }
        console.log("");
      }
    }
  }
  function pointDataEdit(dataName,value,point) {
    // var key = keyEnent.key;
    //   if (key == "Enter") {
    //     if(dataName=="x"){
    //       point.x=parseInt(value)
    //     }
    //     else{
    //       point.y=parseInt(value)
    //     }
    //     c = c0;
    //     clearall()
    //       phyGV.vg.draw()
    //       console.log("draw after edit")
    //       c = c2;
    //       clearall()
    //       phyGA=new graph(VtoA(phyGV.vg.points), 0, 0, 150, 150);
  
    //       c = c1;
    //       clearall()
    //       phyGX =new graph(VtoX(phyGV.vg.points), 0, 0, 150, 150); 
  
  
    //   }
    
  }
  window.onmousemove = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };
  window.onmousedown = e => {
    isDown = true;
  
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    let ar = document.elementsFromPoint(e.clientX, e.clientY);
    if (isDown) {
      //add this to on mouse down
  
      if (lastTop.getAttribute("title") == "WB") {
        lastTop.style.zIndex = 9;
      }
      if (lastTop.getAttribute("title") == "item") {
        try {
          let length = lastTopParents.length;
          console.log(totalParents())
        console.log(`${lastTop.id}`)
        for (let i = length; i >= 0; i--) {
          lastTopParents[i].style.zIndex = 11 + length - i;
        }
        } catch (err) {
          let length = 0;
        }
        lastTop.style.zIndex = 14;
        
      }
      if (ar[0].getAttribute("title") == "WB") {
        ar[0].style.zIndex = 10;
      }
      if (ar[0].getAttribute("title") == "item") {
        try {
          let length = totalParents()[`${ar[0].id}`].length;
        } catch (err) {
          let length = 0;
        }
        if (length > 15) {
          ar[0].style.zIndex = length + 2;
          // let sibling=ar[0].parentElement.children
          // sibling.forEach(element => {
          //     if(element.getAttribute("title")=="item"){
          //         element.style.zIndex = length+1
          //     }
          // });
        } else {
          ar[0].style.zIndex = 16;
          // let sibling=ar[0].parentElement.children
          // console.log(ar[0])
          // console.log(sibling)
          // sibling.forEach(element => {
          //     if(element.getAttribute("title")=="item"){
          //         element.style.zIndex = 15
          //     }
          // });
        }
        console.log(totalParents()[`${ar[0].id}`])
        for (let i = 1; i <= length; i++) {
          totalParents()[`${ar[0].id}`][i].style.zIndex = 11 + length - i;
        }
      }
      lastTop = ar[0];
      lastTopParents=totalParents()[`${ar[0].id}`]
    }
    // console.log("elem on mouse")
    // console.log(ar)
    if (ar[0].getAttribute("name") == "drag") {
      // console.log(ar[0])
      if (ar[0].parentElement.getAttribute("title") == "WB"&&e.button==0) {
         // console.log("")
        // console.log("child")
        // console.log(ar[0])
        // console.log("disconected from parent")
        // console.log("")
        dis(ar[0]);
      }
    }
  
    // console.log(lastTop.style.zIndex + " " + lastTop.id)
    // console.log(ar[0].style.zIndex + " " + ar[0].id)
    // console.log(move2.style.zIndex + " move2")
  
    // console.log("")
  };
  window.onkeydown = e => {
    keyEnent = e;
  
    if (e.altKey && e.ctrlKey) {
      if (!isCodeOut) {
        code.style.left = innerWidth / 2;
        code.style.top = innerHeight / 2;
        console.log("code");
        isCodeOut = true;
      } else {
        code.style.left = "-100px";
        code.style.top = "-1000px";
        isCodeOut = false;
      }
    }
    if (e.code == "Numpad0") {
      ANY = ANY ? false : true;
      console.log("ANY is now: " + ANY);
    }
    
  };
  window.onmouseup = e => {
    isDown = false;
    menu.style.left = "-100px";
    menu.style.top = "-100px";
    let ar = document.elementsFromPoint(e.clientX, e.clientY);
    if (
      ar[0].getAttribute("name") == "drag" &&
      ar[0].getAttribute("title") != "WB"&&e.button==0
    ) {
      // console.log("mouseUp")
      if (containsTitle(ar, "WB")) {
        dis(ar[0]);
        WB = returnTitle(ar, "WB");
        con(ar[0]);
      } else {
        dis(ar[0]);
      }
    }
  };
  
  window.oncontextmenu = function(s) {
    this.opMenu(s);
    return false; // cancel default menu
  };

  
  //event^
  //Scalc V


  var calcolatorStaff=()=>{
    /*****************************************
(C) https://www.calculator.net all right reserved.
*****************************************/
function gObj(obj) {
    var theObj;
    if (document.all) {
        if (typeof obj == "string") {
            return document.all(obj);
        } else {
            return obj.style;
        }
    }
    if (document.getElementById) {
        if (typeof obj == "string") {
            return document.getElementById(obj);
        } else {
            return obj.style;
        }
    }
    return null;
}

function trimAll(sString) {
    while (sString.substring(0, 1) == ' ') {
        sString = sString.substring(1, sString.length);
    }
    while (sString.substring(sString.length - 1, sString.length) == ' ') {
        sString = sString.substring(0, sString.length - 1);
    }
    return sString;
}

function showDebugInfo() {}

function r(A) {
    if (A == "10x" || A == "log" || A == "ex" || A == "ln" || A == "sin" || A == "asin" || A == "cos" || A ==
        "acos" || A == "tan" || A == "atan" || A == "e" || A == "pi" || A == "n!" || A == "x2" || A == "1/x" || A ==
        "swap" || A == "x3" || A == "3x" || A == "RND" || A == "M-" || A == "qc" || A == "MC" || A == "MR" || A ==
        "MS" || A == "M+" || A == "sqrt" || A == "pc") {
        func(A)
    } else {
        if (A == 1 || A == 2 || A == 3 || A == 4 || A == 5 || A == 6 || A == 7 || A == 8 || A == 9 || A == 0) {
            numInput(A)
        } else {
            if (A == "pow" || A == "apow" || A == "+" || A == "-" || A == "*" || A == "/") {
                opt(A)
            } else {
                if (A == "(") {
                    popen()
                } else {
                    if (A == ")") {
                        pclose()
                    } else {
                        if (A == "EXP") {
                            exp()
                        } else {
                            if (A == ".") {
                                if (entered) {
                                    value = 0;
                                    digits = 1
                                }
                                entered = false;
                                if ((decimal == 0) && (value == 0) && (digits == 0)) {
                                    digits = 1
                                }
                                if (decimal == 0) {
                                    decimal = 1
                                }
                                refresh()
                            } else {
                                if (A == "+/-") {
                                    if (exponent) {
                                        Hj = -Hj
                                    } else {
                                        value = -value
                                    }
                                    refresh()
                                } else {
                                    if (A == "C") {
                                        level = 0;
                                        exponent = false;
                                        value = 0;
                                        enter();
                                        refresh()
                                    } else {
                                        if (A == "=") {
                                            enter();
                                            while (level > 0) {
                                                evalx()
                                            }
                                            refresh()
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
var totalDigits = 12;
var pareSize = 12;
var degreeRadians = "degree";
var value = 0;
var memory = 0;
var level = 0;
var entered = true;
var decimal = 0;
var fixed = 0;
var exponent = false;
var digits = 0;
var showValue = "0";
var isShowValue = true;

function stackItem() {
    this.value = 0;
    this.op = ""
}

function array(A) {
    this[0] = 0;
    for (i = 0; i < A; ++i) {
        this[i] = 0;
        this[i] = new stackItem()
    }
    this.gG = A
}
uI = new array(pareSize);

function push(B, C, A) {
    if (level == pareSize) {
        return false
    }
    for (i = level; i > 0; --i) {
        uI[i].value = uI[i - 1].value;
        uI[i].op = uI[i - 1].op;
        uI[i].vg = uI[i - 1].vg
    }
    uI[0].value = B;
    uI[0].op = C;
    uI[0].vg = A;
    ++level;
    return true
}

function pop() {
    if (level == 0) {
        return false
    }
    for (i = 0; i < level; ++i) {
        uI[i].value = uI[i + 1].value;
        uI[i].op = uI[i + 1].op;
        uI[i].vg = uI[i + 1].vg
    }--level;
    return true
}

function format(I) {
    if (typeof (cc) != "undefined") {
        return
    };
    var E = "" + I;
    if (E.indexOf("N") >= 0 || (I == 2 * I && I == 1 + I)) {
        return "Error "
    }
    var G = E.indexOf("e");
    if (G >= 0) {
        var A = E.substring(G + 1, E.length);
        if (G > 11) {
            G = 11
        }
        E = E.substring(0, G);
        if (E.indexOf(".") < 0) {
            E += "."
        } else {
            j = E.length - 1;
            while (j >= 0 && E.charAt(j) == "0") {
                --j
            }
            E = E.substring(0, j + 1)
        }
        E += " " + A
    } else {
        var J = false;
        if (I < 0) {
            I = -I;
            J = true
        }
        var C = Math.floor(I);
        var K = I - C;
        var D = totalDigits - ("" + C).length - 1;
        if (!entered && fixed > 0) {
            D = fixed
        }
        var F = " 1000000000000000000".substring(1, D + 2) + "";
        if ((F == "") || (F == " ")) {
            F = 1
        } else {
            F = parseInt(F)
        }
        var B = Math.floor(K * F + 0.5);
        C = Math.floor(Math.floor(I * F + 0.5) / F);
        if (J) {
            E = "-" + C
        } else {
            E = "" + C
        }
        var H = "00000000000000" + B;
        H = H.substring(H.length - D, H.length);
        G = H.length - 1;
        if (entered || fixed == 0) {
            while (G >= 0 && H.charAt(G) == "0") {
                --G
            }
            H = H.substring(0, G + 1)
        }
        if (G >= 0) {
            E += "." + H
        }
    }
    return E
}

function refresh() {
    var A = format(value);
    if (exponent) {
        if (Hj < 0) {
            A += " " + Hj
        } else {
            A += " +" + Hj
        }
    }
    if (A.indexOf(".") < 0 && A != "Error ") {
        if (entered || decimal > 0) {
            A += "."
        } else {
            A += " "
        }
    }
    if ("" == ("" + A)) {
        document.getElementById("sciOutPut").innerHTML = " "
    } else {
        document.getElementById("sciOutPut").innerHTML = A
    }
}

function evalx() {
    if (level == 0) {
        return false
    }
    op = uI[0].op;
    Qk = uI[0].value;
    if (op == "+") {
        value = parseFloat(Qk) + value
    } else {
        if (op == "-") {
            value = Qk - value
        } else {
            if (op == "*") {
                value = Qk * value
            } else {
                if (op == "/") {
                    value = Qk / value
                } else {
                    if (op == "pow") {
                        value = Math.pow(Qk, value)
                    } else {
                        if (op == "apow") {
                            value = Math.pow(Qk, 1 / value)
                        }
                    }
                }
            }
        }
    }
    pop();
    if (op == "(") {
        return false
    }
    return true
}

function popen() {
    enter();
    if (!push(0, "(", 0)) {
        value = "NAN"
    }
    refresh()
}

function pclose() {
    enter();
    while (evalx()) {}
    refresh()
}

function opt(A) {
    enter();
    if (A == "+" || A == "-") {
        vg = 1
    } else {
        if (A == "*" || A == "/") {
            vg = 2
        } else {
            if (A == "pow" || A == "apow") {
                vg = 3
            }
        }
    }
    if (level > 0 && vg <= uI[0].vg) {
        evalx()
    }
    if (!push(value, A, vg)) {
        value = "NAN"
    }
    refresh()
}

function enter() {
    if (exponent) {
        value = value * Math.exp(Hj * Math.LN10)
    }
    entered = true;
    exponent = false;
    decimal = 0;
    fixed = 0
}

function numInput(A) {
    if (entered) {
        value = 0;
        digits = 0;
        entered = false
    }
    if (A == 0 && digits == 0) {
        refresh();
        return
    }
    if (exponent) {
        if (Hj < 0) {
            A = -A
        }
        if (digits < 3) {
            Hj = Hj * 10 + A;
            ++digits;
            refresh()
        }
        return
    }
    if (value < 0) {
        A = -A
    }
    if (digits < totalDigits - 1) {
        ++digits;
        if (decimal > 0) {
            decimal = decimal * 10;
            value = value + (A / decimal);
            ++fixed
        } else {
            value = value * 10 + A
        }
    }
    refresh()
}

function exp() {
    if (entered || exponent) {
        return
    }
    exponent = true;
    Hj = 0;
    digits = 0;
    decimal = 0;
    refresh()
}

function func(D) {
    enter();
    if (D == "1/x") {
        value = 1 / value
    }
    if (D == "pc") {
        value = value / 100
    }
    if (D == "qc") {
        value = value / 1000
    } else {
        if (D == "swap") {
            var B = value;
            value = uI[0].value;
            uI[0].value = B
        } else {
            if (D == "n!") {
                if (value < 0 || value > 200 || value != Math.round(value)) {
                    value = "NAN"
                } else {
                    var E = 1;
                    var A;
                    for (A = 1; A <= value; ++A) {
                        E *= A
                    }
                    value = E
                }
            } else {
                if (D == "MR") {
                    value = memory
                } else {
                    if (D == "M+") {
                        memory += value
                    } else {
                        if (D == "MS") {
                            memory = value
                        } else {
                            if (D == "MC") {
                                memory = 0
                            } else {
                                if (D == "M-") {
                                    memory -= value
                                } else {
                                    if (D == "asin") {
                                        if (degreeRadians == "degree") {
                                            value = Math.asin(value) * 180 / Math.PI
                                        } else {
                                            value = Math.asin(value)
                                        }
                                    } else {
                                        if (D == "acos") {
                                            if (degreeRadians == "degree") {
                                                value = Math.acos(value) * 180 / Math.PI
                                            } else {
                                                value = Math.acos(value)
                                            }
                                        } else {
                                            if (D == "atan") {
                                                if (degreeRadians == "degree") {
                                                    value = Math.atan(value) * 180 / Math.PI
                                                } else {
                                                    value = Math.atan(value)
                                                }
                                            } else {
                                                if (D == "e^x") {
                                                    value = Math.exp(value * Math.LN10)
                                                } else {
                                                    if (D == "2^x") {
                                                        value = Math.exp(value * Math.LN2)
                                                    } else {
                                                        if (D == "e^x") {
                                                            value = Math.exp(value)
                                                        } else {
                                                            if (D == "x^2") {
                                                                value = value * value
                                                            } else {
                                                                if (D == "e") {
                                                                    value = Math.E
                                                                } else {
                                                                    if (D == "ex") {
                                                                        value = Math.pow(Math.E, value)
                                                                    } else {
                                                                        if (D == "10x") {
                                                                            value = Math.pow(10, value)
                                                                        } else {
                                                                            if (D == "x3") {
                                                                                value = value * value * value
                                                                            } else {
                                                                                if (D == "3x") {
                                                                                    value = Math.pow(value, 1 / 3)
                                                                                } else {
                                                                                    if (D == "x2") {
                                                                                        value = value * value
                                                                                    } else {
                                                                                        if (D == "sin") {
                                                                                            if (degreeRadians ==
                                                                                                "degree") {
                                                                                                value = Math.sin(
                                                                                                    value /
                                                                                                    180 * Math
                                                                                                    .PI)
                                                                                            } else {
                                                                                                value = Math.sin(
                                                                                                    value)
                                                                                            }
                                                                                        } else {
                                                                                            if (D == "cos") {
                                                                                                if (degreeRadians ==
                                                                                                    "degree") {
                                                                                                    var C = (value %
                                                                                                        360);
                                                                                                    if (C < 0) {
                                                                                                        C = C + 360
                                                                                                    }
                                                                                                    if (C == 90) {
                                                                                                        value = 0
                                                                                                    } else {
                                                                                                        if (C ==
                                                                                                            270) {
                                                                                                            value =
                                                                                                                0
                                                                                                        } else {
                                                                                                            value =
                                                                                                                Math
                                                                                                                .cos(
                                                                                                                    value /
                                                                                                                    180 *
                                                                                                                    Math
                                                                                                                    .PI
                                                                                                                    )
                                                                                                        }
                                                                                                    }
                                                                                                } else {
                                                                                                    var C = (value *
                                                                                                            180 /
                                                                                                            Math.PI
                                                                                                            ) % 360;
                                                                                                    if (C < 0) {
                                                                                                        C = C + 360
                                                                                                    }
                                                                                                    if ((Math.abs(
                                                                                                                C -
                                                                                                                90
                                                                                                                ) <
                                                                                                            1e-10
                                                                                                            ) || (
                                                                                                            Math
                                                                                                            .abs(C -
                                                                                                                270
                                                                                                                ) <
                                                                                                            1e-10)
                                                                                                        ) {
                                                                                                        value = 0
                                                                                                    } else {
                                                                                                        value = Math
                                                                                                            .cos(
                                                                                                                value
                                                                                                                )
                                                                                                    }
                                                                                                }
                                                                                            } else {
                                                                                                if (D == "tan") {
                                                                                                    if (degreeRadians ==
                                                                                                        "degree") {
                                                                                                        value = Math
                                                                                                            .tan(
                                                                                                                value /
                                                                                                                180 *
                                                                                                                Math
                                                                                                                .PI)
                                                                                                    } else {
                                                                                                        value = Math
                                                                                                            .tan(
                                                                                                                value
                                                                                                                )
                                                                                                    }
                                                                                                } else {
                                                                                                    if (D ==
                                                                                                        "log") {
                                                                                                        value = Math
                                                                                                            .log(
                                                                                                                value
                                                                                                                ) /
                                                                                                            Math
                                                                                                            .LN10
                                                                                                    } else {
                                                                                                        if (D ==
                                                                                                            "log2"
                                                                                                            ) {
                                                                                                            value =
                                                                                                                Math
                                                                                                                .log(
                                                                                                                    value
                                                                                                                    ) /
                                                                                                                Math
                                                                                                                .LN2
                                                                                                        } else {
                                                                                                            if (D ==
                                                                                                                "ln"
                                                                                                                ) {
                                                                                                                value
                                                                                                                    =
                                                                                                                    Math
                                                                                                                    .log(
                                                                                                                        value
                                                                                                                        )
                                                                                                            } else {
                                                                                                                if (D ==
                                                                                                                    "sqrt"
                                                                                                                    ) {
                                                                                                                    value
                                                                                                                        =
                                                                                                                        Math
                                                                                                                        .sqrt(
                                                                                                                            value
                                                                                                                            )
                                                                                                                } else {
                                                                                                                    if (D ==
                                                                                                                        "pi"
                                                                                                                        ) {
                                                                                                                        value
                                                                                                                            =
                                                                                                                            Math
                                                                                                                            .PI
                                                                                                                    } else {
                                                                                                                        if (D ==
                                                                                                                            "RND"
                                                                                                                            ) {
                                                                                                                            value
                                                                                                                                =
                                                                                                                                Math
                                                                                                                                .random()
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    refresh()
};

}
}
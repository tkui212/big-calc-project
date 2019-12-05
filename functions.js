// window.addEventListener("click", event => {
//   update()
//   // console.log(Ograph.getMinDX()!=undefined? 50-Ograph.getMinDX():50)
// });
// function draw() {
//   clearall();
//   Ograph.draw();
//   // line([mX(),mY()],[Ograph.getMaxDX(),mY()],5)
//   // // console.log(`${mX()} ${mY()}`)
//   // line([mX(),mY()],[mX(),Ograph.getMaxDY()],5)
//   // text(`(${mX()}, ${mY()})`,mX()-10,mY()-10,20)
// }

function line(p1, p2, width) {
  this.x1 = p1.dx || p1[0] || 0;
  this.y1 = p1.dy || p1[1] || 0;
  this.x2 = p2.dx || p2[0] || 0;
  this.y2 = p2.dy || p2[1] || 0;
  let lin = new Path2D();
  // console.log(c)
  c.lineWidth = width;
  c.beginPath();
  lin.moveTo(x1, y1);
  lin.lineTo(x2, y2);
  c.stroke(lin);
  c.fill(lin);
  return lin;
}

//**update for the proporsens of the graph */
// function corTimesDataUpdate(){
//   WTX = width * 0.5 / Math.abs(Ograph.maxX()-Ograph.minX());
//   HTY = height * 0.5 / Math.abs(Ograph.maxY()-Ograph.minY());

//   // console.log(WTX)
//   Ograph.update()
// }

//draw the neccessery lines of a point(one or two) in the graph



function clearall() {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
}
function text(txt, x, y, size) {
  c.font = size + "px Arial";
  c.fillText(txt, x, y);
  let h = y - size / 4;
  let w = c.measureText(txt).width;
  return { h, w };
}
// function animation() {
//   clearall();
//   // requestAnimationFrame(animation)
//   Ograph.update();
//   draw();
//   console.table(Ograph.points);
// }
function circle(x, y, radius) {
  let circ = new Path2D();
  c.beginPath();
  circ.arc(x, y, radius, 0, 2 * Math.PI);
  c.fillStyle = "black";
  c.fill(circ);
  return circ;
}
// function update() {
//   Ograph.update();
//   draw();
// }
getM = (p1, p2) => (p1.y - p2.y) / (p1.x - p2.x);

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
p = (x, y) => new point(x, y);
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
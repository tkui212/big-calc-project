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
  var key = keyEnent.key;
    if (key == "Enter") {
      if(dataName=="x"){
        point.x=parseInt(value)
      }
      else{
        point.y=parseInt(value)
      }
      c = c0;
      clearall()
        phyGV.vg.draw()
        console.log("draw after edit")
        c = c2;
        clearall()
        phyGA=new graph(VtoA(phyGV.vg.points), 0, 0, 150, 150);

        c = c1;
        clearall()
        phyGX =new graph(VtoX(phyGV.vg.points), 0, 0, 150, 150); 


    }
  
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
wizardExe=()=>{
  if(keyEnent.key=="Enter"&&inpv0.value!=""&&inpv.value!=""&&inpt0.value!=""&&inpt.value!=""){
    GV(inpv.value,inpv0.value,inpt0.value,inpt.value)
  }
}
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

document.getElementById("all").style.setProperty(`--p-x`,`100`)
document.getElementById("all").style.setProperty(`--p-y`,`100`)
let el=document.getElementById("p");
let p={x:100,y:100,elem:el}
document.getElementById("all").style.setProperty(`--p2-x`,`200`)
document.getElementById("all").style.setProperty(`--p2-y`,`200`)
el=document.getElementById("p2");

let p2={x:200,y:200,elem:el}
document.getElementById("all").style.setProperty(`--circle-x`,`100`)
document.getElementById("all").style.setProperty(`--circle-y`,`100`)
el=document.getElementById("circle");
let circle={x:100,y:100,P:p,X:100,elem:el}
document.getElementById("all").style.setProperty(`--line-deg`,`rotate(45deg)`)
document.getElementById("all").style.setProperty(`--line-length`,`141`)
el=document.createElement('div');
    el.id="line"
    el.style=` background-color:green; top: calc(var(--p-y)*1px);left: calc(var(--p-x)*1px);width: calc(var(--line-length)*1px);position: absolute;height: 2px;z-index: 99;transform-origin: left;transform: var(--line-deg);mix-blend-mode: multiply;`
    document.getElementById("here").append(el)
let lineStart={x:100,y:100,P:p,P2:p2,X1:100,elem:el,deg:45,length:141}


var value=0
Object.defineProperty(p,"X",{
    get(){return value},
    set(num){ 
        value=0
      document.getElementById("all").style.setProperty(`--p-x`,`${num}`)
    }
  })


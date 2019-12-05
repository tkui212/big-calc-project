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
const canvas = document.querySelector(`#canvas_plate`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;
let c = canvas.getContext(`2d`);
canvas.style.backgroundColor = "green";
/**is the mouse currently being clicked and hold */


var Opoints,Ograph
/**chaing the width betwin two points.
 *
 * width times x
 *
 *makes all drawing points further away for one another so every thing will be spaced up
 */

/**chaing the height betwin two points.
 *
 * height times y
 */

// /** push every thing right */
// let mX=()=>(50-Ograph.getMinX()*WTX)

// /** push every thing down */
// let mY=()=>(50+Ograph.getMaxY()*HTY)

var inputs=""
let Loop=true
function input(a) {
    this.Loop=Loop
    var key=event.key
    if(key=="Enter")
    try{
        clearall()
        //inputs=`${inputs} \n ${a}`
        inputs=document.getElementById("inp").value
        console.log(document.getElementById("inp").value)
        eval(inputs)
        console.log(a)

    }catch(Error){
        console.log(Error)
    }
    if(Loop){
        Loop=false
        input(a)
    }
    else{
    Loop=true
    }
}

p=(x,y)=> new point(x,y)

// var Agraph=new graph([new point(-1,-1),new point(1,1)],50,50,100,100)
// /**height/2 */
// Agraph.fillPoints()

// // let h_2=()=>{let p=new point(0,0); return p.dy}
//     Opoints=[new point(0,10),new point(1,20),new point(3,1),new point(2,0),new point(5,-6),new point(-3,-5)]

//     /**  main object that holds most data*/
//     Ograph=new graph(Opoints,50,50,500,500);
// Ograph.fillPoints()

// Ograph.draw()
// Agraph.draw()


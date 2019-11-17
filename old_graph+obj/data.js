const canvas = document.querySelector(`#canvas_plate`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;
let c = canvas.getContext(`2d`);
canvas.style.backgroundColor = "green";
/**is the mouse currently being clicked and hold */
var mDown=false

var Opoints,Ograph
/**chaing the width betwin two points.
 *
 * width times x
 *
 *makes all drawing points further away for one another so every thing will be spaced up
 */
let WTX
/**chaing the height betwin two points.
 *
 * height times y
 */
let HTY;
/** push every thing right */
let mX=50
/** push every thing down */
let mY=50
/**height/2 */
let h_2=height/2

{
    Opoints=[new point(-1,-1),new point(0, 0), new point(2, 2), new point(1, 1), new point(6, 6)]
    let p=[]
    for(let item in Opoints){
        eval(`p.push(Object.values(Opoints)[${item}].x)`)
    }
    WTX = width * 0.5 /(Math.max.apply(Math,p)-Math.min.apply(Math,p));
    HTY = height * 0.5 /(Math.max.apply(Math,p)-Math.min.apply(Math,p));
    Opoints.forEach(value=>value.updait())
    /**  main object that holds most data*/
    var obj = new Create(0, h_2, 10, new graph(Opoints));
}
Opoints=obj.graph.points
Ograph=obj.graph
update()
Ograph.fillPoints();
//these will make the graph be spaced out in 1/4 of the screen 
//the graph will be drawn in the top left because (0,0) of the screen is placed there
WTX=WTX.toFixed(2)
HTY=HTY.toFixed(2)

update()
console.table(Ograph.points)
draw()
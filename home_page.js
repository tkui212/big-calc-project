var canvas = document.getElementById("can_plate");

canvas.width = window.innerWidth
canvas.height = window.innerHeight*0.82
const innerWidth = canvas.width
const innerHeight = canvas.height
console.log(canvas.style)
console.log(innerHeight)
let c = canvas.getContext("2d");
//c.beginPath();
//c.moveTo(0,0);
//c.lineTo(50,50);
//c.arc(200, 50, 50, 0, 360);
c.strokeStyle = "red";
c.fillStyle = "red"
c.stroke();
c.fill()

function create(color, name){ //creating the menu arcs
    this.rnd_x =50+ Math.random()*(innerWidth-100); //setting random x set-up
    this.rnd_y =50+ Math.random()*440 ; //setting random y set-up
    this.vx = 1;
    this.vy = 1;
    //c.clearRect(0,0,innerWidth,innerHeight);
    c.beginPath();
    c.arc(this.rnd_x, this.rnd_y, 50, 0, 360);
    c.fillStyle = color;
    c.fill();
    this.update = function(){

        if (this.rnd_x+50>innerWidth || this.rnd_x-50<0){
            this.vx = -this.vx
            }
        if (this.rnd_y + 50>innerHeight || this.rnd_y-50<0){
            this.vy =-this.vy
        }
        this.rnd_x += this.vx;
        this.rnd_y += this.vy;
        c.arc(this.rnd_x, this.rnd_y, 50, 0, 360);
        c.fillStyle = color;
        c.fill();
        //c.closePath();
    }
}
 let c1 = new create("red" ,"hi");


function animation(){
    c.clearRect(0,0,innerWidth,innerHeight);
    c.beginPath()
    requestAnimationFrame(animation);
    c1.update();

}
animation()

let mouse = {
  x: null,
  y: null
};
mouseElem = () => document.elementsFromPoint(mouse.x, mouse.y);
window.onmousemove = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};
for (const element of $(`.menuos`)) {

  element[`enter`] = function hover() {
    console.log("enter");
    if ($(`#${this.id}>.contents`)[0].style.display == "none") {
        if($(`#${this.id}`).is(':animated')){
      $(`#${this.id}>.contents`).stop(true, true);
      $(`#${this.id}`).stop(true, true);
      }
      $(`#${this.id}>.contents`)[0].Show("up", 1000);
      $(`#${this.id}`).animate(
        { height: `+=${$(`#${this.id}>.contents`)[0].style.height}` },
        1000
      );
    }
  };
  element[`exit`] = function Exit() {
    let is = false;
    setTimeout(() => {
      for (const el of mouseElem()) {
        if (el.id == this.id) {
          is = true;
        }
      }
      if (!is) {
        // $(`#${this.id}>.contents`).stop(true, true);
        // $(`#${this.id}`).stop(true, true);
        // $(`#${this.id}`).animate({ height: `-=${$(`#${this.id}>.contents`)[0].style.height}` },1000);
        if($(`#${this.id}`).is(':animated')){
            $(`#${this.id}>.contents`).stop(true, true);
        $(`#${this.id}`).stop(true, true);
            $(`#${this.id}>.contents`)[0].Hide("up", 1000);
            $(`#${this.id}`).animate({ height: `-=${$(`#${this.id}>.contents`)[0].style.height}` },1000);
        }
        
        else{
        $(`#${this.id}>.contents`)[0].Hide("up", 1000);
        $(`#${this.id}`).animate({ height: `-=${$(`#${this.id}>.contents`)[0].style.height}` },1000);
        }
        

      }
    }, 10);
  };
    $(`#${element.id}awd`)[0][`der`] = "up";

    $(`#${element.id}awd`)[0][`Hide`] = function(dir, dur) {
    $(`#${this.id}`).hide(
      "slide",
      {
        direction: dir
      },
      dur
    );
  };
  $(`#${element.id}awd`)[0][`Show`] = function(dir, dur) {
    $(`#${this.id}`).show("slide", { direction: dir }, dur);
  };
  $(`#${element.id}awd`)[0].Hide("up", 1);
}

let c=document.querySelector('canvas');
c.style.backgroundColor="#9BD7CD";


//x=x posision
//y=y posision
//vx= x speed
//vy= y speed
//ay= gravity
//d_...=defender
const s_d=2
const base_r= 20,
base_x= 0, 
base_y=window.innerHeight-base_r,
base_vx = 9/s_d,
base_vy = -15/s_d,
base_gravity =0.1/s_d,
r=base_r
let x= base_x, 
y=base_y-500*rand(),
vx = base_vx,
vy = base_vy*rand(),
ay = base_gravity,
d_x=window.innerWidth,
d_y=y,
d_vx = -base_vx,
d_vy = vy,
d_ay = base_gravity,
pause = true
let line=c.getContext('2d')
const t=-vy/ay
const y0=y+vy*t+(1/2)*ay*(t*t)
const maxX=vx*t
const maxY=y0
function linee(){
line.beginPath()
line.moveTo(maxX,window.innerHeight)
line.lineTo(maxX,maxY)
line.stroke()
console.log(maxX+" "+maxY)
}
c.width=window.innerWidth
c.height=window.innerHeight
let ctx=c.getContext('2d')
let ctx1=c.getContext('2d')
let ctxa=c.getContext('2d')
let ctxb=c.getContext('2d')
ctx.rect(0,0,window.innerWidth,window.innerHeight)
let dis=0
let hit_counter=0
let counter=0
let xx=window.innerWidth
function loop(){
    let spause=true;

      if(!pause){
        animate();
    }
    else{
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        line.clearRect(0,0,window.innerWidth,window.innerHeight);
    }

    clouds_movement();
    // linee();(
    tree();
    // let r=10*rand();
    // console.log(r);
    //     battery(r);
    requestAnimationFrame(()=>loop())
}
function battery(r){
    let ww
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	
  // Move registration point to the center of the canvas

    var img = new Image();
    img.src = "go.png";
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
	
    // Rotate 1 degree
    ctx.rotate(r*Math.PI / 180);
      
    // Move registration point back to the top left corner of canvas

    ctx.drawImage(img, window.innerWidth/2, window.innerHeight/2);
    ctx.translate(-window.innerWidth/2, -window.innerHeight/2);
    ctx.rotate(-r*Math.PI / 180);


}
function clouds_movement(){
    
    ctxa.beginPath();
    let minX = xx -62
    let maxX = xx
        if (minX>window.innerWidth){
        xx=0

        }
        ctxa.fillStyle = '#8B4513'
        ctxa.fillRect(0, window.innerHeight-10, window.innerWidth, 17)
        ctxa.fillStyle = "white"
        ctxa.arc(xx-42,67,20,0, Math.PI*2)
        ctxa.arc(xx-2,43,20,0, Math.PI*2)
        ctxa.arc(xx-13,57,20,0, Math.PI*2)
        ctxa.arc(xx-30,72,20,0, Math.PI*2)
        ctxa.arc(xx-62,41,20,0, Math.PI*2)
        ctxa.arc(xx-41,69,20,0, Math.PI*2)
        ctxa.arc(xx-52,72,20,0, Math.PI*2)
        ctxa.arc(xx-22,42,20,0, Math.PI*2)
        ctxa.arc(xx-62,41,20,0, Math.PI*2)
        ctxa.arc(xx-56,69,20,0, Math.PI*2)
        ctxa.arc(xx-51,72,20,0, Math.PI*2)
        ctxa.arc(xx,42,20,0, Math.PI*2)
        ctxa.arc(xx-37,52,20,0, Math.PI*2)
        ctxa.arc(xx-12,69,20,0, Math.PI*2)
        ctxa.arc(xx-42,67,20,0, Math.PI*2)
        ctxa.arc(xx-64,43,20,0, Math.PI*2)
        ctxa.arc(xx-69,57,20,0, Math.PI*2)
        ctxa.arc(xx-76,72,20,0, Math.PI*2)
        ctxa.arc(xx-82,41,20,0, Math.PI*2)
        ctxa.arc(xx-71,69,20,0, Math.PI*2)
        ctxa.arc(xx-59,72,20,0, Math.PI*2)
        ctxa.arc(xx-81,42,20,0, Math.PI*2)
        ctxa.arc(xx-79,41,20,0, Math.PI*2)
        ctxa.arc(xx-69,69,20,0, Math.PI*2)
        ctxa.arc(xx-72,72,20,0, Math.PI*2)
        ctxa.arc(xx-71,71,20,0, Math.PI*2)
        ctxa.arc(xx-82,52,20,0, Math.PI*2)
        ctxa.arc(xx-54,69,20,0, Math.PI*2)
        
       
        
        xx+= 1;
        ctxa.fill()
        ctxa.fillStyle="black"
        Text();
    }
    function tree(){
    
        ctxa.beginPath();


            ctxa.fillStyle = "green"
            ctxa.arc(100+42,-167+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+2,-143+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+13,-157+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+30,-172+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+62,-141+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+41,-169+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+52,-172+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+22,-142+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+62,-141+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+56,-169+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+51,-172+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+42,-120+window.innerHeight,0,0, Math.PI*2)
            ctxa.arc(100+37,-152+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+12,-169+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+42,-167+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+64,-143+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+69,-157+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+76,-172+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+82,-141+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+71,-169+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+59,-172+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+81,-142+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+79,-141+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+69,-169+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+72,-172+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+71,-171+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+82,-152+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+54,-169+window.innerHeight,20,0, Math.PI*2)
            ctxa.fill()
            ctxa.beginPath();
            ctxa.fillStyle="brown"
            ctxa.arc(100+50,-125+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+50,-150+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+50,-100+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+50,-75+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+50,-50+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+50,-25+window.innerHeight,20,0, Math.PI*2)
            ctxa.arc(100+50,window.innerHeight,20,0, Math.PI*2)
            
           
            ctxa.fill()
            ctxa.fillStyle="black"
            Text();
        }
function rand(){
    let random =Math.random()
    while(true){
        if(random>0.4&&random<0.8){
            return random
        }
        else{
            random =Math.random()
        }
    }   
}

function Text(){
    ctxa.beginPath()
    
    if(hit_counter>=10){
        ctxa.clearRect(0,0,window.innerWidth,window.innerHeight)
        ctxa.font = "50px Ariel"
        ctxa.fillText(("ישראל ניצלה החמס הובסו"),window.innerWidth/2-50,200)
    }
    else{
        ctxa.font = "30px Ariel"
        ctxa.fillText(("counter:" + hit_counter),window.innerWidth/2-50,100)
    }
}

function debug(x,y,text){
    ctxb.beginPath()
        ctxb.clearRect(0,0,window.innerWidth,window.innerHeight)
        ctxb.font = "50px Ariel"
        ctxb.fillText((text),x,y)

}

function animate(){  

    dis=Math.sqrt((x-d_x)*(x-d_x)-(y-d_y)*(y-d_y))
    // console.log("y="+y)
    // console.log("x="+x)
    // console.log("yyyyyy="+y0)
    // console.log("tttt="+t)
    // // console.log("vy="+vy)
    // console.log("vx="+vx)
    // // console.log("base_vy="+base_vy)
    // // console.log("base_vx="+base_vx)
    // // console.log("ay="+ay)
    // console.log("t="+counter)
    // // console.log(dis)
    // console.log(maxX)
    // console.log(x)
    // if(vy>-1&&vy<1){
    //     pause=true;
    //     console.log("t="+counter)
    //     console.log("tttt="+t)
    //     console.log(maxX)
    //     console.log(x)
    // }
  
    if(pause){//pause

        return;
    }
    if(dis<=r*2){//hit
        explode();
        
        draw_rocket_defender(d_x,d_y,r);
        draw_rocket_attacker(x,y,r);
        console.log("hit");
        hit_counter++;
        console.log(hit_counter>=10);
        if(hit_counter>=10){
            pause=true;
            console.log("win");
            victory();
            Text();
        }
        
        restart();
        
    }
    if(counter==1){//lunch
        console.log("lunch");
        console.log(counter);
        launch();
    }

    ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
    
    Text(window.innerWidth/2-50,100);
    vy += ay
    y += vy
    x += vx
    d_vy += d_ay
    d_y += d_vy
    d_x += d_vx

    draw_rocket_attacker(x,y,r)
    draw_rocket_defender(d_x,d_y,r)
    counter++


    
}

window.addEventListener("keypress",e=>{
    if((e.key=='p'||e.key=='P'||e.key=='פ')&&pause==false){
        pause = true;
    } else if((e.key=='p'||e.key=='P'||e.key=='פ')&&pause==true){
        pause = false;
        animate();
    }
})
window.addEventListener("keypress",a=>{
    if((a.key=='r'||a.key=='R'||a.key=='ר')){
        restart();
    }
})
function restart(){
    console.log("restart");
        x= base_x;
        y=base_y-500*rand();
        vx = base_vx;
        vy = base_vy*rand();
        ay = base_gravity;
        d_x=window.innerWidth;
        d_y=y;
        d_vx = -base_vx;
        d_vy = vy;
        d_ay = base_gravity;
        counter=0;
        pause=true;
        console.log("y="+y)
        console.log("x="+x)
        console.log("yyyy0yyy="+y0)
        console.log("t="+t)
        console.log("vy="+vy)
        console.log("vx="+vx)
        console.log("base_vy="+base_vy)
        console.log("base_vx="+base_vx)
        console.log("ay="+ay)
        console.log("counter="+counter)
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        draw_rocket_defender(d_x,d_y,r);
        draw_rocket_attacker(x,y,r);
        Text(window.innerWidth/2-50,100);
        animate();
}

function draw_rocket_attacker(x,y,r){
    ctx.beginPath()
    ctx.arc(x,y,r,0,2*Math.PI)
    ctx.fill()
    ctx.closePath()
}
 function draw_rocket_defender(d_x,d_y,r){
     ctx1.beginPath()
     ctx1.arc(d_x,d_y,r,0,2*Math.PI)
     ctx1.fill()
     ctx1.closePath()    
}

function explode(){
    let audio=new Audio("bombing.mp3")
    audio.play()
}
function launch(){
    let audio2=new Audio("launching.mp3")
    audio2.play()
}
function victory(){
    let vic=new Audio("VICTORY.mp3")
    vic.play()
}
Text();
loop();

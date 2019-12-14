class body{
  constructor(x,y,ops){
    this.x=x
    this.y=y
    this.id=ops.id?ops.id:bodys(plate).length
    this.forces=ops.Fs?ops.Fs:[];
    this.connections=ops.cons?ops.cons:[];
    this.parent=ops.parent?ops.parent:null;
  }
  update = (op) => {
    for (let key in op) {
      if (obj.hasOwnProperty(key)){
         this[key] = op[key];
      }
    }

  };
}
class weight extends body {
  /**
     * @param x x position
     * @param y y position
     * @param {object} ops settings
     * @param {string} ops.id
     * @param {number} ops.width 
     * @param {number} ops.height 
     * @param {number} ops.weight 
     */
  constructor(x,y,weight,ops){
    super(x,y,ops)
    this.width = ops.width?ops.width:100;
    this.height = ops.height?ops.height:100;
    this.weight = weight;
    this.gridX=[this.y-this.height/2,this.y,this.y+this.height/2]
    this.gridY=[this.x-this.width/2,this.x,this.x+this.width/2]  
    this.ports=new Array(3);
  for(let i=0;i<3;i++){
    this.ports[i]=new Array(3)
    for(let j=0;j<3;j++){
        this.ports[i][j]=new point(this.gridY[i],this.gridX[j],{id:`[${i}][${j}]`,cons:[this],parent:this})
        this.ports[i][j].draw()
    }
  }
  
  this.forces.push(new force(this.x,this.y,{F:this.weight,angle:180}));
  createRec(this.x-this.width/2,this.y-this.height/2,this.weight,this.height,svg,{id:this.id})
    createText(this.x,this.y,svg,this.weight,{color:"white",id:this.id})
    setTimeout(()=>{
    this.meElement = document.getElementById(`${this.id}`);
    this.meText = document.getElementById(`${this.id}text`);
    this.meElement[`class`]=this
    
    console.log(this)
  },100)

  
  }
  draw = () => {
    
    
  };

  update=(op)=>{
    for (let key in op) {
      if (obj.hasOwnProperty(key)){
         this[key] = op[key];
      }
    }
    this.gridX=[this.y-this.height/2,this.y,this.y+this.height/2]
    this.gridY=[this.x-this.width/2,this.x,this.x+this.width/2]  
    this.ports=new Array(3);
  for(let i=0;i<3;i++){
    this.ports[i]=new Array(3)
    for(let j=0;j<3;j++){
        this.ports[i][j]=new point(this.gridY[i],this.gridX[j],{id:`[${i}][${j}]`,cons:[this],parent:this})
        this.ports[i][j].draw()
    }
  }
  this.forces=[]
  this.forces.push(new force(this.x,this.y,{F:this.weight,angle:180}));
  this.meElement
  }
  
}
class force extends body {
  constructor(x,y,ops){
    super(x,y,ops)
    this.F=ops.F
    this.angle=ops.angle
    this.point1=new point(this.x,this.y,{})
    this.point2=new point(this.x+Math.sin(toRadians(this.angle))*this.F,this.y-Math.cos(toRadians(this.angle))*this.F,{})
    createArrow([this.point1.x,this.point2.x],[this.point1.y,this.point2.y],svg,{id:this.id})
    this.meElement=document.getElementById(`${this.id}`)
  }

  // this.meElement = document.getElementById("1");
  // this.meText = document.getElementById("1text");

  draw = () => {
  

  };
  update = () => {};
}


class point extends body{
  /**
     * @param {number} x x position
     * @param {number} y y position
     * @param {object} ops settings
     * @param {string} ops.id - that can contain:
     * @param {force[]} ops.Fs array of forces that go throw the point
     * @param {body[]} ops.cons array of bodys that are connectedto the point 
     */
  constructor(x,y,ops){
    super(x,y,ops)
  }
  
  
  
  draw = () => {
    createCircle(this.x,this.y,svg,{color:"white",style:"z-index:20"})
    createText(this.x,this.y,svg,this.id,{})
  };
  update = () => {};
}

function wire(parts,ops) {
  this.id=ops.id?ops.id:bodys(plate).length
  this.parts=parts
  this.draw = () => {};
  this.update = () => {};
}
class cable {
  constructor(p1,p2,ops){
  this.point1=p1
  this.point2=p2
  this.id=ops.id?ops.id:bodys(plate).length
  this.forces=ops.Fs?ops.Fs:[];
  this.connections=ops.cons?ops.cons:[];
  }
  draw = () => {};
  update = () => {};
}
function resister() {
  this.draw = () => {};
  this.update = () => {};
}

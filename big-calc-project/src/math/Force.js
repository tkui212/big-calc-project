import {phyVar} from "./Math"

class Force{
    constructor(props){
      this.id=props.id
      this.F=props.F
      this.angle=new deg(0)
      this.vx=new phyVar("v",0)
      this.vy=new phyVar("v",0)
        /**equation*/
      this.eq="mg*sin(a)"
      /** v,a,f */
      this.fType
    }
    toF(){}
    toV(){}
  }
class Forces{
    constructor(props){
        this.id=props.id
        this.forces=[]
        this.absF=new Force()
      }
      calcAbs(){}
      getForces(){}
      initFs(){}
}
class P{
  constructor(){
    this.x
    this.y
    this.cons=[]
    
  }
}
class PhysicBody{
    constructor(props){
      //forces
      this.forces=new Forces
      //mass
      this.m=new phyVar("m",1)
    }
    updateForces=()=>{}
    init(){}
  }
  class wire{
    constructor(props){
        this.tensen
        this.port1=new PhysicBody
        this.port2=new PhysicBody
    }
}
class chain{
    constructor(props){
        this.bodys=[]
    }
}
class rotator{

}
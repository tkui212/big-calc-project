import {phyVar} from "./Math"
import {O} from "../objects/obj"

class Force extends O{
    constructor(props){
      super(props)
      this.id=props.id
      this.𝛴F=props.F
      this.angle=new deg(0)
      this.add(`Fx`,new phyVar("f",0))
      this.add(`Fy`,new phyVar("f",0))
        /**equation*/
      this.eq="mg*sin(a)"
      /** v,a,f */
      this.fType
    }
    toF(){}
    toV(){}
  }
class Forces extends O{
    constructor(props){
        this.id=props.id
        this.forces=[]
        this.absF=new Force()
      }
      calcAbs(){}
      getForces(){}
      initFs(){}
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
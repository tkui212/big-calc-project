import {phyVar,deg} from "./Math"
import {O} from "../objects/obj"

export class Force extends O{
    constructor(props){
      super(props)
      this.𝛴F=props.F
      this.angle=new deg(props.angle)
      this.Fx=0
      this.Fy=0
      // this.add(`Fx`,new phyVar("f",0))
      // this.add(`Fy`,new phyVar("f",0))
        /**equation*/
      this.eq="mg*sin(a)"
      /** v,a,f */
      this.fType="f"
    }
    toF(){}
    toV(){}
  }
export class Forces extends O{
    constructor(props){
        super(props)
        this.forces=[]
        this.absF=new Force({id:this.id+"absF"})
      }
      calcAbs(){}
      getForces(){}
      initFs(){}
}



  class wire{
    constructor(props){
        this.tensen=0
        // this.port1=new PhysicBody
        // this.port2=new PhysicBody
    }
}
class chain{
    constructor(props){
        this.bodys=[]
    }
  }
class rotator{

}
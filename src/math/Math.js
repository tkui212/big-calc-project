import {O} from "../objects/obj"
import exactMath from "exact-math"
export class deg extends O{
    constructor(de){
        this.value=de
    }
    toRadian(){}
    roundValue(){}
    sin(){}//?
    toString(){return this.value}
}
export class frac extends O{
    constructor(uper,down){
        this.a=uper
        this.b=down
    }
    toFrac(){}
    toNum(){return this.a/this.b}
    toString(){return `${this.a}/${this.b}`}

}
/** mathematical function */
export class Mfunc extends O{
    constructor(ar){
        this.value=ar
    }
    toString(){return this.value}
}
/** mathematical equisen */
export class Mequ extends O{
    constructor(a,b){
        this.sideA=a
        this.sideB=b
    }
}
function bris(st,index){
    let i=index
    let Bcount=0
                let text=""
                for(let j=i-1;j>-1;j--){
                  // console.log(st[j])
                  if(st[j]==")"){
                    Bcount++
                    text=st[j]+text
                  }
                  else if(st[j]=="("){
                    Bcount--
                    text=st[j]+text
                  }
                  else{
                    text=st[j]+text
                  }
                  if(Bcount==0){
                    return text
                  }
                }
                return false
}
export var Meth={
    StringCalc(st){
        console.log(st)
        let hold=st
        while(hold.indexOf("^2")>0){
            let index=hold.indexOf("^2")
            console.log(index)
            let powerd=bris(hold,index)
            let p =exactMath.formula(powerd)
  
            hold=hold.replace(`${powerd}^2`,Math.abs(exactMath.pow(p,2)))
          }
        while(hold.indexOf("^0.5")>0){
          let index=hold.indexOf("^0.5")
          console.log(index)
          let powerd=bris(hold,index)
          console.log(powerd)
          let p =exactMath.formula(powerd)
            console.log(p)
          hold=hold.replace(`${powerd}^0.5`,Math.sqrt(p))
        }

      
        return hold
        // if(st=="^")
    },//exactmath
    /** calc with spacel math values/object */
    ArrayCalc(ar){
        let toCalcString=""
        for(let i=0;i<ar.length;i++){
            if(typeof ar[i]!="string"){
                toCalcString+=ar[i].toString()
            }
            toCalcString+=ar[i]
        }
        return this.StringCalc(toCalcString)
    },
    RootsFurmola(c){},
    collisenCalc(a,b){}
}
/** when you get some "a" in a f(x) and its sayd its a number */
export class Mvar extends O{
    constructor(n,v){
        this.name=n
        this.value=v
    }
}
export class phyVar extends O{
    // constructor(n,v){
    //     /** a,v,x,u,m,g,N,t,w */
    //     this.name=n
    //     this.value=v
    //     /** "a"? => "m/s^2" */
    //     this.units
    // }
    constructor(props){
        // /** a,v,x,u,m,g,N,t,w */
        // this.name
        // this.value
        // /** "a"? => "m/s^2" */
        // this.units
    }
}
export class Eqs extends O{
    /** pVs: array of phyvar's */
    findEqWith(pVs){}
    calc(eq,values){}
}
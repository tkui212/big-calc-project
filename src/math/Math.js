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
function bris(st){
    let ret=[]
    let hold=""
    let Bcount=1
    for(let i=0;i<st.length;i++){
        if(st[i]=="("){
            ret.concat(bris(st.slice(i+1,st.length)))
        }
        else if(st[i]==")"){
            Bcount--
            if(Bcount<0){
                throw("f in a mathamicak way")
            }
            ret.push(`(${hold})`)
        }
        else{
            hold=hold+st[i]
        }
    }
    return ret
}
export var Meth={
    StringCalc(st){
        console.log(st)
        let a=[]
        let hold=""
        let b=[]
        // a=bris(st)
        // for(let i=0;i<st.length;i++){
        //     console.log(st[i])
        //     if(st[i]=="("){
        //         for(let j=i;j<st.length;j++){
                
        //         }
        //     }
        //     if(st[i]=="("||st[i]==")"){
        //         if(hold!=""){
        //             a.push(hold)
        //             hold=""
        //         }
                
        //         a.push(st[i])
        //     }
        //     else{
        //         hold=hold+st[i]
        //     }
        //     console.log(Number.parseInt(hold))

        // }
        // if(hold!=""){
        //     a.push(hold)
        // }
        console.log(exactMath.pow(2,2))
        return a
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
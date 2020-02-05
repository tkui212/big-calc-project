export class deg{
    constructor(de){
        this.value=de
    }
    toRadian(){}
    roundValue(){}
    sin(){}//?
    toString(){return this.value}
}
export class frac{
    constructor(uper,down){
        this.a=uper
        this.b=down
    }
    toFrac(){}
    toNum(){return this.a/this.b}
    toString(){return `${this.a}/${this.b}`}

}
/** mathematical function */
export class Mfunc{
    constructor(ar){
        this.value=ar
    }
    toString(){return this.value}
}
/** mathematical equisen */
export class Mequ{
    constructor(a,b){
        this.sideA=a
        this.sideB=b
    }
}
export class Meth{
    StringCalc(st){
        // if(st=="^")
    }//exactmath
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
    }
    RootsFurmola(c){}
    collisenCalc(a,b){}
}
/** when you get some "a" in a f(x) and its sayd its a number */
export class Mvar{
    constructor(n,v){
        this.name=n
        this.value=v
    }
}
export class phyVar{
    constructor(n,v){
        /** a,v,x,u,m,g,N,t,w */
        this.name=n
        this.value=v
        /** "a"? => "m/s^2" */
        this.units
    }
    constructor(props){
        /** a,v,x,u,m,g,N,t,w */
        this.name
        this.value
        /** "a"? => "m/s^2" */
        this.units
    }
}
export class Eqs{
    /** pVs: array of phyvar's */
    findEqWith(pVs){}
    calc(eq,values){}
}
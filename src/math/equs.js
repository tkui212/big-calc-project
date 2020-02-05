import {Mfunc,Mequ} from "./Math"

//store "all" equisens for every var type 
let equs={

    a:new phyEq("a","m/s^2",
        [
            "a=v/t"
        ]
    ),
    v:new phyEq("v","m/s",
        [
            Mequ(Mfunc(["v"]),Mfunc(["v0+a*t"]))
        ]
    ),
    x,
    u,
    m,
    g,
    N,
    t,
    w,
    j,
    f:["Fu=u*N","F=ma","Fc=m*v^2/r"]


}
export class phyEq{
    constructor(n,u,eq){
        this.name=n
        this.units=u
        this.equsuns=eq
    }
}
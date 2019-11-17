//get v(m/s), starting point, ending point
//for physics you need a,v,x,v0,x0
let x0=0,v0,a,t
function GV(m,V0,St,Et){
    v0=V0
    a=m
    t=Et-St
    let points=[Et-St]
    for(let i=0;i<=(Et-St);i++){
        points[i]=new point(i+St,i*m+V0)
    }
    console.log("pp")
    console.table(points)
    console.log("X")
    let phyGX=new graph(VtoX(points),75,50,250,250)
    console.log("V")
    let phyGV=new graph(points,400,50,250,250)
    console.log("A")
    let phyGA=new graph(VtoA(points),725,50,250,250)
    return points
}
v0=-1
x0=0
let tpp=[new point(-1,-1),new point(0,0),new point(1,1),new point(2,0),new point(3,-1)]
let phyGX=new graph(VtoX(tpp),75,50,250,250)
let phyGV=new graph(tpp,400,50,250,250)
let phyGA=new graph(VtoA(tpp),725,50,250,250)
// let pVs=GV(0,1,0,5)

// new graph(VtoA(setV(1,-1,1,5)),350,50,250,250)
function AtoV(Ps){

}
function VtoX(Ps){
    let ps=[]
    let mi=0
    let y
    for(let l=0;l<Ps.length;l+=0.5){
        try{
            if(a!=undefined&&a!=Ps[l].getM(Ps[l],Ps[l+1])){
                x0=-0.75// acsualy calcolate to find what need to be put here
                v0=2
                mi=l-0.5
                console.log(`v0=${v0}, x0=${x0}`)
            }
            a=Ps[l].getM(Ps[l],Ps[l+1])
        }catch(error){

        }
        
        y=x0+v0*(l-mi)+0.5*a*((l-mi)**2)
        console.log(`${y} = ${x0} + ${v0} * ${l-mi} +0.5* ${a} * (${l-mi} **2)`)
        let x=l-1
        ps.push(new point(x,y))
        l!=l.toFixed(0)?ps[ps.length-1].isDraw=false:0
    }
    return ps
}
function VtoA(Ps){
    let ps=[]
    let m
    for(let i=0;i<Ps.length-1;i++){
        let mo=m
        try{
            m=Ps[i].getM(Ps[i-1],Ps[i+1])
        }catch(error){
            m=Ps[i].getM(Ps[i],Ps[i+1])
        }
        if(m==0){

            ps.push(new point(Ps[i].x,mo))
        }
        if(mo==0){
            ps.push(new point(Ps[i-1].x,m))
        }
        ps.push(new point(Ps[i].x,m))
    }
    ps.push(new point(Ps[Ps.length-1].x,(Ps[Ps.length-1].y-Ps[Ps.length-2].y)/(Ps[Ps.length-1].x-Ps[Ps.length-2].x)))
    return ps
}
function XtoV(Ps){

}
// GV(1,0,0,5)
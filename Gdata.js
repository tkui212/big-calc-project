//they will hold the visual graph and the data behaind the graph
//data = a,v,x,v0,x0,t
function graph(ps,x,y,w,h){
    let vg=new Vg(ps,x,y,w,h)
    // console.log(vg)
    vg.fillPoints()
    vg.draw()
}

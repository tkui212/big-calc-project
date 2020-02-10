export class Dchain{
    constructor(This){
        /**value */
        this.v=This
        /**nexts */
        this.n=[]
        /**nexts reciveds */
        this.nd=[]
        this.locked=[]
        this.timeOut=false
    }
    connect(me){
        this.n.push(me)
        me.n.push(this)
    }
    remove(This){
        this.n.filter((v)=>v==This)
    }
    disconnect(){
        for(let i=0;i<this.n.length;i++){
            this.n[i].remove(this)
        }
        this.returnLocked()
    }
    returnLocked(){
        for(let i=0;i<this.locked.length;i++){
            this.n.push(this.locked[i])
        }
    }
    event(e){
        if(!this.timeOut){
            this.v.event(e)
            this.timeOut=true
            this.n.forEach(Fun => {
              Fun.event(e)
            });
            this.timeOut=flase
          }
    }
    return(d){

    }
}
export class Dchain{
    constructor(props){
        /**value */
        this.v=props.v
        /**nexts */
        this.n=[]
        /**nexts reciveds */
        this.nd=[]
        this.timeOut=false
    }
    connect(me){}
    disconnect(){}
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
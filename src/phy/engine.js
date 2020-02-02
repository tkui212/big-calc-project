import data from "../dataBase"
import queue from "../objects/queue"
Array.prototype.filterDup = function() {
    let arra = [this[0]];
    for (let i = 0; i < this.length; i++) {
      let is = true;
      for (let j = 0; j < arra.length; j++) {
        if (arra[j] == this[i]) {
          is = false;
          break;
        }
      }
      if (is) {
        arra.push(this[i]);
      }
    }
    // this=arra
    return arra;
  };
function toGroups(bodys) {
    let groups=[]
    for(let bod in bodys){
        groups.push(bod.getCons())
    }
    groups=groups.filterDup()
    return groups
}

export class engine{
  constructor(props){
    this.gravity=props.gravity
    this.bodys=props.bodys
    this.start=props.start
    this.tick=props.tick
    this.speed=props.speed
    this.future=props.future
  }
  
}

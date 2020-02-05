import {data} from "../dataBase";
/**smart object that can have events and know where he is stored and manupolate his conteiner */
export class O{
    constructor(props){
        this.id=props.id
        this.props=props
        if(typeof props=="string"){
            this.id=props
        }
        this.Listeners=[]
        this.Ochilds=[]
        this.ParentsO=[]
        data.add(this.id,this)
    }
    add(id,value){
        this[id]=value
        value.addParentO(this)
        this.addChildO(value)
    }
    remove(id){
        delete this[id]
    }
    addListener(){}
    removeListener(){}
    addChildO(){}
    removeChildO(){}
    addParentO(){}
    removeParentO(){}
    stringfy(){}
}
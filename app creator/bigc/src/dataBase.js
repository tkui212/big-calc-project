export var data={bodys:{},elements:{},consoles:{},internals:{}}
window["data"]=data;
data["add"]=function(id,value){
    let names=getNames(value)
    for(let i=0;i<names.length;i++){
        if(data[names[i]]==undefined){
            data[names[i]]={}
        }else{
            for(let key in data[names[i]]){
                if(key==id){
                    console.error("id olredy exist")
                    console.error(data[names[i]][id])
                    console.error(value)
                }
            }
        }
        data[names[i]][id]=value
    }
}
data["remove"]=function(id){
    for(let key in data){
        if(typeof data[key]=="object"){
            for(let key1 in data[key]){
                if(key1==id){
                    delete data[key][key1]
                }
            }
        }
    }
}
data["get"]=function(id){
    for(let key in data){
        if(typeof data[key]=="object"){
            if(data[key][id]!=undefined){
                return data[key][id]
            }
        }
    }
}
function getNames(value){
    let names=[]
    while(value.__proto__!=null||value.__proto__!=undefined){
        names.push(value.__proto__.constructor.name)
        value=value.__proto__
    }
    return names
}
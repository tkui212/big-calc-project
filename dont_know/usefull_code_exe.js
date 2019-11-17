let ar=[{x:2,y:2},{x:-1,y:1},{x:3,y:3}]
// ar=ar.sort((a,b)=>a.x<b.x)
ar=ar.sort((a,b)=>a.x-b.x)
console.log(ar)





//short if. let x= (if(true){1}else{2})
let x= true? 1:2;

let t;
//try is running a code and if it error'ed than the catch code will run his own code
try{

} catch(error){

}

//declaring a varable will alwasis be executed like the declaring was at the top of the code

//declaring var is like let but it will keep existing after the block of code that made him will close

console.log(`the number ${x} is one`)//making a string with `` will allow to put varable will typing the string with ${}

let obj={a:'somthing',
hello: function(){
    console.log(`hello ${x}`)
}}
obj.hello()

//ways to log staff
let a,b,c=(1,1)
console.log({a,b,c})
console.table([a,b,c])
//will log the chain of staff that used this
// console.trace('who used me')
//log how much time lines of code take to run
console.time('time_this')
for(let i=0;i<10000;i++){
}
console.timeEnd('time_this')

//?
function h(str,age){
    let agee=age>5? 'old': 'young'
    return `${str[0]}${agee} at ${age} years`
}
let bio=h`the string with the input ${1}`


//replace for statment for array
let arr=[1,2,5,6,4,7]
for(let e of arr){
    console.log(e)
}
//or even
arr.forEach(console.log)
//?
//sort((a,b)=>a<b) is making a funcsion that get a,b from sort and you return who sold be first
let removed=arr.sort((a,b)=>a<b)
//sort(function(a, b){return a - b});
/**When comparing 40 and 100, the sort() method calls the compare function(40,100).
*
*The function calculates 40-100, and returns -60 (a negative value).
*
*The sort function will sort 40 as a value lower than 100.*/


console.log(removed)

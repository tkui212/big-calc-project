
// export function hi() {
//   console.log("hi");
// };
export function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

export function toRadians (angle) {
  return angle * (Math.PI / 180);
}
export function log(text) {
  return JSON.parse(stringify(text));
}
var stringify = require("json-stringify-safe");

var os = require("os");

//Create function to get CPU information
export function cpuAverage() {

  //Initialise sum of idle and time of cores and fetch CPU info
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

  //Loop through CPU cores
  for(var i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    var cpu = cpus[i];

    //Total up the time in the cores tick
    for(let type in cpu.times) {
      totalTick += cpu.times[type];
   }     

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
    
  }
  console.log(cpus)
  //Return the average Idle and Tick times
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

//Grab first CPU Measure
var startMeasure = cpuAverage();

//Set delay for second Measure
setTimeout(function() { 

  //Grab second Measure
  var endMeasure = cpuAverage(); 

  //Calculate the difference in idle and total time between the measures
  var idleDifference = endMeasure.idle - startMeasure.idle;
  var totalDifference = endMeasure.total - startMeasure.total;

  //Calculate the average percentage CPU usage
  var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

  //Output result to console
  console.log(percentageCPU + "% CPU Usage.");

}, 100);
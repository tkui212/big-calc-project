
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

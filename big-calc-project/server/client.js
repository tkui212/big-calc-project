var io2 = require('socket.io-client');
var socket2 = io2.connect('http://localhost:3001');
socket2.emit('i am client', {data: 'foo!'})
console.log("hi")
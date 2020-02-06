var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
    console.log(res)
  }).listen(8080);
  http.log = function(level, message) {
    var levels = ['info', 'warn', 'error'];
    if (levels.indexOf(level) <= levels.indexOf(logger.debugLevel) ) {
      if (typeof message !== 'string') {
        message = JSON.stringify(message);
      };
      console.log(level+': '+message);
    }
  }
  var http = require('./logger');
  http.debugLevel = 'warn';
http.log('info', 'Everything started properly.');
http.log('warn', 'Running out of memory...');
http.log('error', { error: 'flagrant'});
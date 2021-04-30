//nodejs
'use strict'
var http = require("http");
var fs = require("fs");
http.createServer(
  (req, res) => {
    res.write(fs.readFileSync(__dirname + "/bigpipe.html").toString());
    setTimeout(function () {
      res.write('<script>render("#id1","div1");</script>');
    }, 1000);

    setTimeout(function () {
      res.write('<script>render("#id2","div2");</script>');
    }, 2000);

    setTimeout(function () {
      res.write('<script>render("#id3","div3");</script>'); 
      res.end();
    }, 3000);
  }
).listen(8088);
console.log("server is listening on: http://127.0.0.1:8088")

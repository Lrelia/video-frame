var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

app.use(express.static(__dirname + '/src'));

var server = app.listen(80, function () {
  var host = "localhost";
  var port = 80;

  console.log('Example app listening at http://%s:%s', host, port);
});
const hostname = '127.0.0.1';
const port = 80;

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../../page_src/03'));
console.log('Web Path: ' + __dirname + '/../../page_src/03');

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});
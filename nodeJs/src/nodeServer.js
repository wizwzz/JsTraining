const hostname = '127.0.0.1';
const port = 3000;

var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/api', proxy({ target: 'http://note.wiz.cn', changeOrigin: true }));
app.use('/wizas', proxy({ target: 'http://note.wiz.cn', changeOrigin: true }));
//
app.use(express.static(__dirname + '/../../page_src/06'));
console.log('Web Path: ' + __dirname + '/../../page_src/06');

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});
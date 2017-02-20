const hostname = '127.0.0.1';
const port = 3000;

var express = require('express');
var proxy = require('http-proxy-middleware');
var fs = require("fs");

var app = express();

app.use('/api', proxy({ target: 'http://note.wiz.cn', changeOrigin: true }));
app.use('/wizas', proxy({ target: 'http://note.wiz.cn', changeOrigin: true }));
//
app.use(express.static(__dirname + '/../../page_src/07'));
console.log('Web Path: ' + __dirname + '/../../page_src/07');

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});


////////////同步/////////////
var fileName = 'start';
var data = null;
while (1) {
    data = fs.readFileSync(__dirname+'/'+fileName+'.txt').toString();
    if (data == 'done') {
        break;
    } else {
        fileName = data;
    }
}
console.log(fileName+'.txt');

////////异步//////////
findDoneText('start');
function findDoneText (fileName) {
    fs.readFile(__dirname+'/'+fileName+'.txt', function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        data = data.toString();
        if (data != 'done') {
            findDoneText(data);
        } else {
            console.log(fileName+'.txt');
        }
    });
}

////////////Promise/////////////////////
function readFileByPath(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data) {
            if (err) {
                reject(err);
                return;
            }
            if (data) { 
                data = data.toString();
                resolve(data);
            }
        })
    });
}

var filePath = __dirname + '/start.txt';
readFileByPath(filePath).then((data) => {
    console.log("The content is :" + data);
}, (err) => {
    console.log("Error:" + err);
});


////////////Generator/////////////
var arr = [1, 10, 100, 1000, 10000];
function *foo() {
   for (var num in arr) {
       yield arr[num];
   }
}

var it = foo();
for (var i=0; i< arr.length; i++) {
    console.log(it.next().value);
}
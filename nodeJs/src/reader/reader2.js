var fs = require("fs");
//
function readFileByPath(path){
    return new Promise(function (resolve, reject) {
        setTimeout(function() {
            fs.readFile(path, function(err, data) {
                if (err instanceof Error) {
                    reject(err);
                } else {
                    try {
                        data = data.toString();
                    } catch (error) {
                        reject(error);
                        return;
                    } 
                    resolve(data);
                }
            });
        }, 1000);
    });
}

function *Generator1() {
    var result1 = yield readFileByPath(__dirname + '/start.txt');
    console.log("result : "+ result);
    var result2 = yield readFileByPath(__dirname+'/'+result1+'.txt');
    console.log("result2: "+ result2);
    var result3 = yield readFileByPath(__dirname+'/'+result2+'.txt');
    console.log("result3: "+ result3);
    var result4 = yield readFileByPath(__dirname+'/'+result3+'.txt');
    console.log("result4: "+ result4);
}

/*
var gen = Generator1();
var result1 = gen.next();
if (!result1.done) {
    var promise = result1.value;
    promise.then(function (data) {
        console.log("file 1 data:" + data);
        var result2 = gen.next(data);
        if(!result2.done) {
            var promise2 = result2.value;
            promise2.then(function(data){
                console.log("file 2 data:"+ data);
                var result3 = gen.next(data);
                if (!result3.done) {
                    var promise3 = result3.value;
                    promise3.then(function(data){
                        console.log("file 3 data: "+data);
                        var result4 = gen.next(data);
                        if(!result4.done) {
                            var promise = result4.value;
                            promise.then(function(data){
                                console.log("file 4 data: "+ data);
                            }).catch(function(err){

                            });
                        }
                    }).catch(function(error) {

                    });
                }
            }).catch(function(error){

            });
        }

    }).catch(function (error) {

    });
}
*/

function autoExcutor(generatorFunction) {
    var gen = generatorFunction();
    var genResult = gen.next();
    //
    function doNext(genResult) {
        if (genResult.done) {
            return ;
        } 
        var promise = genResult.value;
        promise.then(function(data) {
            console.log('data:'+data);
            try {
                var genResult = gen.next(data);
                doNext(genResult);
            } catch (error) {
                gen.throw(error);
            }
        }).catch(function(err){
            gen.throw(err);
        });
    }
    doNext(genResult);
}

// autoExcutor(Generator1);

function *generator2(){
    try {
        var result = yield readFileByPath(__dirname + '/start.txt');
        console.log("result : "+ result);
        var result2 = yield readFileByPath(__dirname+'/'+result+'.txt');
        console.log("result2: "+ result2);
        var result3 = yield readFileByPath(__dirname+'/'+result2+'.txt');
        console.log("result3: "+ result3);
        var result4 = yield readFileByPath(__dirname+'/'+result3+'.txt');
        console.log("result4: "+ result4);
        var result5 = yield readFileByPath(__dirname+'/'+result4+'.txt');
        console.log("result5: "+ result5);
    } catch (error) {
        console.log(error);
    }   
}

// autoExcutor(generator2);

function *testGenerator() {
    var result1 = yield 1;
    console.log('result1:'+result1);
    var result2 = yield 10;
    console.log('result2:'+result1);
    var result3 = yield 100;
    console.log('result3:'+result1);
    var result4 = yield 1000;
    console.log('result4:'+result1);
}

var test = testGenerator();
var r1 = test.next(1000);
console.log(r1);
var r2 = test.next('aaa');
console.log(r2);
var r3 = test.next(10);
console.log(r3);
var r4 = test.next(1);
console.log(r4);

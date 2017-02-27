var fs = require("fs");

function readFileAsync(path) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            fs.readFile(path, function (err, data) {
                if (err instanceof Error){
                    reject(err);
                    return;
                }
                try {
                    data = data.toString();
                } catch (error) {
                    reject(error);
                    return;
                }
                resolve(data);
            })
        }, 1000);
    });
}


function *Generator1(){
    var ret1 = yield readFileAsync(__dirname+'/start.txt');
    console.log(ret1);
    var ret2 = yield readFileAsync(__dirname+'/'+ret1+'.txt');
    console.log(ret2);
    var ret3 = yield readFileAsync(__dirname+'/'+ret2+'.txt');
    console.log(ret3);
    var ret4 = yield readFileAsync(__dirname+'/'+ret3+'.txt');
    console.log(ret4);
}

/*
var gen = Generator1();
var result1 = gen.next();
if (!result1.done){
    var promise1 = result1.value;
    promise1.then(function(data) {
        console.log('data:'+data);
        var result2 = gen.next(data);
        if(!result2.done){
            var promise2 = result2.value;
            promise2.then(function(data){
                console.log('data:'+data);
                var result3 = gen.next(data);
                if(!result3.done) {
                    var promise3 = result3.value;
                    promise3.then(function(data){
                        console.log('data:'+data);
                        var result4 = gen.next(data);
                        if(!result4.done){
                            var promise4 = result4.value;
                            promise4.then(function(data){
                                console.log('data:'+data);
                            }).catch(function(err){
                                console.log(err);
                            });
                        }
                    }).catch(function(err){
                        console.log(err);
                    });
                }
            }).catch(function(err){
                console.log(err);
            });
        }
    }).catch(function (err){
        console.log(err);
    });
}
*/

function autoExcutor(generatorFuction)
{
    var gen = generatorFuction();
    var result;

    function doNext(result) {
        result = gen.next(result);
        if (result.done) {
            return;
        }
        var promise = result.value;
        promise.then(function(data){
            console.log('data:'+data);
            doNext(data);
        }).catch(function(error){
            throw error;
        });
    }
    doNext();
}

// autoExcutor(Generator1);

function *newGenerator(){
    try {
        var ret1 = yield readFileAsync(__dirname+'/start.txt');
        console.log(ret1);
        var ret2 = yield readFileAsync(__dirname+'/'+ret1+'.txt');
        console.log(ret2);
        var ret3 = yield readFileAsync(__dirname+'/'+ret2+'.txt');
        console.log(ret3);
        var ret4 = yield readFileAsync(__dirname+'/'+ret3+'.txt');
        console.log(ret4);
        var ret4 = yield readFileAsync(__dirname+'/'+ret4+'.txt');
        console.log(ret5);
    } catch (error) {
        console.log(error);
    }
}

autoExcutor(newGenerator);
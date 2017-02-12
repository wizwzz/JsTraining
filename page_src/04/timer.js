function setTimer(callback, t) {
    return setTimeout(function () {
        try {
            callback();
        } catch (error) {
            console.log('There is an error :'+ error);
        }
        setTimer(callback, t);
    }, t);
}

function testTimer() {
    setTimer(function(){
        console.log('hello world');
    }, 2000);
}

//////////////////--------------用setTimer实现--------------//////////////////////
function newInterval() {
    var counter = 0;
    stop = false;
    var interval = setTimer(function () {
        console.log(new Date().valueOf());
        counter++;
        // 下面这是一个闭包，尝试屏蔽掉这一段代码，对比看结果
        (function () {
            var i, j, k;
            for (i = 0; i < 99999; i++) {
                for (j = 0; j < 39999; j++) {
                    k = i * j;
                }
            }
        })()
       // 闭包结束
        if (counter > 10) {
            console.log("clear Interval");
        }
        console.log(new Date().valueOf() + '  --  interval ' + counter + ' over.');
    }, 1000);
}


//////////////////--------------原例子--------------//////////////////////
function testInterval() {
    var counter = 0;
    var interval = setInterval(function () {
        console.log(new Date().valueOf()+'');
        counter++;
        if (counter > 10) {
            console.log('clear Interval');
            clearInterval(interval);
        }
        console.log(new Date().valueOf() + '  --  interval ' + counter + ' over.');
    }, 1000);
}
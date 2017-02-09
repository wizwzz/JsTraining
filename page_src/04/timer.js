function setTimer(callback, t) {
    return setTimeout(function () {
        callback();
        setTimer(callback,t);
    }, t);
}

function testTimer() {
    setTimer(function(){
        console.log('hello world');
    }, 2000);
}


(function testInterval() {
    var counter = 0;
    var interval = setTimer(function () {
        console.log(new Date().valueOf());
        counter++;
        if (counter > 10) {
            console.log('clear Interval');
            //how to clear
        }
        // 下面这是一个闭包，尝试屏蔽掉这一段代码，对比看结果
        // (function () {
        //     var i, j, k;
        //     for (i = 0; i < 99999; i++) {
        //         for (j = 0; j < 39999; j++) {
        //             k = i * j;
        //         }
        //     }
        // })()
       // 闭包结束
        console.log(new Date().valueOf() + '  --  interval ' + counter + ' over.')
    }, 1000);
})();
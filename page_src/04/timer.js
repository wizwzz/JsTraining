function setTimer(callback, t) {
    return setTimeout(function () {
        var timerId = setTimer(callback, t);
        callback(timerId);
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
    var interval = setTimer(function (timerId) {
        console.log(new Date().valueOf());
        counter++;
        //
        // console.log(timerId);
        //
        // Timeout {
        //     _called: false,
        //     _idleTimeout: 1000,
        //     _idlePrev: 
        //     TimersList {
        //         _idleNext: [Circular],
        //         _idlePrev: [Circular],
        //         _timer: Timer { '0': [Function: listOnTimeout], _list: [Circular] },
        //         _unrefed: false,
        //         msecs: 1000 },
        //     _idleNext: 
        //     TimersList {
        //         _idleNext: [Circular],
        //         _idlePrev: [Circular],
        //         _timer: Timer { '0': [Function: listOnTimeout], _list: [Circular] },
        //         _unrefed: false,
        //         msecs: 1000 },
        //     _idleStart: 1289,
        //     _onTimeout: [Function],
        //     _timerArgs: undefined,
        //     _repeat: null
        //  }
        //
        if (counter > 10) {
            console.log('clear Interval');
            clearTimeout(timerId);
        }
        console.log(new Date().valueOf() + '  --  interval ' + counter + ' over.');
    }, 1000);
}


//////////////////--------------原例子--------------//////////////////////
function testInterval() {
    var counter = 0;
    var interval = setInterval(function () {
        console.log(new Date().valueOf());
        //
        // console.log(interval);
        //
        // Timeout {
        //     _called: true,
        //     _idleTimeout: 1000,
        //     _idlePrev: null,
        //     _idleNext: null,
        //     _idleStart: 1399,
        //     _onTimeout: [Function],
        //     _timerArgs: undefined,
        //     _repeat: 1000 }   
        //

        counter++;
        if (counter > 10) {
            console.log('clear Interval');
            clearInterval(interval);
        }
        console.log(new Date().valueOf() + '  --  interval ' + counter + ' over.');
    }, 1000);
}
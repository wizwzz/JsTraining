var run = function() {
    arrayTest();
    initDom();


    function arrayTest() {
        var string = "为知笔记是最好用的笔记软件";
        //create new array
        var array = new Array();
        for (var i=0; i<string.length; i++) {
            array.push(string.charAt(i));
        }
        console.log(array);

        //delete array item
        var length = array.length;
        for(var i=0; i<length; i++) {
            array.pop();
        }
        console.log(array);
    }

    function initDom() {
        //username
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.setAttribute('for', 'username');
        var text = document.createTextNode('用户名:');
        label.appendChild(text);
        var input = document.createElement('input');
        input.setAttribute('type','text');
        input.id = 'username';
        div.appendChild(label);
        div.appendChild(input);
        document.body.appendChild(div);
        //password
        var div = document.createElement('div');
        var label = document.createElement('label');
        label.setAttribute('for', 'password');
        var text = document.createTextNode('密码:');
        label.appendChild(text);
        var input = document.createElement('input');
        input.setAttribute('type','password');
        input.id = 'password';
        div.appendChild(label);
        div.appendChild(input);
        document.body.appendChild(div);
        //login button
        var button = document.createElement('button');
        button.id = 'submit';
        button.setAttribute('onclick','login()');
        var text = document.createTextNode('登录');
        button.appendChild(text);
        document.body.appendChild(button);
    }
}

function login() {
    var userName = document.querySelector('#username');
    var password = document.querySelector('#password');
    //
    if (userName.value.length == 0) {
        alert('请输入用户名！');
        userName.focus();
    } else if (password.value.length == 0) {
        alert('请输入密码！');
        password.focus();
    } else {
        alert('正在登录...');
    }
}


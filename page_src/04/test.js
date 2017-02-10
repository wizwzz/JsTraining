document.write("<script language='javascript' src='jquery-3.1.1.js'></script>");
//
var run = function() {
    // arrayTest();
    initDom();


    function arrayTest() {
        var string = "为知笔记是最好用的笔记软件";
        var array = Array.from(string);
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
        var text = document.createTextNode('登录');
        button.appendChild(text);
        document.body.appendChild(button);
        //
        button.addEventListener('click', function () {
            var userName = document.querySelector('#username');
            var password = document.querySelector('#password');
            //
            if (!userName || !password)
                return;
            if (!userName.value) {
                alert('请输入用户名！');
                userName.focus();
            } else if (!password.value) {
                alert('请输入密码！');
                password.focus();
            } else {
                //jQuery ajax
                ajaxRequest(userName.value, password.value);
                //js
                // jsRequest(userName.value, password.value);
            }
        });
    }
}

function ajaxRequest(username, password) {
     jQuery.ajax('/api/login',{ 
                                data:{'user_id':username, 'password':password},
                                method:'POST',
                                dataType:'json',
                                complete:function(XHR, textStatus){
                                    console.log(XHR.valueOf());
                                    handleResponseText(XHR.responseText);
                                }
                            });
}


function jsRequest(username, password){
    var request = new XMLHttpRequest();
    request.open('POST', '/api/login', true);
    // 用字符串传入send为什么不行？
    // var sendText = "user_id="+username+"&password="+password;
    //
    var data = new FormData();
    data.append('user_id', username);
    data.append('password', password);
    console.log(data);
    request.send(data);
    //
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            console.log(this.responseText);
            handleResponseText(this.responseText);
        }
    };
}

function handleResponseText(text) {
    var data = JSON.parse(text);
    var message = data.message;
    alert(message);
}

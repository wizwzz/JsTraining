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
                jQuery.ajax('/api/login',{ 
                                data:{ user_id:userName.value, password:password.value},
                                method:'POST',
                                dataType:'xml',
                                complete:function(XHR, textStatus){
                                    console.log('in');
                                    console.log(XHR);
                                    var data = JSON.parse(XHR.responseText);
                                    console.log(data);
                                    console.log(data.toString());
                                    var code = data.code;
                                    var message = data.message;
                                    alert(message);
                                }
                            });
                }
        });
    }
}


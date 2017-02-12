
var run = function() {
    addLoginListener();
}

//////////////////////login 按钮/////////////////////
function addLoginListener() {
    var button = document.querySelector("#submit");
    if (button) {
        button.addEventListener('click', function () {
            button.setAttribute("disabled", true);
            //
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
                wizLogin(userName.value, password.value);
            }
        });
    }
}

////////////////////login请求/////////////////////
function wizLogin(username, password) {
    var params = {'user_id':username, 'password':password};
    excuteHTTPRequest('/api/login', 'POST', params, function(XHR, textStatus){
            var button = document.querySelector("#submit");
            button.removeAttribute("disabled");
            handleResponse(XHR, function(data){
                if (data.token) {
                    //
                    document.querySelector("div#loginLayer").setAttribute("style","display:none");
                    document.body.setAttribute("style","text-align:left");
                    //
                    getGroupList(data.token);
                }
            }, function(data){
                if(data.message) {
                    alert(data.message);
                }
            });
    });
}


// 获取团队列表 
// /wizas/a/biz/user_bizs?api_version=6&token=
// 获取群组列表 
// /wizas/a/groups?api_version=6&token=
function getGroupList(token) {
    var params = {'api_version':6, 'token':token};
    //
    excuteHTTPRequest('/wizas/a/biz/user_bizs', 'GET', params, function (XHR, textStatus){
        //
        handleResponse(XHR, function(bizData){
            //
            excuteHTTPRequest('/wizas/a/groups', 'GET', params, function(XHR, textStatus){
                console.log(XHR);
                console.log(textStatus);
                //
                handleResponse(XHR, function(groupData){
                    var bizList = bizData['result'];
                    var groupsList = groupData['group_list'];
                    console.log(bizList);
                    console.log(groupsList);

                    var bizGuid, bizName, groupName, groupGuid,eachBiz, eachGroup;
                    var eachArray = new Array();
                    var result = new Array();
                    var div;
                    for(var i=0; i<bizList.length; i++) {
                        eachBiz = bizList[i];

                        console.log(eachBiz);
                        bizGuid = eachBiz['biz_guid'];  
                        bizName = eachBiz['biz_name'];                      
                        if (!bizGuid) 
                            continue;

                        /////////// element 的 id 如果以数字开头，invalid////////////
                        div = addDiv(document.body, "id"+bizGuid);
                        addBizNode(div, bizName, "id"+bizGuid);
                    }

                        for (var j=0; j<groupsList.length; j++) {
                            eachGroup = groupsList[j];
                            bizGuid = eachGroup['bizGuid'];
                            groupName = eachGroup['kbName'];
                            groupGuid = eachGroup['kbGuid'];
                            div = document.querySelector("div#id"+bizGuid);
                            addGroupNode(div, groupName, "id"+groupGuid);
                        }
                        //
                });
                //
            });
        })
    });
}

function excuteHTTPRequest(url, methtodName, params, completeHander) {
        $.ajax( url,{
                        data: params,
                        method: methtodName,
                        complete:function(XHR, textStatus) {
                            if(completeHander)
                                completeHander(XHR, textStatus);
                        }
                    });
}

////////////////////////处理response////////////////////////////
function handleResponse(xmlhttp, successCallback, failureCallback) {
    //
    console.log(xmlhttp.status);
    if (xmlhttp.status == 200) {
            var data = xmlhttp.responseText;
            if(typeof data == 'string') {
                try {
                    data = JSON.parse(data);
                } catch (error) {
                    console.log(error);
                    return;
                }
            }
            console.log(data);
            if (data['code'] == 200 || data['return_code'] == 200) {
                if (successCallback)
                    successCallback(data);                
            } else {
                if (failureCallback)
                    failureCallback(data);
            }
    } else {
        alert(xmlhttp.statusText+".("+xmlhttp.status+")");
    }
}


function addDiv(superNode, nodeId){
    if (!superNode)
        return;
    var div = document.createElement('div');
    div.id = nodeId;
    superNode.appendChild(div);
    return div;
}

function addBizNode(superNode, text, nodeId){
    console.log(superNode);
    if (!superNode)
        return;
    var element = document.createElement('div');
    element.innerText = text;
    element.id = nodeId;
    element.setAttribute("class", "bizNode");
    superNode.appendChild(element);
    return element;
}

function addGroupNode(superNode, text, nodeId){
    console.log(superNode);
    if (!superNode)
        return;
    var element = document.createElement('div');
    element.innerText = text;
    element.id = nodeId;
    element.setAttribute("class", "groupNode");
    superNode.appendChild(element);
    return element;
}

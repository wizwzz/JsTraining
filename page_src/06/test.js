
var bizList;
var groupsList;

var run = function() {
    addLoginListener();
}

//////////////////////login 按钮/////////////////////
function addLoginListener() {
    var button = document.querySelector("#submit");
    if (button) {
        button.addEventListener('click', function () {
            //
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
    $.ajax('/api/login', {
            data: params, 
            method: "POST"
    }).then(function(data) {
        console.log(data);
        document.querySelector("#submit").removeAttribute("disabled");
        //
        if (data.code == 200) {
            document.querySelector("div#loginLayer").setAttribute("style","display:none");
            document.body.setAttribute("style","text-align:left");
            //
            didLoginWiz(data.token);
        } else {
            alert(data.message);
        }        
    }).catch(function(error) {
        console.log(error);
        document.querySelector("#submit").removeAttribute("disabled");
        alert(error.statusText + '('+ error.status +')');
    });

}

function didLoginWiz(token){
    if (!token) {
        return;
    }
    bizList = null;
    groupsList = null;
    getBizList(token);
    getGroupList(token);
}


function getBizList(token){
    var params = {'api_version':6, 'token':token};
    $.ajax('/wizas/a/biz/user_bizs', {
        method: "GET",
        data: params
    }).then(function(data){
        if (data.return_code == 200) {
            bizList = data['result'];
            reloadMainDom(bizList, groupsList);
        } else {
            if(data.return_message) {
                alert(data.return_message);
            }
        }
    }).catch(function(error){
        alert(error.statusText + '('+ error.status +')');
    });
}

function getGroupList(token) {
    var params = {'api_version':6, 'token':token};
    $.ajax('/wizas/a/groups', {
            method: "GET",
            data: params
    }).then(function(data){
        if (data.return_code == 200) {
            var groupsList = data['group_list'];
            reloadMainDom(bizList, groupsList);
        } else {
            if(data.return_message) {
                alert(data.return_message);
            }
        }
    }).catch();
}


function reloadMainDom(bizList, groupsList) {
    if (!bizList || !groupsList) {
        return;
    }
    console.log(bizList);
    console.log(groupsList);
    var bizGuid, bizName, eachBiz, eachGroup,groupName, bizDiv;
    for (var i=0; i<bizList.length; i++) {
        eachBiz = bizList[i];
        bizGuid = eachBiz['biz_guid'];  
        bizName = eachBiz['biz_name'];
        addBizNode(document.body, bizName, "id_"+bizGuid);
    }
    //add Personal Groups
    addBizNode(document.body, "个人群组", "id_personalBizGuid");

    for (var j=0; j<groupsList.length; j++) {
        eachGroup = groupsList[j];
        bizGuid = eachGroup['bizGuid'];
        if (!bizGuid){
            bizGuid = "personalBizGuid";
        }
        groupName = eachGroup['kbName'];
        bizDiv = document.querySelector('div#id_'+bizGuid);//$('.#id'+bizGuid);
        addGroupNode(bizDiv, groupName);
        bizDiv.setAttribute("style", "display:block");
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

function addBizNode(superNode, text, nodeId) {
    if (!superNode)
        return;
    var element = document.createElement('div');
    element.innerText = text;
    if(nodeId)
        element.id = nodeId;
    element.setAttribute("class", "bizNode");
    element.setAttribute("style", "display: none");
    superNode.appendChild(element);
    return element;
}

function addGroupNode(superNode, text, nodeId) {
    if (!superNode)
        return;
    var element = document.createElement('div');
    element.innerText = text;
    if (nodeId) 
        element.id = nodeId;
    element.setAttribute("class", "bizNode groupNode");
    superNode.appendChild(element);
    return element;
}

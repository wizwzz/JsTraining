
var bizList;
var groupsList;

var run = function() {
    // addLoginListener();
    wizLogin("wzz@wiz.cn", "wzzwzz");
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
                // button.setAttribute("class", "");
                wizLogin(userName.value, password.value);
            }
        });
    }
}

////////////////////login请求/////////////////////
function wizLogin(username, password) {
    //
    $('div.loading').addClass("active");
    $('div.spinner').find('div').addClass("active");
    //
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
            removeLoadingAnimation();
        } else {
            removeLoadingAnimation(); //为什么写在alert前面，还是没有在弹alert之前停止动画？
            alert(data.message);
        }        
    }).catch(function(error) {
        console.log(error);
        removeLoadingAnimation();
        document.querySelector("#submit").removeAttribute("disabled");
        alert(error.statusText + '('+ error.status +')');
    }).always(function(){
     
    });
}

function removeLoadingAnimation () {
    $('div.loading').removeClass("active");
    $('div.spinner').find('div').removeClass("active");
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
            listenWindow();
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
    var div = document.createElement('div');
    document.body.appendChild(div);
    console.log(bizList);
    console.log(groupsList);
    var bizGuid, bizName, eachBiz, eachGroup,groupName, bizDiv;
    for (var i=0; i<bizList.length; i++) {
        eachBiz = bizList[i];
        bizGuid = eachBiz['biz_guid'];  
        bizName = eachBiz['biz_name'];
        addBizNode(div, bizName, "id_"+bizGuid);
    }
    //add Personal Groups
    addBizNode(div, "个人群组", "id_personalBizGuid");
    //
    for (var j=0; j<groupsList.length; j++) {
        eachGroup = groupsList[j];
        bizGuid = eachGroup['bizGuid'];
        if (!bizGuid){
            bizGuid = "personalBizGuid";
        }
        groupName = eachGroup['kbName'];
        bizDiv = document.querySelector('dl#id_'+bizGuid);//$('.#id'+bizGuid);
        console.log(bizDiv);
        addGroupNode(bizDiv, groupName);
        bizDiv.setAttribute("style", "display:block");
    }
        $('.groups').find('dt').prepend(`<img id="arrow" src="img_rightArrow.png">`);
}


function addDiv(superNode, nodeId){
    if (!superNode)
        return;
    var div = document.createElement('div');
    if (nodeId)
        div.id = nodeId;
    superNode.appendChild(div);
    return div;
}

function addBizNode(superNode, text, nodeId) {
    if (!superNode)
        return;
    var dl = document.createElement('dl');
    dl.setAttribute("class", "groups");
    dl.setAttribute("style", "display: none");
    if(nodeId)
        dl.id = nodeId;
    superNode.appendChild(dl);
    //
    var dt = document.createElement('dt');
    dt.setAttribute("class", "groups");
    dt.innerText = text;
    var div = addDiv(dl);
    div.appendChild(dt);
    dt.addEventListener('click', hideOrShowGroupsList);
}

function addGroupNode(superNode, text, nodeId) {
    if (!superNode)
        return;
    var dd = document.createElement('dd');
    dd.innerText = text;
    dd.setAttribute("class", "groups hideMe");
    if (nodeId) 
        dd.id = nodeId;
    superNode.appendChild(dd);
}


function hideOrShowGroupsList()
{
    var dl = $(this).parent().parent();
    if (dl.find('dd').hasClass("showMe")) {
        dl.find('dd').removeClass("showMe");
        dl.find('dd').addClass("hideMe");
        dl.find('img').removeClass("showGroups");
        dl.find('img').addClass("hideGroups");
    } else if (dl.find('dd').hasClass("hideMe")) {
        dl.find('dd').removeClass("hideMe");
        dl.find('dd').addClass("showMe");
        dl.find('img').removeClass("hideGroups");
        dl.find('img').addClass("showGroups");
    } else {
        dl.find('dd').addClass("showMe");
        dl.find('img').addClass("showGroups");
    }
};

function listenWindow() {
    $(document).ready(function() {
    $(window).resize(function() {
        var width = $(this).width();
            console.log(document.body.clientWidth);
            if (document.body.clientWidth > 500) {
                $('dd.groups').addClass("allInOneLine");
            } else {
                $('dd.groups').removeClass("allInOneLine");
            }
        });
    });
}

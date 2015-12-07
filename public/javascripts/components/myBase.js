/*
 常用方法集合
 author: zidong.wang
 date: 2015-10-09
 */
var base = (function(){
    require('debug.js');
    require('../lib/jquery.placeholder.js');
    //获取当前页面显示参数json表示 a=b&c=d 返回 {"a":"b","c":"d"}
    var getParams=function (url){
        url = url ? url : window.location.href;
        url = url.split('#')[0];
        var str = url.slice(url.indexOf('?') + 1),
            obj = {},
            s = '',
            temp,
            keys = [];
        for(var i = 0,len = str.length; i < len; i++){
            t = str.charAt(i);
            if(t === '='){
                temp = s;
                obj[temp] = null;
                s = '';
            }else if(t === '&'){
                obj[temp] = s;
                temp = '';
                s = '';
            }else{
                s = s + str.charAt(i);
            }
        }
        if(str.charAt(i-1) !== '&'){
            obj[temp] = s;
        }
        return obj;
    }
    //对后台接口的ajax请求封装
    var api = (function(){
        /**
         * @param useMock {Boolean} 是否使用测试桩。
         */
        return function(t, data, method ,callback, useMock,contentType){
            if(!callback){
                callback=$.noop;
            }

            var doneFns=[];
            var stepFns=[callback];

            var e={
                done:function(fn){
                    doneFns.push(fn);
                    return this;
                },
                on:function(fn){
                    stepFns.push(fn);
                    return this;
                },
                resolve:function(){
                    e.status='done';
                    for (var i = 0; i < doneFns.length; i++) {
                        doneFns[i].apply(e,arguments);
                    }
                    return this;
                }
            };
            var ajaxOption={
                url : t,
                type : method||'GET',
                data : data,
//                contentType:"application/json; charset=UTF-8",
                contentType:contentType?"application/x-www-form-urlencoded; charset=UTF-8":"application/json; charset=UTF-8",
                dataType : 'json',
                timeout : 3e4,
                success : function(res){
                    // 当接口挂了
                    if(typeof res == "string"){
                        res = JSON.parse(res);
                    }
                    e.status='';
                    for (var i = 0; i < stepFns.length; i++) {
                        stepFns[i].call(e,res.bstatus&&res.bstatus.code,res.bstatus&&res.bstatus.des,res.data,res);
                    }
                },
                error : function(res){
                    e.status='fail';
                    // time out 的status 也是0
                    for (var i = 0; i < stepFns.length; i++) {
                        stepFns[i].call(e,-res.status||-1,'网络错误',res.responseText);
                    }
                }
            };
            if(useMock){// 使用测试桩数据
                ajaxOption.url = '/js/mock/' + t + '.json' + '?rdm=' + Math.random();
                ajaxOption.type = 'GET';
            }
            e.retry=function(){
                if(e.status==='loading'){
                    return;
                }
                e.status='loading';
                e.ajax=$.ajax(ajaxOption);
                return this;
            };

            e.retry();
            return e;
        };
    })();

    function joinUrl(isEncode){
        var str = '',
            parts = Array.prototype.slice.call(arguments);

        for(var j = 1,len = parts.length;j<len;j++){
            for(var i in parts[j]){
                if(typeof parts[j][i] =="string" || typeof parts[j][i] == "number"){
                    str+= i + '=' + (isEncode?encodeURI(parts[j][i]):parts[j][i]) + '&';
                }
            }
        }
        return str.slice(0,-1);
    }

    function compile(tpl,obj){
        return tpl.replace(new RegExp("@=(.*?)@","g"),function($0,$1){
            if(typeof obj[$1] != "undefined"){
                return obj[$1]
            }else{
                return "";
            }
        });
    }


    function giveMeForm(url,isBlank){
        var turnForm = document.createElement("form");
        document.body.appendChild(turnForm);
        turnForm.method = 'post';
        turnForm.action = url;
        if(isBlank){
            turnForm.target="_blank";
        }
        return turnForm;
    }
    function addParam(key,value,form){
        var newElement = document.createElement("input");
        newElement.setAttribute("name",key);
        newElement.setAttribute("type","hidden");
        newElement.setAttribute("value",value);
        form.appendChild(newElement);
    }

    function initPlaceHolder(){
        //初始化placeholder
        $('input, textarea').placeholder({customClass:"interCar-placeholder"});
    }

    return {
        getParams:getParams,
        api:api,
        joinUrl:joinUrl,
        compile:compile,
        giveMeForm:giveMeForm,
        addParam:addParam,
        initPlaceHolder:initPlaceHolder
    }
})();
module.exports = base;
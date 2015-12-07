;(function(){
    var body_target = $('body');
    var tplBg = '<div id="_alertBox_bg_div" class="popbox-mask-bg"></div>';
    function tplStr(title,words,okBtnStr,cancelBtnStr,isConfirm){
        if(typeof okBtnStr === "undefined" || okBtnStr == null || okBtnStr === ""){
            okBtnStr = "确认";
        }
        if(typeof cancelBtnStr === "undefined" || cancelBtnStr == null || cancelBtnStr === ""){
            cancelBtnStr = "取消";
        }
        var confirmStr = '';
        if(isConfirm){
            confirmStr = '<a class="cancel-btn"  id="_alertBoxDiv_cancelbtn" href="javascript:;">' + cancelBtnStr + '</a> ';
        }
        var tpl = ''+
            '<div id="_alertBoxDiv" class="popbox-popup_mask">'+
                '<div class="popbox-popup_code">'+
                    '<div class="popup_tab">'+
                        '<div class="title">' + title + '</div>'+
                        '<span id="_alertBoxDiv_close" class="close ">&times;</span>'+
                    '</div>'+
                    '<div class="order_cancel">'+
                        '<div class="">'+
                            '<p class="">' + words + '</p>'+
                        '</div>'+
                        '<div class="order_popup_btn  mt15"><a class="ok-btn" id="_alertBoxDiv_okbtn" href="javascript:;">' + okBtnStr + '</a>' + confirmStr + '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
        return tpl;
    }
    var alert = function (title,words,callback){
        if($('#_alertBoxDiv').size() > 0){return false;}
        var tpl = tplStr(title,words);
        body_target.append(tplBg);
        body_target.append(tpl);
        console.log(body_target);
        console.log(tpl);
        var clickBtn = function(){
            $('#_alertBoxDiv_okbtn,#_alertBoxDiv_close,#_alertBox_bg_div').off('click',clickBtn);
            $('#_alertBoxDiv').remove();
            $('#_alertBox_bg_div').remove();
            if(typeof callback !== "undefined" && callback != null){
                callback();
            }
        }
        $('#_alertBoxDiv_okbtn,#_alertBoxDiv_close,#_alertBox_bg_div').on('click',clickBtn);
    };
    var confirm = function (title,words,okBtnStr,cancelBtnStr,callbackOk,callbackCancel){
        if($('#_alertBoxDiv').size() > 0){return false;}
        var tpl = tplStr(title,words,okBtnStr,cancelBtnStr,true);
        body_target.append(tplBg);
        body_target.append(tpl);
        var closeWin,clickOkBtn,clickCancelBtn;
        closeWin = function(){
            $('#_alertBoxDiv_okbtn').off('click',clickOkBtn);
            $('#_alertBoxDiv_cancelbtn,#_alertBoxDiv_close,#_alertBox_bg_div').off('click',clickCancelBtn);
            $('#_alertBoxDiv').remove();
            $('#_alertBox_bg_div').remove();
        };
        clickOkBtn = function(){
            closeWin();
            if(typeof callbackOk !== "undefined" && callbackOk != null){
                callbackOk();
            }
        }
        clickCancelBtn = function(){
            closeWin();
            if(typeof callbackCancel !== "undefined" && callbackCancel != null){
                callbackCancel();
            }
        }
        $('#_alertBoxDiv_okbtn').on('click',clickOkBtn);
        $('#_alertBoxDiv_cancelbtn,#_alertBoxDiv_close,#_alertBox_bg_div').on('click',clickCancelBtn);
    };
    $.PopBox = {
        alert : alert,
        confirm : confirm
    }
    var styleTpl = ''+
        '<style type="text/css">'+
        '.popbox-mask-bg {position: fixed;left: 0;top: 0;width: 100%;height: 100%;content: "\0020";z-index: 998;background-color: #000;opacity: 0.5;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=40); -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=40)";}' +
        '.popbox-popup_mask{width:650px;padding:10px; position:fixed;left:50%;top:50%;margin-left:-325px;margin-top:-165px;z-index:999;background:rgba(0,0,0,0.3);background: transparent\9;zoom:1;-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#4c000000, endColorstr=#4c000000)";filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#4c000000, endColorstr=#4c000000);}'+
        '.popbox-popup_code {background-color: #fff;}'+
        '.popbox-popup_code .popup_tab{height:52px;line-height:52px;text-align:center;border-bottom:1px #ededed solid;}'+
        '.popbox-popup_code .popup_tab .title{font-weight:bold;font-size: 25px;}'+
        '.popbox-popup_code .popup_tab .close{display: inline;position:absolute;right:0;top:0;margin: -8px 12px 0 0;cursor: pointer;font-size:20px;font}'+
        '.popbox-popup_code .popup_tab .close:hover{color:red;}'+
        '.popbox-popup_code .order_code{width:480px;margin:30px auto;}'+
        '.popbox-popup_code .order_cancel{width:480px;margin:30px auto 0;}'+
        '.popbox-popup_code .order_cancel .order_popup_btn{margin:50px auto 0; padding-bottom: 30px;text-align: center;}'+
        ".popbox-popup_code .ok-btn {display: inline-block;border: #ff4300 1px solid;width: 40%;height: 38px;text-align: center;line-height: 38px;background: #ff4300;border-radius: 2px;box-shadow: 0 1px 1px rgba(171,3,0,0.2);cursor: pointer;outline: 0;font-size: 16px;color: #fff;font-family: tahoma,arial,'microsoft yahei','hiragino sans gb',simsun,sans-serif;}"+
        '.popbox-popup_code .ok-btn:hover{background:#ff752b;border:#e4602b 1px solid}'+
        ".popbox-popup_code .cancel-btn {  float: right;display: inline-block;border: #3cb0d0 1px solid;width: 40%;height: 38px;text-align: center;line-height: 38px;background: #3cb0d0;border-radius: 2px;box-shadow: 0 1px 1px rgba(171,3,0,0.2);cursor: pointer;outline: 0;font-size: 16px;color: #fff;font-family: tahoma,arial,'microsoft yahei','hiragino sans gb',simsun,sans-serif;}"+
        '.popbox-popup_code .cancel-btn:hover{background:#3CB071;border:#3CB071 1px solid}'+
        '</style>';
    $('head').append(styleTpl);
})();
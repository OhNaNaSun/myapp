/*
* 轮播图
*/

;(function(){

function CycleImg(data,defaultImg){
    this.init(data,defaultImg);
};
CycleImg.prototype = {
    imgNum : 0,    //当前图片数量
    dataLen : 0,    // 轮播数量
    interVal : 0,   // 轮播计时
    data : null,
    defaultImg : '',
    imgTpl : ''+
        '<% var dataArr = obj.dataArr; var len = dataArr.length; for(var i=0;i < len;i++){ %>'+
            '<% if(dataArr[i].url !== ""){ %>'+
                '<li class="divClass" data-num="<%=i%>">'+
                    '<a href="<%=dataArr[i].url%>" target="_blank">'+
                        '<img src="<%=dataArr[i].imgUrl%>">'+
                    '</a>'+
                    //'<div>'+
                    //    // '<div class="divClass-subbox">'+
                    //        // '<img data-num="<%=i%>" class="cycle-small-img" src="<%=dataArr[0].small%>" alt="<%=dataArr[i].name%>">'+
                    //    // '</div>'+
                    //'</div>'+
                '</li>'+
            '<% }else{ %>'+
                '<div class="divClass" data-num="<%=i%>">'+
                    // '<div class="divClass-subbox">'+
                        // '<img data-num="<%=i%>" class="cycle-small-img" src="<%=dataArr[0].small%>" alt="<%=dataArr[i].name%>">'+
                    // '</div>'+
                '</div>'+
            '<% } %>'+
        '<% } %>'+
        '',
    btnTpl : ''+
        //'<% var len = obj.length; for(var i=len-1;i >= 0;i--){ %>'+
        '<% var len = obj.length; for(var i=0;i < len;i++){ %>'+
            '<% if(i == 0){ %>'+
                '<li class="roundButtonLi ulLi current" data-num="<%=i%>" ></li>'+
            '<% }else{ %>'+
                '<li class="roundButtonLi ulLi" data-num="<%=i%>" ></li>'+
            '<% } %>'+
        '<% } %>'+
            '',
    init : function(data,defaultImg){
        var self = this;
        self.data = data;
        self.defaultImg = defaultImg;
        self.dataLen = data.length;
        self.addSmallPicToDiv(data,defaultImg);
        //self.addFirstBgImg(data);
        $(".divClass").hide();
        $(".divClass").eq(0).show().addClass('current-img');
        if(self.dataLen > 1){
            self.addHotBtn(data);
            $(".nowPicOff").last().addClass('nowPicOn').removeClass('nowPicOff');
            self.addEvents();
        }
    },
    addFirstBgImg : function (dataArr){
        var self = this;
        $('.divClass').eq(0).css({
                        'background':'url(' + dataArr[0].big + ') center center no-repeat'
                    });
    },
    addSmallPicToDiv : function(dataArr,defaultImg){
        var self = this;
        console.log(dataArr);
        console.log(self.tplHtml(self.imgTpl,{defaultImg:defaultImg,dataArr:dataArr}));
        $('#imgBoxDiv').html(self.tplHtml(self.imgTpl,{defaultImg:defaultImg,dataArr:dataArr}));
        var len = dataArr.length;

        // if(dataArr[0].small){
        //     self.loadImage(dataArr[0].small,0,
        //         function(){
        //             self.imgNum++;
        //             self.addOtherImg();
        //     },function(){
        //             self.imgNum++;
        //             self.addOtherImg();
        //     });
        // }
        if(dataArr[0].imgUrl){
            self.loadImage(dataArr[0].imgUrl,0,
                function(){
                    self.imgNum++;
                    self.addOtherImg();
            },function(){
                    self.imgNum++;
                    self.addOtherImg();
            });
        }
    },
    addHotBtn : function (dataArr){
        var self = this;
        $('#idUL').html(self.tplHtml(self.btnTpl,dataArr));
    },
    addBigBackground : function(){
        var self = this;
        if(self.imgNum === self.dataLen){
            var dataArr = self.data;
            if(dataArr && dataArr.length){
                for(var i=0;i<dataArr.length;i++){
                    //$('.divClass').eq(i).css({
                    //    'background':'url(' + dataArr[i].big + ') center center no-repeat'
                    //});
                    $('.divClass').find('img').attr('src',dataArr[i].big);
                }
            }
        }
    },
    addOtherImg : function(){
        var self = this;
        if(self.imgNum === 1){
            var dataArr = self.data;
            if(dataArr && dataArr.length){
                for(var i=0;i<dataArr.length;i++){
                    // $('.cycle-small-img[data-num="' + i + '"]').attr('src',dataArr[i].small);
                    //$('.divClass').eq(i).css({
                    //    'background':'url(' + dataArr[i].big + ') center center no-repeat'
                    //});
                    $('.divClass').eq(i).find('img').attr('src',dataArr[i].imgUrl);
                }
            }
        }
    },
    addEvents : function(){
        var self = this;
        if(self.dataLen > 1){
            $(".ulLi").bind("click",function (){
                    clearTimeout(self.interVal);
                    var $this = $(this);
                    var roundButn = $this.attr("data-num");
                    var roundBtnNow = $this.hasClass("nowPicOn");
                    if(!roundBtnNow){
                        self.changeImg(roundButn);
                        self.interVal = setInterval(self.changeImg,5000);
                    }
                }
            );
            self.interVal = setInterval(self.changeImg,5000);
        }
    },
    changeImg : function(index){
        var targetOld = $('.current-img');
        targetOld.fadeOut(1000).removeClass('current-img');
        var targetNew = null;
        if(typeof index === 'undefined') {
            targetNew = targetOld.next();
            if(!targetNew.hasClass('divClass')){
                targetNew = $(".divClass").first();
            }
        }else{
            targetNew = $(".divClass").eq(+index);
        }
        targetNew.addClass('current-img').fadeIn(1000);
        var num = targetNew.attr('data-num');
        $('.current').removeClass('current');
        $('.ulLi[data-num="' + num + '"]').addClass('current');
    },
    loadImage : function (url, dataObj, callback, errorCallback) {
        var self = this;
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;
        if(img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img,dataObj);
            return; // 直接返回，不用再处理onload事件
        }
        img.onload = function () { //图片下载完毕时异步调用callback函数。
            callback.call(img,dataObj);//将回调函数的this替换为Image对象
        };
        if(typeof errorCallback !== 'undefined'){
            img.onerror = function () {
                errorCallback.call(img,dataObj);
            };
        }
    },
    /*
    <% code %>
    <%=data%>
    */
    tplHtml:function (tpl,data){
        var tpl = "" + tpl,
            result="var ___str = '';with(obj){___str += '"
                    +tpl.replace(/[\r\n\t]/g," ")
                    .replace(/<%=(.*?)%>/g,"';if($1 != null){___str += $1;}___str += '")//把<%=xxx%> 替换为 ');p.push(xxx);p.push('
                    .replace(/<%/g,"';")//把<%替换为 ');
                    .replace(/%>/g,"___str += '")//把%> 替换为 p.push('
                    +"';} return ___str;",
            fn=new Function("obj",result);
        return fn(data);
    }
};

if(typeof exports !== "undefined") {
    exports.CycleImg = CycleImg;
} else {
    window["CycleImg"] = CycleImg;
}
})();


// var cycleImg = new CycleImg([
//             { 
//                 "name":"pic1" , 
//                 "link" : "aaa",
//                 "small":"./img/small1.jpg",
//                 "big":"./img/1.jpg"
//             },
//             { 
//                 "name":"pic2" , 
//                 "link" : "aaa",
//                 "small":"./img/small2.jpg",
//                 "big":"./img/2.jpg" 
//             },
//             { 
//                 "name":"pic3" , 
//                 "link" : "aaa",
//                 "small":"./img/small3.jpg",
//                 "big":"./img/3.jpg" 
//             },
//             { 
//                 "name":"pic4" , 
//                 "link" : "aaa",
//                 "small":"./img/small4.jpg",
//                 "big":"./img/4.jpg" 
//             }
//         ]);
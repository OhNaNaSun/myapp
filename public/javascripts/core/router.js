define([
    'jquery',
    'underscore',
    'backbone_1.2.3',
    '../page/cycleImg/view'],function($, _, BackBone,cycleImgView){
    //用define定义模块
    var AppRouter = Backbone.Router.extend({
        routes : {
            '' : 'main',
            'topic' : 'renderList',
            'cycleImg': 'renderCycleImg',
            'topic/:id' : 'renderDetail',
            '*error' : 'renderError'
        },
        main : function() {
            console.log('应用入口方法');
        },
        renderCycleImg: function(err){
           new cycleImgView().drawHtml();
            console.log('图片轮播');
        },
        renderList : function() {
            console.log('渲染列表方法');
        },
        renderDetail : function(id) {
            console.log('渲染详情方法, id为: ' + id);
        },
        renderError : function(error) {
            console.log('URL错误, 错误信息: ' + error);
        }
    });
    var begin = function(){
        var router = new AppRouter();
        Backbone.history.start();
    };
    return {begin: begin}
})
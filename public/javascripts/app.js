requirejs.config({
    baseUrl: 'javascripts/lib',
    paths:{
        app: '../app',
        router:'../core/router'
    }
})
// Start the main app logic.
//requirejs,define,require不一样
requirejs(['jquery', 'underscore', 'backbone_1.2.3','router'], function($,        _,   Backbone, router) {
        //console.log(router);
        router.begin();
        /*events中的事件是通过delegate()方法绑定到视图对象的el元素上，
        而并非是选择器所描述的元素。因此视图内的结构无论如何变化，
        events中的事件都是有效的。*/
        var ListView = Backbone.View.extend({
            tagName : 'div',
            className : 'listview',
            id : 'list',
            attributes : {
                title : '列表',
                style : 'color:red'
            },
            render : function() {
                /*this.el.innerHTML = 'Hello World!';
                document.body.appendChild(this.el);*/
            }
        })
        var listview = new ListView();
        listview.render();
    }
);
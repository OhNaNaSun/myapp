
/*
* 下拉框组件
* 依赖jquery
* 传入参数initObj如下结构
* 提供方法
* ctor         //控件方法 创建一个控件，返回一个对象
* initSelecter //用于重载列表结构 对象方法 使用对象调用
* getCurrentValue //返回当前控件选择对应的value
* */
var listSelecter = (function(){
    /*
     * initObj{
     *   showerId:"",   //显示控件的id
     *   ullistId:"",   //列表对象对的id
     *   listItem:[{    //列表对象结构
     *       itemKey:"",    //显示项
     *       itemValue:""       //显示项对应的值
     *   }...
     *   ],
     *   nowshow:'',        //当前显示
     *   now:''             //当前显示对应的value
     * }
     * callback change之后的回调
     *
     *下拉选择框，自定义下拉选择，用户选取后 框中显示对应的itemKey 回传itemValue
     * */
    function ListSelecter(initObj,callback){
        this.dataModel = $.extend({
            showerId:"",
            ullistId:"",
            listItem:[],
            nowshow:"",
            now:0
        },initObj);
        console.log(initObj);
        console.log(this.dataModel);
        if(callback){
            this.callback = callback;
        }
        this.initSelecter();
        this.initListener();
    }

    ListSelecter.prototype={
        initSelecter:function(dataModel){
            var dataModel = dataModel||this.dataModel;
            if(dataModel){
                this.dataModel = dataModel;
                var shower = $("#"+dataModel.showerId);
                var ulList = $("#"+dataModel.ullistId);
                //初始化控件显示
                shower.val(dataModel.nowshow);
                var html = this.tplUllist(dataModel.listItem);
                //初始化下拉列表内容
                ulList.html(html);
            }
        },
        tplUllist:function(ullist){
            var tpl = '<ul>@lis</ul>';
            var items = '';
            for(var i=0,item = ullist[i];item;item=ullist[++i]){
                var itemKey = item['itemKey'];
                items+='<li><a href="" class="listSelector" style="display:block;" data-index="'+i+'" >'+itemKey+'</a></li>';
            }
            tpl = tpl.replace('@lis',items);
            return tpl;
        },
        //改变dataModel中当前的值 更新页面
        changeDataModel:function(index){
            var dataModel = this.dataModel;
            var items = dataModel.listItem;
            dataModel.nowshow = items[index].itemKey;
            dataModel.now = items[index].itemValue;
            var shower = $("#"+dataModel.showerId);
            var ulList = $("#"+dataModel.ullistId);
            shower.val(dataModel.nowshow);
            ulList.hide();
            if(this.callback){
                this.callback();
            }
        },
        findIndexByItemKey:function(array,itemKey){
            var arrayItem = array[0];
            for(var i=0;arrayItem;arrayItem=array[++i]){
                if(itemKey==arrayItem.itemKey){
                    return i;
                }
            }
            return -1;
        },
        findIndexByItemValue:function(array,itemValue){
            var arrayItem = array[0];
            for(var i=0;arrayItem;arrayItem=array[++i]){
                if(itemValue==arrayItem.itemValue){
                    return i;
                }
            }
            return -1;
        },
        //重定位ullist的滚动条位置  主要是根据当前所选中的item
        resetUllist:function(){
            var dataModel = this.dataModel;
            var index = this.findIndexByItemValue(dataModel.listItem,dataModel.now);
            if(index!=-1){
                var ulList = $("#"+dataModel.ullistId);//要滚动的对象
                var desObj = ulList.find('li').eq(index);//滚动到的对象
                $("#"+dataModel.ullistId+" .current").removeClass("current");
                desObj.find('a').addClass("current");
                ulList.scrollTop(
                        desObj.offset().top - ulList.offset().top + ulList.scrollTop()
                );
            }
        },
        hideSelf:function(){
            var dataModel = this.dataModel;
            var ulList = $("#"+dataModel.ullistId);
            ulList.hide();
        },
        reSetSelf:function(){
            var self = this;
            var dataModel = this.dataModel;
            var ulList = $("#"+dataModel.ullistId);
            ulList.toggle();
            self.resetUllist();
        },
        initListener:function(){
            var self = this;
            var dataModel = this.dataModel;
            var shower = $("#"+dataModel.showerId);
            var ulList = $("#"+dataModel.ullistId);
            ulList.on('click',function(e){
                var index = $(e.target).attr("data-index");
                self.changeDataModel(index);
                self.resetUllist();
                return false;
            });
            shower.on('click',function(){
                ulList.toggle();
                self.resetUllist();
            });
            $("body").on('click',function(e){
                var isListItem = $(e.target).hasClass("listSelector")||e.target.id==dataModel.showerId;
                if(!isListItem&&!ulList.is(':hidden')){
                    ulList.hide();
                }
            });
        },
        getCurrentValue:function(){
            return this.dataModel.now;
        },
        getCurrentDataModel:function(){

            var dataModel = this.dataModel;
            var items = dataModel["listItem"];
            var item = items[0];
            for(var i=0;item;item=items[++i]){
                if(item["itemValue"]==dataModel.now){
                    return item;
                }
            }
            return null;
        },
        setCurrentValue:function(value){
            this.dataModel.now = value;
            var index = this.findIndexByItemKey(value);
            this.changeDataModel(index);
        }
    }

    function ctor(initObj,callback){
        return new ListSelecter(initObj,callback);
    }
    return {
        ctor:ctor
    }
})();

module.exports = listSelecter;
/**
 * @project intercar_line_qzz
 * @author longw.wang@qunar.com
 * @file suggestion.js
 */

(function($) {

    "use strict";

    var SearchSuggestion = function(par){
        if(par['el'] == null || par['el'] == undefined){
            alert("Lack of key nodes");
        }
        //获取数据地址
        this.getDateApi = par.api;
        //是否初始化
        this.isInit = false;
        //数据
        this.suggestionData = null;
        //结点信息
        this.element = {
            //搜索框结点
            suggestElement : (typeof par['el'] === "string" ? $(par['el']) : par['el']),
            //搜索框父节点
            suggestParentElement : par.parentEl,
            //补全结点
            autoComplateElement : $('.search_list')
        }
        //ajax标识符
        this.ajaxFlag = false;
        //当前ajax对象
        this.ajaxObj = null;
        this.random = +new Date();
        this.timer = null;
        //搜索列表页
        this.searchUrl = "/web/search";
        //跳转页面
        this.target = par.target || "_blank";
        //初始化
        this.init();

    }
    SearchSuggestion.prototype = {

        init : function(){
            if(!this.isInit){
                this.initEvent();
                this.isInit = true;
            }
        },
        initEvent : function(){
            var _this = this;

            this.element.suggestElement.on('focus', function(e) {
                e.preventDefault();
                e.stopPropagation();
                //_this.pickMatchData();
                _this.lastData = null;
            }).on('blur', function(e) {
                e.preventDefault();
                e.stopPropagation();
                _this.clearTimer();
                if(_this.element.autoComplateElement.find('li').length == 0) {
                    return;
                };
                _this.hideSuggestion();

            });

            this.element.suggestElement.on('keydown', function(e) {

                switch(e.keyCode) {
                    case 13:
                       _this.inputVal(_this.element.autoComplateElement.find('li.current'))
                        // keydownstatus = true;
                        break;
                    case 38:
                        e.preventDefault();
                        _this.stopTimer();
                        var pel = _this.element.autoComplateElement.find('li.current').prev();
                        pel = pel.length == 0 ? _this.element.autoComplateElement.find('li:last') : pel;
                        _this.autoListFocus(pel);
                        _this.autoInputContent(pel, true);
                        // keydownstatus = true;
                        break;
                    case 40:
                        e.preventDefault();
                        _this.stopTimer();
                        var nel = _this.element.autoComplateElement.find('li.current').next();
                        nel = nel.length == 0 ? _this.element.autoComplateElement.find('li:first') : nel;
                        _this.autoListFocus(nel);
                        _this.autoInputContent(nel, true);
                        // keydownstatus = true;
                        break;
                    case 37:
                        //e.preventDefault();
                        //e.stopPropagation();
                        break;
                    case 39:
                        //e.preventDefault();
                        //e.stopPropagation();
                        break;
                    default:
                        _this.pickMatchData(e);
                        // keydownstatus = false;
                        break;
                }
            });
        },
        autoInputContent : function(el, sel) {

            var self = this;
            if(!el || el.length == 0) {
                return;
            }
            self.element.suggestElement.val()
            if(sel) return;

            self.hideSuggestion();
        },
        autoListFocus : function(el){
            var self = this,
                tmpEl = self.element.autoComplateElement.find('li.current');
            if(!tmpEl || tmpEl.length==0){
                return;
            }
            tmpEl && tmpEl.removeClass('current');
            self.element.autoComplateElement.find('li.current').removeClass('current');
            tmpEl = el;
            tmpEl.addClass('current');
            var tp = self.element.autoComplateElement.find('li.current').position().top;
            var eh = self.element.autoComplateElement.find('li.current').height();
            var h = self.element.autoComplateElement.height();
            var stp = self.element.autoComplateElement.scrollTop();
            if(tp > h) {
                self.element.autoComplateElement.scrollTop(tp - h + eh);
            } else if(tp > (h/2)) {
                self.element.autoComplateElement.scrollTop(stp + eh);
            } else if(tp < 0) {
                self.element.autoComplateElement.scrollTop(0);
            } else if(tp < (h/2)) {
                self.element.autoComplateElement.scrollTop((stp - eh) > 0 ? (stp - eh) : 0);
            }

        },
        showSuggestion : function() {
            if(this.element.autoComplateElement.length === 0) {
                this.element.autoComplateElement = this.drawSuggestion();
            } else {
                this.element.autoComplateElement.find("ul").html(this.changeContent(this.suggestionData));
                this.element.autoComplateElement.show();
            }
            if(this.isReset) {
                this.resetPos(this.autoComplateElement);
            }
        },
        hideSuggestion : function() {
            this.element.autoComplateElement.hide();
            this.element.autoComplateElement.find('ul').html('');
        },
        drawSuggestion : function() {

            var html = '<div class="search_list fn-pa fn-none2 intercar-auto-complate-'+ this.random +'" style="max-height:400px;overflow-y:hidden;"><ul>'
                + this.changeContent(this.suggestionData)
                +'</ul></div>';
            var el = $(html);
            this.resetPos(el);
            return el;
        },
        // 重新设置position
        resetPos: function(el) {
            if(this.element.suggestParentElement) {
                this.element.suggestParentElement.append(el);
            } else {
                var pos = this.element.suggestElement.offset(),
                    height = this.element.suggestElement.height();
                $(document.body).append(el.css({
                    "position": "absolute",
                    "left": pos.left + "px",
                    "top": pos.top + height + "px",
                    "z-index": 9999
                }));
            }
        },
        pickMatchData : function(){
            var _this = this;

            _this.clearTimer();

            _this.timer = setInterval(function(){

                if(!_this.ajaxFlag){

                    var keywords = $.trim(_this.element.suggestElement.val()),
                        params = {
                            keywords : keywords
                        };
                    //条件验证
                    if(!_this.limitOrdition(keywords)) return;
                    _this.ajaxFlag = true;
                    _this.lastData = keywords;
                    if(_this.ajaxObj && _this.ajaxObj.ajax && typeof _this.ajaxObj.ajax.abort == "function") {
                        _this.ajaxObj.ajax.abort();
                    }
                    _this.ajaxObj = hw.util.api(_this.getDateApi,params,"GET",function(code,des,data,res){

                        _this.suggestionData = res.data? data.suggestList : des;

                        _this.showSuggestion();

                        _this.ajaxFlag = false;
                    },false);
                }
            },200);
        },
        /**
         *m
         * @param keywords
         */
        limitOrdition : function(keywords){
            var _this = this,
                reg = /^[\u4e00-\u9fa5]+$/i;
            //与最后一次发送数据值比较，若相同，则不发送
            if(_this.lastData ==  keywords) return false;
            if(reg.test(keywords)){
                return true;
            }else if(keywords.length<2){
                _this.hideSuggestion();
                return false;
            }else{
                return true;
            }
        },
        // 匹配内容
        changeContent: function(data) {
            if(!data || !$.isArray(data)) {
                this.inputValue = (this.el && this.el.val()) ? this.el.val() : this.inputValue;
                //return '<li data-none="none" class="current"><a href="#" class="start_box"><h3>没有找到 '+ data +'</h3></a></li>';
                return "";
            }
            var html = '', cls = '';
            var idx = 0;
            $(data).each(function(index, item) {
                if(index == 0) {
                    cls = 'current';
                } else {
                    cls = '';
                }
                if(idx < 7) {
                    html += '<li class="'+ cls +'" data-label="'+ item["label"] +'" data-value="'+ item["value"] +'" data-url="'+ item["url"] +'"><a href="#" class="start_box">'
                        //+ (item["matchs"] ? '<h3>'+ item["matchs"] +'</h3>' : '')
                        //+ (item["value"] ? '<p>'+ item["value"] +'</p>' : '')
                        + (item["matchs"] ? ' <em>'+item["matchs"]+'</em>' : '')
                        + (item['value'] ? item['value'].replace(item["matchs"],"") : '')
                        +'</a></li>';
                }
                idx ++;
            });
            if($.trim(html) == '') {
                return '<li data-none="none" class="current"><a href="#" class="start_box"><h3>没有找到 '+ this.inputValue +'</h3></a></li>';
            }
            return html;
        },
        clearTimer: function() {
            if(this.timer) {
                clearInterval(this.timer);
                this.timer = null;
                this.restartTimer();
            }
            this.lastData = $.trim(this.element.suggestElement.val());
        },
        restartTimer: function() {
            this.timerFlag = false;
        },
        stopTimer: function() {
            this.timerFlag = true;
        },
        inputVal : function(el){
            var _this = this,
                inputVal = _this.element.suggestElement.val();
            el.blur();
            _this.clearTimer();
            $('.search_list').hide()
            //是否有建议，如果没有获取搜索框中的值
            if(!el || el.length == 0) {
                window.open(_this.searchUrl+"?searchText="+encodeURI(inputVal),'_blank');
                return;
            }
            var val = el.data('value'),
                url = el.data('url');
            _this.element.suggestElement.val(val);
            window.open(url,this.target)

        }
    }

    hw.component.searchSuggestion = SearchSuggestion;

})(jQuery || $);
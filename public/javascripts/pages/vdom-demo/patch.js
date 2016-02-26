define([""], function(){
    //用于记录两个虚拟DOM之间差异的数据结构
    //每个节点有四种变动
    var REPLACE = 0;
    var REORDER = 1;
    var PROPS = 2;
    var TEXT = 3;

    function patch(node, patches){
        var walk = {
            index: 0
        };
        dfsWalk(node, walker, patches);
    }
    patch.REPLACE = REPLACE;
    patch.REORDER = REORDER;
    patch.PROPS = PROPS;
    patch.TEXT = TEXT;

    return patch;
})
define(["patch", "list-diff2"], function(patch, listDiff){
    function diff(oldTree, newTree){
        var index = 0;
        var patches = {};
        //深度遍历
        dfsWalk(oldTree, newTree, index, patches);
        /*var patches = {
            1:{type:REPLACE,node:newNode}, //h1节点变成h5
            5:{type:REORDER,moves:changObj} //ul新增了子节点li
        }*/
        return patches;
    };
    function dfsWalk(oldNode, newNode, index, patches){
        var currentPatch = [];
        if(newNode === null){
            //依赖listdiff算法进行标记为删除
        }else if(typeof oldNode === 'string' && typeof newNode === 'string'){
            //文本节点直接替换文本
            if(oldNode !== newNode){
                currentPatch.push({
                    type: patch.TEXT,//3
                    content: newNode
                })
            }
        }else if(oldNode.tagName === newNode.tagName && oldNode.key === newNode.key){
            console.log(222);
            //节点类型相同
            //比较节点的属性是否相同
            var propsPatches = diffProps(oldNode, newNode);//{id:undefined,class:sss}
            if(propsPatches){
                currentPatch.push({
                    type: patch.PROPS,
                    props: propsPatches
                })
            }
            //比较子节点是否相同
            diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
        }else{
            //节点的类型不同，直接替换
            console.log(newNode);
            currentPatch.push({type: patch.REPLACE, node: newNode})
        }
        //console.log(currentPatch);
        if (currentPatch.length) {
            patches[index] = currentPatch;
            console.log(patches);
        }
    }
    function diffProps(oldNode, newNode){
        var count = 0;
        var propsPatches = {};
        var oldProps = oldNode.props;
        var newProps = newNode.props;
        var key, value;
        for(key in oldProps){
            value = oldProps[key];
            if(newProps[key] !== value){
                count++;
                propsPatches[key] = newProps[key]
            }
        }
        for(key in newProps){
            value = newProps[key];
            if(!oldProps.hasOwnProperty(key)){
                count++;
                propsPatches[key] = value;
            }
        }
        if(count === 0){
            return null;
        }

        return propsPatches;
    }

    function diffChildren(oldChildren, newChildren, index, patches, currentPatch){
        var diffs = listDiff(oldChildren, newChildren, 'key');
        console.log(diffs);
        newChildren = diffs.children;

        if(diffs.moves.length){
            var reorderPatch = {
                type: patch.REORDER,
                moves: diffs.moves
            }
            currentPatch.push(reorderPatch);
        }

        var leftNode = null;
        var currentNodeIndex = index;

        oldChildren.forEach(function(child, i){
            var newChild = newChildren[i];
            console.log(leftNode  && leftNode.count);
            currenNodeIndex = (leftNode  && leftNode.count) ? (currentNodeIndex + leftNode.count + 1) : (currentNodeIndex + 1);
            dfsWalk(child, newChild, currentNodeIndex, patches);
            leftNode = child;
        });
    }
    return diff;
})


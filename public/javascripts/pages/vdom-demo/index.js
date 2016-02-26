require(["diff", "velement", "patch"], function(diff, VElement, patch){
    var vdom = VElement('div', { 'id': 'container' }, [
        VElement('h1', { style: 'color:red' }, ['simple virtual dom']),
        VElement('p', ['hello world']),
        VElement('ul', [
            VElement('li', ['item #1']),
            VElement('li', ['item #2'])
        ]),
    ]);
    var rootnode = vdom.render();
    document.body.appendChild(rootnode);
    var newVdom = VElement('div', { 'id': 'container' }, [
        VElement('h5', { style: 'color:red' }, ['simple virtual dom']),
        VElement('p', ['hello world']),
        VElement('ul', [VElement('li', ['item #1']), VElement('li', ['item #2']), VElement('li', ['item #3'])]),
    ]);

    var patches = diff(vdom, newVdom);
    /*var patches = {
        1:{type:REPLACE,node:newNode}, //h1节点变成h5
        5:{type:REORDER,moves:changObj} //ul新增了子节点li
    }*/
    console.log(patches);
    patch(rootnode, patches);
})
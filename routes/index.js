var express = require('express');
var Todo = require("../models/Todo.js");
var router = express.Router();//这个和app.js的router啥区别？app.use('/',routes)
router.get('/', function(req, res){
    var todo = new Todo();
    todo.get(function(err, todoBack){//todoBack-todos
        console.log(todoBack);//[]
        res.render('index', {allContent: todoBack.reverse()})//pass a local variable to the view
    })
})
router.get('/add', function(req, res){
    //console.log(req.query);//{content:"test123"}
    var content = req.query.content;//test123
    var todo = new Todo(content, true);
    todo.save(todo, function(err, todoBack){
        if(err){
            res.writeHead(500)
        }else{
            res.writeHead(200)
        }
        res.write(todoBack.id);
        res.end();
    })
})
router.get('/delete', function(req, res){
    //console.log(req.query);//{id:...}传过来的
    var id = req.query.id;
    var todo = new Todo();
    todo.delete(id, function(err){
        if(err){
            res.writeHead(500);
        }else{
            res.writeHead(200);
        }
        res.end();
    })
})

module.exports = router;
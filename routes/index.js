var express = require('express');
var Todo = require("../models/Todo.js");
var User = require("../models/user.js");
var router = express.Router();//这个和app.js的router啥区别？app.use('/',routes)
router.get('/', function(req, res){
    var todo = new Todo();
    todo.get(function(err, todoBack){//todoBack-todos
        console.log(todoBack);//[]
        res.render('index', {allContent: todoBack.reverse()})//pass a local variable to the view
    })
});
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
});
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
});
router.get('/login', function(req, res){
    res.render('login', {title: 'login'});
});
router.get('/logup', function(req, res){
    res.render('login', {title: 'logup'});
});
router.post('/ucenter', function(req, res){
    var query_doc = {username: req.body.username, password: req.body.password};
    (function(){
        User.userModel.count(query_doc, function(err, doc){
            if(doc === 0){
                var user = new User(query_doc.username, query_doc.password);
                user.save(user, function(err, userBack){
                    if(err){
                        //res.writeHead(500);
                        //After writeHead, the headers are baked in and you can only call res.write(data), and finally res.end(data).
                    }else{
                        //res.writeHead(200);
                        res.render('ucenter',{user:query_doc});
                    }
                    //res.end();
                });
            };
        });
    })(query_doc)
})
<<<<<<< HEAD
=======
router.get('/all', function(req, res){
    var todo = new Todo();
    todo.getAll(function(err, todoBack){
        res.render('all', {allContent: todoBack.reverse()})
    })
})
>>>>>>> 26454f3949818ffb63eaedb67f76a597fef68b17
module.exports = router;
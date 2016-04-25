var express = require('express');
var crypto = require('crypto');
var Todo = require("../models/Todo.js");
var User = require("../models/user.js");
var dataObj = require("../models/data.js");
var detailDataObj = require("../models/detailData.js");
var discoveryDataObj = require("../models/discoveryData.js");
var router = express.Router();//这个和app.js的router啥区别？app.use('/',routes)
router.get('/addTodo', function(req, res){
    var username = req.session.user.username;
    var content = req.query.content;//test123
    todo.save(username, content, function(err, todoBack){

        Todo.get(username, function(err, todos){
            if(err){
            }
            console.log(todos);
            res.render('todo', {title: '事项', todos: todos});
        })
    });
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
router.get('/data', function(req, res){
    res.jsonp(dataObj)
})
router.get('/detailData', function(req, res){
        res.jsonp(detailDataObj);
})
router.get('/discoveryData', function(req, res){
    if(req.module === "sell"){
        res.jsonp(discoveryDataObj.sell);        
    }else{
        res.jsonp(discoveryDataObj.obj);      
    }    
})
router.get('/', function(req, res){
    res.render('index', {
        title: '主页',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
//测试iframe
router.get('/iframe', function(req, res){
    res.render('iframe');
});
//测试iframe
router.get('/iframeinner', function(req, res){
    res.render('iframeinner');
});
//测试slide组件：hammer.js
router.get('/slide', function(req, res){
    res.render('slide');
});
router.get('/UIdemo', function(req, res){
    res.render('UIdemo');
});
router.get('/DOM', function(req, res){
    res.render('DOM');
});
//如果是已登录状态，则返回前一页
function checkLogin(req, res, next){
    if(req.session.user){
        req.flash('error', '您已登录！');
        res.redirect('back');
    };
    next();
};
//如果未登录进行发表，登出等。返到登录页
function checkNotLogin(req, res, next){
    if(!req.session.user){
        req.flash('error', '请登录！');
        res.redirect('/login');
    };
    next();//通过 next() 转移控制权
};
router.get('/login', checkLogin);//路由中间件
router.get('/login', function(req, res){
    res.render('login', {
        title: '登录',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.get('/logout', checkNotLogin);
router.get('/logout', function(req, res){
    req.session.user = null;
    req.flash('success', '登出成功！');
    res.redirect('/');
});
router.get('/todo', function(req, res){
    //Todo
    Todo.get(req.session.user.username, function(err, todos){
        if(err){
        }
        console.log(todos);
        res.render('todo', {title: '事项', todos: todos});
    })
});
router.post('/login', function(req, res){
    var username = req.body.username;
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');
    User.get(username, function(err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/login');//返回的页面
        };
        if(!user) {
            req.flash('error', '该用户不存在！');
            return res.redirect('/login');//返回的页面
        }
        if(password != user.password){
            req.flash('error', '密码错误！');
            return res.redirect('/login');//返回的页面
        }
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        req.flash('success', '登陆成功!');
        res.redirect('/');//登陆成功后跳转到主页
    })
});
router.get('/reg', checkLogin);
//进入注册页
router.get('/reg', function(req, res){
    res.render('reg', {title: 'reg'});
});
//注册请求
router.post('/reg', function(req, res){
    var username = req.body.username,
        password = req.body.password,
        password_re = req.body.password_repeat;
    if(password != password_re){
        req.flash('error', '两次输入的密码不一致！');
        return res.redirect('/reg');//返回注册页
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        username: username,
        password: password,
        email: req.body.email
    });
    User.get(username, function(err, user){
        if(err){
            req.flash('error', err);
            return res.redirect('/reg');//返回的页面
        };
        if(user){
            req.flash('error', '该用户名被注册！');
            return res.redirect('/reg');//返回的页面
        }
        newUser.save(function(err, userBack){
            //不能User.save????
            //user user????
             if(err){
                 req.flash('error', err);
                 return res.redirect('/reg');//注册失败返回注册页
             }
             req.session.user = user;
             req.flash('success', '注册成功！');
             res.redirect('/');
        });
    })
});
router.post('/todo', function(req, res){
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
router.get('/all', function(req, res){
    var todo = new Todo();
    todo.getAll(function(err, todoBack){
        res.render('all', {allContent: todoBack.reverse()});
    })
})
module.exports = router;
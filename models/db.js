/*
var mongoose = require('mongoose');//引用mongoose模块
mongoose.connect('mongodb://127.0.0.1/MorePsesonTodo'); //创建一个数据库连接
exports.mongoose = mongoose;*/
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').connection,
    Server = require('mongodb').Server;
//创建了一个数据库连接实例，并通过 module.exports 导出该实例。
module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});

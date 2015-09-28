var mongoose = require('mongoose');//引用mongoose模块
mongoose.connect('mongodb://127.0.0.1/MorePsesonTodo'); //创建一个数据库连接
exports.mongoose = mongoose;
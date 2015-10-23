var mongodb = require('./db.js');
//var Schema = mongodb.mongoose.Schema;Schema:一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
/*Schema  ：  一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
Model   ：  由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
Entity  ：  由Model创建的实体，他的操作也会影响数据库*/
/*var TodoSchema = new Schema({
    content: String,//定义属性
    show: Boolean
})
var TodoModel = mongodb.mongoose.model("Todo", TodoSchema);*/
//Model:由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
//新建类
function Todo(username, contents, show){
    this.username = username;
    this.show = show;
}
Todo.prototype.save = function(username, content, callback){
    var todo = {
        username: this.username,
        contents: this.contents,
        show: this.show
    };
    //console.log(todo);
    //打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        };
        //读取 users 集合
        db.collection('todos', function(err, collection){
            if(err){
                db.close();
                return callback(err);
            };
            collection.findOne({username: name, 'show':true}, function(err, todos){
                if(err){
                    return callback(err);
                }
                if(todos){
                    var oldContents = todos.contents;
                    collection.update({content: oldContents.push(content)}, function(err, todo){
                        mongodb.close();
                        if(err){
                            return callback(err);
                        }
                        callback(null, todo[0]);//成功！err 为 null，并返回存储后的用户文档
                    })
                }else{
                    collection.insert(todo, function(err, todo){
                        mongodb.close();
                        if(err){
                            return callback(err);
                        }
                        callback(null, todo[0]);//成功！err 为 null，并返回存储后的用户文档
                    })
                }

            })



        })
    });
};
Todo.get = function(name, callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err)
        };
        db.collection('todos', function(err, collection){
            if(err){
                db.close();
                return callback(err);
            };
            collection.findOne({username: name, 'show':true}, function(err, todo){
                db.close();
                if(err){
                    return callback(err);
                }
                callback(null, todo);
            })
        })
    });
};
Todo.prototype.getAll = function(callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err)
        };
        db.collection('todos', function(err, collection){
            if(err){
                db.close();
                return callback(err);d
            };
            collection.find({'show':true}, function(err, todo){
                db.close();
                if(err){
                    return callback(err);
                }
                callback(null, todo);
            })
        })
    });
};
Todo.prototype.delete = function(id, callback){
   /* TodoModel.update({'_id': id}, {'show': false}, function(err){
        if (err) {
            return callback(err);
        }
        callback(null);
    });*/
    mongodb.open(function(err, db){
        if(err){
            return callback(err)
        };
        db.collection('todos', function(err, collection){
            if(err){
                db.close();
                return callback(err);
            };
            collection.update({'_id': id, 'show': false}, function(err, todo){
                db.close();
                if(err){
                    return callback(err);
                }
                callback(null, todo);
            })
        })
    });
};
module.exports = Todo;
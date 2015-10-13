var mongodb = require('./mongodb.js');
var Schema = mongodb.mongoose.Schema;//Schema:一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
/*Schema  ：  一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
Model   ：  由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
Entity  ：  由Model创建的实体，他的操作也会影响数据库*/
var TodoSchema = new Schema({
    content: String,//定义属性
    show: Boolean
})

var TodoModel = mongodb.mongoose.model("Todo", TodoSchema);//Model:由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
//新建类
function Todo(content, show){
    this.content = content;
    this.show = show;
}
Todo.prototype.save = function(todo, callback){
    var todo = {
        content: todo.content,
        show: todo.show
    };
    var newTodo = new TodoModel(todo);
    newTodo.save(function(err, todo){//模型的save方法？find方法
        if(err){
            return callback(err)
        }
        callback(null, todo)
    });
}
Todo.prototype.get = function(callback){
    TodoModel.find({'show':true}, function(err, todos){
      if(err){
          return callback(err);
      }
      callback(null, todos);
    })
}
Todo.prototype.getAll = function(callback){
    TodoModel.find(function(err, todos){
        if(err){
            return callback(err);
        }
        callback(null, todos);
    })
}
Todo.prototype.delete = function(id, callback){
    TodoModel.update({'_id': id}, {'show': false}, function(err){
        if (err) {
            return callback(err);
        }
        callback(null);
    });
}
module.exports = Todo;
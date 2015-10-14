var mongodb = require('./db.js');
/*
var Schema = mongodb.mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String
});
//将该Schema发布为Model
var userModel = mongodb.mongoose.model("User", userSchema);//Model:由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
*/

function User(username, password, email){
    this.username = username;
    this.password = password;
    this.email = email;
};
User.prototype.save = function(user, callback){
    //要存入数据库的用户文档
    var user = {
        username: user.username,
        password: user.password,
        email: user.email
    };
    //打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        };
        //读取 users 集合
        db.collection('users', function(err, collection){
            if(err){
                db.close();
                return callback(err);
            };
            //将用户数据插入 users 集合
            collection.insert(user, {safe: true},function(err, user){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    callback(null, user[0]);//成功！err 为 null，并返回存储后的用户文档
                })
        })
    });
};
User.get = function(name, callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err)
        };
        db.collection('users', function(err, collection){
            if(err){
                db.close();
                return callback(err);
            };
            collection.findOne({username: name}, function(err, user){
                db.close();
                if(err){
                    return callback(err)
                }
                callback(null, user);
            })
        })
    })
}
//User.userModel = userModel;
module.exports = User;

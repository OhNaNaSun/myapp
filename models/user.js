var mongodb = require('./mongodb.js');
var Schema = mongodb.mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String
});
//将该Schema发布为Model
var userModel = mongodb.mongoose.model("User", userSchema);//Model:由Schema发布生成的模型，具有抽象属性和行为的数据库操作对

function User(username, password){
    this.username = username;
    this.password = password;
};
User.prototype.save = function(user, callback){
    var user = {
        username: user.username,
        password: user.password
    };
    var newUser = new userModel(user);
    newUser.save(function(err, user){//模型的save方法？find方法
        if(err){
            return callback(err);
        }
        callback(null, user);
    });
}
User.userModel = userModel;
module.exports = User;

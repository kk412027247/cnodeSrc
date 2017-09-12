var mongoose=require('../mongoose_helper').mongoose;



//为数据建立字段和规定字段类型
var UserSchema=new mongoose.Schema({
	username:String,
	pass:String,
	email:String
});

//放在静态的方法里？
UserSchema.statics.getUserBySignupInfo=function(username,email,callback){
	//'$or'操作符，或关系

	var cond={'$or':[{'username':username},{'email':email}]};
	this.find(cond,callback);
}

UserSchema.statics.addUser=function(user,callback){
	this.create(user,callback);
}

UserSchema.statics.getUser=function(username,pass,callback){
	this.findOne({username:username,pass:pass},callback);
}

//用 UserSchema生成数据模型，Schema名字就叫做user
module.exports=mongoose.model('User',UserSchema)
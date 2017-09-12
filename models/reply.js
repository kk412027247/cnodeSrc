var mongoose=require('../mongoose_helper').mongoose;



//为数据建立字段和规定字段类型,等于新加了一组数据
var ReplySchema=new mongoose.Schema({
	topicId:String,
	content:String,
	username:String,
	insertTime:Date
});

//放在静态的方法里,this+增加，查找方法，不知道为什么用this

ReplySchema.statics.addReply=function(reply,callback){
	this.create(reply,callback);
}


ReplySchema.statics.getReply=function(topicId,callback){
	this.find({topicId:topicId},callback);
}



//生成数据模型，名字就叫做user
//如果exports后面没有方法，就用module.export，否则用exports.fn
module.exports=mongoose.model('Reply',ReplySchema)
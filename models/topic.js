var mongoose=require('../mongoose_helper').mongoose;



//为数据建立字段和规定字段类型,等于新加了一组数据
var TopicSchema=new mongoose.Schema({
	title:String,
	content:String,
	tab:String,
	username:String,
	tinserTime:Date
});

//放在静态的方法里,this+增加，查找方法，不知道为什么用this

TopicSchema.statics.addTopic=function(Topic,callback){

	this.create(Topic,callback);
}


TopicSchema.statics.getTopics=function(query,option,callback){
	this.find(query,{},option,callback);
}

TopicSchema.statics.getTopic=function(topicId,callback){
	console.log(new mongoose.Schema==this)
	this.findOne({_id:topicId},callback)
}


//生成数据模型，名字就叫做user
//如果exports后面没有方法，就用module.export，否则用exports.fn
module.exports=mongoose.model('Topic',TopicSchema)
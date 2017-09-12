var validator=require('validator')
var TopicModel=require('../models/topic')
var eventproxy=require('eventproxy')
var ReplyModel=require('../models/reply')

var ep=new eventproxy()



exports.showCreate=function(req,res){
	res.render('topic/create');
}

exports.create=function(req,res){
	//validator去除两端的空格
	var title = validator.trim(req.body.title);
	var tab = validator.trim(req.body.tab);
	var content = validator.trim(req.body.t_content);

	var hasEmptyInfo=[title,tab,content].some(function(item){
		return item==='';
	})
	if(hasEmptyInfo){
		res.status(422);
		return res.render('topic/create',{error:'您填写的信息不完整'})
	}

	console.log(req.session.user.username)

	var topicData={
		title:title,
		content:content,
		tab:tab,
		username:req.session.user.username,
		tinserTime:Date.now()
	}

	TopicModel.addTopic(topicData,function(err,result){
		return res.render('topic/create',{success:'发表成功'})
	})
}

exports.detial=function(req,res){
	var topicId=req.params.tid;
	console.log(topicId)
	TopicModel.getTopic(topicId,function(err,topic){
		ep.emit('topic_data_ok',topic)
	})

	ReplyModel.count({topicId:topicId},function(err,count){
		ep.emit('reply_count_ok',count);
	})

	ReplyModel.getReply(topicId,function(err,replys){
		ep.emit('reply_data_ok',replys)
	})

	ep.all('topic_data_ok','reply_count_ok','reply_data_ok',function(topic,count,replys){
		res.render('topic/detial',{topic:topic,count:count,replys:replys})
	})
}

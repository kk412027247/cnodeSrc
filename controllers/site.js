var topicModel=require('../models/topic');
var _=require('lodash')
var eventproxy=require('eventproxy');

var ep=new eventproxy();

exports.index=function(req,res){
	var page=parseInt(req.query.page)||1;
	page=page>0?page:1;
	var tab=req.query.tab ||'all';
	var query={};
	if(tab!=='all'){
		query.tab=tab;
	}
	var count=10;
	var option={skip:(page-1)*count,limit:count,sort:'-tinserTime'};

	topicModel.getTopics(query,option,function(err,topic){
		_.map(topic)
		ep.emit('topic_data_ok',topic);
	})

	topicModel.count(query,function(err,allCount){
		var pageCount=Math.ceil(allCount/count)
		ep.emit('page_count_ok',pageCount)
	})

	ep.all('topic_data_ok','page_count_ok',function(topic,pageCount){
		res.render('index',{topic:topic,tab:tab,page:page,pageCount:pageCount});
	})

}
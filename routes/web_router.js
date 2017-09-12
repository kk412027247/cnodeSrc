var express = require('express');
var router = express.Router();
var signController=require('../controllers/sign')
var topicController=require('../controllers/topic')
var siteController=require('../controllers/site')
var replyController=require('../controllers/reply')

//引入校验登陆的中间件
var auth=require('../middlewares/auth')


//注册页面
router.get('/signup',signController.showSignup)

//提交注册信息
router.post('/signup',signController.signup)

//显示登陆页面
router.get('/signin',signController.showSignin)


//提交登陆信息
router.post('/signin',signController.signin)


//登出功能
router.get('/signout',signController.signout)

//显示发表话题页面,在处理请求之前，中间件处理一下
router.get('/topic/create',auth.requireLogin,topicController.showCreate)

//处理用户提交的信息
router.post('/topic/create',auth.requireLogin,topicController.create)

//主页显示
router.get('/',siteController.index)

//话题详情显示
router.get('/topic/:tid',topicController.detial)

//处理用户评论
router.post('/reply/reply',auth.requireLogin,replyController.addReply)

//用户上传图片
router.post('/reply/upload',auth.requireLogin,replyController.upload)



module.exports = router;

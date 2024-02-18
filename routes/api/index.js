const chatController = require('../../controller/api/chat_api');
const userController = require('../../controller/api/user_api')

const express = require('express');
const router = express.Router();

const passport = require('passport');



 router.get('/room',chatController.getroom);
 router.get('/user',chatController.getUser);

 router.post('/signup',userController.signup);






module.exports=router;
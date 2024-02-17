const chatController = require('../../controller/api/chat_api')

const express = require('express');
const router = express.Router();



 router.get('/room',chatcontroller.getroom);
 router.get('/user',chatController.getUser);

 


module.exports=router;
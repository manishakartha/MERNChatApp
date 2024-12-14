const express = require('express');//return a method which is stored in express
const app = express();
const authRouter = require('./controllers/authController');
const userRouter = require('./controllers/userController');
const chatRouter = require('./controllers/chatController');
const messageRouter = require('./controllers/messageController');
/*return a object which is stored in app.this app object is going to have
  properties and methods which we can use in order to create backend application like listen() method
  */

  //call router from authController
  app.use(express.json())
  app.use('/api/auth',authRouter);
  app.use('/api/user',userRouter);
  app.use('/api/chat',chatRouter);
  app.use('/api/message',messageRouter);

module.exports = app;
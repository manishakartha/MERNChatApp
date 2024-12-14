const router = require('express').Router();
const Chat = require('./../models/chat');
const authMiddleWear = require('./../middlewear/authMiddlewear')

router.post('/create-new-chat',authMiddleWear, async(req,res)=>{
    try{
        const chat = new Chat(req.body);
        const savedChat = await chat.save();
        res.status(201).send({
            message:"Chat created successfully",
            success:true,
            data:savedChat
        })
    }catch(error){
        res.status(400).send({
            message:error.message,
            success:false
        })
    }
});

router.get('/get-all-chats',authMiddleWear, async(req,res)=>{
    try{
        
        const allChats = await Chat.find({members:{$in:req.body.userId}});
        res.status(200).send({
            message:"Chat fetched successfully",
            success:true,
            data:allChats
        })
    }catch(error){
        res.status(400).send({
            message:error.message,
            success:false
        })
    }
});

module.exports=router;
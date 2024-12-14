const router = require('express').Router();
const Message = require('./../models/message');
const Chat = require('./../models/chat');
const authMiddleWear = require('./../middlewear/authMiddlewear');

router.post('/new-message', authMiddleWear, async (req, res) => {
    try {
        //store message in message collection Database
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save()
        //update the last message in chat collecton

        // const currentChat = await Chat.findById(req.body.chatId);
        // currentChat.lastMessage= savedMessage._id;
        // await currentChat.save();
        const currentChat = await Chat.findOneAndUpdate({
            _id: req.body.chatId
        }, {
            lastMessage: savedMessage._id,
            $inc: { unreadMessageCount: 1 }
        });

        res.status(201).send({
            message: 'Message sent successfully',
            success: true,
            data: savedMessage
        })



    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
});

router.get('/get-all-messages/:chatId', authMiddleWear, async (req, res) => {
    try {
        const allMessages = await Message.find({ chatId: req.params.chatId })
            .sort({ createdAt: 1 });
        res.send({
            message: 'Messages fetched successfully',
            success: true,
            data: allMessages
        })


    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
});
module.exports = router;
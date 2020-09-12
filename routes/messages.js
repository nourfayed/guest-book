const express = require('express');
const messagesModel = require('../models/messages')
const messagesRoute = express.Router();


messagesRoute.get('/', async function (request, response) {
    //show all messages
    try {
        const allMessages = await messagesModel.find({})
        response.json(allMessages)

    } catch (err) {
        response.status(500).json(err);
    }
});
messagesRoute.get('/:id', async function (request, response) {
    try {
    
        const  messageId = request.params.id; 
        const message = await messagesModel.findById(messageId)
        response.json(message)

    } catch (err) {
        response.status(500).json(err);
    }
});
messagesRoute.post('/', async (req, res) => {
    console.log("Add Message To DB");
    const messageData = req.body;
    const msg = new messagesModel(messageData);
    try {
        const savedMsg = await msg.save();
        res.json(savedMsg);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})

messagesRoute.post('/newreply', async (req, res) => {
   
    const messageData = req.body;
    const messageId = messageData.id
    try {
        const message = await messagesModel.findById(messageId)
        message.replies.push({replierEmail:messageData.replierEmail, replyText:messageData.replyText})
        console.log( message.replies);
        const updatedMessage= await messagesModel.findByIdAndUpdate(messageId,message)
        console.log("the updated message is", updatedMessage);
        res.status(200).json(updatedMessage);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})
module.exports = messagesRoute;
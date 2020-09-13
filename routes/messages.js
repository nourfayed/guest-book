const express = require('express');
const messagesModel = require('../models/messages')
const usersModel = require('../models/users')
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
messagesRoute.get('/user/:userId', async function (request, response) {
    try {
        
        const userId = request.params.userId; 
        const user = await usersModel.findById(userId);
        const messages = await messagesModel.find({ownersEmail:user.email});
        response.json(messages)

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
        const updatedMessage = await messagesModel.findByIdAndUpdate(messageId,message,{new: true})
        res.status(200).json(updatedMessage);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})

messagesRoute.post('/edit', async (req, res) => {
   
    const messageData = req.body;
    const messageId = messageData.id
    try {
        const message = await messagesModel.findById(messageId)
        message.messageText = messageData.messageText;
        const updatedMessage = await messagesModel.findByIdAndUpdate(messageId,message,{new: true})
        res.status(200).json(updatedMessage);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})
messagesRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await messagesModel.findByIdAndRemove(id);
      res.json(result);
    } catch (err) {
      res.status(500).json("IS NOT DELETED");
    }
  });
module.exports = messagesRoute;
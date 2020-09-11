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
messagesRoute.post('/', async (req, res) => {
    console.log("Add Message To DB");
    const messageData = req.body;
    const book = new messagesModel(messageData);
    try {
        const savedBook = await book.save();
        res.json(savedBook);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
})
module.exports = messagesRoute;
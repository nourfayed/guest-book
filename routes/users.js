const express = require('express');
const usersModel = require('../models/users')
const usersRoute = express.Router();


usersRoute.post('/register/', async function (request, response) {
    try {
        let userInfo =request.body;
        const newUser = new usersModel(userInfo)
        await newUser.save()
        const token = await newUser.generateAuthToken() 
        response.status(200).json(newUser);

    } catch (err) {
        response.status(500).json(err);
        console.log(err)
    }

});

usersRoute.post('/login', async function (request, response) {
    //login a user 
    try {
        const {email,password}= request.body
        const curUser = await usersModel.findByCredentials(email, password)
       
        if (!curUser) {
            return response.status(400).json({error: 'Wrong email or password!'})
        }
        response.status(200).json(curUser.token)
       
    } catch (err) {
        response.status(500).json(err);
    }

});
usersRoute.get('/',async function (request, response) {
    //show all messages
    try {
        const allMessages = await usersModel.find({})
        response.json(allMessages)

    } catch (err) {
        response.status(500).json(err);
    }
});
usersRoute.get('/:id', async function (request, response) {
    try {
    
        const  userId = request.params.id; 
        const userInfo = await usersModel.findById(userId)
        response.json(userInfo)

    } catch (err) {
        response.status(500).json(err);
    }
});
module.exports = usersRoute;
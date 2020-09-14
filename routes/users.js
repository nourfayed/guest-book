const express = require('express');
const usersModel = require('../models/users')
const usersRoute = express.Router();
const {editToken, separateToken} = require('../middlewares/users')


usersRoute.post('/register/', async function (request, response) {
    try {
        let userInfo =request.body;
        const newUser = new usersModel(userInfo)
        await newUser.save()
        const token = await newUser.generateAuthToken() 
        let encryptedToken = editToken(newUser._id, token);
        response.status(200).json(encryptedToken)
        

    } catch (err) {
        response.status(500).json(err);
        console.log(err)
    }

});

usersRoute.post('/login', async function (request, response) {
    //login a user 
    try {
        const {email,password} = request.body
        const curUser = await usersModel.findByCredentials(email, password)
        if (!curUser) {
            return response.status(400).json({error: 'Wrong email or password!'})
        }
        const token = await curUser.generateAuthToken() 
        let encryptedToken = editToken(curUser._id, token);
        response.status(200).json(encryptedToken)
       
    } catch (err) {
        response.status(500).json(err);
    }

});
usersRoute.post('/logout', async function (request, response) {
    try {
        const {token}=request.body;
        const separtedInfo = separateToken(token);
              
        const id=separtedInfo.id;
        const curtoken=separtedInfo.token;
              
        const curUser = await usersModel.findById(id).exec();       
        
        curUser.token = "";
             
        // let newUser = new usersModel()
        // newUser=curUser
      
        await curUser.save()
        console.log("The user is logged out!");
        
        response.json({msg:"from the server the user is logged out!"})
    } catch (error) {
        response.status(500).json(error);
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

usersRoute.get('/getUser/:token', async function (request, response){
    try {
        
        const token= JSON.parse(request.params.token);
        const separtedInfo = separateToken(token);   
        const userId=separtedInfo.id; 
        const userInfo = await usersModel.findById(userId).exec()
        response.json(userInfo)

    } catch (err) {
        response.status(500).json(err);
    }
})
module.exports = usersRoute;
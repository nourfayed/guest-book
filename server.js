const express = require('express');
const server = express();
const mongoose = require('mongoose');
//const users =require('./routes/users');
const messagesRoute= require('./routes/messages')
const cors = require('cors');

server.use(cors());

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/guest-book',
{
    useNewUrlParser:true,  
    useUnifiedTopology : true
}
,(err)=>{
    if(!err) return console.log("Successfully connected to db");
    console.log(err);
});


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


//server.use('/users/',users)
server.use('/messages/',messagesRoute)

server.listen(8000,() => {
  console.log("server running successfully")});
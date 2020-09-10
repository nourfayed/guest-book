const mongoose = require('mongoose');
const schema = mongoose.Schema

const messagesSchema = new schema({
    messageText:{type : String , required :true},
    senderEmail:{type: String ,required:true, match:/.+@.+\.+/},
    reciverEmail:{type: String ,required:true, match:/.+@.+\.+/},
    //add a timestamp field ?
})

const messagesModel= mongoose.model('messsage',messagesSchema);
module.exports=messagesModel;
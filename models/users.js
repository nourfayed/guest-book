const mongoose = require('mongoose');
const schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usersSchema = new schema({
    firstName:{type : String , required :true},
    lastName:{type :String ,required:true},
    email:{type: String , unique:true , required:true , match:/.+@.+\.+/},
    password:{type: String , required: true},
    token: { type: String}
})
usersSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
usersSchema.methods.generateAuthToken = async function(id) {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, "tokenkey")
    user.token = token
    await user.save()
    return token
}
usersSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await usersModel.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const usersModel = mongoose.model('user',usersSchema);
module.exports = usersModel;
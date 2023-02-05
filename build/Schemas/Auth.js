import mongoose from 'mongoose'

const reg = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
})

const registeringUser = mongoose.model('user', reg)
export default registeringUser;
import mongoose from 'mongoose'

const reg = new mongoose.Schema({
    firstName: {
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
    },
    adress:{
     type: String,
    },
    lastName: {
        type: String,
    },
    visaPic: {
        type: String,
    },
    aboutMe: {
        type: String,
    } ,
    bankName: {
        type: String,
    } ,
    bankAdress: {
        type: String,
    },
    accountNumber: {
        type: String,
    } ,
    institute: {
        type: String,
    },
    degree: {
        type: String,
    },
    year: {
        type: String,
    },
    passportPic: {
        type: String,
    },
})

const registeringUser = mongoose.model('user', reg)
export default registeringUser;
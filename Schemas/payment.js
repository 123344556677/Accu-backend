import mongoose from 'mongoose'

const stripe = new mongoose.Schema({
    tripName: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        required: true
    },

    

})


const registeringPayment = mongoose.model('stripe', stripe)
export default registeringPayment;
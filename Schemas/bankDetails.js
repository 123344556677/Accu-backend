import mongoose from 'mongoose'

const bankDetail= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    iban: {
        type: String,
        required: true
    },

    bic: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    }

})

const addingBankDetails = mongoose.model('bankDetails', bankDetail)
export default addingBankDetails;
import mongoose from 'mongoose'

const aircraft = new mongoose.Schema({
    aircraftOwner:{
        type: String,
        required: true
    },
    aircraftOperator: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    aircraftPic: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }

})

const registeringAircraft = mongoose.model('aircraft', aircraft)

export default registeringAircraft;
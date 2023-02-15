import mongoose from 'mongoose'

const trip = new mongoose.Schema({
    clientId: {
        type: String,

    },
    tripName: {
        type: String,
        
    },
    client: {
        type: String,
        
    },
    fee: {
        type: String,
        
    },
    description: {
        type: String,
        
    },

    percentage: {
        type: String,
      
    },
    destinationTo: {
        type: String,

    },
    destinationFrom: {
        type: String,

    },
    startDate: {
        type: String,

    },
    endDate: {
        type: String,

    },
    hotelType: {
        type: String,

    },
    airlineTravel: {
        type: String,

    },
    aircraftType: {
        type: String,

    },
    selectAircraft: {
        type: String,

    },

    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    crewMembers:[
        {
            crewId:{
                type: String,
            },
            dailyRateCrew: {
                type: String,
            },
           dailyRateClient: {
                type: String,
            },
            perDiemsCrew: {
                type: String,
            },
            perDiemsClient: {
                type: String,
            },
            crewType:{
                type: String,
            }

        }
    ]

})


const registeringTrip = mongoose.model('trip', trip)
export default registeringTrip;
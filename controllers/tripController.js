import registeringTrip from "../Schemas/trip.js";



export const createTrip = async (req, res) => {
    try {

        console.log(req.body);
        const { tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType,
             selectAircraft, hotelType, airlineTravel, clientId} = req.body;
        


        const trip = new registeringTrip({
            tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel ,clientId,
            role: "trip",status:"pending"
        });
       trip.save();

        res.json({ message: "Trip Details added", data: req.body });



    }
    catch (err) {
        console.log("error in adding trip details", err);
        res.json({ message: "server error" })
    }
}
export const getAllTrips = async (req, res) => {
    try {
        const data = await registeringTrip.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const deleteTrip = async (req, res) => {
    try {
        console.log(req.body, "=========>id")
        const id = req.body.e;
        registeringTrip.findByIdAndRemove((id), (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "trip deleted" })
            }
            else {
                res.json({ message: "trip does not exist" })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}

export const TripsByClientId = async (req, res) => {
    try {
        console.log(req.body)
        const clientId = req.body.clientId;


        registeringTrip.find({ clientId: clientId }, (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "User Exist", data: data })
            }
            else {
                res.json({ message: "User not  Exist", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};

export const addCrewToTrips = async (req, res) => {
    try {
        console.log(req.body)
        const tripId = req.body.tripId;
        const val={
            crewName: req.body.crewName,
            dailyRateCrew: req.body.dailyRateCrew,
            dailyRateClient: req.body.dailyRateClient,
            perDiemsCrew: req.body.perDiemsCrew,
            perDiemsClient: req.body.perDiemsClient,

        }

        registeringTrip.findOneAndUpdate({ _id: tripId }, 
            {$push:{crewMembers:val} },{new:true},(err, data) => {
            if (data) {
                console.log(data);
                        res.json({ message: "crew Added", data: data })
                    
            
              
            }
            else {
                res.json({ message: "trip not found", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const updateTripStatus= async (req, res) => {
    try {
        console.log(req.body)
        const tripId = req.body.tripId;
        

        registeringTrip.findOneAndUpdate({ _id: tripId },
            { $set: { status: req.body.status } }, { new: true }, (err, data) => {
                if (data) {
                    console.log(data);
                    res.json({ message: "Trip status updated", data: data })



                }
                else {
                    res.json({ message: "Trip status not updated", data: data })
                }
            })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};


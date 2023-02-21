import registeringUser from "../Schemas/Auth.js";
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
            role: "trip",status:"pending",crewStatus:"pending",payment:"pending",date:Date.now()
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
export const TripsByCrewId = async (req, res) => {
    try {
        console.log(req.body,"----------->crew Id")
        const crewId = req.body.crewId;


        registeringTrip.find({"crewMembers.crewId": crewId }, (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "User Exist", data: data })
            }
            else {
                console.log("user not exist")
                res.json({ message: "User not  Exist", data: data })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error",err:err });
    }

};

export const addCrewToTrips = async (req, res) => {
    try {
        console.log(req.body)
        const tripId = req.body.tripId;
        const crewId = req.body.crewId;
        const val={
            crewId: req.body.crewId,
            dailyRateCrew: req.body.dailyRateCrew,
            dailyRateClient: req.body.dailyRateClient,
            perDiemsCrew: req.body.perDiemsCrew,
            perDiemsClient: req.body.perDiemsClient,
            crewType: req.body.crewType

        }
        const Val=val;
        const fee=req.body.fee;
        const percentage = req.body.percentage;

        registeringUser.findOne({ _id: crewId }, (err, data) => {
            if (data) {
                console.log(data, "==========>crew data")
        registeringTrip.findOneAndUpdate({ _id: tripId }, 
            { $push: { crewMembers: {
                crewId: req.body.crewId,
                dailyRateCrew: req.body.dailyRateCrew,
                dailyRateClient: req.body.dailyRateClient,
                perDiemsCrew: req.body.perDiemsCrew,
                perDiemsClient: req.body.perDiemsClient,
                crewType: req.body.crewType,
                crewName: data.firstName

            } }, fee: fee, percentage: percentage },{new:true},(err, data) => {
            if (data) {
                console.log(data);
                        res.json({ message: "crew Added", data: data })
                console.log("found");
                    
            
              
            }
            else {
                res.json({ message: "trip not found", data: data })
                console.log("not found");
            }
        })
    }
       

else{
                console.log( "==========>crew does not exist")
}
        })
        
    }
    catch (err) {
        res.json({ message: "Server Error" });
        console.log(err);
    }

};
export const updateTripStatus= async (req, res) => {
    try {
        console.log(req.body)
        const tripId = req.body.tripId;
        
if(req.body.crewStatus){
    registeringTrip.findOneAndUpdate({ _id: tripId },
        { $set: { crewStatus: req.body.crewStatus } }, { new: true }, (err, data) => {
            if (data) {
                console.log(data);
                res.json({ message: "Trip status updated", data: data })



            }
            else {
                res.json({ message: "Trip status not updated", data: data })
            }
        })
}
        if (req.body.status) {
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
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};

export const addTripWithCrew= async (req, res) => {
    try {

        console.log(req.body,"========>with crew");
        const { tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType,
            selectAircraft, hotelType, airlineTravel, clientId,crewId,
             dailyRateCrew,
             dailyRateClient,
             perDiemsCrew,
            perDiemsClient,crewType} = req.body;

        registeringUser.findOne({ _id:crewId }, (err, data) => {
            console.log(req.body);
            if (data) {
                console.log(data,"==========>crew data")
                const trip = new registeringTrip({
                    tripName, client, fee,
                    percentage, description, destinationTo, destinationFrom,
                    startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel, clientId,
                    role: "trip", status: "pending", crewStatus: "pending", payment: "pending", crewMembers: [
                        {
                            crewId: crewId,
                            dailyRateCrew: dailyRateCrew,
                            dailyRateClient: dailyRateClient,
                            perDiemsCrew: perDiemsCrew,
                            perDiemsClient: perDiemsClient,
                            crewType: crewType,
                            crewName:data.firstName
                }

                    ]
                });
                trip.save();

                res.json({ message: "Trip Details added", data: req.body });
            }
            else{
                console.log("Crew does not exist");
            }
        }
        )



        



    }
    catch (err) {
        console.log("error in adding trip details", err);
        res.json({ message: "server error" })
    }

};


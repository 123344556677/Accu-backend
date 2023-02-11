import registeringTrip from "../Schemas/trip.js";



export const createTrip = async (req, res) => {
    try {

        console.log(req.body);
        const { tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel } = req.body;
        


        const trip = new registeringTrip({
            tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel ,
            role: "trip"
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
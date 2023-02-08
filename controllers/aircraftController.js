import registeringAircraft from "../Schemas/aircraft.js";



export const createAircraft = async (req, res) => {
    try {

        console.log(req.body);
        const { aircraftOwner, aircraftOperator, type, 
            registrationNumber} = req.body.values;
        const {aircraftPic}=req.body;

        
        const aircraft = new registeringAircraft({
            aircraftOwner, aircraftOperator, type,
            registrationNumber, aircraftPic,
            role:"aircraft"
        });
        aircraft.save();

        res.json({ message: "Aircraft Details added", data: req.body });



    }
    catch (err) {
        console.log("error in adding aircraft details", err);
        res.json({ message: "server error" })
    }
}

export const getAllAircrafts = async (req, res) => {
    try {
        const data = await registeringAircraft.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
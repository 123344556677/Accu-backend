import registeringCrew from "../Schemas/crew.js";

export const createCrew= async (req, res) => {
    try {


        const { firstName, lastName, phoneNumber, email, bank } = req.body;
        registeringCrew.findOne({ email: email }, (err, data) => {

            if (data) {
                console.log(req.body)
                res.json({ message: "Email already exist" });
            }
            else {
                console.log(req.body);
                const crew = new registeringCrew({ firstName,
                     lastName, phoneNumber,
                      email,
                     bank,
                     role:"crew" });
                crew.save();

                res.json({ message: "crew member created", data: req.body });
            }
        })

    }
    catch (err) {
        console.log("error in creating crew member", err);
        res.json({ message: "server error" })
    }
}

export const getAllCrews = async (req, res) => {
    try {
        const data = await registeringCrew.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const deleteCrew = async (req, res) => {
    try {
        console.log(req.body, "=========>id")
        const id = req.body.e;
        registeringCrew.findByIdAndRemove((id), (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "crew deleted" })
            }
            else {
                res.json({ message: "crew does not exist" })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const getCrewByName = async (req, res) => {
    try {


        const { firstName } = req.body;
        registeringCrew.findOne({ firstName: firstName }, (err, data) => {

            if (data) {
                console.log(req.body)
                res.json({ message: "crew member found",data:data });
            }
            else {
               
                res.json({ message: "crew member not registered", data: req.body });
            }
        })

    }
    catch (err) {
        console.log("error in registering data", err);
        res.status(404).json({ message: "sever error" })
    }
}
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
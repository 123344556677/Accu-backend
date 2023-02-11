import registeringClient from '../Schemas/client.js';


export const createClient = async (req, res) => {
    try {


        const { firstName, lastName, phoneNumber, email, registrationNumber } = req.body;
        registeringClient.findOne({ email: email }, (err, data) => {

            if (data) {
                console.log(req.body)
                res.json({ message: "Email already exist" });
            }
            else {
                console.log(req.body);
                const client = new registeringClient({ firstName, 
                    lastName,
                     phoneNumber, 
                     email, 
                     registrationNumber ,
                     role:"client"});
                client.save();
               
                res.json({ message: "client created", data: req.body });
            }
        })

    }
    catch (err) {
        console.log("error in creating client", err);
        res.json({ message: "server error" })
    }
}
export const getAllClients = async (req, res) => {
    try {
        const data = await registeringClient.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
export const deleteClient = async (req, res) => {
    try {
        console.log(req.body,"=========>id")
        const id = req.body.e;
        registeringClient.findByIdAndRemove( (id) , (err, data) => {
                if (data) {
                    console.log(data)
                    res.json({ message: "client deleted" })
                }
                else {
                    res.json({ message: "client does not exist" })
                }
            })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
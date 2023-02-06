import addingBankDetails from "../Schemas/bankDetails.js";

export const addBankDetails = async (req, res) => {
    try {


        const { title,bank,accountNumber,iban,bic,address} = req.body;
       
                console.log(req.body);
                const bankDetails = new addingBankDetails({
                    title, bank, accountNumber, iban, bic, address
                });
                bankDetails.save();

                res.json({ message: "Details added", data: req.body });
            
        

    }
    catch (err) {
        console.log("error in adding details", err);
        res.json({ message: "server error" })
    }
}

export const getAllDetails= async (req, res) => {
    try {
        const data = await addingBankDetails.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
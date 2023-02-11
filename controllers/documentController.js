import addingDocument from '../Schemas/document.js';


export const addDocument = async (req, res) => {
    try {

console.log(req.body,"=========>body");
        
        const documentPic = req.body.documentPic;
        const title = req.body.title;
            const document = new addingDocument({
                    documentPic,
                    role: "document",
                    title
                });
            document.save();

                res.json({ message: "document created", data: req.body });
            
       

    }
    catch (err) {
        console.log("error in dding document", err);
        res.json({ message: "server error" })
    }
}

export const getAllDocuments = async (req, res) => {
    try {
        const data = await addingDocument.find({})
        res.json(data);
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }
}
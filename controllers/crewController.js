import registeringCrew from "../Schemas/crew.js";
import nodemailer from 'nodemailer';
export const createCrew= async (req, res) => {
    try {


        const { firstName, lastName, phoneNumber, email, bank } = req.body;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "hananabdul659@gmail.com",
                pass: "nhpiqnxdeiwmaxdw",
            },
        });
       


        var mailOptions = {
            from: "connect@kallendly.com",
            to: email,
            subject: "Register",
            html:
                "<h3>Hello!</h3>" +
                "<p>You are receiving this email to signup for crew account.</p>" +
                `<a href=" http://accusign.zeeshou.com/register"  style="background-color:black; margin-top:10px;
           margin-bottom:10px margin-left:30px; color:white; padding:6px; border-radius: 2px;"  >
          Register</a>` +
                "<p>If you don't, no further action is required.</p>" +
                "<p>Regards,</p>" +
                "<p>Accu Sign</p>",
            text: "That was easy!",
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({ message: "Email not Sent" });
            } else {
                console.log("Email sent: " + info.response);
                res.json({ message: "Email Sent" });
            }
        });

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
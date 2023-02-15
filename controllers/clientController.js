import registeringClient from '../Schemas/client.js';
import nodemailer from 'nodemailer';

export const createClient = async (req, res) => {
    console.log(req.body);
    try {

         
        const { firstName, lastName, phoneNumber, email, registrationNumber } = req.body;
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
                "<p>You are receiving this email to signup for client account.</p>" +
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
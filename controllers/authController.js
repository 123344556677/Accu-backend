import bcrypt from 'bcryptjs'
import registeringUser from '../Schemas/Auth.js';
import nodemailer from 'nodemailer';
import OAuth2Client from 'google-auth-library';





export const register = async (req, res) => {
    try {
        
        
        const { firstName,email,password,phoneNumber } = req.body.values;
        const {role}=req.body;
        registeringUser.findOne({ email: email }, (err, data) => {

            if(data){
                console.log(req.body)
                res.json({ message: "Email already exist"});
            }
            else{
                var salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                const register = new registeringUser({ firstName, email, hashPassword, phoneNumber, role });
                register.save();
                console.log(req.body);
                res.status(200).json({ message: "user registered", data: req.body });
            }
        })
        
    }
    catch (err) {
        console.log("error in registering data", err);
        res.status(404).json({message:"sever error"})
    }
}

export const login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body
        registeringUser.findOne({ email: email }, (err, data) => {
            
            
            
             if (data) {
                 const pass = bcrypt.compareSync(password, data.hashPassword)
                 console.log(pass);
                if (pass) {
                    
                    res.json({ message: "Login Successfull",data:data })
                }
                else {
                    res.json({ message: "incorrect password" })
                }
            }
            else {
                res.json({ message: "user not registered" })
            }
        })

 }
    catch (err) {
        res.json({ message: "server error" })
        console.log("error in login", err)
    }
}


export const getAllUsers=async(req,res)=>{
    try {
        const data = await registeringUser.find({})
        res.json(data);
    }
    catch (err) {
        res.json({message:"Server Error"});
    }
}
export const getUsersById = async (req, res) => {
    try{
        console.log(req.body)
    const id=req.body.id;
    
    
registeringUser.findOne({_id:id},(err,data)=>{
if(data){
    res.json({ message: "User Exist", data: data })
}
else{
    res.json({ message: "User not  Exist", data: data })
}
    })
}
catch(err){
        res.json({ message: "Server Error" });
}
       
};
export const forgetPassword = async (req, res) => {
    try {
        console.log(req.body)
       
        const salt = bcrypt.genSaltSync(10);
        registeringUser.findOneAndUpdate({ email:req.body.email }, 
        {$set: { hashPassword: bcrypt.hashSync(req.body.password, salt) }},
        {new:true}, (err, data) => {
            if (data) {
                console.log(data)
                res.json({ message: "password updated" })
            }
            else {
                res.json({ message: "user does not exist" })
            }
        })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};
export const updateUser= async (req, res) => {
    try {
        console.log(req.body)
        const id=req.body.id;
      registeringUser.findOneAndUpdate({ _id: id },
            { $set:req.body },
            { new: true }, (err, data) => {
                if (data) {
                    console.log(data)
                    res.json({ message: "user updated " })
                }
                else {
                    res.json({ message: "user does not exist" })
                }
            })
    }
    catch (err) {
        res.json({ message: "Server Error" });
    }

};

export const forgetLink = async (req, res) => {
    try {
        registeringUser.findOne({ email: req.body.email }, (err, data) => {
            console.log(req.body);
            if (data) {
                //   try {
                var transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "hananabdul659@gmail.com",
                        pass: "nhpiqnxdeiwmaxdw",
                    },
                });
                let email = data.email;
            

                var mailOptions = {
                    from: "connect@kallendly.com",
                    to: email,
                    subject: "Password reset",
                    html:
                        "<h3>Hello!</h3>" +
                        "<p>You are receiving this email because we received a password reset request for your account.</p>" +
                        `<a href=" http://accusign.zeeshou.com/auth/forgetPassword/${email}"  style="background-color:black; margin-top:10px;
           margin-bottom:10px margin-left:30px; color:white; padding:6px; border-radius: 2px;"  >
          Reset password</a>` +
                        "<p>If you did not request a password reset, no further action is required.</p>" +
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
            } else {
                 res.json({ message: "Email not exist" });
            }
        });
    } catch (err) {
        return res.json({ message: "Network Error" });
    }

};
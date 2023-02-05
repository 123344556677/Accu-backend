import bcrypt from 'bcryptjs'
import registeringUser from '../Schemas/Auth.js';


export const register = async (req, res) => {
    try {
        
        
        const { name,email,password,phoneNumber,role } = req.body;
        registeringUser.findOne({ email: email }, (err, data) => {

            if(data){
                console.log(req.body)
                res.json({ message: "Email already exist"});
            }
            else{
                var salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                const register = new registeringUser({ name, email, hashPassword, phoneNumber, role });
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
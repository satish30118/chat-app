const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const genrateToken = require("../db/genrateToken")
const Login = async(req,res)=>{

    try{
        //getting value by destruring
        const {email, password} = req.body;
    
        //validation for empty data
       
        const userLogin = await User.findOne({email});
        if(userLogin){
            const isPassMatch = await bcrypt.compare(password,userLogin.password);
                        
            if(isPassMatch){
                return res.status(200).json({
                    message:"Login successful!!",
                    _id : userLogin._id,
                    name : userLogin.name,
                    email : userLogin.email,
                    token:genrateToken(userLogin._id),
            });
            }else{
                return res.status(400).json("Invalide Creational");
            }
        }else{
            return res.status(422).json("User have not registered");
        }

    
}catch(err){console.log(err)};

};


module.exports = Login;
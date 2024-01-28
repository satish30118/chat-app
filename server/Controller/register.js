const User = require("../Model/userModel");
const genrateToken = require("../db/genrateToken")

const Register = async (req,res)=>{
    try{
    const {name, email, work, password} = req.body;

 
    const userExist = await User.findOne({email:email})
    
     if(userExist){
         return res.status(422).json("Email Already Exist");
     }
 
     // const user = new User(req.body)
     //user creation
     const user = new User({name, email, work, password})
     
     const registerUser = await user.save();
     if(registerUser){
         return res.status(200).json({
            msg:"user registered successfuly",
            _id : user._id,
            name : user.name,
            email : user.email,
            token:genrateToken(user._id),
        })
     }
    }catch(err){
        console.log(err);
    }
}
 
 module.exports = Register;
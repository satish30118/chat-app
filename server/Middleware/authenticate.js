const jwt = require("jsonwebtoken");
const User =require("../Model/userModel");

const authenticate = async(req,res,next) =>{

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
    try {
        token = req.headers.authorization.split(" ")[1];
      
     //verify token
        const verifyToken = jwt.verify(token,process.env.JWT_TOKEN);
        req.user = await User.findById(verifyToken.id).select("-password");

        next();
    } catch (error) {
        res.status(401).send("Unauthorized: No token provided");
        console.log(error);
        
    }
}else{
    res.status(401).send("Unauthorized: No token provided");
}
}

module.exports = authenticate;
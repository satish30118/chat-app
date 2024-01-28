const jwt = require("jsonwebtoken");

const genrateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_TOKEN,{
        expiresIn:"10d",
    });
}

module.exports = genrateToken;
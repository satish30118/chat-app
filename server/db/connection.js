const mongoose = require("mongoose");
const dataBase = process.env.DATA_BASE;
mongoose.connect(dataBase,{
    family:4,
}).then(()=>{
    console.log("Connection Sucess!!")
}).catch((err)=>{
    console.log(err)
})
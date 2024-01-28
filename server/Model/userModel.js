const mongoose = require("mongoose");
// import userpic from "./userpic.jpg"
const bcrypt = require("bcryptjs");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    work: String,
    password: String,
    pic: {
      type: String,
      default:"userpic",
    },
  },
  {
    timestamps: true,
  }
);

userModel.pre("save",async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const User = new mongoose.model("User",userModel);
module.exports = User;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    password : String,
    dob: Date,
    email : String
});

userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = bcrypt.hash(this.password,salt);
    next();
});
const User = mongoose.model("User",userSchema);
module.exports = User;
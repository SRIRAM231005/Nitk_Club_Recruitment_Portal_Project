const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    userRole:{
        type:String,
    },
    password:{
        type:String,
    }
},{timestamps: true});

const userDetails = mongoose.model("userdetail", UserSchema);

module.exports = userDetails
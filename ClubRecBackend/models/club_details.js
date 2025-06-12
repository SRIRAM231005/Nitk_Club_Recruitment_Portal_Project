const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    clubName:{
        type:String,
    },
    imageURL:{
        type:String,
    },
    clubType:{
        type:String,
    },
    rounds:{
        type:String,
    },
    clubSigs:{
        type:[String],
    },
    password:{
        type:String,
    }
},{timestamps: true});

const clubDetails = mongoose.model("detail", UserSchema);

module.exports = clubDetails
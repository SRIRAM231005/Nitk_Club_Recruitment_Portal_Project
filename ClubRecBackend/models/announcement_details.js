const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    clubName:{
        type:String,
    },
    clubSigName:{
        type:String,
    },
    description:{
        type:String,
    },
    links:{
        type:String,
    },
    Dates:{
        type:Date,
    }
},{timestamps: true});

const AnnouncementDetails = mongoose.model("announcement", UserSchema);

module.exports = AnnouncementDetails 
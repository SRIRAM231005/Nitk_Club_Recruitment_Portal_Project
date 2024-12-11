const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    clubName:{
        type:String,
    },
    clubSigName:{
        type:String,
    },
    Dates:{
        type:[Date],
    },
},{timestamps: true});

const scheduleDetails = mongoose.model("schedule", UserSchema);

module.exports = scheduleDetails
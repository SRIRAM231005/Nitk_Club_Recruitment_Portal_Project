const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    sigPreference:{
        type:[String],
    }
},{timestamps: true});

const sigPrefDetails = mongoose.model("sigprefdetail", UserSchema);

module.exports = sigPrefDetails
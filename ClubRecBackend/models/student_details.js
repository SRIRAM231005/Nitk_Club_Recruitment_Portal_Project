const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    clubName:{
        type:String,
    },
    clubSigs:[{
        clubSigName:{
            type:String,
        },
        studentList:[{
            username: {
                type: String,
                required: true
            },
            rollnum:{
                type: String,
            },
            email: {
                type: String,
                required: true,
            },
            phoneNum:{
                type: Number,
                required: true,
            },
            questionans:{
                type:[String],
            },
            DateAndTime:{
                type:[Date],
            },
            Interviewer:{
                type:String,
            },
            Round:{
                type:Number,
                default:0
            },
            Status:{
                type:String,
            }
        }],
        sigDescription:{
            type:String,
        },
        sigQuestions:{
            type:[String],
        }
    }],
    description:{
        type:String,
    },
    questions:{
        type:[String],
    }
},{timestamps: true});

const regDetails = mongoose.model("regdetail", UserSchema);

module.exports = regDetails
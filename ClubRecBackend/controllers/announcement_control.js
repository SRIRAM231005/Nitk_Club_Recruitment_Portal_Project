const AnnouncementDetails = require('../models/announcement_details');
const regDetails = require('../models/student_details');
const sigPrefDetails = require('../models/sigPreference_details');
const scheduleDetails = require('../models/schedule_details');


async function GetAnnouncement(req , res){
    const annDetails = await AnnouncementDetails.find({});
    if(!annDetails){
        return resizeBy.json({message: "no announcement"});
    }else{
        return res.json(annDetails);
    }
}

async function GetRegForm(req , res){
    const forDetails = await regDetails.find({});
    if(!forDetails){
        return resizeBy.json({message: "no registration form"});
    }else{
        return res.json(forDetails);
    }
}

async function SetStudentData(req , res){
    const {clubName,selectedSigs,group1} = req.body;
    let recDetails;
    for(let i=0; i<selectedSigs.length; i++){
        recDetails = await regDetails.findOneAndUpdate(
            { clubName: clubName, 'clubSigs.clubSigName': selectedSigs[i] },
            { $push: { 'clubSigs.$.studentList': group1 } },  // Update only group1 (index 0)
            { new: true }
        );
    }  
    if(!recDetails){
        return res.json({message: "no student data"});
    }else{
        return res.json({message: "done"});
    }
}

async function SetSigPreference(req , res){
    const { username,email,sigPreferenceArr} = req.body;
    let prefDetails = await sigPrefDetails.create({
        username: username,
        email: email,
        sigPreference: sigPreferenceArr
    })
    if(!prefDetails){
        return res.json({message: "Not done"});
    }else{
        return res.json({message: "done"});
    }
}


async function Calender(req , res){
    const calenderDetails = await scheduleDetails.find({});
    if(!calenderDetails){
        return resizeBy.json({message: "no announcement"});
    }else{
        return res.json(calenderDetails);
    }
}


module.exports ={
    GetAnnouncement,
    GetRegForm,
    SetStudentData,
    SetSigPreference,
    Calender
}
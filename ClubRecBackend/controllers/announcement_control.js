const AnnouncementDetails = require('../models/announcement_details');
const regDetails = require('../models/student_details');
const sigPrefDetails = require('../models/sigPreference_details');
const scheduleDetails = require('../models/schedule_details');


async function GetAnnouncement(req , res){
    const annDetails = await AnnouncementDetails.find({});
    if(!annDetails){
        return res.json({message: "no announcement"});
    }else{
        return res.json(annDetails);
    }
}

async function GetRegForm(req , res){
    const forDetails = await regDetails.find({});
    if(!forDetails){
        return res.json({message: "no registration form"});
    }else{
        return res.json(forDetails);
    }
}

async function SetStudentData(req , res){
    const {clubName,selectedSigs,group1} = req.body;
    let recDetails;
    for(let i=0; i<selectedSigs.length; i++){
        if(selectedSigs[i] === ""){
            break;
        }
        recDetails = await regDetails.findOneAndUpdate(
            { clubName: clubName, 'clubSigs.clubSigName': selectedSigs[i] },
            { $push: { 'clubSigs.$.studentList': group1 } },  // Update only group1 (index 0)
            { new: true }
        );
    }  
    if(!recDetails){
        return res.status(404).json({message: "no student data"});
    }else{
        return res.json({message: "done"});
    }
}

async function SetStudentAssingmentData(req , res){
    const {clubName,sigName,email,ans} = req.body;

    const doc = await regDetails.findOne({
        clubName,
        'clubSigs.clubSigName': sigName,
        'clubSigs.studentList.email': email
    });

    if (!doc) {
        return res.status(404).json({ message: "No data found" });
    }

    const recDetails = await regDetails.updateOne(
        { clubName },
        {
            $push: {
                "clubSigs.$[sig].studentList.$[stu].questionans": { $each: ans }
            }
        },
        {
            arrayFilters: [
                { "sig.clubSigName": sigName },
                { "stu.email": email }
            ]
        }
    );

    return res.json({ message: "done" });
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
        return res.json({message: "no announcement"});
    }else{
        return res.json(calenderDetails);
    }
}


module.exports ={
    GetAnnouncement,
    GetRegForm,
    SetStudentData,
    SetStudentAssingmentData,
    SetSigPreference,
    Calender
}
const clubDetails = require('../models/club_details');
const scheduleDetails = require('../models/schedule_details');
const AnnouncementDetails = require('../models/announcement_details');
const regDetails = require('../models/student_details');
const sigprefdetail = require('../models/sigPreference_details');
const bcrypt = require('bcrypt');

//Function to post details of club
async function RegisterDetails(req , res){
    const { clubName, imageURL, clubType, rounds, clubSigs, password } = req.body;

    if (!clubName || !imageURL || !clubType || !rounds || !clubSigs || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }
    
    const plainPassword = password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    
    let clubSigArray = req.body.clubSigs.split(',');
    const club = await clubDetails.create({
        clubName : clubName,
        imageURL : imageURL,
        clubType: clubType,
        rounds : rounds,
        clubSigs : clubSigs,
        password: hashedPassword,
    });

    for (let i=0; i<clubSigArray.length; i++){
        await scheduleDetails.create({
            clubName : req.body.clubName,
            clubSigName: clubSigArray[i]
        })
    }    
    let formattedClubSigsArray = clubSigArray.map(sig => ({
        clubSigName: sig,
        studentList: [] 
    })); 
        await regDetails.findOneAndUpdate(
            {clubName : req.body.clubName},
            { 
                $set: { clubSigs: formattedClubSigsArray},
            },
            { new: true, upsert: true } 
        )


    return res.json({clubName: club.clubName ,imageURL: club.imageURL, rounds: club.rounds, clubSigs: club.clubSigs});
}

//Function to ckeck Login Details
async function Login(req , res){
    const { clubName, password } = req.body;
    const det = await clubDetails.findOne({ clubName: clubName });

    if(!det){
        return res.status(400).json({message: "Invalid Club Name or Password"});
    }
    
    const isMatch = await bcrypt.compare(password, det.password);
    if(!isMatch){
        return res.status(409).json({message: "Invalid Club Name or Password"});
    }

    return res.json({clubName: det.clubName ,imageURL: det.imageURL, rounds: det.rounds, clubSigs: det.clubSigs});
}

//Function to get Details of Schedules
async function GetDetails(req , res){
    const {clubName,clubSigs} = req.body;
    const ref = await scheduleDetails.findOne({clubName: clubName , clubSigName: clubSigs});
    if(!ref){
        return res.json({message: "Invalid"});
    }else{
        return res.json({clubSigName: ref.clubSigName , Dates: ref.Dates});
    }
}

//Function to update the Schedules
async function SetDates(req , res){
    const { clubName,clubSigName, Dates } = req.body;
    const date = await scheduleDetails.findOneAndUpdate(
        {clubName: clubName,clubSigName : clubSigName},
        { $set : {Dates : Dates}},
        {new: true}
    );
    
    if(!date){
        return res.json({message: "Invalid Club Sig Name"});
    }else{
        return res.json({Dates: date.Dates});
    }
}

//Function to add announcement Details
async function SetAnnounce(req , res){
    const {clubName,clubSigName,description,links,Dates} = req.body;
    const announce = await AnnouncementDetails.create({
        clubName: clubName,
        clubSigName: clubSigName,
        description: description,
        links: links,
        Dates: Dates
    })
    return res.json({message:"done"});
}

//Function to post Registration Form
async function GetReg(req , res){
    const { clubName, clubSigs } = req.body;
    await regDetails.create({
        clubName: clubName,
        clubSigs: clubSigs
    })
    return res.json({message:"done"});
}

//Function to update the description of Registration Form
async function SetRegForm(req , res){
    const {clubName,formType,description,questions} = req.body;
    if(formType == 'general'){
        await regDetails.findOneAndUpdate(
            {clubName: clubName},
            { $set : {description: description , questions: questions}}
        );
        return res.json({message:"done"});
    }else{
        const result = await regDetails.findOneAndUpdate(
            { clubName },
            {
              $set: {
                "clubSigs.$[elem].sigQuestions": questions,
                "clubSigs.$[elem].sigDescription": description
              }
            },
            {
              arrayFilters: [{ "elem.clubSigName": formType }],
              new: true
            }
        );
        return res.json({message:"done"});
    }
}

//Function to get details of every student who have registered
async function GetStudentsDetails(req , res){
    const {clubName} = req.body;
    const studDet = await regDetails.findOne({clubName: clubName});
    if(! studDet){
        return res.json({message: "Invalid Club Name"});
    }else{
        return res.json({clubName: studDet.clubName , clubSigs: studDet.clubSigs});   
    }
}

async function SetInterview(req , res){
    const {clubName,sigName,username,dateTime,interviewer } = req.body;
    const studDet = await regDetails.findOneAndUpdate({
        clubName: clubName,
        "clubSigs.clubSigName": sigName,         // Access nested array element
        "clubSigs.studentList.username": username 
    },
    {
        $set: {
          "clubSigs.$[sig].studentList.$[student].DateAndTime": dateTime,
          "clubSigs.$[sig].studentList.$[student].Interviewer": interviewer
        }
      },
      {
        arrayFilters: [
          { "sig.clubSigName": sigName },          // Filter for correct clubSig
          { "student.username": username }         // Filter for correct student
        ],
        new: true                                  // Return updated document
      });

      return res.json({ message: "Interview details updated successfully", data: dateTime , int: interviewer});
}


async function SetSelection(req , res){
    const {clubName,sigName,username,Round } = req.body;
    const studDet = await regDetails.findOneAndUpdate({
        clubName: clubName,
        "clubSigs.clubSigName": sigName,         // Access nested array element
        "clubSigs.studentList.username": username 
    },
    {
        $set: {
          "clubSigs.$[sig].studentList.$[student].Round": Round,
        }
      },
      {
        arrayFilters: [
          { "sig.clubSigName": sigName },          // Filter for correct clubSig
          { "student.username": username }         // Filter for correct student
        ],
        new: true                                  // Return updated document
      });

      return res.json({ message: "Interview details updated successfully", round: Round});
}


//Function to set details of selected students in Round1
async function SetSelectedStudentData1(req , res){
    const {clubName,clubSigName,group1} = req.body;
    let recDetails;
        recDetails = await regDetails.findOneAndUpdate(
            { clubName: clubName, 'clubSigs.clubSigName': clubSigName },
            { $push: { 'clubSigs.$.studentList.1': group1 } },  // Update only group1 (index 1)
            { new: true }
        );
    if(!recDetails){
        return res.json({message: "no student data"});
    }else{
        return res.json({message: "done"});
    }
}

//Function to set details of selected students in Round2
async function SetSelectedStudentData2(req , res){
    const {clubName,clubSigName,group1} = req.body;
    let recDetails;
        recDetails = await regDetails.findOneAndUpdate(
            { clubName: clubName, 'clubSigs.clubSigName': clubSigName },
            { $push: { 'clubSigs.$.studentList.2': group1 } },  // Update only group1 (index 1)
            { new: true }
        );
    if(!recDetails){
        return res.json({message: "no student data"});
    }else{
        return res.json({message: "done"});
    }
}

async function CheckPreference(req , res){
    const {username} = req.body;
    const studDet = await sigprefdetail.findOne({
        username: username,
    });

    return res.json(studDet);
}


module.exports = {
    RegisterDetails,
    Login,
    GetDetails,
    SetDates,
    SetAnnounce,
    GetReg,
    SetRegForm,
    GetStudentsDetails,
    SetSelectedStudentData1,
    SetSelectedStudentData2,
    SetInterview,
    SetSelection,
    CheckPreference
}
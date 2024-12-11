const clubDetails = require('../models/club_details');
const adminDetails = require('../models/admin_details');

async function DisplayClubs(req , res){
    const clubDetail = await clubDetails.find({}, { password: 0 });
    if(!clubDetail){
        return resizeBy.json({message: "no clubs"});
    }else{
        return res.json(clubDetail);
    }
}

async function PostDescription(req , res){
    const {Description} = req.body;
    const admin = await adminDetails.create({
        description: Description
    })
    return res.json(admin);
}

async function PostPreferenceOrder(req , res){
    const {username,email,preferenceOrder} = req.body;
    let group1 = {username: username , email: email , preferenceOrder: preferenceOrder};
    const admin = await adminDetails.updateOne(
        {},
        { $push: { 'StudentList': group1 } },
    )
    return res.json({message:"done"});
}

async function GetForm(req , res){
    const admin = await adminDetails.find({});
    return res.json({description: admin[0].description});
}

module.exports = {
    PostPreferenceOrder,
    DisplayClubs,
    PostDescription,
    GetForm
}
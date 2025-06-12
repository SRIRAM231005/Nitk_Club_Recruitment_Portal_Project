const userDetails = require('../models/user_details');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function userRegister(req , res) {
    const { username, email, userRole, password } = req.body;
    const existingUser = await userDetails.findOne({ email: email });
    if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
    }

    const plainPassword = password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    const user = await userDetails.create({
        username: username,
        email: email,
        userRole: userRole,
        password: hashedPassword
    })

    return res.json({username: user.username , email: user.email , userRole: user.userRole});
}

async function emailUniquenessCheck(req, res){
    const { email } = req.body;
    const user = await userDetails.findOne({email: email});
    if(user){
        return res.status(409).json({message: "Email already exists"});
    }else{
        return res.json({message: "Email is unique"});
    }
}

async function userLogin(req , res) {
    const { email, password } = req.body;
    const user = await userDetails.findOne({email: email});

    if(!user){
        return res.status(409).json({message: "Invalid username or password"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(409).json({message: "Invalid username or password"});
    }

    const token = jwt.sign(
        { userId: user._id, username: user.username, userRole: user.userRole },
        process.env.JWT_SECRET_KEY, 
        { expiresIn: '6h' } 
    );

    return res.json({username: user.username , email: user.email , userRole: user.userRole , token: token});
}

async function userLogout(req , res) {
    const {username} = req.body;
    const user = await userDetails.findOneAndDelete({username: username});
    return res.json({message: "logout successful"});
}

module.exports = {
    userRegister,
    emailUniquenessCheck,
    userLogin,
    userLogout
}
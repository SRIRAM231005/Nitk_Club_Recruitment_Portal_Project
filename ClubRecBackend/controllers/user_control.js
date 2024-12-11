const userDetails = require('../models/user_details');
require('dotenv').config();
const jwt = require('jsonwebtoken');


async function userRegister(req , res) {
    const { username, email, userRole, password } = req.body;
    const user = await userDetails.create({
        username: username,
        email: email,
        userRole: userRole,
        password: password
    })

    return res.json({username: user.username , email: user.email , userRole: user.userRole});
}

async function userLogin(req , res) {
    const { username, password } = req.body;
    const user = await userDetails.findOne({username: username , password: password});

    if(!user){
        return res.json({message: "Invalid username or password"});
    }

    const token = jwt.sign(
        { userId: user._id, username: user.username, userRole: user.userRole },
        process.env.JWT_SECRET_KEY, // JWT Secret Key
        { expiresIn: '6h' } // Token expiry time
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
    userLogin,
    userLogout
}
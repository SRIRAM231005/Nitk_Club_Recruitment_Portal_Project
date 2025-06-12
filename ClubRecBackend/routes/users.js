const express = require("express");
const {userRegister,emailUniquenessCheck,userLogin,userLogout} = require('../controllers/user_control');

const userRouter = express.Router();

userRouter.route('/register').post(userRegister);
userRouter.route('/emailcheck').post(emailUniquenessCheck);
userRouter.route('/login').post(userLogin);
userRouter.route('/logout').delete(userLogout);

module.exports = userRouter
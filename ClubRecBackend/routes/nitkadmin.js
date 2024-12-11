const express = require("express");
const {PostPreferenceOrder,DisplayClubs,PostDescription,GetForm} = require('../controllers/admin_control');

const adminRouter = express.Router();

adminRouter.route('/details').patch(PostPreferenceOrder);
adminRouter.route('/displayclubs').get(DisplayClubs);
adminRouter.route('/description').post(PostDescription);
adminRouter.route('/getform').get(GetForm);

module.exports = adminRouter

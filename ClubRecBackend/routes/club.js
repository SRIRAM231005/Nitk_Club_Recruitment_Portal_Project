const express = require("express");
const {RegisterDetails,Login,GetDetails,SetDates,SetAnnounce,GetReg,SetRegForm,GetStudentsDetails,SetSelectedStudentData1,SetSelectedStudentData2,SetInterview,SetSelection,CheckPreference} = require('../controllers/club_control');

const clubRouter = express.Router();

clubRouter.route('/register').post(RegisterDetails);
clubRouter.route('/login').post(Login);
clubRouter.route('/getDet').post(GetDetails);
clubRouter.route('/setdates').patch(SetDates);
clubRouter.route('/studdet').post(GetStudentsDetails);
clubRouter.route('/selectstd1').patch(SetSelectedStudentData1);
clubRouter.route('/selectstd2').patch(SetSelectedStudentData2);
clubRouter.route('/setann').post(SetAnnounce);
clubRouter.route('/getreg').post(GetReg);
clubRouter.route('/setreg').patch(SetRegForm);
clubRouter.route('/setint').patch(SetInterview);
clubRouter.route('/setselect').patch(SetSelection);
clubRouter.route('/checksigpref').post(CheckPreference);

module.exports = clubRouter

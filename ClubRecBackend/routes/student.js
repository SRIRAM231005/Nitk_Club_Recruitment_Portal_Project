const express = require("express");
const {GetAnnouncement,GetRegForm,SetStudentData,SetStudentAssingmentData,SetSigPreference,Calender} = require('../controllers/announcement_control');
const announcementRouter = express.Router();

announcementRouter.route('/ann').get(GetAnnouncement);
announcementRouter.route('/getreg').get(GetRegForm);
announcementRouter.route('/setdata').patch(SetStudentData);
announcementRouter.route('/setassingmentdata').patch(SetStudentAssingmentData);
announcementRouter.route('/sigPref').post(SetSigPreference);
announcementRouter.route('/calender').get(Calender);

module.exports = announcementRouter
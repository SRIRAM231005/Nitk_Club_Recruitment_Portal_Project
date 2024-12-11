const express = require("express");
const app = express();
const {MongoseConnect} = require("./connection");
MongoseConnect('mongodb://127.0.0.1:27017/clubrec').then(()=> console.log("Mongoose Connected"));
const bodyParser = require('body-parser');
const cors = require('cors');
const {authenticateToken} = require('./middleware/auth');
const userrouter = require('./routes/users');
const clubrouter = require('./routes/club');
const studentrouter = require('./routes/student');
const adminrouter = require('./routes/nitkadmin');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/user',userrouter);
app.use('/club',authenticateToken , clubrouter);
app.use('/student',studentrouter);
app.use('/admin',adminrouter);

app.listen(8006,  ()=>{
    console.log('server started');
});

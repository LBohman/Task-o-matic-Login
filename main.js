const express = require('express');
const tasksRouter = require('./routes/tasks');
const userRouter = require('./routes/userRoute');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const Task = require('./model/task');
require('dotenv').config();

const app = express();
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', tasksRouter);
app.use('/', userRouter);


mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if(err) return;
});

app.listen(3000, () => {
    console.log('App is up and running...');
})
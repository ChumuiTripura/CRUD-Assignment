const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const cors = require('cors')
const url = 'mongodb://localhost:27017/AssignmentCrud'
const con = mongoose.connection;
const app = express();

app.use(express.json());
app.use(cors());   //middleware -> cross-origin resource sharing -> http

mongoose.connect(url, {useNewUrlParser: true})

con.on('open' , () => {
    console.log("connecting ... ");
})


const empRouter = require('./routers/emp.js');
app.use('/', empRouter);

app.listen(3000, () => {
    console.log("hello connected");
})